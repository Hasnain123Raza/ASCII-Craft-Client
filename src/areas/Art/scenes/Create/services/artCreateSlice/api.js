export async function postCreateArtApi(art) {
  const response = await fetch("/api/art/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(art),
  });

  const data = await response.json();

  return data;
}
