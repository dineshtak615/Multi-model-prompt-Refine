from fastapi import HTTPException

# -----------------------------
# CORE ACTION VERBS
# -----------------------------
ACTIONS = [
    "build", "create", "develop", "design", "implement", "generate",
    "construct", "produce", "engineer", "setup", "configure", "deploy",
    "manage", "maintain", "upgrade", "optimize", "automate", "monitor",
    "analyze", "integrate", "customize", "scale", "secure", "test",
    "refactor", "migrate", "convert", "orchestrate", "provision"
]

# -----------------------------
# SYSTEM / PRODUCT NOUNS
# -----------------------------
SYSTEMS = [
    "system", "app", "application", "platform", "software", "tool",
    "service", "solution", "product", "portal", "dashboard", "panel",
    "website", "api", "backend", "frontend", "server", "client",
    "microservice", "module", "component", "pipeline", "workflow",
    "engine", "framework", "infrastructure", "architecture"
]

# -----------------------------
# DOMAIN FEATURES
# -----------------------------
FEATURES = [
    "authentication", "authorization", "login", "signup", "user",
    "admin", "role", "permission", "profile",
    "payment", "billing", "invoice", "subscription", "checkout",
    "upload", "download", "file", "document", "pdf", "image", "video",
    "chat", "message", "notification", "email", "sms",
    "search", "filter", "sort", "report", "analytics", "tracking",
    "order", "product", "inventory", "cart",
    "workflow", "task", "scheduler", "approval",
    "integration", "webhook", "api",
    "security", "encryption", "audit", "logging", "monitoring"
]

# -----------------------------
# QUALIFIERS / CONTEXT WORDS
# -----------------------------
QUALIFIERS = [
    "management", "management system",
    "automation", "automation system",
    "platform", "service",
    "solution", "tool",
    "dashboard", "portal",
    "engine", "pipeline",
    "framework", "architecture",
    "infrastructure", "backend", "frontend"
]

# -----------------------------
# GENERATE 500+ KEYWORDS
# -----------------------------
SYSTEM_KEYWORDS = set()

# 1. Single words
SYSTEM_KEYWORDS.update(ACTIONS)
SYSTEM_KEYWORDS.update(SYSTEMS)
SYSTEM_KEYWORDS.update(FEATURES)

# 2. Action + System (e.g., "build dashboard")
for a in ACTIONS:
    for s in SYSTEMS:
        SYSTEM_KEYWORDS.add(f"{a} {s}")

# 3. Feature-based systems (e.g., "authentication system")
for f in FEATURES:
    SYSTEM_KEYWORDS.add(f"{f} system")
    SYSTEM_KEYWORDS.add(f"{f} platform")
    SYSTEM_KEYWORDS.add(f"{f} service")

# 4. Feature + qualifier (e.g., "payment management system")
for f in FEATURES:
    for q in QUALIFIERS:
        SYSTEM_KEYWORDS.add(f"{f} {q}")

# Convert to list for usage
SYSTEM_KEYWORDS = list(SYSTEM_KEYWORDS)

# -----------------------------
# REJECTION LOGIC
# -----------------------------
def reject_if_invalid(extracted_text: str):
    text = extracted_text.lower().strip()

    if not text:
        raise HTTPException(
            status_code=400,
            detail="Rejected: No usable content extracted from input"
        )

    if not any(keyword in text for keyword in SYSTEM_KEYWORDS):
        raise HTTPException(
            status_code=400,
            detail="Rejected: Input is not a system or task-oriented prompt"
        )
