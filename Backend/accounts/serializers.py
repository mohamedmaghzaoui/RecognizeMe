from django.contrib.auth import get_user_model
from rest_framework import serializers
from schools.models import School
from .models import StudentProfile,TeacherProfile,AdminProfile
User =get_user_model()
# Serializer for registering users
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'role', 'first_name', 'last_name']  # Include first_name and last_name
        extra_kwargs = {'password': {'write_only': True}}  # Password is write-only

    def validate_role(self, value):
        if value not in ['student', 'teacher']:
            raise serializers.ValidationError("Only 'student' and 'teacher' roles can be registered.")
        return value

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)  # Now this will include first_name and last_name
        user.set_password(password)
        user.save()
        return user

# Serializer for returning user data
class UserSerializer(serializers.ModelSerializer):
    school_name = serializers.SerializerMethodField()
    school_address = serializers.SerializerMethodField()
    classroom_name = serializers.SerializerMethodField()  # 👈 New field

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'role',
                  'school_name', 'school_address', 'classroom_name']  # 👈 Include new field

    def get_school_name(self, obj):
        if hasattr(obj, 'adminprofile'):
            return obj.adminprofile.school.name
        elif hasattr(obj, 'teacherprofile'):
            return obj.teacherprofile.school.name
        elif hasattr(obj, 'studentprofile'):
            return obj.studentprofile.school.name
        return None

    def get_school_address(self, obj):
        if hasattr(obj, 'adminprofile'):
            return obj.adminprofile.school.address
        elif hasattr(obj, 'teacherprofile'):
            return obj.teacherprofile.school.address
        elif hasattr(obj, 'studentprofile'):
            return obj.studentprofile.school.address
        return None

    def get_classroom_name(self, obj):
        if hasattr(obj, 'studentprofile') and obj.studentprofile.classroom_id:
            return obj.studentprofile.classroom.name
        return None
