from rest_framework import serializers
from .models import Session

class SessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Session
        fields = '__all__'
        extra_kwargs = {
            'classroom': {'required': False},
            'teacher': {'required': False},
        }