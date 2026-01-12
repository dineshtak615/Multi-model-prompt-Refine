export async function refinePrompt(formData) {
  const response = await fetch("http://localhost:8000/api/refine", {
    method: "POST",
    body: formData
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.detail || "Backend error");
  }

  return response.json();
}
