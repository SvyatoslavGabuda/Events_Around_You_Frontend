import { Col, Container, Row, Dropdown, DropdownButton, Form } from "react-bootstrap";
import EventPageCard from "./evetnsPageComponents/eventPageCard/EventPageCard";
import EventsPageSearchBar from "./evetnsPageComponents/eventsPageSearch/EventsPageSearchBar";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect, useState } from "react";
import { sponsoredEvFetch } from "../../app/slices/eventsSlices/sponsoredEvents";

import useAuth from "../../auth/hooks/useAuth";
import { Ievento } from "../../interfaces/luoghiDiInteresseInt";
import { Link, useNavigate } from "react-router-dom";
import { eventSearch, inputsValue } from "../../app/slices/eventsSlices/eventSearchSlice";
import { sponsoredEvFetchbyCity } from "../../app/slices/eventsSlices/sponsoredEventsByCitta";
import {
  MdOutlineKeyboardArrowUp,
  MdOutlineKeyboardArrowDown,
  MdOutlineArrowDropDown,
  MdOutlineKeyboardDoubleArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
} from "react-icons/md";

const EventsPage = () => {
  const { auth } = useAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const ev = useAppSelector((state) => state.sponsoredEv.events);
  const evByCitta = useAppSelector((state) => state.sponsoredEvByCitta.events.content);
  const savedCity = useAppSelector((state) => state.sponsoredEvByCitta.citta);
  const status = useAppSelector((state) => state.sponsoredEv.status);
  const evSerachGeneral = useAppSelector((state) => state.eventSearch.events);
  const evSerachInputValues: inputsValue = useAppSelector((state) => state.eventSearch.inputsValue);
  const [eventi, setEventi] = useState<Ievento[]>([]);
  const [eventiTrovati, setEventiTrovati] = useState<Ievento[]>([]);
  //state per paginazione
  const [btnText, setBtnText] = useState("Ordina per");
  const [size, setSize] = useState(5);
  const [sort, setSort] = useState("startDate");
  const [dir, setDir] = useState<"ASC" | "DESC">("ASC");
  const [page, setPage] = useState(0);
  // const [numOfPages, setNumOfPages] = useState(1);
  const [prevStatus, setPrevStaus] = useState(true);
  const [nextStatus, setNextStatus] = useState(false);
  useEffect(() => {
    // console.log("use e 1");
    dispatch(sponsoredEvFetch());
  }, []);
  // useEffect(() => {
  //   if (status === "idle") {
  //     console.log("use 2");

  //     // setEventi(ev);
  //   }
  // }, [ev]);
  useEffect(() => {
    setEventiTrovati(evSerachGeneral.content);
  }, [evSerachGeneral]);

  return (
    <>
      <Container>
        <Row>
          <EventsPageSearchBar size={size} sort={sort} dir={dir} page={page} />
        </Row>
        {!auth.accessToken && evByCitta?.length > 0 && (
          <>
            <Row className="mt-5">
              <h2> Eventi Di maggior sucesso trovati:</h2>
            </Row>
            {evByCitta?.length > 0 ? (
              <>
                {evByCitta?.map((eve: Ievento) => (
                  <EventPageCard
                    ev={eve}
                    key={eve.idLuogo + "eve"}
                    updateF={() => {
                      dispatch(sponsoredEvFetchbyCity({ city: savedCity, page: 0, size: 4 }));
                    }}
                  />
                ))}
              </>
            ) : (
              <>
                <p>non ci sono eventi da caricare</p>
              </>
            )}{" "}
          </>
        )}
        {eventiTrovati?.length > 0 && auth?.username ? (
          <>
            <Row>
              <Col>
                <h2>Eventi trovati - {evSerachGeneral.totalElements}</h2>
              </Col>

              <Col className="searchOption">
                <button
                  className="mapBtb"
                  onClick={() => {
                    navigate("/events/map");
                  }}
                >
                  Mappa
                </button>
                <Form.Select
                  className="formSelect"
                  onChange={(e) => {
                    setSize(Number(e.target.value));
                  }}
                >
                  {/* <option>number of el</option> */}
                  <option value="5"> number of el 5</option>
                  <option value="10"> number of el 10</option>
                  <option value="15">number of el 15</option>
                </Form.Select>

                <div className="myDropdown">
                  <button className="dropbtn">
                    {btnText}
                    <MdOutlineArrowDropDown />
                  </button>
                  <div className="dropdown-content">
                    <p>
                      Data
                      <span
                        onClick={() => {
                          console.log("sortBy('data', 'asc')");
                          setBtnText("Data Asc");
                          setSort("startDate");
                          setDir("ASC");
                        }}
                      >
                        <MdOutlineKeyboardArrowUp />
                      </span>
                      <span
                        onClick={() => {
                          console.log("sortBy('data', 'desc')");
                          setBtnText("Data desc");
                          setSort("startDate");
                          setDir("DESC");
                        }}
                      >
                        <MdOutlineKeyboardArrowDown />
                      </span>
                    </p>
                    <p>
                      nome
                      <span
                        onClick={() => {
                          console.log("sortBy('ndata', 'asc')");
                          setBtnText("Nome asc");
                          setSort("title");
                          setDir("ASC");
                        }}
                      >
                        <MdOutlineKeyboardArrowUp />
                      </span>
                      <span
                        onClick={() => {
                          console.log("sortBy('ndata', 'desc')");
                          setBtnText("Nome desc");
                          setSort("title");
                          setDir("DESC");
                        }}
                      >
                        <MdOutlineKeyboardArrowDown />
                      </span>
                    </p>
                  </div>
                </div>
                <div className="btnPagin">
                  <button
                    className="prev"
                    disabled={prevStatus}
                    onClick={() => {
                      if (page === 1) {
                        setPrevStaus(true);
                        setNextStatus(false);
                        setPage(page - 1);
                        console.log("non puoi andare in negativo");
                      } else {
                        setNextStatus(false);
                        setPage(page - 1);
                      }
                    }}
                  >
                    <MdOutlineKeyboardDoubleArrowLeft />
                  </button>
                  <p>
                    page {page + 1} of {evSerachGeneral?.totalPages}
                  </p>
                  <button
                    className="next"
                    disabled={nextStatus}
                    onClick={() => {
                      if (page === evSerachGeneral?.totalPages - 2) {
                        setNextStatus(true);
                        setPage(page + 1);
                        setPrevStaus(false);
                      } else {
                        setPage(page + 1);
                        setPrevStaus(false);
                      }
                    }}
                  >
                    <MdOutlineKeyboardDoubleArrowRight />
                  </button>
                </div>
              </Col>
            </Row>

            {eventiTrovati.map((eve) => (
              <EventPageCard
                ev={eve}
                key={eve.idLuogo + "eventiTrovati"}
                updateF={() => {
                  if (auth.accessToken) {
                    dispatch(
                      eventSearch({
                        token: auth.accessToken,
                        city: evSerachInputValues.place,
                        page: evSerachInputValues.page,
                        size: evSerachInputValues.size,
                        startDate: evSerachInputValues.startDate,
                        endDate: evSerachInputValues.endDate,
                        title: evSerachInputValues.title,
                        sort: "startDate",
                        dir: "ASC",
                      })
                    );
                  }
                }}
              />
            ))}
            <Row>
              <div className="btnPagin">
                <button
                  className="prev"
                  disabled={prevStatus}
                  onClick={() => {
                    setTimeout(() => {
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                    }, 100);
                    if (page === 1) {
                      setPrevStaus(true);
                      setNextStatus(false);
                      setPage(page - 1);
                      console.log("non puoi andare in negativo");
                    } else {
                      setNextStatus(false);
                      setPage(page - 1);
                    }
                  }}
                >
                  <MdOutlineKeyboardDoubleArrowLeft />
                </button>
                <p>
                  page {page + 1} of {evSerachGeneral?.totalPages}
                </p>
                <button
                  className="next"
                  disabled={nextStatus}
                  onClick={() => {
                    setTimeout(() => {
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                    }, 100);
                    if (page === evSerachGeneral?.totalPages - 2) {
                      setNextStatus(true);
                      setPage(page + 1);
                      setPrevStaus(false);
                    } else {
                      setPage(page + 1);
                      setPrevStaus(false);
                    }
                  }}
                >
                  <MdOutlineKeyboardDoubleArrowRight />
                </button>
              </div>
            </Row>
          </>
        ) : (
          <></>
        )}
        <Row className="mt-5">
          <h2> Eventi Di maggior sucesso:</h2>
        </Row>
        {ev?.length > 0 ? (
          <>
            {ev?.map((eve: Ievento) => (
              <EventPageCard
                ev={eve}
                key={eve.idLuogo + "eve"}
                updateF={() => {
                  dispatch(sponsoredEvFetch());
                }}
              />
            ))}
          </>
        ) : (
          <>
            <p>non ci sono eventi da caricare</p>
          </>
        )}
      </Container>
    </>
  );
};
export default EventsPage;
