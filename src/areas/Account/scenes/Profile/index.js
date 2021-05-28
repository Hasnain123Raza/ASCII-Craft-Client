import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

import { getProfile, reset } from "./services/accountProfileSlice";
import {
  selectUsername,
  selectGetProfileRequestStatus,
} from "./services/accountProfileSlice/selectors.js";

import GetRequestCard from "../../../../components/GetRequestCard";

export default function () {
  const dispatch = useDispatch();
  const { userId } = useParams();

  const username = useSelector(selectUsername);

  const initiateLoadingRequest = () => dispatch(getProfile(userId));
  const loadingRequestStatus = useSelector(selectGetProfileRequestStatus);

  useEffect(() => {
    initiateLoadingRequest();
    return () => dispatch(reset());
  }, [userId]);

  return (
    <div className="account-profile d-flex flex-column" style={{ flex: 1 }}>
      <GetRequestCard
        initiateLoadingRequest={initiateLoadingRequest}
        loadingRequestStatus={loadingRequestStatus}
        fulfilledComponent={() => (
          <div>
            <h2 style={{ textAlign: "center" }}>{username}</h2>
            <hr />
          </div>
        )}
      />
    </div>
  );
}
