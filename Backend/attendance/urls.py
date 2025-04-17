from django.urls import path
from .views import AttendanceListCreate, AttendanceDetail

urlpatterns = [
    path('', AttendanceListCreate.as_view(), name='attendance-list'),  # Liste des présences
    path('<int:pk>/', AttendanceDetail.as_view(), name='attendance-detail'),  # Détail d'une présence
]
