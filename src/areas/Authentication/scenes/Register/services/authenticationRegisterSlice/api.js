export async function postRegisterUserApi(user) {
  const response = await fetch("/api/authentication/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const data = await response.json();
  return data;
}
