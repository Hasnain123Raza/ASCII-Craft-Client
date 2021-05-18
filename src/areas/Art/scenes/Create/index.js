import { Container, Form, Button, Card } from "react-bootstrap";

export default function () {
  return (
    <div className="art-create">
      <Container className="my-4">
        <h2 className="mb-3" style={{ "text-align": "center" }}>
          ASCII-CRAFT Art Editor
        </h2>

        <Card>
          <Card.Body>
            <Form>
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Title" />
                <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" placeholder="Description" />
                <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="content">
                <Form.Label>Content</Form.Label>
                <Form.Control
                  autoComplete="off"
                  as="textarea"
                  rows={3}
                  placeholder="Content"
                />
                <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>

        <div className="my-4 d-flex">
          <Button variant="primary">New</Button>
          <Button className="ml-auto" variant="success">
            Create
          </Button>
        </div>
      </Container>
    </div>
  );
}
