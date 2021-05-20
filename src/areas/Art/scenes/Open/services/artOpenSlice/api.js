export async function getArtApi(artId) {
  const response = await fetch(`/api/art/open/art/${artId}`);
  const data = await response.json();
  return data;
}
