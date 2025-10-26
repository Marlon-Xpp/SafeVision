from rest_framework import serializers
from .models import EPPEvent, WorkerEPPStatus

class EPPEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = EPPEvent
        fields = '__all__'


class WorkerEPPStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkerEPPStatus
        fields = '__all__'
