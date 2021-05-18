export default function ({
  initiateLoadingRequest,
  loadingRequestStatus,
  idleComponent: Idle,
  pendingComponent: Pending,
  rejectedComponent: Rejected,
  fulfilledComponent: Fulfilled,
}) {
  return loadingRequestStatus === "idle" ? (
    <Idle initiateLoadingRequest={initiateLoadingRequest} />
  ) : loadingRequestStatus === "pending" ? (
    <Pending />
  ) : loadingRequestStatus === "rejected" ? (
    <Rejected initiateLoadingRequest={initiateLoadingRequest} />
  ) : loadingRequestStatus === "fulfilled" ? (
    <Fulfilled />
  ) : (
    "Default"
  );
}
