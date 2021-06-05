export async function postNewPasswordApi(newPasswordAndToken) {
  const response = await fetch("/api/authentication/newpassword", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPasswordAndToken),
  });

  const data = await response.json();
  return data;
}
