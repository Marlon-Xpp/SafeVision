from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from apps.accounts.models import User

class CreateUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        min_length=4,
        error_messages={
            "min_length": "La contraseña debe tener al menos 4 caracteres."
        },
    )
    username = serializers.CharField(
        validators=[UniqueValidator(
            queryset=User.objects.all(),
            message="Ya existe un usuario con este nombre de usuario."
        )]
    )
    email = serializers.EmailField(
        validators=[UniqueValidator(
            queryset=User.objects.all(),
            message="Ya existe un usuario con este correo electrónico."
        )]
    )
    phone = serializers.CharField(
        required=False,
        allow_blank=True,
        max_length=9,
        validators=[UniqueValidator(
            queryset=User.objects.all(),
            message="Ya existe un usuario con este número de teléfono."
        )],
        error_messages={
            "max_length": "El número de teléfono no puede exceder los 9 caracteres."
        },
    )

    class Meta:
        model = User
        fields = [
            "first_name",
            "last_name",
            "username",
            "email",
            "phone",
            "password",
            "role",
        ]

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = User.objects.create(**validated_data)
        user.set_password(password)
        user.save()
        return user
