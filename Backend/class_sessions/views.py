from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from attendance.models import Attendance
from .models import Session
from schools.models import Classroom
from accounts.models import TeacherProfile
from .serializers import SessionSerializer

class SessionViewSet(viewsets.ModelViewSet):
    serializer_class = SessionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        Returns different session queryset based on user role.
        """
        user = self.request.user
        if user.role == 'admin':
            return Session.objects.all().order_by('-date')
        elif user.role == 'teacher':
            # Teacher can only view sessions for their classroom
            return Session.objects.filter(classroom__teacher=user).order_by('-date')
        elif user.role == 'student':
            # Students can only see sessions for their classroom
            return Session.objects.filter(classroom__studentprofile__user=user).order_by('-date')
        return Session.objects.none()

    def perform_create(self, serializer):
        user = self.request.user
        if user.role == 'teacher':
            try:
                classroom = Classroom.objects.get(teacher=user)
            except Classroom.DoesNotExist:
                raise ValidationError("This teacher is not assigned to any classroom.")

            # Save the session with the classroom and teacher information
            session = serializer.save(classroom=classroom, teacher=user)

            # Create initial attendance for all students in the classroom
            students = classroom.studentprofile_set.all()
            for student_profile in students:
                Attendance.objects.create(
                    student=student_profile.user,
                    session=session,
                    status='absent'  # Initially mark all students as absent
                )
        else:
            raise PermissionError("Only teachers can create sessions.")
        
        def destroy(self, request, *args, **kwargs):
            user = request.user
            session = self.get_object()

            # Only the teacher who created the session can delete it
            if user.role == 'teacher' and session.teacher != user:
                raise PermissionDenied("You do not have permission to delete this session.")
            
            return super().destroy(request, *args, **kwargs)


    @action(detail=True, methods=['get'])
    def attendance(self, request, pk=None):
        """
        Custom action to get attendance for a specific session.
        """
        session = self.get_object()
        attendance = Attendance.objects.filter(session=session)
        serializer = AttendanceSerializer(attendance, many=True)
        return Response(serializer.data)
