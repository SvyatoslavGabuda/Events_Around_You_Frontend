import { Container, Row } from "react-bootstrap";
import ResturantSearchBar from "./resturantComponents/resturantSearchBar/ResturantSearchBar";
import ResturantCard from "./resturantComponents/resturandCard/ResturantCard";

const ResturantPage = () => {
  return (
    <>
      <Container>
        <Row>
          <ResturantSearchBar />
        </Row>
        <Row>
          <h2>Ristoranti di sucesso:</h2>
        </Row>
        <ResturantCard />
        <ResturantCard />
        <ResturantCard />
      </Container>
    </>
  );
};
export default ResturantPage;
