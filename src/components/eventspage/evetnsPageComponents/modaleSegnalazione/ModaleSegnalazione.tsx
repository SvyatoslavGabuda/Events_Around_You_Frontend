import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Ievento, IuserProfile } from "../../../../interfaces/luoghiDiInteresseInt";
import { useState } from "react";
import useAuth from "../../../../auth/hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";
interface modalProps {
  showS: boolean;
  setShowS: (show: boolean) => void;
  ev: Ievento;
  user: IuserProfile;
}
const ModaleSegnalazione = ({ showS, setShowS, ev, user }: modalProps) => {
  const { auth } = useAuth();
  const [con, setCon] = useState<string>("");
  const notifyOfSucess = () =>
    toast.info("Segnalazione inviata con sucesso", {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  const notifyOfInsucess = () =>
    toast.warn("Segnalazione non riuscita", {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  const handleClose = () => {
    setShowS(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const segnalazioneDto = {
      contenuto: con,
    };
    try {
      const response = await fetch(
        "http://localhost:8081/segnalazioni/" + user.idUtente + "/" + ev.idLuogo,
        {
          method: "POST",
          body: JSON.stringify(segnalazioneDto),
          headers: {
            Authorization: "Bearer " + auth.accessToken,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        notifyOfSucess();
      } else {
        notifyOfInsucess();
      }
    } catch (error) {
      console.log(error);
      notifyOfInsucess();
    }
  };
  return (
    <>
      <ToastContainer />
      <Modal show={showS} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Segnalazione per: {ev?.title}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <p>Ciao {user.username}</p>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Descrivi la motivazione della segnalazione</Form.Label>
              <Form.Control
                type="text"
                placeholder="es. questo contenuto è innapropriato"
                value={con}
                onChange={(e) => {
                  setCon(e.target.value);
                }}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <button className="modalBtbBasic" type="submit" onClick={handleClose}>
              Submit
            </button>
            <Button className="modalBtbBasic" variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};
export default ModaleSegnalazione;
