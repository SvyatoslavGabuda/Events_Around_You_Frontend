import { Col, Container, Row, Dropdown, DropdownButton, Form } from "react-bootstrap";
import EventPageCard from "./evetnsPageComponents/eventPageCard/EventPageCard";
import EventsPageSearchBar from "./evetnsPageComponents/eventsPageSearch/EventsPageSearchBar";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect, useState } from "react";
import { sponsoredEvFetch } from "../../app/slices/eventsSlices/sponsoredEvents";

import useAuth from "../../auth/hooks/useAuth";
import { Ievento, IuserProfile } from "../../interfaces/luoghiDiInteresseInt";
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
import { FcInfo } from "react-icons/fc";
import { GrMapLocation } from "react-icons/gr";
import { userLikes } from "../../app/slices/eventsSlices/eventLikeSlice";

const EventsPage = () => {
  const { auth } = useAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const userProfile: IuserProfile = useAppSelector((state) => state.userProfile.userLogged);

  const ev = useAppSelector((state) => state.sponsoredEv.events);
  const evByCitta = useAppSelector((state) => state.sponsoredEvByCitta.events);
  const savedCity = useAppSelector((state) => state.sponsoredEvByCitta.citta);
  const evSerachGeneral = useAppSelector((state) => state.eventSearch.events);
  const evSerachInputValues: inputsValue = useAppSelector((state) => state.eventSearch.inputsValue);
  const [eventiTrovati, setEventiTrovati] = useState<Ievento[]>([]);

  //state per paginazione
  const [btnText, setBtnText] = useState<JSX.Element>(<>{"Ordina per..."}</>);
  const [size, setSize] = useState(5);
  const [sort, setSort] = useState("startDate");
  const [dir, setDir] = useState<"ASC" | "DESC">("ASC");
  const [page, setPage] = useState(0);
  const [prevStatus, setPrevStatus] = useState(true);
  const [nextStatus, setNextStatus] = useState(false);

  const handlePrevPage = () => {
    if (page === 1) {
      setPrevStatus(true);
      setNextStatus(false);
      setPage(page - 1);
      console.log("Non puoi andare in negativo");
    } else {
      setNextStatus(false);
      setPage(page - 1);
    }
    scrollToTop();
  };
  const handleNextPage = () => {
    if (page === evSerachGeneral?.totalPages - 2) {
      setNextStatus(true);
      setPage(page + 1);
      setPrevStatus(false);
    } else {
      setPage(page + 1);
      setPrevStatus(false);
    }
    scrollToTop();
  };
  const scrollToTop = () => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 100);
  };
  const handleSortBy = (field: string, order: "ASC" | "DESC") => {
    let btnText = "";
    let icon = null;
    if (field === "startDate") {
      btnText = `Data d'inizio `;
      icon =
        order === "ASC" ? (
          <MdOutlineKeyboardArrowUp style={{ fontSize: 20 }} />
        ) : (
          <MdOutlineKeyboardArrowDown style={{ fontSize: 20 }} />
        );
    } else if (field === "title") {
      btnText = `Nome `;
      icon =
        order === "ASC" ? (
          <MdOutlineKeyboardArrowUp style={{ fontSize: 20 }} />
        ) : (
          <MdOutlineKeyboardArrowDown style={{ fontSize: 20 }} />
        );
    } else if (field === "endDate") {
      btnText = `Data di fine `;
      icon =
        order === "ASC" ? (
          <MdOutlineKeyboardArrowUp style={{ fontSize: 20 }} />
        ) : (
          <MdOutlineKeyboardArrowDown style={{ fontSize: 20 }} />
        );
    }

    setBtnText(
      <>
        {btnText}
        {icon}
      </>
    );
    // setPage(0);
    setSort(field);
    setDir(order);
  };

  useEffect(() => {
    dispatch(sponsoredEvFetch());
    userProfile?.likes?.forEach((ev) => dispatch(userLikes(ev.idLuogo)));
    return () => {
      userProfile?.likes?.forEach((ev) => dispatch(userLikes(ev.idLuogo)));
    };
  }, []);

  useEffect(() => {
    setEventiTrovati(evSerachGeneral.content);
  }, [evSerachGeneral]);

  return (
    <>
      <Container>
        <Row>
          <EventsPageSearchBar size={size} sort={sort} dir={dir} page={page} />
        </Row>
        {!auth.accessToken && evByCitta?.content?.length > 0 && (
          <>
            <Row className="mt-5">
              <h2> {evByCitta?.totalElements} Eventi Di maggior sucesso trovati</h2>
              <div className="btnPagin">
                <button
                  className="prev"
                  disabled={prevStatus}
                  onClick={() => {
                    if (page === 1) {
                      setPrevStatus(true);
                      setNextStatus(false);
                      setPage(page - 1);
                      console.log("Non puoi andare in negativo");
                    } else {
                      setNextStatus(false);
                      setPage(page - 1);
                    }
                    scrollToTop();
                  }}
                >
                  <MdOutlineKeyboardDoubleArrowLeft />
                </button>
                <p>
                  page {page + 1} of {evByCitta?.totalPages}
                </p>
                <button
                  className="next"
                  disabled={nextStatus}
                  onClick={() => {
                    if (page === evByCitta?.totalPages - 2) {
                      setNextStatus(true);
                      setPage(page + 1);
                      setPrevStatus(false);
                    } else {
                      setPage(page + 1);
                      setPrevStatus(false);
                    }
                    scrollToTop();
                  }}
                >
                  <MdOutlineKeyboardDoubleArrowRight />
                </button>
              </div>
            </Row>
            {evByCitta?.content?.length > 0 ? (
              <>
                {evByCitta?.content.map((eve: Ievento) => (
                  <EventPageCard
                    ev={eve}
                    key={eve.idLuogo + "eve"}
                    updateF={() => {
                      dispatch(sponsoredEvFetchbyCity({ city: savedCity, page: page, size: 4 }));
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

        {eventiTrovati?.length === 0 ? (
          <p className="warningMessage">
            <FcInfo /> Purtoppo non abbiamo trovato nessun evento corrispondente alla tua ricerca
          </p>
        ) : (
          <></>
        )}
        {eventiTrovati?.length > 0 && auth?.username ? (
          <>
            <Row>
              <Col xs={12} md={4}>
                <h2>{evSerachGeneral.totalElements} Eventi trovati</h2>
              </Col>

              <Col className="searchOption" xs={12} md={8}>
                <button
                  className="mapBtb"
                  onClick={() => {
                    navigate("/events/map");
                  }}
                >
                  <GrMapLocation /> Mappa
                </button>

                <div className="pagination">
                  <div className="myDropdown">
                    <button className="dropbtn">{btnText}</button>
                    <div className="dropdown-content">
                      <p>
                        Data d'inizio
                        <span onClick={() => handleSortBy("startDate", "ASC")}>
                          <MdOutlineKeyboardArrowUp />
                        </span>
                        <span onClick={() => handleSortBy("startDate", "DESC")}>
                          <MdOutlineKeyboardArrowDown />
                        </span>
                      </p>
                      <p>
                        Data di fine
                        <span onClick={() => handleSortBy("endDate", "ASC")}>
                          <MdOutlineKeyboardArrowUp />
                        </span>
                        <span onClick={() => handleSortBy("endDate", "DESC")}>
                          <MdOutlineKeyboardArrowDown />
                        </span>
                      </p>
                      <p>
                        Nome
                        <span onClick={() => handleSortBy("title", "ASC")}>
                          <MdOutlineKeyboardArrowUp />
                        </span>
                        <span onClick={() => handleSortBy("title", "DESC")}>
                          <MdOutlineKeyboardArrowDown />
                        </span>
                      </p>
                    </div>
                  </div>
                  <Form.Select
                    className="formSelect"
                    onChange={(e) => {
                      setSize(Number(e.target.value));
                      setPage(0);
                      setNextStatus(false);
                      setPrevStatus(true);
                    }}
                  >
                    {/* <option>number of el</option> */}
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                  </Form.Select>
                  <div className="btnPagin">
                    <button
                      className="prev"
                      disabled={prevStatus}
                      onClick={() => {
                        handlePrevPage();
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
                        handleNextPage();
                      }}
                    >
                      <MdOutlineKeyboardDoubleArrowRight />
                    </button>
                  </div>
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
                        sort: evSerachInputValues.sort,
                        dir: evSerachInputValues.dir,
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
                    handlePrevPage();
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
                    handleNextPage();
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
