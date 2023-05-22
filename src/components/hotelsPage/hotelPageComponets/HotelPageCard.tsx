import "./hotelPaceCard.scss";
import { Row, Col, Form, Button, FloatingLabel } from "react-bootstrap";
import { useState } from "react";
import { BsFillStarFill } from "react-icons/bs";
const HotelPageCard = () => {
  const [showCommenti, setShowCommenti] = useState(false);
  const [addComment, setAddComment] = useState(false);
  const handleSubmit = (e: any) => {
    e.preventDefault();
  };
  return (
    <Row className="py-3 justify-content-center">
      <Col xs={12} className="py-0">
        <div className="hotelPageCard">
          <div className="hotelPageTexImageContainerWrapper">
            <div className="hotelPageTexImageContainer">
              <img
                src="https://cdn.pixabay.com/photo/2016/06/10/01/05/hotel-room-1447201_960_720.jpg"
                alt=""
              />
            </div>
          </div>
          <div className="hotelPageTexContainer">
            <h2 className="hotelPageTitolo">Titolo hotelo</h2>
            <h3 className="hotelPageSottoTitolo">
              <BsFillStarFill />
              <BsFillStarFill />
              <BsFillStarFill />
              <BsFillStarFill />
            </h3>

            <p className="hotelPagedescrizione">
              descrizione hotelo Lorem ipsum dolor sit amet consectetur adipisicing elit. Error,
              veritatis quasi autem fuga repudiandae nobis sint facere magnam, excepturi ipsam
              doloremque earum aperiam quisquam, commodi impedit. At vel eum rerum!
            </p>
            <div>
              <p className="hotelPageIndirizzo">Indirizzo: Roma, via Roma, numero 4</p>
              <p className="hotelPagePartecipanti">
                hotelo a numero chiuso <span>vai sul sito per avere più info</span>
              </p>
            </div>
            <div className="hotelPageButtonContainer">
              <button>Info</button>
              <button
                onClick={() => {
                  setShowCommenti(!showCommenti);
                }}
              >
                Guarda i commenti
              </button>
              <button>segnala</button>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};
export default HotelPageCard;
