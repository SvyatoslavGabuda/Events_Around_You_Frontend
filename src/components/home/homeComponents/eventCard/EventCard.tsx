import "./eventCard.scss";
import { Col } from "react-bootstrap";
import format from "date-fns/format";
import { Ievento } from "../../../../interfaces/luoghiDiInteresseInt";
import useAuth from "../../../../auth/hooks/useAuth";
import { useAppDispatch } from "../../../../app/hooks";
import { useNavigate } from "react-router-dom";
import { getEventByID } from "../../../../app/slices/eventsSlices/eventByIdSlice";
import { RiShieldStarLine } from "react-icons/ri";
interface evProps {
  ev: Ievento;
}
const EventCard = ({ ev }: evProps) => {
  const { auth } = useAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <>
      <Col className="">
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
      </Col>
    </>
  );
};
export default EventCard;
