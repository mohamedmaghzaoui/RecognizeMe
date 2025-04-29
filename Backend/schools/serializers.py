# schools/serializers.py
from rest_framework import serializers
from .models import School, Classroom
from accounts.models import User

class SchoolSerializer(serializers.ModelSerializer):
    class Meta:
        model = School
        fields = ['id', 'name', 'address', 'created_at']

class ClassroomSerializer(serializers.ModelSerializer):
    teacher = serializers.PrimaryKeyRelatedField(queryset=User.objects.filter(role='teacher'), required=True)

    class Meta:
        model = Classroom
        fields = ['id', 'name', 'school', 'teacher']

