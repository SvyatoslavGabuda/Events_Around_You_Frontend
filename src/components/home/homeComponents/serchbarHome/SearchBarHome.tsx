import "./searchHome.scss";
import { Row, FloatingLabel, Form, Col } from "react-bootstrap";

const SearchBarHome = () => {
  return (
    <>
      <Col>
        <section className="searchHome" style={{ backgroundImage: "url(/assets/bg/audience.jpg)" }}>
          <Row className="justify-content-center align-items-center h-100">
            <Col className="h-50">
              <Form>
                <Row>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Where do you want to go?"
                    className="mb-3"
                  >
                    <Form.Control type="text" placeholder="Venezia" />
                  </FloatingLabel>
                </Row>
              </Form>
            </Col>
          </Row>
        </section>
      </Col>
    </>
  );
};
export default SearchBarHome;
