export async function postRecoverPasswordApi(recoverPasswordEmail) {
  const response = await fetch("/api/authentication/recoverpassword", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recoverPasswordEmail),
  });

  const data = await response.json();
  return data;
}
