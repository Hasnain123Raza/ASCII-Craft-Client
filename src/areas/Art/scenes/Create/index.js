import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import useQuery from "../../../../services/hooks/useQuery.js";

import { Form, Button } from "react-bootstrap";
import PostRequestButton from "../../../../components/PostRequestButton";

import {
  reset,
  resetArt,
  setTitle,
  setDescription,
  setContent,
  postCreateArt,
} from "./services/artCreateSlice";
import {
  selectArt,
  selectTitle,
  selectDescription,
  selectContent,
  selectResponseArtId,
  selectPostCreateArtRequestStatus,
  selectTitleError,
  selectDescriptionError,
  selectContentError,
} from "./services/artCreateSlice/selectors.js";

export default function () {
  const dispatch = useDispatch();
  const query = useQuery();

  const art = useSelector(selectArt);
  const title = useSelector(selectTitle);
  const description = useSelector(selectDescription);
  const content = useSelector(selectContent);
  const postCreateArtRequestStatus = useSelector(
    selectPostCreateArtRequestStatus
  );
  const responseArtId = useSelector(selectResponseArtId);

  if (Boolean(responseArtId)) query.set("artId", responseArtId);

  const titleError = useSelector(selectTitleError);
  const descriptionError = useSelector(selectDescriptionError);
  const contentError = useSelector(selectContentError);

  useEffect(() => {
    return () => dispatch(reset());
  }, []);

  return (
    <div className="art-create d-flex flex-column" style={{ flex: 1 }}>
      <div>
        <h2 className="mb-3" style={{ textAlign: "center" }}>
          Art Editor
        </h2>
        <hr />
      </div>

      <Form>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Title"
            value={title}
            isInvalid={Boolean(titleError)}
            onChange={(event) => dispatch(setTitle(event.target.value))}
          />
          <Form.Control.Feedback type="invalid">
            {titleError}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Description"
            value={description}
            isInvalid={Boolean(descriptionError)}
            onChange={(event) => dispatch(setDescription(event.target.value))}
          />
          <Form.Control.Feedback type="invalid">
            {descriptionError}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="content">
          <Form.Label>Content</Form.Label>
          <Form.Control
            autoComplete="off"
            as="textarea"
            rows={3}
            placeholder="Content"
            value={content}
            isInvalid={Boolean(contentError)}
            onChange={(event) => dispatch(setContent(event.target.value))}
          />
          <Form.Control.Feedback type="invalid">
            {contentError}
          </Form.Control.Feedback>
        </Form.Group>
      </Form>

      <div className="my-4 d-flex">
        <Button variant="primary" onClick={() => dispatch(resetArt())}>
          New
        </Button>

        <PostRequestButton
          className="ml-auto"
          initiateLoadingRequest={() => dispatch(postCreateArt(art))}
          loadingRequestStatus={postCreateArtRequestStatus}
          idleText="Create"
          redirectLink={`/art/open?${query.toString()}`}
        />
      </div>
    </div>
  );
}
