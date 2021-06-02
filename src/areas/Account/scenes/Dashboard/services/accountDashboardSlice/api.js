export async function getLogoutApi() {
  const response = await fetch("/api/authentication/logout");

  const data = await response.json();
  return data;
}

export async function getEmailVerificationApi() {
  const response = await fetch("/api/authentication/emailVerification");

  const data = await response.json();
  return data;
}
