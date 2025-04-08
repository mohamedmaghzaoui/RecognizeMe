
# Register your models here.
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'email', 'role', 'school', 'is_staff', 'is_superuser')
    list_filter = ('role', 'school', 'is_staff', 'is_superuser')
    fieldsets = UserAdmin.fieldsets + (
        ('Infos École', {'fields': ('role', 'school')}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        ('Infos École', {'fields': ('role', 'school')}),
    )
