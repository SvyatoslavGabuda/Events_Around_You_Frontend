import { Col, Row, FloatingLabel, Form, Alert } from "react-bootstrap";
import "./eventsPageSearc.scss";
import useAuth from "../../../../auth/hooks/useAuth";
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { FcInfo } from "react-icons/fc";
import { FaArrowCircleLeft } from "react-icons/fa";
import { useAppDispatch } from "../../../../app/hooks";
import { showLoginM } from "../../../../app/slices/loginModalSlice";
import { useState } from "react";

import { eventSearch } from "../../../../app/slices/eventsSlices/eventSearchSlice";
const EventsPageSearchBar = () => {
  const { auth } = useAuth();
  const dispatch = useAppDispatch();
  const [titolo, setTitolo] = useState<string>("");
  const [dove, setDove] = useState<string>("");
  const [dataS, setDataS] = useState<Date | null>(null);
  const [dataF, setDataF] = useState<Date | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(dataF, dataS);

    if (auth.accessToken && dataS === null && dataF === null && dove !== "") {
      console.log("livello 1 caso 1");
      dispatch(
        eventSearch({
          token: auth.accessToken,
          city: dove,
          page: 0,
          size: 5,
          startDate: "",
          endDate: "",
          title: titolo,
        })
      );
    } else if (auth.accessToken && dataS !== null && dataF !== null) {
      console.log("livello 1 caso 2");
      dispatch(
        eventSearch({
          token: auth.accessToken,
          city: dove,
          page: 0,
          size: 5,

          startDate: dataS.toISOString(),
          endDate: dataF.toISOString(),
          title: titolo,
        })
      );
    } else {
      console.log("qualcosa non va");
    }
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
                    <FloatingLabel label="Cosa ti interessa?" className="mb-3">
                      <Form.Control
                        type="text"
                        placeholder="Nome evento"
                        value={titolo}
                        onChange={(e) => {
                          setTitolo(e.target.value);
                        }}
                      />
                    </FloatingLabel>
                  </Col>
                  <Col>
                    <FloatingLabel label="Dove?" className="mb-3">
                      <Form.Control
                        type="text"
                        placeholder="Venezia"
                        value={dove}
                        onChange={(e) => {
                          setDove(e.target.value);
                        }}
                      />
                    </FloatingLabel>
                  </Col>
                </Row>
                {auth?.accessToken ? (
                  <Row className="justify-content-center">
                    <Col xs={12} lg={6}>
                      <Form.Group className="mb-3 dataInput">
                        <Form.Label>Data di inizio:</Form.Label>
                        <Form.Control
                          type="date"
                          placeholder="data"
                          onChange={(e) => {
                            setDataS(new Date(e.target.value));
                          }}
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={12} lg={6}>
                      <Form.Group className="mb-3 dataInput">
                        <Form.Label>Data di fine:</Form.Label>
                        <Form.Control
                          type="date"
                          placeholder="data"
                          onChange={(e) => {
                            setDataF(new Date(e.target.value));
                          }}
                        />
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
                          <span
                            onClick={() => {
                              dispatch(showLoginM());
                            }}
                          >
                            Login
                          </span>{" "}
                          <FaArrowCircleLeft /> Non sei reggistrato?{" "}
                          <Link to="/register">Registarti! </Link>
                          <FaArrowCircleLeft />{" "}
                        </p>
                      </Col>
                    </Row>
                  </>
                )}
                <Row className="justify-content-center">
                  <Col xs={12} md={8} lg={6}>
                    <button className="searchButton">
                      <BsSearch />
                      <span className="ps-2">Cerca</span>
                    </button>
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
export default EventsPageSearchBar;
