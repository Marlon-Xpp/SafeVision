from rest_framework import serializers
from django.contrib.auth import authenticate
from rest_framework.exceptions import AuthenticationFailed
from .models import User

from rest_framework import serializers
from django.contrib.auth import authenticate
from rest_framework.exceptions import AuthenticationFailed
from .models import User

class SignInSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        username = data.get("username")
        password = data.get("password")

        # Primero verificamos si el usuario existe
        if not User.objects.filter(username=username).exists():
            raise AuthenticationFailed("El usuario no existe en la base de datos.")

        # Luego verificamos si la contraseña es válida
        user = authenticate(username=username, password=password)
        if not user:
            raise AuthenticationFailed("La contraseña es incorrecta.")

        # Y por último, si el usuario está activo
        if not user.is_active:
            raise AuthenticationFailed("El usuario está inactivo.")

        data["user"] = user
        return data


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "first_name",
            "last_name",
            "username",
            "email",
            "phone",
            "role",
        ]
