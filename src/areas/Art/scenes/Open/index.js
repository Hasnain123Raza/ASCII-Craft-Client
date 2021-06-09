import GetRequestCard from "../../../../components/GetRequestCard";
import {
  Card,
  ButtonToolbar,
  ButtonGroup,
  Button,
  Badge,
} from "react-bootstrap";
import PostRequestButton from "../../../../components/PostRequestButton";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import useQuery from "../../../../services/hooks/useQuery.js";
import useWindowSize from "../../../../services/hooks/useWindowSize.js";

import {
  getArt,
  getDeleteArt,
  getLikeArt,
  reset,
} from "./services/artOpenSlice";
import {
  selectHasLiked,
  selectCreatorId,
  selectId,
  selectTitle,
  selectDescription,
  selectContent,
  selectLikes,
  selectGetArtRequestStatus,
  selectGetDeleteArtRequestStatus,
  selectGetLikeArtRequestStatus,
} from "./services/artOpenSlice/selectors.js";

import {
  selectIsAuthenticated,
  selectUserId,
} from "../../../../services/authenticatedSlice/selectors.js";

export default function Open() {
  const dispatch = useDispatch();
  const history = useHistory();
  const query = useQuery();
  const { width } = useWindowSize();

  const { artId: queriedArtId } = useParams();

  const hasLiked = useSelector(selectHasLiked);
  const creatorId = useSelector(selectCreatorId);
  const title = useSelector(selectTitle);
  const description = useSelector(selectDescription);
  const content = useSelector(selectContent);
  const likes = useSelector(selectLikes);

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userId = useSelector(selectUserId);
  const isCreator = userId === creatorId;

  const getArtRequestStatus = useSelector(selectGetArtRequestStatus);

  const initiateLoadingRequest = () => dispatch(getArt(queriedArtId));
  const loadingRequestStatus = getArtRequestStatus;

  const initiateDeleteRequest = () => dispatch(getDeleteArt(queriedArtId));
  const deleteRequestStatus = useSelector(selectGetDeleteArtRequestStatus);

  const initiateLikeRequest = () =>
    dispatch(getLikeArt({ artId: queriedArtId, like: !hasLiked }));
  const likeRequestStatus = useSelector(selectGetLikeArtRequestStatus);
  const showLoadingLikeButton = likeRequestStatus === "pending";

  useEffect(() => {
    initiateLoadingRequest();
    return () => dispatch(reset());
  }, []);

  return (
    <div className="art-open d-flex flex-column" style={{ flex: 1 }}>
      <GetRequestCard
        initiateLoadingRequest={initiateLoadingRequest}
        loadingRequestStatus={loadingRequestStatus}
        fulfilledComponent={() => (
          <div style={{ textAlign: "center" }}>
            <h2>{title}</h2>
            <hr />
            {description}
            <Card className="my-2">
              <Card.Body
                style={{ whiteSpace: "pre-line", fontFamily: "monospace" }}
              >
                {content}
              </Card.Body>
            </Card>

            <ButtonToolbar
              className={
                width > 576 ? "mt-3" : "flex-column align-items-center"
              }
              aria-label="controls"
            >
              <ButtonGroup
                className={width > 576 ? "" : "mt-3"}
                aria-label="art"
              >
                <Button
                  variant={showLoadingLikeButton ? "secondary" : "primary"}
                  disabled={showLoadingLikeButton || !isAuthenticated}
                  onClick={initiateLikeRequest}
                >
                  {showLoadingLikeButton ? "Loading..." : "Like"}
                  <Badge
                    className="ml-2"
                    style={{ color: "#000" }}
                    variant="light"
                  >
                    {hasLiked && "+"}
                    {likes}
                  </Badge>
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => navigator.clipboard.writeText(content)}
                >
                  Copy
                </Button>
                {isCreator && (
                  <PostRequestButton
                    idleText="Delete"
                    idleVariant="danger"
                    initiateLoadingRequest={initiateDeleteRequest}
                    loadingRequestStatus={deleteRequestStatus}
                    redirectLink={`/art/browse?${query.toString()}`}
                  />
                )}
              </ButtonGroup>

              <ButtonGroup
                className={width > 576 ? "ml-auto" : "mt-3"}
                aria-label="navigation"
              >
                <Button
                  variant="success"
                  onClick={() =>
                    history.push(
                      `/account/profile/${creatorId}?${query.toString()}`
                    )
                  }
                >
                  Creator
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    history.push(`/art/browse?${query.toString()}`);
                  }}
                >
                  Browse
                </Button>
              </ButtonGroup>
            </ButtonToolbar>
          </div>
        )}
      />
    </div>
  );
}
