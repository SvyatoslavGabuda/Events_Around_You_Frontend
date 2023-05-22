import { Row, FloatingLabel, Form, Col } from "react-bootstrap";
const ResturantSearchBar = () => {
  return (
    <>
      {" "}
      <Col>
        <section className="searchHome" style={{ backgroundImage: "url(/assets/bg/audience.jpg)" }}>
          <Row className="justify-content-center align-items-center h-100">
            <Col className="h-50">
              <Form>
                <Row>
                  <Col>
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Where do you want to go?"
                      className="mb-3"
                    >
                      <Form.Control type="text" placeholder="Venezia" />
                    </FloatingLabel>
                  </Col>
                  <Col>
                    <Form.Select aria-label="Default select example">
                      <option>specialita</option>
                      <option value="1">Museo/mostre</option>
                      <option value="2">Monumenti</option>
                      <option value="3"></option>
                    </Form.Select>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </section>
      </Col>
    </>
  );
};
export default ResturantSearchBar;
