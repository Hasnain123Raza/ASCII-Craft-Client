import { useHistory } from "react-router-dom";
import useQuery from "../../services/hooks/useQuery.js";

import { Card, Button } from "react-bootstrap";

export default function (props) {
  const history = useHistory();
  const query = useQuery();

  const { simplifiedArt } = props;
  const { _id, title, description } = simplifiedArt;

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
          onClick={() => history.push(`/art/open/${_id}?${query.toString()}`)}
        >
          Open
        </Button>
      </Card.Footer>
    </Card>
  );
}
