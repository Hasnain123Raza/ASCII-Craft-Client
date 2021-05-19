import { Switch } from "react-router-dom";
import { Container } from "react-bootstrap";

import Account from "../../areas/Account";
import Art from "../../areas/Art";
import Authentication from "../../areas/Authentication";

export default function () {
  return (
    <div className="main d-flex flex-column" style={{ flex: 1 }}>
      <Container className="mt-3 d-flex flex-column" style={{ flex: 1 }}>
        <Switch>
          {Account()}
          {Art()}
          {Authentication()}
        </Switch>
      </Container>
    </div>
  );
}
