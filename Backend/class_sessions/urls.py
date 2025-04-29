from rest_framework.routers import DefaultRouter
from .views import SessionViewSet
from django.urls import path, include

router = DefaultRouter()
router.register(r'sessions', SessionViewSet, basename='sessions')

urlpatterns = router.urls
urlpatterns = [
    path('', include(router.urls)),  # Include the router's URL patterns
]