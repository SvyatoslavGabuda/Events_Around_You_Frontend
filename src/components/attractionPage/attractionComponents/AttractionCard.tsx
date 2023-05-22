import "./attractionCard.scss";
import { Row, Col, Form, Button, FloatingLabel } from "react-bootstrap";
import { useState } from "react";
import { BsFillStarFill } from "react-icons/bs";
const AttractionCard = () => {
  const [showCommenti, setShowCommenti] = useState(false);
  const [addComment, setAddComment] = useState(false);
  const handleSubmit = (e: any) => {
    e.preventDefault();
  };
  return (
    <>
      <Row className="py-3 justify-content-center">
        <Col xs={12} className="py-0">
          <div className="attractionPageCard">
            <div className="attractionPageTexImageContainerWrapper">
              <div className="attractionPageTexImageContainer">
                <img
                  src="https://cdn.pixabay.com/photo/2020/05/17/12/56/rome-5181486_960_720.jpg"
                  alt=""
                />
              </div>
            </div>
            <div className="attractionPageTexContainer">
              <h2 className="attractionPageTitolo">Titolo attractiono</h2>

              <p className="attractionPagedescrizione">
                descrizione attractiono Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Error, veritatis quasi autem fuga repudiandae nobis sint facere magnam, excepturi
                ipsam doloremque earum aperiam quisquam, commodi impedit. At vel eum rerum!
              </p>
              <div>
                <p className="attractionPageIndirizzo">Indirizzo: Roma, via Roma, numero 4</p>
                <p className="attractionPagePartecipanti">
                  <span>vai sul sito per avere più info</span>
                </p>
              </div>
              <div className="attractionPageButtonContainer">
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
    </>
  );
};
export default AttractionCard;
