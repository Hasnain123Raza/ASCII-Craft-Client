export async function postLoginUserApi(userAndRecaptchaToken) {
  const response = await fetch("/api/authentication/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userAndRecaptchaToken),
  });

  const data = await response.json();
  return data;
}
