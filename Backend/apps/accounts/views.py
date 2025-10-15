from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework_simplejwt.tokens import RefreshToken
from .models import CustomUser
from .serializers import UserSerializer, LoginSerializer
from django.contrib.auth.hashers import make_password


# 🔐 LOGIN VIEW
class SignInView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data
            refresh = RefreshToken.for_user(user)
            return Response({
                'user': UserSerializer(user).data,
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# 👤 REGISTRO (solo admin puede crear usuarios)
class SignUpUserView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        # ✅ Solo el administrador puede registrar usuarios
        if request.user.role != 'admin':
            return Response(
                {'error': 'Solo el administrador puede crear usuarios.'},
                status=status.HTTP_403_FORBIDDEN
            )

        serializer = UserSerializer(data=request.data)

        if serializer.is_valid():
            # ✅ Encriptamos la contraseña antes de guardar
            user = CustomUser.objects.create(
                username=serializer.validated_data['username'],
                email=serializer.validated_data['email'],
                password=make_password(serializer.validated_data['password']),
                role=serializer.validated_data.get('role', 'supervisor')
            )
            return Response(
                {
                    "message": "Usuario creado correctamente.",
                    "user": UserSerializer(user).data
                },
                status=status.HTTP_201_CREATED
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
