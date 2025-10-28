# def process_epp_detection(data):
#     """
#     data = {
#         "worker": "Luis Castro",
#         "helmet": True,
#         "vest": False,
#         "boots": True
#     }
#     """
#     missing = [item for item, ok in data.items() if item in ["helmet","vest","boots"] and not ok]
#     status = "Completo" if not missing else "Incompleto"
#     warning = None
#     if missing:
#         warning = f"Se quitó {', '.join(missing)}"

#     result = {
#         "worker": data["worker"],
#         "status": status,
#         "missing_items": missing,
#         "warning": warning,
#     }

#     return result
