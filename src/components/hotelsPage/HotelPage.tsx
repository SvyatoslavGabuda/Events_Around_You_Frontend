import { Container, Row } from "react-bootstrap";
import HotelPageSearchBar from "./hotelPageSearchBar/HotelPageSearchBar";
import HotelPageCard from "./hotelPageComponets/HotelPageCard";
import UploadForm from "../uploadimg/UploadForm";
import VisualizzaImg from "../uploadimg/VisualizzaImg";

const HotelPage = () => {
  return (
    <>
      <Container>
        <Row>
          <HotelPageSearchBar />
        </Row>
        <Row>
          <h2>Hotel di maggiore tendenza:</h2>
        </Row>
        <HotelPageCard />
        <HotelPageCard />
        <HotelPageCard />
      </Container>
    </>
  );
};
export default HotelPage;
