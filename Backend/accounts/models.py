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


# Student Profile
class StudentProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    classroom = models.ForeignKey('schools.Classroom', null=True, blank=True, on_delete=models.SET_NULL)
    school = models.ForeignKey('schools.School', null=True, blank=True, on_delete=models.SET_NULL)

    def __str__(self):
        return f"Student Profile: {self.user.username}"


# Teacher Profile
class TeacherProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    school = models.ForeignKey('schools.School', null=True, blank=True, on_delete=models.SET_NULL)

    def __str__(self):
        return f"Teacher Profile: {self.user.username}"


# Admin Profile
class AdminProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    school = models.ForeignKey('schools.School', null=True, blank=True, on_delete=models.SET_NULL)

    def __str__(self):
        return f"Admin Profile: {self.user.username}"
