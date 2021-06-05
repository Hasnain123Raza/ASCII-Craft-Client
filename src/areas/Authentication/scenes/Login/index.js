import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useQuery from "../../../../services/hooks/useQuery.js";

import {
  reset,
  setEmail,
  setPassword,
  setRecaptchaToken,
  postLoginUser,
} from "./services/authenticationLoginSlice";
import {
  selectEmail,
  selectPassword,
  selectRecaptchaToken,
  selectPostLoginUserRequestStatus,
  selectEmailError,
  selectPasswordError,
  selectRecaptchaTokenError,
} from "./services/authenticationLoginSlice/selectors.js";

import { SITE_KEY } from "../../../../services/constants.js";

import { LinkContainer } from "react-router-bootstrap";
import { Form } from "react-bootstrap";
import PostRequestButton from "../../../../components/PostRequestButton";
import ReCAPTCHA from "react-google-recaptcha";

export default function Login() {
  const dispatch = useDispatch();
  const query = useQuery();

  const redirectValue = query.get("redirect");
  const isRedirect = Boolean(redirectValue);
  if (isRedirect) query.delete("redirect");
  const redirectLink = isRedirect ? `${redirectValue}?${query.toString()}` : "";

  const email = useSelector(selectEmail);
  const password = useSelector(selectPassword);
  const recaptchaToken = useSelector(selectRecaptchaToken);

  const emailError = useSelector(selectEmailError);
  const passwordError = useSelector(selectPasswordError);
  const recaptchaTokenError = useSelector(selectRecaptchaTokenError);

  const initiateLoadingRequest = () =>
    dispatch(postLoginUser({ user: { email, password }, recaptchaToken }));
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
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              isInvalid={Boolean(emailError)}
              onChange={(event) => dispatch(setEmail(event.target.value))}
            />
            <Form.Control.Feedback type="invalid">
              {emailError}
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
            <LinkContainer to="/authentication/recoverpassword">
              <a className="text-muted text-decoration-none">
                <Form.Text>Forgot Password?</Form.Text>
              </a>
            </LinkContainer>
          </Form.Group>
        </Form>

        <ReCAPTCHA
          sitekey={SITE_KEY}
          onChange={(tokenValue) => dispatch(setRecaptchaToken(tokenValue))}
        />

        <div className="invalid-feedback" style={{ display: "block" }}>
          {recaptchaTokenError}
        </div>

        <div className="mt-3 d-flex">
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
