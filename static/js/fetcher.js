export async function classifyEmail(formData) {
  const response = await fetch("/classify", {
    method: "POST",
    body: formData
  });

  const data = await response.json();

  if (response.ok) return data;

  throw new Error(data.error || "Erro ao classificar email.");
}
