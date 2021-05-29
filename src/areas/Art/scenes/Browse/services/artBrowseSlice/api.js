export async function getArtCountApi(userId) {
  const urlSearchParams = new URLSearchParams();
  if (Boolean(userId)) urlSearchParams.set("userId", userId);

  const response = await fetch(
    `/api/art/browse/artCount?${urlSearchParams.toString()}`
  );
  const data = await response.json();
  return data;
}

export async function getSimplifiedArtsApi(pageOffset, pageSize, userId) {
  const urlSearchParams = new URLSearchParams();
  if (Boolean(userId)) urlSearchParams.set("userId", userId);

  const response = await fetch(
    `/api/art/browse/simplifiedArts/${pageOffset}/${pageSize}?${urlSearchParams.toString()}`
  );
  const data = await response.json();
  return data;
}
