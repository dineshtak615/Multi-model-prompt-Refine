from pydantic import BaseModel
from typing import List, Optional

class RefinedPrompt(BaseModel):
    # Core intent
    intent: str

    # What the system should do
    functional_requirements: List[str]

    # Tech / platform / constraints (only if mentioned)
    technical_constraints: List[str]

    # What the downstream AI is expected to produce
    expected_outputs: List[str]

    # Explicitly listed gaps or ambiguities
    missing_information: List[str]
