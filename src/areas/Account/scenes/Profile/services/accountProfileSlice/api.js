export async function getProfileApi(userId) {
  const response = await fetch(`/api/account/profile/${userId}`);
  const data = await response.json();
  return data;
}
