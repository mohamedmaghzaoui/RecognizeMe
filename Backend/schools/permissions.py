# schools/permissions.py
from rest_framework.permissions import BasePermission
from accounts.models import AdminProfile  

class IsSuperUser(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.is_superuser

class IsSchoolAdmin(BasePermission):
    def has_permission(self, request, view):
        user = request.user
        return (
            user.is_authenticated and
            user.role == 'admin' and
            hasattr(user, 'adminprofile')  # Check if user is linked to a school via AdminProfile
        )
class IsTeacher(BasePermission):
    def has_permission(self, request, view):
        user = request.user
        return (
            user.is_authenticated and
            user.role == 'teacher' and
            hasattr(user, 'teacherprofile')  
        )

    def has_object_permission(self, request, view, obj):
        # Check if admin's school matches the classroom's school
        try:
            admin_profile = AdminProfile.objects.get(user=request.user)
            return admin_profile.school == obj.school
        except AdminProfile.DoesNotExist:
            return False
