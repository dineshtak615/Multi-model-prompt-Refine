from fastapi import APIRouter, UploadFile, Form
from app.extractors.dispatcher import extract_input
from app.rejection.rules import reject_if_invalid
from app.validation.validator import build_refined_prompt

router = APIRouter()

@router.post("/refine")
async def refine_prompt(
    text: str = Form(""),
    file: UploadFile | None = None
):
    # 1. Extract from ALL modalities first
    extracted_text = extract_input(text, file)

    # 2. Reject AFTER extraction (works for text/image/pdf)
    reject_if_invalid(extracted_text)

    # 3. Build structured output
    refined = build_refined_prompt({
        "raw_text": extracted_text
    })

    return refined
