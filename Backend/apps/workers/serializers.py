from rest_framework import serializers
from .models import Worker

class CreateWorkerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Worker
        fields = [
            'id', 
            'face_image', 
            'first_name', 
            'last_name', 
            'position', 
            'code_qr'
        ]
        
    