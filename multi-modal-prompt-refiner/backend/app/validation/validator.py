from app.schema.refined_prompt import RefinedPrompt

# -----------------------------
# FUNCTIONAL FEATURES
# -----------------------------
SYSTEM_FEATURES = {
    "dashboard": "Dashboard",
    "admin": "Admin panel",
    "login": "Authentication",
    "signup": "Authentication",
    "auth": "Authentication",
    "payment": "Payment processing",
    "upload": "File upload",
    "search": "Search functionality",
    "chat": "Chat system",
    "report": "Reporting & analytics",
}

# -----------------------------
# TECHNICAL CONSTRAINTS
# -----------------------------
TECH_FEATURES = {
    "react": "Frontend must use React",
    "fastapi": "Backend must use FastAPI",
    "python": "Backend must use Python",
    "mongodb": "Database must be MongoDB",
    "jwt": "JWT-based authentication",
    "docker": "Containerization using Docker",
    "aws": "Deployment on AWS",
}

# -----------------------------
# REFINEMENT LOGIC
# -----------------------------
def build_refined_prompt(data: dict) -> RefinedPrompt:
    raw_text = data.get("raw_text", "").strip()
    text = raw_text.lower()

    # 1. Intent
    intent = raw_text

    # 2. Functional requirements
    functional_requirements = [
        value for key, value in SYSTEM_FEATURES.items()
        if key in text
    ]

    # 3. Technical constraints
    technical_constraints = [
        value for key, value in TECH_FEATURES.items()
        if key in text
    ]

    # 4. Expected outputs
    expected_outputs = []
    if any(word in text for word in ["build", "create", "develop", "design"]):
        expected_outputs.append("System implementation")

    # 5. Missing information
    missing_information = []

    if not functional_requirements:
        missing_information.append("Functional requirements not specified")

    if not technical_constraints:
        missing_information.append("Technical constraints not specified")

    if not expected_outputs:
        missing_information.append("Expected outputs not specified")

    return RefinedPrompt(
        intent=intent,
        functional_requirements=functional_requirements,
        technical_constraints=technical_constraints,
        expected_outputs=expected_outputs,
        missing_information=missing_information
    )
