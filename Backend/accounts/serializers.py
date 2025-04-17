# serializers.py
from django.contrib.auth import get_user_model
from rest_framework import serializers

# Serializer for registering users
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()  # Use custom User model if you have one
        fields = ['username', 'email', 'password', 'first_name', 'last_name']

    def create(self, validated_data):
        user = get_user_model().objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', '')
        )
        return user

# Serializer for returning user data
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'role']
