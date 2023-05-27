import { Col } from "react-bootstrap";
import format from "date-fns/format";
import { Ievento } from "../../../interfaces/luoghiDiInteresseInt";
import { useNavigate } from "react-router-dom";
import { RiShieldStarLine } from "react-icons/ri";
import { useAppDispatch } from "../../../app/hooks";
import useAuth from "../../../auth/hooks/useAuth";
import { getEventByID } from "../../../app/slices/eventsSlices/eventByIdSlice";
import { useState } from "react";
import ModificaEventoModal from "./ModificaEventoModal";
interface evProps {
  ev: Ievento;
}
const EventCardUser = ({ ev }: evProps) => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);
  const eliminaEvento = async (id: string) => {
    try {
      const response = await fetch("http://localhost:8081/events/" + id, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + auth.accessToken,
          "content-type": "application/json",
        },
      });
      if (response.ok) {
        console.log("evento eliminato");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const sponsorizzaEvento = async (id: string) => {
    try {
      const response = await fetch("http://localhost:8081/events/sponsor/" + id, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + auth.accessToken,
          "content-type": "application/json",
        },
      });
      if (response.ok) {
        console.log("evento sponsorizzato");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Col className="userEventCard">
        <div
          className="eventCard"
          style={{
            backgroundImage:
              ev?.urlImage === null
                ? "url(https://images.unsplash.com/photo-1516051662687-567d7c4e8f6a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1868&q=80)"
                : `url(${ev.urlImage})`,
          }}
        >
          <div className="eventCardInner">
            <h2 className="eventCardTitle">{ev.title}</h2>
            <p className="eventCardSubtitle">{ev.subTitle}</p>
            <p className="eventCardTime">
              {ev?.startDate !== null
                ? format(new Date(ev.startDate), "d-MMM-y")
                : "data non inserita"}
            </p>
            {ev.sponsored ? (
              <span className="eventCardSpons">
                <RiShieldStarLine />
              </span>
            ) : (
              <></>
            )}
            <button
              className="eventCardButton"
              onClick={() => {
                navigate("/events/" + ev.idLuogo);

                dispatch(getEventByID({ id_eve: ev.idLuogo }));
              }}
            >
              Info
            </button>
          </div>
        </div>
        <div className="containerBtnGestioneEv">
          <button
            onClick={() => {
              sponsorizzaEvento("" + ev.idLuogo);
            }}
          >
            sponsorizza
          </button>
          <button
            onClick={() => {
              setShow(true);
            }}
          >
            modifica
          </button>
          <ModificaEventoModal show={show} setShow={setShow} ev={ev} />
          <button
            onClick={() => {
              eliminaEvento("" + ev.idLuogo);
            }}
          >
            elimina
          </button>
        </div>
        {ev.bloccato && (
          <div className="eventoBloccato">
            <p>questo evento è stato bloccato</p>
          </div>
        )}
      </Col>
    </>
  );
};
export default EventCardUser;
