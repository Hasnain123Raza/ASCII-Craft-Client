export default async function postToApi(data, postApi) {
  const response = await postApi(data);

  const success = response.success;
  const payload = success && response.payload;
  const errors = !success && response.errors;

  if (success) return { success, payload };
  else return { success, errors };
}
