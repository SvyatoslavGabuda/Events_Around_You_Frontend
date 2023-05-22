import { Col, Row } from "react-bootstrap";
import { Isegnalazioni } from "../AdminPage";

interface propsSeg {
  segnalazione: Isegnalazioni;
}
const Segnalazione = ({ segnalazione }: propsSeg) => {
  return (
    <>
      <div>
        <Row>
          <Col xs={12} md={6} lg={3}>
            <h6>Evento segnalato: {segnalazione.cosaSegnalata.title}</h6>
            <img
              style={{ width: "100px" }}
              src={segnalazione.cosaSegnalata.urlImage}
              alt="imagine evento"
            />

            <p>descrizione del evento: {segnalazione.cosaSegnalata.description}</p>
          </Col>
          <Col>
            <h6>
              Utente che ha segnalato: <br /> {segnalazione.utenteSegnalatore.username}
            </h6>
            <p>
              motivazione della segnalazione:
              <br /> {segnalazione.contenuto}
            </p>
          </Col>
        </Row>
        <div>
          <button>vai all evento:</button>
          <button>vai all utente:</button>
          <button>archivia segnalazione</button>
          <button>blocca evento</button>
        </div>
      </div>
    </>
  );
};
export default Segnalazione;
