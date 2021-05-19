export async function getArtCountApi() {
  const response = await fetch("/api/art/browse/artCount");
  const data = await response.json();
  return data;
}

export async function getSimplifiedArtsApi(pageOffset, pageSize) {
  const response = await fetch(
    `/api/art/browse/simplifiedArts/${pageOffset}/${pageSize}`
  );
  const data = await response.json();
  return data;
}
