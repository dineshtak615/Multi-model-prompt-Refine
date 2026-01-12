from app.extractors.text import extract_from_text
from app.extractors.image import extract_from_image
from app.extractors.document import extract_from_document

def extract_input(text: str, file):
    extracted_parts = []

    # ---- TEXT ----
    if text:
        text_part = extract_from_text(text)
        if text_part:
            extracted_parts.append(text_part)

    # ---- FILE ----
    if file:
        print("FILE RECEIVED:", file.filename, file.content_type)

        if file.content_type.startswith("image/"):
            img_text = extract_from_image(file)
            print("OCR TEXT >>>", repr(img_text))
            if img_text:                     # ← IMPORTANT
                extracted_parts.append(img_text)

        elif file.content_type == "application/pdf":
            doc_text = extract_from_document(file)
            if doc_text:
                extracted_parts.append(doc_text)

    # ---- FINAL NORMALIZATION ----
    final_text = "\n".join(extracted_parts).strip()
    print("FINAL EXTRACTED TEXT >>>", repr(final_text))

    return final_text
