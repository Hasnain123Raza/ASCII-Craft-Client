import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import useQuery from "../../../../services/hooks/useQuery.js";

import {
  reset,
  setUsername,
  setPassword,
  postLoginUser,
} from "./services/authenticationLoginSlice";
import {
  selectUsername,
  selectPassword,
  selectPostLoginUserRequestStatus,
  selectUsernameError,
  selectPasswordError,
} from "./services/authenticationLoginSlice/selectors.js";

import { Form } from "react-bootstrap";
import PostRequestButton from "../../../../components/PostRequestButton";

export default function () {
  const dispatch = useDispatch();
  const location = useLocation();
  const query = useQuery();

  const redirectValue = query.get("redirect");
  const isRedirect = Boolean(redirectValue);
  if (isRedirect) query.delete("redirect");
  const redirectLink = isRedirect ? `${redirectValue}?${query.toString()}` : "";

  const username = useSelector(selectUsername);
  const password = useSelector(selectPassword);

  const usernameError = useSelector(selectUsernameError);
  const passwordError = useSelector(selectPasswordError);

  const initiateLoadingRequest = () =>
    dispatch(postLoginUser({ username, password }));
  const loadingRequestStatus = useSelector(selectPostLoginUserRequestStatus);

  useEffect(() => {
    return () => dispatch(reset());
  }, []);

  return (
    <div
      className="authentication-login d-flex flex-column"
      style={{ flex: 1 }}
    >
      <div>
        <h2 style={{ textAlign: "center" }}>Login</h2>
        <hr />

        <Form>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={username}
              isInvalid={Boolean(usernameError)}
              onChange={(event) => dispatch(setUsername(event.target.value))}
            />
            <Form.Control.Feedback type="invalid">
              {usernameError}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              isInvalid={Boolean(passwordError)}
              onChange={(event) => dispatch(setPassword(event.target.value))}
            />
            <Form.Control.Feedback type="invalid">
              {passwordError}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>

        <div className="d-flex flex-row-reverse">
          <PostRequestButton
            initiateLoadingRequest={initiateLoadingRequest}
            loadingRequestStatus={loadingRequestStatus}
            idleText="Login"
            redirectLink={isRedirect ? redirectLink : "/account/dashboard"}
          />
        </div>
      </div>
    </div>
  );
}
