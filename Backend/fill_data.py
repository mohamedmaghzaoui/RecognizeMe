import os
import django
import random
from faker import Faker

# 🔧 Set your Django settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'RecognizeMe.settings')  # Correct path to your settings

django.setup()

# 📦 Import your models
from accounts.models import StudentProfile, User
from announcements.models import Announcement
from attendance.models import Attendance, Justification, ScanLog
from class_sessions.models import Session, StudentSessionToken
from schools.models import Classroom, School

# 🎭 Faker instance
fake = Faker()

def fill_data():
    # Schools
    for _ in range(20):
        School.objects.create(
            name=fake.company(),
            address=fake.address()
        )

    # Classrooms
    schools = list(School.objects.all())
    for _ in range(20):
        Classroom.objects.create(
            name=fake.word(),
            school=random.choice(schools)
        )

    # Users
    for _ in range(20):
        User.objects.create_user(
            username=fake.user_name(),
            email=fake.email(),
            password="password123"
        )

    users = list(User.objects.all())

    # StudentProfiles
    for user in users:
        StudentProfile.objects.create(
            user=user,
            bio=fake.text(),
            birth_date=fake.date_of_birth(minimum_age=17, maximum_age=25)
        )

    # Announcements
    for _ in range(20):
        Announcement.objects.create(
            title=fake.sentence(nb_words=6),
            content=fake.paragraph(),
            created_at=fake.date_time_this_year()
        )

    # Attendance
    for _ in range(20):
        Attendance.objects.create(
            student=random.choice(users),
            date=fake.date_this_year(),
            status=random.choice(['present', 'absent'])
        )

    # Justifications
    for _ in range(20):
        Justification.objects.create(
            student=random.choice(users),
            reason=fake.sentence(),
            date=fake.date_this_year()
        )

    # ScanLogs
    for _ in range(20):
        ScanLog.objects.create(
            student=random.choice(users),
            scanned_at=fake.date_time_this_year()
        )

    # Sessions
    classrooms = list(Classroom.objects.all())
    for _ in range(20):
        start = fake.date_time_this_month()
        Session.objects.create(
            classroom=random.choice(classrooms),
            topic=fake.word(),
            start_time=start,
            end_time=fake.date_time_between(start, '+2h')
        )

    # StudentSessionTokens
    sessions = list(Session.objects.all())
    for _ in range(20):
        StudentSessionToken.objects.create(
            student=random.choice(users),
            session=random.choice(sessions),
            token=fake.uuid4()
        )

    print("✅ All tables filled with dummy data.")

if __name__ == "__main__":
    fill_data()
