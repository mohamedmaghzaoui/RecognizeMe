from django.db import models
from class_sessions.models import Session
from accounts.models import User


class Attendance(models.Model):
    STATUS_CHOICES = (
        ('present', 'Present'),
        ('late', 'Late'),
        ('absent', 'Absent'),
    )
    student = models.ForeignKey(User, on_delete=models.CASCADE, limit_choices_to={'role': 'student'})
    session = models.ForeignKey(Session, on_delete=models.CASCADE)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('student', 'session')

class Justification(models.Model):
    attendance = models.ForeignKey(Attendance, on_delete=models.CASCADE)
    student = models.ForeignKey(User, on_delete=models.CASCADE, limit_choices_to={'role': 'student'})
    reason = models.TextField()
    file_upload = models.FileField(upload_to='justifications/', blank=True, null=True)
    status = models.CharField(max_length=10, choices=[
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('rejected', 'Rejected')
    ], default='pending')
    submitted_at = models.DateTimeField(auto_now_add=True)

class ScanLog(models.Model):
    session = models.ForeignKey(Session, on_delete=models.CASCADE)
    student = models.ForeignKey(User, on_delete=models.CASCADE, limit_choices_to={'role': 'student'})
    user_agent = models.TextField()
    ip_address = models.CharField(max_length=100)
    scanned_at = models.DateTimeField(auto_now_add=True)
