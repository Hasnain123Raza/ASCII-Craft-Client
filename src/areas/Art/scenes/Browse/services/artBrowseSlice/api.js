export async function getArtCountApi(selectors) {
  const response = await fetch("/api/art/browse/artCount", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ selectors }),
  });

  const data = await response.json();
  return data;
}

export async function getSimplifiedArtsApi(pageOffset, pageSize, selectors) {
  const response = await fetch(
    `/api/art/browse/simplifiedArts/${pageOffset}/${pageSize}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ selectors }),
    }
  );

  const data = await response.json();
  return data;
}
