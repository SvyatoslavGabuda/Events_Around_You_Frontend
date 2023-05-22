import { useParams } from "react-router-dom";
import { Ievento } from "../../interfaces/luoghiDiInteresseInt";
import { useAppSelector } from "../../app/hooks";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { format } from "date-fns";
const EventsDetailsPage = () => {
  const params = useParams();
  const event_Id = params.id;
  const evento: Ievento = useAppSelector((state) => state.eventByID.event);

  const status = useAppSelector((state) => state.eventByID.status);
  const [ev, setEv] = useState<Ievento>();
  useEffect(() => {
    if (status === "idle") {
      console.log("ciao");
      setEv(evento);
    }
  }, [evento]);
  return (
    <>
      <Container>
        {ev ? (
          <Row>
            <Col>
              <img src={ev?.urlImage} alt="immagine evento" />
            </Col>
            <Col>
              <h3>{ev?.title}</h3>
              <h3>{ev?.subTitle}</h3>
              <p>
                <time className="">
                  inzio evento: <span> {format(new Date(ev?.startDate), "d-MMM-y hh:mm")}</span>
                </time>
              </p>
              <p>
                <time className="">
                  fine evento <span>{format(new Date(ev?.endDate), "d-MMM-y hh:mm")}</span>
                </time>
              </p>
              <p>{ev.description}</p>
              <div>
                <p className="eventPageIndirizzo">
                  Indirizzo: {ev.indirizzzo.citta}, {ev.indirizzzo.via}, numero{" "}
                  {ev.indirizzzo.civico}
                </p>
                <p className="eventPagePartecipanti">
                  numero massimo partecipanti: {ev.numMaxPartecipants}{" "}
                  <span>vai sul sito per avere più info</span>
                </p>
              </div>
            </Col>
          </Row>
        ) : (
          <></>
        )}
      </Container>
    </>
  );
};
export default EventsDetailsPage;
