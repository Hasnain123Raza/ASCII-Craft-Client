import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { useEffect } from "react";
import useQuery from "../../../../services/hooks/useQuery.js";

import { getProfile, reset } from "./services/accountProfileSlice";
import {
  selectUsername,
  selectRecentSimplifiedArts,
  selectTotalArtsCreated,
  selectGetProfileRequestStatus,
} from "./services/accountProfileSlice/selectors.js";

import { Card, Button, Container, Row, Col } from "react-bootstrap";
import GetRequestCard from "../../../../components/GetRequestCard";
import ArtCard from "../../../../components/ArtCard";

export default function () {
  const dispatch = useDispatch();
  const history = useHistory();
  const query = useQuery();
  const { userId } = useParams();

  const username = useSelector(selectUsername);
  const recentSimplifiedArts = useSelector(selectRecentSimplifiedArts);
  const totalArtsCreated = useSelector(selectTotalArtsCreated);

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
            <Card>
              <Card.Body>
                <Container>
                  <Row>
                    {totalArtsCreated > 0 ? (
                      recentSimplifiedArts.map(
                        (simplifiedArt, simplifiedArtIndex) => (
                          <Col key={simplifiedArtIndex} md={4}>
                            <ArtCard simplifiedArt={simplifiedArt} />
                          </Col>
                        )
                      )
                    ) : (
                      <Col>
                        <h2
                          className="text-muted"
                          style={{ textAlign: "center" }}
                        >
                          Uh oh... There are no arts
                        </h2>
                      </Col>
                    )}
                  </Row>
                </Container>
              </Card.Body>
            </Card>

            {totalArtsCreated > 0 &&
              (totalArtsCreated <= 3 ? (
                <div className="d-flex mt-2">
                  Total Arts: {totalArtsCreated}
                </div>
              ) : (
                <div className="d-flex mt-2">
                  Total Arts: {totalArtsCreated}
                  <Button
                    className="ml-auto"
                    variant="success"
                    onClick={() => {
                      query.set("userId", userId);
                      history.push(`/art/browse?${query.toString()}`);
                    }}
                  >
                    Browse All
                  </Button>
                </div>
              ))}
          </div>
        )}
      />
    </div>
  );
}
