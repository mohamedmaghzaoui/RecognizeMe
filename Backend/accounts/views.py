from django.contrib.auth import authenticate, login, logout
from rest_framework import status, generics
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework.permissions import AllowAny, IsAuthenticated,IsAdminUser
from django.contrib.auth import get_user_model
from .serializers import RegisterSerializer, UserSerializer
import logging
from schools.permissions import IsSchoolAdmin
from .models import TeacherProfile ,StudentProfile
from schools.models import Classroom


logger = logging.getLogger(__name__)
User = get_user_model()

# Register view : add a new teacher or student (only for school admin)
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [IsAuthenticated, IsSchoolAdmin]

    def perform_create(self, serializer):
        # get admin user
        admin_user = self.request.user

        # create new user
        user = serializer.save()

        # associate new user with the same school as the admin
        school = admin_user.adminprofile.school
        # fill user profile table
        if user.role == "teacher":
            TeacherProfile.objects.create(user=user, school=school)
        elif user.role == "student":
            StudentProfile.objects.create(user=user, school=school)

# Login view
class LoginView(generics.GenericAPIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        try:
            user = authenticate(request, username=username, password=password)
        except Exception as e:
            logger.error(f"Authentication error: {e}")
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        if user is not None:
            login(request, user)
            response = Response({'message': 'Login successful'}, status=status.HTTP_200_OK)
            return response

        return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

# get all students and teacher that belong to same school (only for school admin user)
class UserListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated, IsSchoolAdmin]
    serializer_class = UserSerializer

    def get_queryset(self):
        admin_user = self.request.user
        admin_school = admin_user.adminprofile.school  # assumes admin has profile with school

        # Get both student and teacher user IDs in the same school
        student_ids = StudentProfile.objects.filter(school=admin_school).values_list('user_id', flat=True)
        teacher_ids = TeacherProfile.objects.filter(school=admin_school).values_list('user_id', flat=True)

        user_ids = list(student_ids) + list(teacher_ids)
        return User.objects.filter(id__in=user_ids)

# return authenticated user (only for authenticated users)
class UserView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class=UserSerializer
    def get_object(self):
        return self.request.user
    


class LogoutView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

   
    def post(self, request):
        logout(request)
        return Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)
class DeleteUserView(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated, IsSchoolAdmin]

    def get_object(self):
        # Get user ID from the URL and fetch the user object
        user_id = self.kwargs.get('user_id')
        user = get_object_or_404(User, id=user_id)

        # Ensure both the admin and the user to be deleted belong to the same school
        admin_user = self.request.user
        admin_school = admin_user.adminprofile.school
        
        # Check if the user is a teacher or student
        if hasattr(user, 'teacherprofile'):
            user_school = user.teacherprofile.school
        elif hasattr(user, 'studentprofile'):
            user_school = user.studentprofile.school
        else:
            raise Exception("User profile not found.")
        
        if admin_school != user_school:
            raise PermissionError("You can only delete users from your school.")

        return user

    def delete(self, request, *args, **kwargs):
        user_to_delete = self.get_object()

        # Perform the actual delete operation
        user_to_delete.delete()
        
        return Response({"message": "User deleted successfully."}, status=status.HTTP_204_NO_CONTENT)


class AssignStudentToClassView(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated, IsSchoolAdmin]
    
    # We use the PATCH method for updating the student’s classroom
    def patch(self, request, *args, **kwargs):
        student_id = kwargs.get('student_id')
        classroom_id = request.data.get('classroom_id')

        # Ensure the student ID and classroom ID are provided
        if not classroom_id:
            return Response({"error": "Classroom ID is required."}, status=status.HTTP_400_BAD_REQUEST)
        
        # Ensure the student exists
        student_profile = get_object_or_404(StudentProfile, user_id=student_id)
        
        # Ensure the classroom exists
        classroom = get_object_or_404(Classroom, id=classroom_id)
        
        # Ensure both the admin and the student belong to the same school
        admin_user = self.request.user
        admin_school = admin_user.adminprofile.school

        if student_profile.school != admin_school:
            return Response({"error": "You can only assign students from your school."}, status=status.HTTP_400_BAD_REQUEST)

        # Update student profile's classroom
        student_profile.classroom = classroom
        student_profile.save()

        return Response({
            "message": f"Student {student_profile.user.username} has been assigned to {classroom.name}."
        }, status=status.HTTP_200_OK)
