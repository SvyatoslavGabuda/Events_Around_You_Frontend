import { Col, Row, FloatingLabel, Form } from "react-bootstrap";
import useAuth from "../../../auth/hooks/useAuth";
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { FcInfo } from "react-icons/fc";
import { FaArrowCircleLeft } from "react-icons/fa";
const HotelPageSearchBar = () => {
  const { auth } = useAuth();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <>
      <Col>
        <section
          className="evetPageSearchBar"
          style={{ backgroundImage: "url(/assets/bg/audience.jpg)" }}
        >
          <Row className="justify-content-center align-items-center h-100">
            <Col className="h-50">
              <Form className="eventPageForm" onSubmit={handleSubmit}>
                <Row>
                  <Col>
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Dove vuoi andare?"
                      className="mb-3"
                    >
                      <Form.Control type="text" placeholder="Venezia" />
                    </FloatingLabel>
                  </Col>
                  {auth.accessToken ? (
                    <>
                      <Col>
                        <Form.Select aria-label="Default select example">
                          <option>Selezione il numero di stelle</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </Form.Select>
                      </Col>
                      <Col>
                        <Form.Select aria-label="Default select example">
                          <option>Servizi</option>
                          <option value="1">Spa</option>
                          <option value="2">parcheggio</option>
                          <option value="3">lavanderia</option>
                        </Form.Select>
                      </Col>
                    </>
                  ) : (
                    <></>
                  )}
                </Row>
                {auth?.accessToken ? (
                  <Row>
                    <Col>
                      <Form.Group className="mb-3 dataInput">
                        <Form.Label>Data di inizio:</Form.Label>
                        <Form.Control type="date" placeholder="data" />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-3 dataInput">
                        <Form.Label>Data di fine:</Form.Label>
                        <Form.Control type="date" placeholder="data" />
                      </Form.Group>
                    </Col>
                  </Row>
                ) : (
                  <>
                    {" "}
                    <Row>
                      <Col className="d-flex justify-content-center">
                        <p className="warningMessage">
                          <FcInfo /> Effetua il login per avere più scelte!{" "}
                          <Link to="/login">Login</Link> <FaArrowCircleLeft /> Non sei reggistrato?{" "}
                          <Link to="/register">Registarti! </Link>
                          <FaArrowCircleLeft />{" "}
                        </p>
                      </Col>
                    </Row>
                  </>
                )}
                <Row className="justify-content-center">
                  <Col xs={12} md={8} lg={6}>
                    <button className="searchButton">Cerca</button>
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
export default HotelPageSearchBar;
