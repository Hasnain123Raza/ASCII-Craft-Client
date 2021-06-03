import { useEffect } from "react";
import { useDispatch } from "react-redux";
import getInitiateLoadingRequest from "./services/loader/getInitiateLoadingRequest.js";

import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";

import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  const dispatch = useDispatch();

  const initiateLoadingRequest = getInitiateLoadingRequest(dispatch);

  useEffect(() => initiateLoadingRequest());

  return (
    <div className="app d-flex flex-column" style={{ minHeight: "100vh" }}>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
