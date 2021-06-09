import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import useQuery from "../../../../services/hooks/useQuery.js";

import { getProfile, reset } from "./services/accountProfileSlice";
import {
  selectUsername,
  selectTotalArtsCreated,
  selectCreatedArts,
  selectTotalArtsLiked,
  selectLikedArts,
  selectGetProfileRequestStatus,
} from "./services/accountProfileSlice/selectors.js";

import GetRequestCard from "../../../../components/GetRequestCard";
import ArtHighlights from "./components/ArtHighlights";

export default function Profile() {
  const dispatch = useDispatch();
  const { userId } = useParams();

  const username = useSelector(selectUsername);
  const totalArtsCreated = useSelector(selectTotalArtsCreated);
  const createdArts = useSelector(selectCreatedArts);
  const createdArtsQuery = useQuery();
  createdArtsQuery.set("createdByUserId", userId);
  const browseCreatedArtsLink = `/art/browse?${createdArtsQuery.toString()}`;

  const totalArtsLiked = useSelector(selectTotalArtsLiked);
  const likedArts = useSelector(selectLikedArts);
  const likedArtsQuery = useQuery();
  likedArtsQuery.set("likedByUserId", userId);
  const browseLikedArtsLink = `/art/browse?${likedArtsQuery.toString()}`;

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

            <h2>Creations</h2>
            <ArtHighlights
              highlightArts={createdArts}
              totalArts={totalArtsCreated}
              browseLink={browseCreatedArtsLink}
            />
            <br />
            <h2>Liked</h2>
            <ArtHighlights
              highlightArts={likedArts}
              totalArts={totalArtsLiked}
              browseLink={browseLikedArtsLink}
            />
          </div>
        )}
      />
    </div>
  );
}
