import { Col, Row } from "react-bootstrap";
import { Isegnalazioni } from "../AdminPage";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../app/hooks";
import { getEventByID } from "../../../app/slices/eventsSlices/eventByIdSlice";
import useAuth from "../../../auth/hooks/useAuth";
import { userProfileByIDFetch } from "../../../app/slices/userProfileByIdSlice";

interface propsSeg {
  segnalazione: Isegnalazioni;
}
const Segnalazione = ({ segnalazione }: propsSeg) => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const archiviaSegnalazione = async () => {
    try {
      const response = await fetch(
        "http://localhost:8081/segnalazioni/stato/" + segnalazione.id_segnalazione,
        {
          method: "PUT",
          headers: {
            Authorization: "Bearer " + auth.accessToken,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        console.log("segnalazione archiviata");
      } else {
        console.log("si è verificato un errore");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const bloccaEvento = async () => {
    try {
      const response = await fetch(
        "http://localhost:8081/events/blocc/" + segnalazione.cosaSegnalata.idLuogo,
        {
          method: "PUT",
          headers: {
            Authorization: "Bearer " + auth.accessToken,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        console.log("evento bloccato");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="containerSegnalazione">
        <Row>
          <Col xs={12} md={6} lg={6}>
            <h6>Evento segnalato: {segnalazione.cosaSegnalata.title}</h6>
            <img
              style={{ width: "100px" }}
              src={segnalazione.cosaSegnalata.urlImage}
              alt="imagine evento"
            />

            <p>descrizione del evento: {segnalazione.cosaSegnalata.description}</p>
          </Col>
          <Col xs={12} md={6} lg={6}>
            <h6>
              Utente che ha segnalato: <br /> {segnalazione.utenteSegnalatore.username}
            </h6>
            <p>
              motivazione della segnalazione:
              <br /> {segnalazione.contenuto}
            </p>
          </Col>
        </Row>
        <div className="containerBottoniS">
          <button
            onClick={() => {
              navigate("/events/" + segnalazione.cosaSegnalata.idLuogo);
              dispatch(getEventByID({ id_eve: segnalazione.cosaSegnalata.idLuogo }));
            }}
          >
            vai all evento
          </button>
          <button
            onClick={() => {
              navigate("/user/" + segnalazione.utenteSegnalatore.idUtente);
            }}
          >
            vai all utente
          </button>
          <button onClick={archiviaSegnalazione}>
            {segnalazione.archiviato ? "Riprendi in esame" : "archivia"}
          </button>
          <button onClick={bloccaEvento}>
            {segnalazione.cosaSegnalata.bloccato ? "sblocca evento" : "blocca evento"}
          </button>
        </div>
      </div>
    </>
  );
};
export default Segnalazione;
