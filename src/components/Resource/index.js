export default function ({
  initiateLoadingRequest,
  loadingRequestStatus,
  pendingComponent: Pending,
  rejectedComponent: Rejected,
  fulfilledComponent: Fulfilled,
}) {
  return loadingRequestStatus == "pending" ? (
    <Pending />
  ) : loadingRequestStatus == "rejected" ? (
    <Rejected initiateLoadingRequest={initiateLoadingRequest} />
  ) : loadingRequestStatus == "fulfilled" ? (
    <Fulfilled />
  ) : (
    "Default"
  );
}
