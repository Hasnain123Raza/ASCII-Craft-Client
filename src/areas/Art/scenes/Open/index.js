import GetRequestCard from "../../../../components/GetRequestCard";
import { Card, Button } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import useQuery from "../../../../services/hooks/useQuery.js";

import { getArt, reset } from "./services/artOpenSlice";
import {
  selectTitle,
  selectDescription,
  selectContent,
  selectGetArtRequestStatus,
} from "./services/artOpenSlice/selectors.js";

export default function () {
  const dispatch = useDispatch();
  const history = useHistory();
  const query = useQuery();

  const queriedArtId = query.get("artId");

  const title = useSelector(selectTitle);
  const description = useSelector(selectDescription);
  const content = useSelector(selectContent);

  const getArtRequestStatus = useSelector(selectGetArtRequestStatus);

  const initiateLoadingRequest = () => dispatch(getArt(queriedArtId));
  const loadingRequestStatus = getArtRequestStatus;

  useEffect(() => {
    dispatch(reset());
    initiateLoadingRequest();
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
              <Card.Body style={{ whiteSpace: "pre-line" }}>
                {content}
              </Card.Body>
            </Card>

            <div className="my-4 d-flex">
              <Button
                variant="primary"
                onClick={() => {
                  query.delete("artId");
                  history.push("/art/browse?" + query.toString());
                }}
              >
                Back
              </Button>
            </div>
          </div>
        )}
      />
    </div>
  );
}
