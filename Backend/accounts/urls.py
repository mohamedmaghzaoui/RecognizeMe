from django.urls import path
from .views import RegisterView, LoginView, UserListView,LogoutView,UserView,DeleteUserView,AssignStudentToClassView

urlpatterns = [
    path('register', RegisterView.as_view(), name='register'),
    path('login', LoginView.as_view(), name='login'),
    path('users', UserListView.as_view(), name='user-list'),
    path('user', UserView.as_view(), name='user-list'),
   path('logout', LogoutView.as_view(), name="logout"),
   path('delete-user/<int:user_id>/', DeleteUserView.as_view(), name="delete-user"),
     path('assign-student/<int:student_id>/', AssignStudentToClassView.as_view(), name='assign-student'),
]
