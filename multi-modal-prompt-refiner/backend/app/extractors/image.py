from PIL import Image
import pytesseract
from fastapi import UploadFile

# 🔴 Explicitly set Tesseract path (Windows)
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

def extract_from_image(file: UploadFile) -> str:
    try:
        image = Image.open(file.file)
        text = pytesseract.image_to_string(image)
        return text.strip()
    except Exception as e:
        print("IMAGE OCR ERROR:", e)
        return ""
