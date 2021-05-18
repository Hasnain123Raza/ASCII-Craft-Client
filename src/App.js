import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";

import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function () {
  return (
    <div className="app d-flex flex-column" style={{ minHeight: "100vh" }}>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
