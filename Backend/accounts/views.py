from django.contrib.auth import authenticate, login, logout
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated,IsAdminUser
from django.contrib.auth import get_user_model
from .serializers import RegisterSerializer, UserSerializer
import logging


logger = logging.getLogger(__name__)

# Register view
class RegisterView(generics.CreateAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

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

# get all Users 
class UserListView(generics.ListAPIView):
    permission_classes = [IsAdminUser]
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer
# return authenticated user
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
