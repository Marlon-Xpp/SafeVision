# common/qr_utils.py
import cv2

def detect_qr(frame):
    """
    Detecta y devuelve los códigos QR encontrados en el frame usando OpenCV.
    Retorna una lista de códigos detectados y el frame con visualización opcional.
    """
    detected_codes = []
    qr_detector = cv2.QRCodeDetector()

    # Detectar y decodificar múltiples QR
    retval, decoded_info, points, _ = qr_detector.detectAndDecodeMulti(frame)

    if retval:
        for i, data in enumerate(decoded_info):
            if data:
                detected_codes.append(data)

                # Dibujar el contorno del QR
                pts = points[i].astype(int)
                for j in range(4):
                    cv2.line(frame, tuple(pts[j]), tuple(pts[(j + 1) % 4]), (0, 255, 0), 2)

                # Dibujar el texto del código QR
                cv2.putText(frame, data, tuple(pts[0]),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 0), 2)

    return detected_codes, frame
