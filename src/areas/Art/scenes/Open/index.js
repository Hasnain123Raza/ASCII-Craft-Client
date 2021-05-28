import GetRequestCard from "../../../../components/GetRequestCard";
import { Card, Button } from "react-bootstrap";
import PostRequestButton from "../../../../components/PostRequestButton";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import useQuery from "../../../../services/hooks/useQuery.js";

import { getArt, getDeleteArt, reset } from "./services/artOpenSlice";
import {
  selectCreatorId,
  selectTitle,
  selectDescription,
  selectContent,
  selectGetArtRequestStatus,
  selectGetDeleteArtRequestStatus,
} from "./services/artOpenSlice/selectors.js";

import {
  selectIsAuthenticated,
  selectUserId,
} from "../../../../services/authenticatedSlice/selectors.js";

export default function () {
  const dispatch = useDispatch();
  const history = useHistory();
  const query = useQuery();

  const { artId: queriedArtId } = useParams();

  const creatorId = useSelector(selectCreatorId);
  const title = useSelector(selectTitle);
  const description = useSelector(selectDescription);
  const content = useSelector(selectContent);

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userId = useSelector(selectUserId);
  const isCreator = userId === creatorId;

  const getArtRequestStatus = useSelector(selectGetArtRequestStatus);

  const initiateLoadingRequest = () => dispatch(getArt(queriedArtId));
  const loadingRequestStatus = getArtRequestStatus;

  const initiateDeleteRequest = () => dispatch(getDeleteArt(queriedArtId));
  const deleteRequestStatus = useSelector(selectGetDeleteArtRequestStatus);

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

            <div className="my-4 d-flex">
              <Button
                variant="secondary"
                onClick={() => navigator.clipboard.writeText(content)}
              >
                Copy
              </Button>
              <div className="ml-auto">
                {isCreator && (
                  <PostRequestButton
                    className="mr-2"
                    idleText="Delete"
                    idleButtonVariant="danger"
                    initiateLoadingRequest={initiateDeleteRequest}
                    loadingRequestStatus={deleteRequestStatus}
                    redirectLink={`/art/browse?${query.toString()}`}
                  />
                )}
                <Button
                  variant="primary"
                  onClick={() => {
                    history.push(`/art/browse?${query.toString()}`);
                  }}
                >
                  Back
                </Button>
              </div>
            </div>
          </div>
        )}
      />
    </div>
  );
}
