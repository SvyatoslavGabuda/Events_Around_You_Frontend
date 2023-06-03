import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import { ToastContainer, toast } from "react-toastify";
import useAuth from "../../../auth/hooks/useAuth";

import { useAppDispatch } from "../../../app/hooks";
import { userProfileFetch } from "../../../app/slices/userProfileSlice";
import { Ievento } from "../../../interfaces/luoghiDiInteresseInt";
interface SponEvProps {
  show: boolean;
  setShow: (show: boolean) => void;
  ev: Ievento;
}
const SponsorEvModal = ({ show, setShow, ev }: SponEvProps) => {
  const { auth } = useAuth();
  const dispatch = useAppDispatch();
  const handleClose = () => {
    setShow(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8081/events/sponsor/" + ev.idLuogo, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + auth.accessToken,
          "content-type": "application/json",
        },
      });
      if (response.ok) {
        if (auth.username && auth.accessToken) {
          console.log("evento sponsorizzato");
          handleClose();

          dispatch(userProfileFetch({ username: auth.username, token: auth.accessToken }));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Stai sponsorizzando {ev.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Confermo di voler sponsorizzare" required />
            </Form.Group>
            <button className="modalBtbBasic" type="submit">
              Sponsorizza
            </button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="modalBtbBasic" variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </>
  );
};
export default SponsorEvModal;
