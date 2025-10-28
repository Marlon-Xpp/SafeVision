# import cv2
# from ultralytics import YOLO
# import mediapipe as mp
# from common.qr_utils import detect_qr

# # Cargar modelo YOLO (puedes reemplazar por uno entrenado para EPP)
# model = YOLO("apps/modules/epp/models_ia/yolov8s_custom.pt")  # modelo base, luego puedes usar uno personalizado

# mp_pose = mp.solutions.pose
# pose = mp_pose.Pose()

# def detect_epp_and_qr():
#     """
#     Detección en tiempo real de QR + EPP usando YOLO y MediaPipe.
#     Retorna datos del trabajador y EPP detectados.
#     """
#     cap = cv2.VideoCapture(0)

#     while True:
#         ret, frame = cap.read()
#         if not ret:
#             break

#         # --- Detección de QR ---
#         qr_codes, frame = detect_qr(frame)
#         worker_id = qr_codes[0] if qr_codes else None

#         # --- Detección de EPP con YOLO ---
#         results = model(frame, stream=True)
#         epp_detected = {"helmet": False, "vest": False, "boots": False}
#         boxes_to_draw = []
#         person_count = 0  # contador de personas

#         for result in results:
#             for box in result.boxes:
#                 cls = result.names[int(box.cls)]
#                 x1, y1, x2, y2 = map(int, box.xyxy[0])
#                 boxes_to_draw.append((x1, y1, x2, y2, cls))

#                 # contar personas
#                 if "person" in cls.lower():
#                     person_count += 1

#                 # detectar EPP
#                 if "helmet" in cls.lower():
#                     epp_detected["helmet"] = True
#                 elif "vest" in cls.lower():
#                     epp_detected["vest"] = True
#                 elif "boot" in cls.lower() or "shoe" in cls.lower():
#                     epp_detected["boots"] = True

#         # --- Determinar color general según EPP completo o incompleto ---
#         all_ok = all(epp_detected.values())
#         color = (0, 255, 0) if all_ok else (0, 0, 255)  # verde o rojo

#         # Dibujar detecciones individuales
#         for (x1, y1, x2, y2, cls) in boxes_to_draw:
#             cv2.rectangle(frame, (x1, y1), (x2, y2), color, 2)
#             cv2.putText(frame, cls, (x1, y1 - 5),
#                         cv2.FONT_HERSHEY_SIMPLEX, 0.6, color, 2)

#         # --- Detección de postura (opcional) ---
#         frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
#         pose_results = pose.process(frame_rgb)

#         if pose_results.pose_landmarks:
#             mp.solutions.drawing_utils.draw_landmarks(
#                 frame, pose_results.pose_landmarks, mp_pose.POSE_CONNECTIONS
#             )

#         # Mostrar datos en pantalla
#         cv2.putText(frame, f"Trabajador: {worker_id or 'Desconocido'}",
#                     (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255,255,255), 2)
#         cv2.putText(frame,
#                     f"Casco:{'✔' if epp_detected['helmet'] else '✘'} "
#                     f"Chaleco:{'✔' if epp_detected['vest'] else '✘'} "
#                     f"Botas:{'✔' if epp_detected['boots'] else '✘'}",
#                     (10, 60), cv2.FONT_HERSHEY_SIMPLEX, 0.7, color, 2)

#         # Mostrar contador de personas
#         cv2.putText(frame, f"Personas detectadas: {person_count}",
#                     (10, 90), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255,255,0), 2)

#         cv2.imshow("EPP + QR Detection", frame)

#         # Enviar JSON si hay QR detectado
#         if worker_id:
#             yield {
#                 "worker": worker_id,
#                 "helmet": epp_detected["helmet"],
#                 "vest": epp_detected["vest"],
#                 "boots": epp_detected["boots"],
#                 "epp_complete": all_ok,
#                 "person_count": person_count
#             }

#         # Salir con 'q'
#         if cv2.waitKey(1) & 0xFF == ord('q'):
#             break
        
#     cap.release()
#     cv2.destroyAllWindows()