# urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('predict/<int:student_id>/', views.predict_student, name='predict_student'),
]
