import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { loadResources } from "../../services/loaderSlice";
import { selectLoadResourcesRequestStatus } from "../../services/loaderSlice/selectors.js";

import { Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import GetRequestCard from "../GetRequestCard";

import Account from "../../areas/Account";
import Art from "../../areas/Art";
import Authentication from "../../areas/Authentication";

export default function Main() {
  const dispatch = useDispatch();

  const initiateLoadingRequest = () => dispatch(loadResources());
  const loadingRequestStatus = useSelector(selectLoadResourcesRequestStatus);

  useEffect(() => {
    initiateLoadingRequest();
  }, []);

  return (
    <div className="main d-flex flex-column" style={{ flex: 1 }}>
      <Container className="my-3 d-flex flex-column" style={{ flex: 1 }}>
        <GetRequestCard
          initiateLoadingRequest={initiateLoadingRequest}
          loadingRequestStatus={loadingRequestStatus}
          fulfilledComponent={() => (
            <Switch>
              {Account()}
              {Art()}
              {Authentication()}
            </Switch>
          )}
        />
      </Container>
    </div>
  );
}
