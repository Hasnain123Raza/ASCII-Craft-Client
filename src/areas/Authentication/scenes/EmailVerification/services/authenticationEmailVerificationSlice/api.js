export async function getEmailVerificationApi(token) {
  const response = await fetch(
    `/api/authentication/emailverification/${token}`
  );

  const data = await response.json();
  return data;
}
