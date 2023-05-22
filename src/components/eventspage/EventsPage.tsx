import { Col, Container, Row } from "react-bootstrap";
import EventPageCard from "./evetnsPageComponents/EventPageCard";
import EventsPageSearchBar from "./evetnsPageComponents/eventsPageSearch/EventsPageSearchBar";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect, useState } from "react";
import { sponsoredEvFetch } from "../../app/slices/eventsSlices/sponsoredEvents";

import useAuth from "../../auth/hooks/useAuth";
import { Ievento } from "../../interfaces/luoghiDiInteresseInt";

const EventsPage = () => {
  const { auth } = useAuth();
  const dispatch = useAppDispatch();
  const ev = useAppSelector((state) => state.sponsoredEv.events);
  const status = useAppSelector((state) => state.sponsoredEv.status);
  const evSerachGeneral = useAppSelector((state) => state.eventSearch.events);
  const [eventi, setEventi] = useState<Ievento[]>([]);
  const [eventiTrovati, setEventiTrovati] = useState<Ievento[]>([]);
  useEffect(() => {
    console.log("use e 1");
    dispatch(sponsoredEvFetch());
  }, []);
  useEffect(() => {
    if (status === "idle") {
      console.log("use 2");
      setEventi(ev);
    }
  }, [status]);
  useEffect(() => {
    setEventiTrovati(evSerachGeneral.content);
    console.log("citta");
    if (evSerachGeneral?.content?.length > 0) {
    }
  }, [evSerachGeneral]);

  return (
    <>
      <Container>
        <Row>
          <EventsPageSearchBar />
        </Row>
        {eventiTrovati?.length > 0 && auth?.username ? (
          <>
            <Row>
              <h2>Eventi trovati:</h2>
            </Row>

            {eventiTrovati.map((eve) => (
              <EventPageCard ev={eve} key={eve.idLuogo + "eventiTrovati"} />
            ))}
          </>
        ) : (
          <></>
        )}
        <Row className="mt-5">
          <h2> Eventi Di maggior sucesso:</h2>
        </Row>
        {eventi?.length > 0 ? (
          <>
            {eventi.map((eve: Ievento) => (
              <EventPageCard ev={eve} key={eve.idLuogo + "eve"} />
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
