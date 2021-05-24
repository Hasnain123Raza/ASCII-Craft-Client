import { useHistory } from "react-router-dom";
import useQuery from "../../../../services/hooks/useQuery";

import { Card, Button } from "react-bootstrap";

export default function (props) {
  const history = useHistory();
  const query = useQuery();

  const { _id, title, description } = props.simplifiedArt;

  return (
    <Card className="h-100">
      <Card.Body style={{ textAlign: "center" }}>
        <h5>{title}</h5>
        <hr />
        {description}
      </Card.Body>
      <Card.Footer>
        <Button
          className="w-100"
          variant="success"
          onClick={() => {
            query.set("artId", _id);
            history.push("/art/open?" + query.toString());
          }}
        >
          Open
        </Button>
      </Card.Footer>
    </Card>
  );
}
