from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/accounts/', include('accounts.urls')),
    # path('api/schools/', include('schools.urls')),
    # path('api/class-sessions/', include('class_sessions.urls')),
    # path('api/attendance/', include('attendance.urls')),
    # path('api/announcements/', include('announcements.urls')),
]
