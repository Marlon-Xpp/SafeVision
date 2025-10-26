# ✅ urls.py
from django.urls import path
from .views import CreateWorkerView

urlpatterns = [
    path("create/worker/", CreateWorkerView.as_view(), name="create_worker"),
]
