import { Button } from "react-bootstrap";
import Resource from "../Resource";

function InitiateLoadingRequestButton({
  className,
  initiateLoadingRequest,
  text,
  variant,
}) {
  return (
    <Button
      className={className}
      variant={variant}
      onClick={initiateLoadingRequest}
    >
      {text}
    </Button>
  );
}

function LoadingButton({ className }) {
  return (
    <Button className={className} variant="secondary" disabled>
      Loading...
    </Button>
  );
}

export default function RepeatedPostRequestButton({
  className,
  initiateLoadingRequest,
  loadingRequestStatus,
  idleText,
  idleVariant = "success",
  hideRetry = true,
}) {
  return (
    <Resource
      initiateLoadingRequest={initiateLoadingRequest}
      loadingRequestStatus={loadingRequestStatus}
      idleComponent={() => (
        <InitiateLoadingRequestButton
          className={className}
          initiateLoadingRequest={initiateLoadingRequest}
          text={idleText}
          variant={idleVariant}
        />
      )}
      pendingComponent={() => <LoadingButton className={className} />}
      rejectedComponent={() =>
        hideRetry ? (
          <InitiateLoadingRequestButton
            className={className}
            initiateLoadingRequest={initiateLoadingRequest}
            text={idleText}
            variant={idleVariant}
          />
        ) : (
          <InitiateLoadingRequestButton
            className={className}
            initiateLoadingRequest={initiateLoadingRequest}
            text="Retry"
            variant="danger"
          />
        )
      }
      fulfilledComponent={() => (
        <InitiateLoadingRequestButton
          className={className}
          initiateLoadingRequest={initiateLoadingRequest}
          text={idleText}
          variant={idleVariant}
        />
      )}
    />
  );
}
