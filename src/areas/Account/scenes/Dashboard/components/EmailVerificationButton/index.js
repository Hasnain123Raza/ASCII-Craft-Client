import Resource from "../../../../../../components/Resource";
import { Button } from "react-bootstrap";

function InitiateLoadingRequestButton({ className, initiateLoadingRequest }) {
  return (
    <Button
      className={className}
      onClick={initiateLoadingRequest}
      variant="success"
    >
      Send Email Verification
    </Button>
  );
}

export default function EmailVerificationButton({
  className,
  initiateLoadingRequest,
  loadingRequestStatus,
}) {
  return (
    <Resource
      initiateLoadingRequest={initiateLoadingRequest}
      loadingRequestStatus={loadingRequestStatus}
      idleComponent={() => (
        <InitiateLoadingRequestButton
          className={className}
          initiateLoadingRequest={initiateLoadingRequest}
        />
      )}
      pendingComponent={() => (
        <Button className={className} variant="secondary">
          Loading...
        </Button>
      )}
      rejectedComponent={() => (
        <InitiateLoadingRequestButton
          className={className}
          initiateLoadingRequest={initiateLoadingRequest}
        />
      )}
      fulfilledComponent={() => (
        <InitiateLoadingRequestButton
          className={className}
          initiateLoadingRequest={initiateLoadingRequest}
        />
      )}
    />
  );
}
