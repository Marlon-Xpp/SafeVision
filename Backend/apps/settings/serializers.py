from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from apps.accounts.models import User

class CreateUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=4)
    username = serializers.CharField(validators=[UniqueValidator(queryset=User.objects.all(), message="Ya existe un usuario con este nombre de usuario.")])
    email = serializers.EmailField(validators=[UniqueValidator(queryset=User.objects.all(), message="Ya existe un usuario con este correo electrónico.")])
    
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
