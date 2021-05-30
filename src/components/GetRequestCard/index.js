import Resource from "../Resource";
import PendingCard from "./components/PendingCard";
import RejectedCard from "./components/RejectedCard";

export default function GetRequestCard({
  initiateLoadingRequest,
  loadingRequestStatus,
  fulfilledComponent,
}) {
  return (
    <Resource
      initiateLoadingRequest={initiateLoadingRequest}
      loadingRequestStatus={loadingRequestStatus}
      idleComponent={PendingCard}
      pendingComponent={PendingCard}
      rejectedComponent={RejectedCard}
      fulfilledComponent={fulfilledComponent}
    />
  );
}
