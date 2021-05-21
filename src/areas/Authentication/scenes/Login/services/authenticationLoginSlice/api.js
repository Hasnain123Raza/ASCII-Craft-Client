export async function postLoginUserApi(user) {
  const response = await fetch("/api/authentication/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const data = await response.json();
  return data;
}
