from django.urls import path
from .views import RegisterView, LoginView, UserListView,LogoutView,UserView

urlpatterns = [
    path('register', RegisterView.as_view(), name='register'),
    path('login', LoginView.as_view(), name='login'),
    path('users', UserListView.as_view(), name='user-list'),
    path('user', UserView.as_view(), name='user-list'),
   path('logout', LogoutView.as_view(), name="logout"),
]
