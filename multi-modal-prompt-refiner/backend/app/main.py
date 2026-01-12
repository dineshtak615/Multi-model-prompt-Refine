from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.refine import router

app = FastAPI(title="Multi-Modal Prompt Refinement System")

# ✅ CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router, prefix="/api")
