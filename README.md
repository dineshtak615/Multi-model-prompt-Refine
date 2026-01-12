Multi-Modal Prompt Refinement System
Overview

The Multi-Modal Prompt Refinement System is an AI-ready backend service that accepts heterogeneous user inputs—including raw text, images, and PDF documents—and converts them into a single, clean, structured prompt optimized for downstream AI/LLM processing.

Rather than treating OCR, PDF parsing, and prompt creation as isolated features, the system processes all modalities through one unified refinement pipeline, ensuring consistency, scalability, and production readiness.

Key Features

Single API endpoint for text, image, and PDF inputs

OCR extraction from images

Text extraction from PDF documents

Unified content normalization and merging

Structured, AI-ready prompt output (JSON)

Built with FastAPI for performance and scalability

Clean React frontend for uploads and result viewing

Compatible with free-tier cloud hosting

System Architecture
Frontend (React)
   |
   | multipart/form-data
   v
FastAPI Backend
   ├── Text input
   ├── Image → OCR
   ├── PDF → Text extraction
   └── Unified refinement pipeline
          ↓
   Structured Prompt Output (JSON)

Tech Stack
Backend

FastAPI

Python

OCR (Tesseract)

PDF parsing (PyMuPDF)

Async request handling

Frontend

React

Vite

Fetch API

FormData uploads

Deployment

Backend: Cloud-hosted (free tier compatible)

Frontend: Static hosting

CORS-enabled API communication

API Design
Endpoint
POST /api/refine

Request (multipart/form-data)
Field	Type	Required
text	string	optional
image	file	optional
pdf	file	optional

At least one input is required.

Response Example
{
  "task": "Summarize the provided content",
  "merged_input": "...",
  "constraints": ["clear", "concise"],
  "refined_prompt": "..."
}

Project Structure
backend/
 ├── main.py
 ├── app/
 │   └── api/
 │       └── refine.py
 ├── requirements.txt

frontend/
 ├── src/
 │   ├── components/
 │   ├── App.jsx
 │   └── main.jsx

Local Development
Backend

Install dependencies:

pip install -r requirements.txt


Run FastAPI (development mode):

uvicorn main:app --reload


Access API docs:

http://127.0.0.1:8000/docs

Frontend
npm install
npm run dev

Backend Run Commands
Development
uvicorn main:app --reload

Production (Cloud / Koyeb)
uvicorn main:app --host 0.0.0.0 --port 8000

Design Principles

Single pipeline, not multiple endpoints

Normalize before validating

Model-agnostic prompt output

Clear separation of frontend and backend

Cloud-deployable with free resources

Use Cases

Chat with PDFs

OCR-based prompt generation

AI document analysis

Prompt optimization tools

AI productivity platforms

Future Enhancements

LLM integration (local or cloud)

Prompt quality scoring

Chunking for large documents

User authentication

Prompt history and versioning

One-Line Summary

A FastAPI-based multi-modal system that refines text, image, and PDF inputs into structured, AI-ready prompts through a unified processing pipeline.
