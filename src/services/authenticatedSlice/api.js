export async function getAuthenticatedApi() {
  const response = await fetch("/api/authentication/authenticated");

  const data = await response.json();
  return data;
}
