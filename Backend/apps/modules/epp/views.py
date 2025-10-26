from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from apps.workers.models import Worker
from .models import EPPEvent, WorkerEPPStatus
from .serializers import EPPEventSerializer

# 👇 importamos la función que combina detección de QR + EPP
from .epp_detector import detect_epp_and_qr


class EPPEventView(APIView):
    """
    Este endpoint sigue funcionando igual que antes (usando datos del request).
    Se usa para pruebas con Postman o integración desde otra app.
    """
    def post(self, request):
        code_qr = request.data.get("code_qr")
        helmet = request.data.get("helmet")
        vest = request.data.get("vest")
        boots = request.data.get("boots")

        # Buscar trabajador por código QR
        try:
            worker = Worker.objects.get(code_qr=code_qr)
        except Worker.DoesNotExist:
            return Response({"error": "Trabajador no encontrado."}, status=status.HTTP_404_NOT_FOUND)

        # Verificar si tiene todos los EPP
        missing = []
        if not helmet: missing.append("helmet")
        if not vest: missing.append("vest")
        if not boots: missing.append("boots")

        is_complete = len(missing) == 0

        # Crear registro del evento
        event = EPPEvent.objects.create(
            worker=worker,
            helmet=helmet,
            vest=vest,
            boots=boots,
            is_complete=is_complete,
            missing_items=missing,
            warning_type=f"Se quitó {', '.join(missing)}" if missing else None
        )

        # Actualizar estado del trabajador
        status_obj, _ = WorkerEPPStatus.objects.get_or_create(worker=worker)

        if not is_complete:
            status_obj.total_warnings += 1
            status_obj.last_status = "Incompleto"
            status_obj.last_missing_items = missing
        else:
            status_obj.last_status = "Completo"
            status_obj.last_missing_items = []

        status_obj.save()

        # Serializar y devolver respuesta
        event_data = EPPEventSerializer(event).data
        return Response({
            "message": "Evento EPP registrado.",
            "worker": f"{worker.first_name} {worker.last_name}",
            "status": "Completo" if is_complete else "Incompleto",
            "missing_epp": missing,
            "warnings_count": status_obj.total_warnings,
            "event": event_data
        }, status=status.HTTP_201_CREATED)


class RealTimeEPPDetectionView(APIView):
    """
    Nuevo endpoint: activa la cámara y detecta QR + EPP automáticamente.
    Ideal para pruebas en tiempo real.
    """

    def get(self, request):
        try:
            for detection in detect_epp_and_qr():
                # Cada detección se envía en tiempo real
                code_qr = detection.get("worker")
                helmet = detection.get("helmet")
                vest = detection.get("vest")
                boots = detection.get("boots")

                # Buscar trabajador
                worker = Worker.objects.filter(code_qr=code_qr).first()
                if not worker:
                    continue  # ignora detecciones sin trabajador

                missing = []
                if not helmet: missing.append("helmet")
                if not vest: missing.append("vest")
                if not boots: missing.append("boots")

                is_complete = len(missing) == 0

                # Crear evento y actualizar estado
                event = EPPEvent.objects.create(
                    worker=worker,
                    helmet=helmet,
                    vest=vest,
                    boots=boots,
                    is_complete=is_complete,
                    missing_items=missing,
                    warning_type=f"Se quitó {', '.join(missing)}" if missing else None
                )

                status_obj, _ = WorkerEPPStatus.objects.get_or_create(worker=worker)
                if not is_complete:
                    status_obj.total_warnings += 1
                    status_obj.last_status = "Incompleto"
                    status_obj.last_missing_items = missing
                else:
                    status_obj.last_status = "Completo"
                    status_obj.last_missing_items = []
                status_obj.save()

                print(f"[EPP Detectado] Trabajador: {worker.first_name}, Estado: {'Completo' if is_complete else 'Incompleto'}")

            return Response({"message": "Detección finalizada."}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
