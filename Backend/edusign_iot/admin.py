
from django.contrib import admin
from .models import (
    School, Student, Teacher, Course, Classroom, Session, Attendance
)

admin.site.register(School)
admin.site.register(Student)
admin.site.register(Teacher)
admin.site.register(Course)
admin.site.register(Classroom)
admin.site.register(Session)
admin.site.register(Attendance)
