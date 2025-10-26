
import os
import sys

# Agregar la ruta al proyecto Django
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.append(BASE_DIR)

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")

import django
django.setup()

import cv2
import torch
from common.qr_utils import detect_qr





# Cargar modelo YOLO (ya descargado previamente por Django)
model = torch.hub.load('ultralytics/yolov5', 'yolov5n', pretrained=True)

# Iniciar la cámara
cap = cv2.VideoCapture(0)

if not cap.isOpened():
    print("❌ ERROR: No se pudo abrir la cámara")
    exit()

print("✅ Cámara iniciada. Presiona 'q' para salir.")

while True:
    ret, frame = cap.read()
    if not ret:
        break

    # Detectar QR
    qr_codes, frame = detect_qr(frame)

    # Detectar objetos YOLO
    results = model(frame)
    detections = results.xyxy[0]  # Objetos detectados

    # Dibujar detecciones
    for *xyxy, conf, cls in detections:
        label = model.names[int(cls)]
        x1, y1, x2, y2 = map(int, xyxy)
        cv2.rectangle(frame, (x1, y1), (x2, y2), (255, 0, 0), 2)
        cv2.putText(frame, label, (x1, y1 - 5),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 0, 0), 2)

    # Mostrar QR detectados en consola
    if qr_codes:
        print("QR detectados:", qr_codes)

    # Mostrar video
    cv2.imshow("Detección EPP + QR - Tiempo Real", frame)

    # Salir con tecla "q"
    if cv2.waitKey(1) & 0xFF == ord("q"):
        break

cap.release()
cv2.destroyAllWindows()
