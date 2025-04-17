from django.urls import path
from .views import SchoolListCreate, SchoolDetail

urlpatterns = [
    path('', SchoolListCreate.as_view(), name='school-list'),  # Liste des écoles
    path('<int:pk>/', SchoolDetail.as_view(), name='school-detail'),  # Détail d'une école
]
