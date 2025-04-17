from django.urls import path
from .views import AnnouncementListCreate, AnnouncementDetail

urlpatterns = [
    path('', AnnouncementListCreate.as_view(), name='announcement-list'),  # Liste des annonces
    path('<int:pk>/', AnnouncementDetail.as_view(), name='announcement-detail'),  # Détail d'une annonce
]
