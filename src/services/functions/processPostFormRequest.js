import validateWithJoi from "./validateWithJoi.js";
import postToApi from "./postToApi.js";

import { setAlert } from "../../components/AlertSystem/services/alertSystemSlice";

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

    if (postErrors) {
      if (postErrors[0].path[0] === "alert")
        dispatch(
          setAlert({ variant: "danger", message: postErrors[0].message })
        );
      else dispatch(setValidationErrors(postErrors));
    }

    return { success: false, errors: postErrors || [] };
  }

  const { payload: postPayload } = postResponse;
  return { success: true, payload: postPayload };
}
