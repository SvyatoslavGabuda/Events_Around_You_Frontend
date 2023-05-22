import { Container, Row } from "react-bootstrap";
import AttractionCard from "./attractionComponents/AttractionCard";
import AttractionSearchbar from "./attractionSearchBar/AttractionSearchBar";

const AttractionPage = () => {
  return (
    <>
      <Container>
        <Row>
          <AttractionSearchbar />
        </Row>
        <Row>
          <h2>Attrazioni del momento:</h2>
        </Row>
        <AttractionCard />
        <AttractionCard />
        <AttractionCard />
      </Container>
    </>
  );
};
export default AttractionPage;
