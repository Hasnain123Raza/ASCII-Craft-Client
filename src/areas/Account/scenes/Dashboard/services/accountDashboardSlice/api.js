export async function getLogoutApi() {
  const response = await fetch("/api/authentication/logout");

  const data = await response.json();
  return data;
}
