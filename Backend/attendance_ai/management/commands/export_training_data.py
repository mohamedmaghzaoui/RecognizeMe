from django.core.management.base import BaseCommand
from attendance.models import Attendance
from class_sessions.models import Session
from accounts.models import User
import pandas as pd
import os

class Command(BaseCommand):
    help = 'Export student attendance data for training'

    def handle(self, *args, **kwargs):
        records = []
        all_attendance = Attendance.objects.select_related('session').all()

        for att in all_attendance:
            session = att.session
            records.append({
                'student_id': att.student_id,
                'status': att.status,
                'weekday': session.date.weekday(),
                'month': session.date.month,
                'day': session.date.day,
                'hour': session.start_time.hour,
                'subject': session.subject,
                'date': session.date,
            })

        df = pd.DataFrame(records)
        os.makedirs("ai/data", exist_ok=True)
        df.to_csv("ai/data/attendance_dataset.csv", index=False)
        self.stdout.write(self.style.SUCCESS("✅ Attendance data exported successfully"))
