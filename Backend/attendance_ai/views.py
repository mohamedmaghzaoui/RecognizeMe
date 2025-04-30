import joblib
import pandas as pd
from datetime import datetime, timedelta
from collections import Counter
from django.db.models import Count
from django.http import JsonResponse
from attendance.models import Attendance
from schools.permissions import IsSchoolAdmin

# Load models 
presence_model = joblib.load('ai/models/predictor.pkl')
vectorizer, kmeans = joblib.load('ai/models/nlp_cluster.pkl')

# Predict presence probability
def predict_presence(student_data):
    X_test = pd.DataFrame(student_data)
    probabilities = presence_model.predict_proba(X_test)

    present_index = 1  # Assuming class 1 means "present"
    present_probability = probabilities[0][present_index]
    present_percentage = round(present_probability * 100, 2)

    if present_percentage >= 80:
        return f"The student has a {present_percentage}% chance of being present tomorrow. Likely to attend."
    else:
        return f"The student has a {present_percentage}% chance of being present tomorrow. May miss."

# Analyze attendance behavior
def analyze_behavior(student_id):
    today = datetime.today().date()
    past_date = today - timedelta(days=30)

    attendance_records = Attendance.objects.filter(
        student_id=student_id,
        timestamp__date__gte=past_date
    ).select_related('session')

    if not attendance_records.exists():
        return "No attendance data found for this student."

    absence_count = attendance_records.filter(status='absent').count()

    weekday_absences = (
        attendance_records
        .filter(status='absent')
        .values_list('timestamp__week_day', flat=True)
    )

    if weekday_absences:
        weekday_counts = Counter(weekday_absences)
        most_common_day = weekday_counts.most_common(1)[0][0]
        weekday_names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        day_name = weekday_names[(most_common_day - 1) % 7]  # Django's week_day: Sunday=1

        return f"The student has been absent {absence_count} times in the last 30 days. Most absences were on {day_name}s."

    return f"The student has been absent {absence_count} times in the last 30 days."

# Cluster behavior pattern using vectorized text
def cluster_behavior_summary(student_id):
    attendance_logs = Attendance.objects.filter(student_id=student_id).select_related('session').order_by('-timestamp')[:20]

    if not attendance_logs.exists():
        return "No attendance records available for behavior clustering."

    texts = [
        f"{record.status} on {record.session.date.strftime('%A')} at {record.session.start_time.strftime('%H:%M')}"
        for record in attendance_logs
    ]

    X_vec = vectorizer.transform(texts)
    cluster_label = kmeans.predict(X_vec)[0]

    # Human-friendly explanations for each cluster
    cluster_descriptions = {
        0: "This student usually maintains consistent attendance with minor irregularities.",
        1: "This student shows occasional attendance issues, often missing a few sessions each week.",
        2: "This student frequently misses classes and may require intervention.",
    }

    return cluster_descriptions.get(cluster_label, "Behavioral pattern could not be determined.")

# Django view
def predict_student(request, student_id):
    permission_classes = [IsSchoolAdmin]
    latest_attendance = (
        Attendance.objects
        .filter(student_id=student_id)
        .select_related('session')
        .order_by('-timestamp')
        .first()
    )

    if not latest_attendance:
        return JsonResponse({'error': 'No attendance data found for this student.'}, status=404)

    session = latest_attendance.session
    student_data = {
        'student_id': [student_id],
        'weekday': [session.date.weekday()],  # Monday = 0
        'month': [session.date.month],
        'hour': [session.start_time.hour],
    }

    # Run predictions and analyses
    presence_message = predict_presence(student_data)
    behavior_message = analyze_behavior(student_id)
    cluster_message = cluster_behavior_summary(student_id)

    return JsonResponse({
        'presence_prediction': presence_message,
        'behavior_analysis': behavior_message,
        'behavior_cluster': cluster_message,
    })
