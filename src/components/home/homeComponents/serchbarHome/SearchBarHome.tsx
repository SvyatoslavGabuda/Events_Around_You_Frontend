import "./searchHome.scss";
import { Row, FloatingLabel, Form, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import {
  saveInputCity,
  sponsoredEvFetchbyCity,
} from "../../../../app/slices/eventsSlices/sponsoredEventsByCitta";
interface params {
  page: number;
}
const SearchBarHome = ({ page }: params) => {
  const [city, setCity] = useState("");
  const dispatch = useAppDispatch();
  const savedCity = useAppSelector((state) => state.sponsoredEvByCitta.citta);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(saveInputCity(city));
    dispatch(sponsoredEvFetchbyCity({ city: city, page: page, size: 4 }));
  };
  useEffect(() => {
    if (city !== "") {
      dispatch(sponsoredEvFetchbyCity({ city: city, page: page, size: 4 }));
    }
  }, [page]);
  useEffect(() => {
    if (savedCity !== "") {
      setCity(savedCity);
    }
  }, []);

  return (
    <>
      <Col>
        <section className="searchHome" style={{ backgroundImage: "url(/assets/bg/audience.jpg)" }}>
          <Row className="justify-content-center align-items-center h-100">
            <Col className="h-50">
              <Form onSubmit={handleSubmit}>
                <Row>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Dove vorresti andare?"
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      placeholder="Venezia"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
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
