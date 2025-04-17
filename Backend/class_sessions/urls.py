from django.urls import path
from .views import ClassSessionListCreate, ClassSessionDetail

urlpatterns = [
    path('', ClassSessionListCreate.as_view(), name='class-session-list'),  # Liste des sessions de classe
    path('<int:pk>/', ClassSessionDetail.as_view(), name='class-session-detail'),  # Détail d'une session
]
