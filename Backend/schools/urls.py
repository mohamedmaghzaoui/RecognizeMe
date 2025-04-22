# schools/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SchoolViewSet, ClassroomViewSet

router = DefaultRouter()
router.register(r'schools', SchoolViewSet)  # Register the viewset for schools
router.register(r'classrooms', ClassroomViewSet)  # Register the viewset for classrooms

urlpatterns = [
    path('', include(router.urls)),  # Include the router's URL patterns
]
