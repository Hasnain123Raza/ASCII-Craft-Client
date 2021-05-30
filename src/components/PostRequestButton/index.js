import { Redirect } from "react-router-dom";
import Resource from "../Resource";

import PostButton from "./components/PostButton";
import LoadingButton from "./components/LoadingButton";
import RetryButton from "./components/RetryButton";

export default function PostRequestButton({
  className,
  initiateLoadingRequest,
  loadingRequestStatus,
  idleText,
  idleButtonVariant = "success",
  redirectLink,
}) {
  return (
    <Resource
      initiateLoadingRequest={initiateLoadingRequest}
      loadingRequestStatus={loadingRequestStatus}
      idleComponent={() => (
        <PostButton
          className={className}
          initiateLoadingRequest={initiateLoadingRequest}
          text={idleText}
          buttonVariant={idleButtonVariant}
        />
      )}
      pendingComponent={() => <LoadingButton className={className} />}
      rejectedComponent={() => (
        <RetryButton
          className={className}
          initiateLoadingRequest={initiateLoadingRequest}
        />
      )}
      fulfilledComponent={() => <Redirect exact to={redirectLink} />}
    />
  );
}
