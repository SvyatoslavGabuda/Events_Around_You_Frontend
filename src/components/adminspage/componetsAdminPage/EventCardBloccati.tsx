import { Col } from "react-bootstrap";
import { Ievento } from "../../../interfaces/luoghiDiInteresseInt";

interface props {
  ev: Ievento;
}
const EventCardBloccati = ({ ev }: props) => {
  return (
    <>
      <Col className="containerEvCardB">
        <div className="evCardBimgCont">
          <img src={ev.urlImage} alt="ev pic" />
        </div>
        <div className="evCardBTextCont">
          <h4>{ev.title}</h4>
          <h5>{ev.subTitle}</h5>
          <p>{ev.description}</p>
          <p>creato da : {ev.creatore.username}</p>
        </div>
      </Col>
    </>
  );
};
export default EventCardBloccati;
