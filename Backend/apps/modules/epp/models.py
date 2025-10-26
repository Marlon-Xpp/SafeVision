from django.db import models

# Create your models here.
from django.db import models
from apps.workers.models import Worker


class EPPEvent(models.Model):
    worker = models.ForeignKey(Worker, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    helmet = models.BooleanField(default=False)
    vest = models.BooleanField(default=False)
    boots = models.BooleanField(default=False)
    is_complete = models.BooleanField(default=False)
    missing_items = models.JSONField(default=list, blank=True)  # ['helmet', 'vest']
    warning_type = models.CharField(max_length=100, blank=True, null=True)  # Ej: 'Se quitó el chaleco'
    
    def __str__(self):
        return f"{self.worker.first_name} {self.worker.last_name} - {self.timestamp}"


class WorkerEPPStatus(models.Model):
    worker = models.OneToOneField(Worker, on_delete=models.CASCADE)
    total_warnings = models.IntegerField(default=0)
    last_status = models.CharField(max_length=20, choices=[('Completo', 'Completo'), ('Incompleto', 'Incompleto')], default='Completo')
    last_missing_items = models.JSONField(default=list, blank=True)

    def __str__(self):
        return f"{self.worker.first_name} {self.worker.last_name} - {self.total_warnings} advertencias"
