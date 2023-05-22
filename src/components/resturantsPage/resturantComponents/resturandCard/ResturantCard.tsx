import { Row, Col, Form, Button, FloatingLabel } from "react-bootstrap";
import { useState } from "react";
import { BsFillStarFill } from "react-icons/bs";
import "./resturantCard.scss";
const ResturantCard = () => {
  const [showCommenti, setShowCommenti] = useState(false);
  const [addComment, setAddComment] = useState(false);
  const handleSubmit = (e: any) => {
    e.preventDefault();
  };
  return (
    <>
      <Row className="py-3 justify-content-center">
        <Col xs={12} className="py-0">
          <div className="resturantPageCard">
            <div className="resturantPageTexContainer">
              <h2 className="resturantPageTitolo">Titolo resturanto</h2>

              <p className="resturantPagedescrizione">
                descrizione resturanto Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Error, veritatis quasi autem fuga repudiandae nobis sint facere magnam, excepturi
                ipsam doloremque earum aperiam quisquam, commodi impedit. At vel eum rerum!
              </p>
              <div>
                <p className="resturantPageIndirizzo">Indirizzo: Roma, via Roma, numero 4</p>
                <p className="resturantPagePartecipanti">
                  <span>vai sul sito per avere più info</span>
                </p>
              </div>
              <div className="resturantPageButtonContainer">
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
            <div className="resturantPageTexImageContainerWrapper">
              <div className="resturantPageTexImageContainer">
                <img
                  src="https://cdn.pixabay.com/photo/2021/12/22/15/02/resturant-6887758_960_720.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};
export default ResturantCard;
