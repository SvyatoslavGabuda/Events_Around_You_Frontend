import { Col, Row, FloatingLabel, Form, Alert } from "react-bootstrap";
import "./eventsPageSearc.scss";
import useAuth from "../../../../auth/hooks/useAuth";
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { FcInfo } from "react-icons/fc";
import { FaArrowCircleLeft } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { showLoginM } from "../../../../app/slices/loginModalSlice";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  eventSearch,
  inputsValue,
  saveInputsValues,
} from "../../../../app/slices/eventsSlices/eventSearchSlice";
import { sponsoredEvFetchbyCity } from "../../../../app/slices/eventsSlices/sponsoredEventsByCitta";
interface searchParams {
  size: number;
  sort: string;
  dir: "ASC" | "DESC";
  page: number;
}
const EventsPageSearchBar = ({ size, sort, dir, page }: searchParams) => {
  const { auth } = useAuth();
  const dispatch = useAppDispatch();
  const savedCity = useAppSelector((state) => state.sponsoredEvByCitta.citta);
  const evSerachInputValues: inputsValue = useAppSelector((state) => state.eventSearch.inputsValue);
  const [titolo, setTitolo] = useState<string>("");
  const [dove, setDove] = useState<string>("");
  const [dataS, setDataS] = useState<Date | null>(null);
  const [dataF, setDataF] = useState<Date | null>(null);
  const notify = () =>
    toast.error("Inserisci dei dati nel campi input", {
      position: toast.POSITION.TOP_CENTER,
    });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (auth.accessToken) {
      if (
        (dataS === null || isNaN(dataS.getTime()) || dataF === null || isNaN(dataF.getTime())) &&
        dove !== ""
      ) {
        dispatch(
          eventSearch({
            token: auth.accessToken,
            city: dove,
            page: page,
            size: size,
            startDate: "",
            endDate: "",
            title: titolo,
            sort: sort,
            dir: dir,
          })
        );
        dispatch(
          saveInputsValues({
            endDate: "",
            startDate: "",
            page: page,
            place: dove,
            size: size,
            title: titolo,
            dir: dir,
            sort: sort,
          })
        );
      } else if (
        dataS !== null &&
        dataF !== null &&
        !isNaN(dataS.getTime()) &&
        !isNaN(dataF.getTime())
      ) {
        dispatch(
          eventSearch({
            token: auth.accessToken,
            city: dove,
            page: page,
            size: size,

            startDate: dataS.toISOString(),
            endDate: dataF.toISOString(),
            title: titolo,
            sort: sort,
            dir: dir,
          })
        );
        dispatch(
          saveInputsValues({
            endDate: dataF.toISOString(),
            startDate: dataS.toISOString(),
            page: page,
            place: dove,
            size: size,
            title: titolo,
            dir: dir,
            sort: sort,
          })
        );
      } else {
        notify();
      }
    } else {
      if (dove !== "") {
        dispatch(sponsoredEvFetchbyCity({ city: dove, page: page, size: 4 }));
      }
    }
  };
  useEffect(() => {
    if (savedCity !== "") {
      setDove(savedCity);
    }
    if (evSerachInputValues.place !== "") {
      setDove(evSerachInputValues.place);
      setTitolo(evSerachInputValues.title);

      if (evSerachInputValues.startDate !== "" && evSerachInputValues.endDate !== "") {
        setDataS(new Date(evSerachInputValues.startDate));
        setDataF(new Date(evSerachInputValues.endDate));
      }
    }
  }, [evSerachInputValues]);
  useEffect(() => {
    if (auth.accessToken) {
      if (
        (dataS === null || isNaN(dataS.getTime()) || dataF === null || isNaN(dataF.getTime())) &&
        dove !== ""
      ) {
        dispatch(
          eventSearch({
            token: auth.accessToken,
            city: dove,
            page: page,
            size: size,
            startDate: "",
            endDate: "",
            title: titolo,
            sort: sort,
            dir: dir,
          })
        );
        dispatch(
          saveInputsValues({
            endDate: "",
            startDate: "",
            page: page,
            place: dove,
            size: size,
            title: titolo,
            dir: dir,
            sort: sort,
          })
        );
      } else if (
        dataS !== null &&
        dataF !== null &&
        !isNaN(dataS.getTime()) &&
        !isNaN(dataF.getTime())
      ) {
        dispatch(
          eventSearch({
            token: auth.accessToken,
            city: dove,
            page: page,
            size: size,

            startDate: dataS.toISOString(),
            endDate: dataF.toISOString(),
            title: titolo,
            sort: sort,
            dir: dir,
          })
        );
        dispatch(
          saveInputsValues({
            endDate: dataF.toISOString(),
            startDate: dataS.toISOString(),
            page: page,
            place: dove,
            size: size,
            title: titolo,
            dir: dir,
            sort: sort,
          })
        );
      }
    } else {
      if (dove !== "") {
        dispatch(sponsoredEvFetchbyCity({ city: dove, page: page, size: 4 }));
      }
    }
  }, [page, sort, size, dir]);
  return (
    <>
      <Col>
        <section
          className="evetPageSearchBar"
          style={{ backgroundImage: "url(/assets/bg/audience.jpg)" }}
        >
          <Row className="justify-content-center align-items-center h-100">
            <Col className="">
              <Form className="eventPageForm" onSubmit={handleSubmit}>
                <Row>
                  {auth.accessToken && (
                    <Col xs={12} md={6}>
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
                  )}
                  <Col xs={12} md={!auth.accessToken ? 12 : 6}>
                    <FloatingLabel label="Dove?" className="mb-3">
                      <Form.Control
                        type="text"
                        placeholder="Venezia"
                        required
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
                          value={
                            dataS && !isNaN(dataS.getTime())
                              ? dataS.toISOString().split("T")[0]
                              : ""
                          }
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
                          value={
                            dataF && !isNaN(dataF.getTime())
                              ? dataF.toISOString().split("T")[0]
                              : ""
                          }
                          onChange={(e) => {
                            setDataF(new Date(e.target.value));
                          }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                ) : (
                  <>
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
                  <ToastContainer />
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
