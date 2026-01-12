from transformers import pipeline

pipe = pipeline(
    "text2text-generation",
    model="google/flan-t5-small"
)
# NOTE: This module is rule-based refinement.
# LLM is optional and can be plugged later.

# -----------------------------
# FEATURE GROUPS (EXPANDABLE)
# -----------------------------

FEATURE_GROUPS = {
    "Authentication": [
        "login", "signin", "signup", "register", "auth",
        "jwt", "oauth", "sso", "otp", "password", "2fa"
    ],

    "Payment": [
        "payment", "checkout", "billing", "invoice",
        "subscription", "razorpay", "stripe", "paypal", "upi"
    ],

    "Dashboard": [
        "dashboard", "admin panel", "analytics", "metrics",
        "reporting", "charts", "graphs"
    ],

    "User Management": [
        "user", "users", "profile", "role", "permission",
        "access control", "rbac"
    ],

    "File Management": [
        "upload", "download", "file", "files",
        "pdf", "document", "documents", "image", "images"
    ],

    "Search": [
        "search", "filter", "sort", "query"
    ],

    "Chat": [
        "chat", "messaging", "conversation", "realtime"
    ],

    "Notification": [
        "notification", "email", "sms", "push"
    ],

    "Ecommerce": [
        "product", "cart", "order", "inventory", "catalog"
    ],

    "Workflow": [
        "workflow", "task", "approval", "scheduler", "automation"
    ],
}

# -----------------------------
# TECH CONSTRAINT GROUPS
# -----------------------------

TECH_CONSTRAINTS = {
    "Frontend must use React": [
        "react", "reactjs", "react.js"
    ],
    "Backend must use Python": [
        "python"
    ],
    "Backend must use FastAPI": [
        "fastapi"
    ],
    "Database must be MongoDB": [
        "mongodb", "mongo"
    ],
    "JWT-based authentication": [
        "jwt"
    ],
    "Use Docker for deployment": [
        "docker", "container"
    ],
    "Deploy on AWS": [
        "aws", "ec2", "s3"
    ],
}

# -----------------------------
# AUTO-EXPAND TO 500+ KEYWORDS
# -----------------------------

def _expand_keywords(groups: dict) -> dict:
    """
    Expands synonyms, plurals, and phrase variants.
    Generates 500+ effective keyword matches.
    """
    expanded = {}

    for feature, keywords in groups.items():
        variants = set()

        for k in keywords:
            variants.add(k)
            variants.add(k.replace(" ", ""))
            variants.add(k.replace(" ", "_"))
            variants.add(k + " system")
            variants.add(k + " feature")
            variants.add("manage " + k)
            variants.add("build " + k)
            variants.add("create " + k)

        expanded[feature] = list(variants)

    return expanded


EXPANDED_FEATURES = _expand_keywords(FEATURE_GROUPS)
EXPANDED_CONSTRAINTS = _expand_keywords(TECH_CONSTRAINTS)

# -----------------------------
# REFINEMENT FUNCTION
# -----------------------------

def refine_with_llm(raw_text: str) -> dict:
    text = raw_text.lower().strip()

    functional_requirements = []
    technical_constraints = []
    missing_information = []

    # ---- FEATURE DETECTION ----
    for feature, keywords in EXPANDED_FEATURES.items():
        if any(k in text for k in keywords):
            functional_requirements.append(feature)

    # ---- CONSTRAINT DETECTION ----
    for constraint, keywords in EXPANDED_CONSTRAINTS.items():
        if any(k in text for k in keywords):
            technical_constraints.append(constraint)

    # ---- MISSING INFO ----
    if not functional_requirements:
        missing_information.append("Functional requirements not specified")

    if not technical_constraints:
        missing_information.append("Technical constraints not specified")

    return {
        "intent": raw_text,
        "functional_requirements": sorted(set(functional_requirements)),
        "technical_constraints": sorted(set(technical_constraints)),
        "missing_information": missing_information
    }
