import { Col, Container, Row } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";

import EventCard from "./homeComponents/eventCard/EventCard";
import SearchBarHome from "./homeComponents/serchbarHome/SearchBarHome";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect, useState } from "react";
import { sponsoredEvFetch } from "../../app/slices/eventsSlices/sponsoredEvents";
import { Ievento } from "../../interfaces/luoghiDiInteresseInt";
import OurSponsor from "./homeComponents/ourSponsor/OurSponsor";
import { Ifetch } from "../../app/slices/eventsSlices/sponsoredEventsByCitta";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import CardLoading from "../spinner/CardLoading";
const Home = () => {
  const dispatch = useAppDispatch();
  const [eventi, setEventi] = useState<Ievento[]>([]);
  const ev = useAppSelector((state) => state.sponsoredEv.events);
  const status = useAppSelector((state) => state.sponsoredEv.status);
  const [eventiS, setEventiS] = useState<Ievento[]>([]);
  const searchEv: Ifetch = useAppSelector((state) => state.sponsoredEvByCitta.events);
  const statusS = useAppSelector((state) => state.sponsoredEvByCitta.status);

  const [page, setPage] = useState(0);

  const [prevStatus, setPrevStaus] = useState(true);
  const [nextStatus, setNextStatus] = useState(false);

  useEffect(() => {
    //Carico gli Eventi Sponsorizzati
    dispatch(sponsoredEvFetch());
  }, []);
  useEffect(() => {
    //salvo gli eventi sponsorizzati solo se la fetch è andata a buon fine
    if (status === "idle") {
      setEventi(ev);
    }
  }, [status]);
  useEffect(() => {
    if (statusS === "idle") {
      setEventiS(searchEv?.content);
    }
  }, [statusS]);

  return (
    <>
      <Container>
        <Row>
          <SearchBarHome page={page}></SearchBarHome>
        </Row>
        {/* {statusS === "loading" && (
          <Row>
            <Col>
              <CardLoading />
            </Col>
            <Col>
              <CardLoading />
            </Col>
            <Col>
              <CardLoading />
            </Col>
            <Col>
              <CardLoading />
            </Col>
          </Row>
        )} */}
        {eventiS?.length > 0 ? (
          <>
            <Row className="text-center py-3 justify-content-center align-items-center">
              <h2 className="homeTitles"> Eventi Trovati - {searchEv?.totalElements}</h2>
            </Row>

            <Row>
              <div className="position-relative">
                <button
                  className="prevBtn"
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
                  <AiOutlineDoubleLeft />
                </button>
                <Row className="row-cols-1 row-cols-md-2 row-cols-lg-4 row-cols-xl-4 m-0 justify-content-center w-100">
                  {eventiS?.length > 0 && (
                    <>
                      {eventiS.map((eve: Ievento, index) => (
                        <EventCard ev={eve} key={eve.idLuogo + "ev"} />
                      ))}
                    </>
                  )}
                </Row>
                <button
                  className="nextBtn"
                  disabled={nextStatus}
                  onClick={() => {
                    if (page === searchEv?.totalPages - 2) {
                      setNextStatus(true);
                      setPage(page + 1);
                      setPrevStaus(false);
                    } else {
                      setPage(page + 1);
                      setPrevStaus(false);
                    }
                  }}
                >
                  <AiOutlineDoubleRight />
                </button>
              </div>
            </Row>
          </>
        ) : (
          <></>
        )}
        <Row className="text-center py-3">
          <h2 className="homeTitles">Eventi che potrebbero interessarti</h2>
        </Row>
        <Row className="row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 m-0 justify-content-center w-100">
          {eventi?.length > 0 ? (
            <>
              {eventi.map((eve: Ievento) => (
                <EventCard ev={eve} key={eve.idLuogo + "ev"} />
              ))}
            </>
          ) : (
            <>
              <p>non ci sono eventi da caricare</p>
            </>
          )}
        </Row>
        <Row className="text-center  py-3">
          <h2 className="homeTitles">I nostri Sponsor</h2>
        </Row>
        <OurSponsor />
      </Container>
    </>
  );
};
export default Home;
