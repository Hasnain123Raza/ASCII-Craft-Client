export async function getArtApi(artId) {
  const response = await fetch(`/api/art/open/${artId}`);
  const data = await response.json();
  return data;
}

export async function getDeleteArtApi(artId) {
  const response = await fetch(`/api/art/delete/${artId}`);
  const data = await response.json();
  return data;
}

export async function getLikeArtApi(artId) {
  const response = await fetch(`/api/art/open/like/${artId}`);
  const data = await response.json();
  return data;
}

export async function getUnlikeArtApi(artId) {
  const response = await fetch(`/api/art/open/unlike/${artId}`);
  const data = await response.json();
  return data;
}
