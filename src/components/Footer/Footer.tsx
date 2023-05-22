import { Container, Row, Col } from "react-bootstrap";
import "./footer.scss";
const Footer = () => {
  return (
    <>
      <Container>
        <Row className="justify-content-center">
          <footer className="text-center">
            <p>Events Aroud You </p>© {new Date().toLocaleDateString()}
          </footer>
        </Row>
      </Container>
    </>
  );
};
export default Footer;
