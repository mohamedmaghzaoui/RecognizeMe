from django.db import models
from schools.models import Classroom
from accounts.models import User

class Announcement(models.Model):
    sender = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    classroom = models.ForeignKey(Classroom, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    message = models.TextField()
    sent_at = models.DateTimeField(auto_now_add=True)
