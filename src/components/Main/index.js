import { Switch } from "react-router-dom";

import Account from "../../areas/Account";
import Art from "../../areas/Art";
import Authentication from "../../areas/Authentication";

export default function () {
  return (
    <div className="main" style={{ flex: 1 }}>
      <Switch>
        {Account()}
        {Art()}
        {Authentication()}
      </Switch>
    </div>
  );
}
