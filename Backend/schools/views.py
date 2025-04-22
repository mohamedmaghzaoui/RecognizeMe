# schools/views.py
from rest_framework import viewsets
from .models import School, Classroom
from .serializers import SchoolSerializer, ClassroomSerializer
from .permissions import IsSchoolAdmin, IsSuperUser

class SchoolViewSet(viewsets.ModelViewSet):
    queryset = School.objects.all()
    serializer_class = SchoolSerializer
    permission_classes = [IsSuperUser]  # Only superusers can manage schools

class ClassroomViewSet(viewsets.ModelViewSet):
    queryset = Classroom.objects.all()
    serializer_class = ClassroomSerializer
    permission_classes = [IsSchoolAdmin]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'admin' and hasattr(user, 'adminprofile'):
            # Filter classrooms based on the user's school
            return Classroom.objects.filter(school=user.adminprofile.school)
        return Classroom.objects.none()  # Return no classrooms if the user is not an admin

    def perform_create(self, serializer):
        user = self.request.user
        if user.role == 'admin' and hasattr(user, 'adminprofile'):
            school = user.adminprofile.school
            serializer.save(school=school)  # Save the classroom with the school attached
