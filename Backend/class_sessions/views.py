from rest_framework import generics
from .models import ClassSession
from .serializers import ClassSessionSerializer

class ClassSessionListCreate(generics.ListCreateAPIView):
    queryset = ClassSession.objects.all()
    serializer_class = ClassSessionSerializer

class ClassSessionDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = ClassSession.objects.all()
    serializer_class = ClassSessionSerializer
