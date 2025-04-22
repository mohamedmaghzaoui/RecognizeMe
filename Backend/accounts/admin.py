from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import User, AdminProfile, TeacherProfile, StudentProfile

# Custom form for creating a user (handles password hashing)
class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name', 'role']  # Include custom fields

# Custom form for changing a user
class CustomUserChangeForm(UserChangeForm):
    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name', 'role']  # Include custom fields

# Custom UserAdmin to handle User model in admin
class CustomUserAdmin(UserAdmin):
    model = User
    add_form = CustomUserCreationForm  # Form to use when adding a new user
    form = CustomUserChangeForm  # Form to use when editing a user
    list_display = ['username', 'email', 'first_name', 'last_name', 'role', 'is_active', 'is_staff']  # Fields to display
    search_fields = ['username', 'email']  # Fields to search
    ordering = ['username']  # Order users by username
    fieldsets = UserAdmin.fieldsets  # Inherit the default UserAdmin fieldsets
    add_fieldsets = UserAdmin.add_fieldsets  # Inherit the default UserAdmin add_fieldsets

# Register models in admin
admin.site.register(User, CustomUserAdmin)  # Register custom UserAdmin
admin.site.register(AdminProfile)
admin.site.register(TeacherProfile)
admin.site.register(StudentProfile)
