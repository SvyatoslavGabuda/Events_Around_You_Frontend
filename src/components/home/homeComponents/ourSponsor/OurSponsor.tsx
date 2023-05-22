import { Row } from "react-bootstrap";
import "./ourSponsor.scss";
const OurSponsor = () => {
  return (
    <>
      <Row className="ourSponsor ">
        <div className="containerSponsor">
          <div className="trapezio1Wrapper">
            <div className="trapezio1">
              {" "}
              <img src="http://www.ranaan.us/2020/immagini/ulisse.jpg" alt="" /> 1
            </div>
          </div>
          <div className="trapezio2Wrapper">
            <div className="trapezio2">
              {" "}
              <img src="http://www.ranaan.us/2020/immagini/ulisse.jpg" alt="" /> 2
            </div>
          </div>
          <div className="trapezio3Wrapper">
            <div className="trapezio3">
              {" "}
              <img src="http://www.ranaan.us/2020/immagini/ulisse.jpg" alt="" />
            </div>
          </div>
          <div className="trapezio4Wrapper">
            <div className="trapezio4">
              {" "}
              <img src="http://www.ranaan.us/2020/immagini/ulisse.jpg" alt="" /> 4
            </div>
          </div>
          <div className="esagonoWrapper">
            <div className="esagono">
              <img src="http://www.ranaan.us/eventimedievali/immagini/sfondo_17.jpg" alt="" />
            </div>
          </div>
        </div>
      </Row>
    </>
  );
};
export default OurSponsor;
