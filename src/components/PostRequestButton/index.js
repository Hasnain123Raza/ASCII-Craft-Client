import { Redirect } from "react-router-dom";
import Resource from "../Resource";

import PostButton from "./components/PostButton";
import LoadingButton from "./components/LoadingButton";
import RetryButton from "./components/RetryButton";

export default function ({
  className,
  initiateLoadingRequest,
  loadingRequestStatus,
  idleText,
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
