import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import useQuery from "../../../../../../services/hooks/useQuery.js";

import { Card, Button } from "react-bootstrap";

import {
  selectSimplifiedArtIdByIndex,
  selectSimplifiedArtTitleByIndex,
  selectSimplifiedArtDescriptionByIndex,
} from "../../services/artBrowseSlice/selectors";

export default function ({ index }) {
  const history = useHistory();
  const query = useQuery();

  const id = useSelector(selectSimplifiedArtIdByIndex(index));
  const title = useSelector(selectSimplifiedArtTitleByIndex(index));
  const description = useSelector(selectSimplifiedArtDescriptionByIndex(index));

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
            query.set("artId", id);
            history.push("/art/open?" + query.toString());
          }}
        >
          Open
        </Button>
      </Card.Footer>
    </Card>
  );
}
