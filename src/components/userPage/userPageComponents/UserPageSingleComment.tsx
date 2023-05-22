import { Col, Row } from "react-bootstrap";

import format from "date-fns/format";
import { Icommento } from "../../../interfaces/luoghiDiInteresseInt";
import { Link } from "react-router-dom";
interface commento {
  commento: Icommento;
}
const UserPageSingleComment = ({ commento }: commento) => {
  return (
    <>
      <Row className="singleCommentContainer">
        <Col xs={12} md={6} lg={8} className="commentBody">
          <h5>
            {commento.titoloCommento} raiting:{commento.raiting}
          </h5>
          <p>{commento.contenuto}</p>
          <time>data: {format(new Date(commento.dataCommento), "HH:mm d-MMM-y")}</time>
        </Col>
        <Col xs={12} md={6} lg={4} className="elementCommented">
          <img
            src={commento.luogoCommentato.urlImage}
            alt="immagine evento"
            className="imgCommento"
          />
          <div className="d-flex  justify-content-between align-items-center">
            <h4>{commento.luogoCommentato.title}</h4>
            <Link to={`/events/${commento.luogoCommentato.idLuogo}`} className="linkToEvent">
              pagina del evento
            </Link>
          </div>
        </Col>
      </Row>
    </>
  );
};
export default UserPageSingleComment;
