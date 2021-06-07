import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { reset } from "./services/alertSystemSlice";
import { selectAlert } from "./services/alertSystemSlice/selectors.js";

import { Alert } from "react-bootstrap";

export default function AlertSystem() {
  const dispatch = useDispatch();
  const location = useLocation();

  const alert = useSelector(selectAlert);

  useEffect(() => {
    return () => dispatch(reset());
  }, [location]);

  return (
    <>{Boolean(alert) && <Alert variant={alert.variant}>{alert.text}</Alert>}</>
  );
}
