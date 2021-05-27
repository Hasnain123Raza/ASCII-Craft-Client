export async function getArtApi(artId) {
  const response = await fetch(`/api/art/open/art/${artId}`);
  const data = await response.json();
  return data;
}

export async function getDeleteArtApi(artId) {
  const response = await fetch(`/api/art/delete/${artId}`);
  const data = await response.json();
  return data;
}
