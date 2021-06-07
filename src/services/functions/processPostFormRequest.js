import validateWithJoi from "./validateWithJoi.js";
import postToApi from "./postToApi.js";

export default async function processPostFormRequest(
  formData,
  formSchema,
  postApi,
  dispatch,
  setValidationErrors
) {
  const { success: validationSuccess, errors: validationErrors } =
    validateWithJoi(formData, formSchema);

  if (!validationSuccess) {
    dispatch(setValidationErrors(validationErrors));
    return { success: false, errors: validationErrors };
  }

  dispatch(setValidationErrors([]));

  const postResponse = await postToApi(formData, postApi);
  const { success: postSuccess } = postResponse;

  if (!postSuccess) {
    const { errors: postErrors } = postResponse;
    if (postResponse) dispatch(setValidationErrors(postErrors));
    return { success: false, errors: postErrors || [] };
  }

  const { payload: postPayload } = postResponse;
  return { success: true, payload: postPayload };
}
