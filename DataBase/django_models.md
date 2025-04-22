# django models 

## schools app

from django.db import models
from accounts.models import User

# class School(models.Model):
    name = models.CharField(max_length=255, unique=True)
    address = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

# class Classroom(models.Model):
    name = models.CharField(max_length=100)
    school = models.ForeignKey(School, on_delete=models.SET_NULL, null=True)
    teacher = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, limit_choices_to={'role': 'teacher'})

## accounts app
from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('teacher', 'Teacher'),
        ('student', 'Student'),
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.username



# class StudentProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    classroom = models.ForeignKey('schools.Classroom', null=True, blank=True, on_delete=models.SET_NULL)
    school = models.ForeignKey('schools.School', null=True, blank=True, on_delete=models.SET_NULL)

    def __str__(self):
        return f"Student Profile: {self.user.username}"



# class TeacherProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    school = models.ForeignKey('schools.School', null=True, blank=True, on_delete=models.SET_NULL)

    def __str__(self):
        return f"Teacher Profile: {self.user.username}"



# class AdminProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    school = models.ForeignKey('schools.School', null=True, blank=True, on_delete=models.SET_NULL)

    def __str__(self):
        return f"Admin Profile: {self.user.username}"

## attendance app
from django.db import models
from class_sessions.models import Session
from accounts.models import User

# class Attendance(models.Model):
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

# class Justification(models.Model):
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

# class ScanLog(models.Model):
    session = models.ForeignKey(Session, on_delete=models.CASCADE)
    student = models.ForeignKey(User, on_delete=models.CASCADE, limit_choices_to={'role': 'student'})
    user_agent = models.TextField()
    ip_address = models.CharField(max_length=100)
    scanned_at = models.DateTimeField(auto_now_add=True)

## announcements app 
from django.db import models
from schools.models import Classroom
from accounts.models import User

# class Announcement(models.Model):
    sender = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    classroom = models.ForeignKey(Classroom, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    message = models.TextField()

## class_sessions app
from django.db import models
from schools.models import Classroom
from accounts.models import User

# class Session(models.Model):
    classroom = models.ForeignKey(Classroom, on_delete=models.CASCADE)
    teacher = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, limit_choices_to={'role': 'teacher'})
    subject = models.CharField(max_length=100)
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    created_at = models.DateTimeField(auto_now_add=True)

# class StudentSessionToken(models.Model):
    student = models.ForeignKey(User, on_delete=models.CASCADE, limit_choices_to={'role': 'student'})
    session = models.ForeignKey(Session, on_delete=models.CASCADE)
    token = models.CharField(max_length=255, unique=True)
    expires_at = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)



