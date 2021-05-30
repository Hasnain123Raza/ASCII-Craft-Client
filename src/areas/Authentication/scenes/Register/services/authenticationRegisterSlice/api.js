export async function postRegisterUserApi(userAndRecaptchaToken) {
  const response = await fetch("/api/authentication/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userAndRecaptchaToken),
  });

  const data = await response.json();
  return data;
}
