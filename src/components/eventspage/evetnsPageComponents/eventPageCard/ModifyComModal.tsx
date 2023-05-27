import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form, FloatingLabel } from "react-bootstrap";
import { useState } from "react";
import useAuth from "../../../../auth/hooks/useAuth";
import { Icommento } from "../../../../interfaces/luoghiDiInteresseInt";
import { ToastContainer, toast } from "react-toastify";
interface modifyComProps {
  show: boolean;
  setShow: (show: boolean) => void;
  com: Icommento;
  updateF: any;
}
const ModifyComModal = ({ show, setShow, com, updateF }: modifyComProps) => {
  const { auth } = useAuth();
  const [titoloCom, setTitoloCom] = useState<string>(com.titoloCommento);
  const [contenutoCom, setContenutoCom] = useState<string>(com.contenuto);
  const [raitingCom, setRaitingCom] = useState<string>(com.raiting + "");
  const handleClose = () => {
    setShow(false);
  };

  const notifyOfInsucess = () =>
    toast.warn("Opss.. qualcosa è andato storto..", {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const commentoDto = {
      raitin: Number(raitingCom),
      contenuto: contenutoCom,
      titoloCommento: titoloCom,
    };
    try {
      const responce = await fetch("http://localhost:8081/comments/" + com.idCommento, {
        method: "PUT",
        body: JSON.stringify(commentoDto),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.accessToken,
        },
      });
      if (responce.ok) {
        console.log("tutto okk");
        handleClose();
        updateF();
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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modifica il tuo commento:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} style={{ margin: "20px" }}>
            <FloatingLabel label="Modifica il titolo" className="mb-3">
              <Form.Control
                type="test"
                placeholder="inserisci qui il tuo commento"
                value={titoloCom}
                onChange={(e) => {
                  setTitoloCom(e.target.value);
                }}
              />
            </FloatingLabel>
            <FloatingLabel label="Modifica il commento" className="mb-3">
              <Form.Control
                type="test"
                placeholder="inserisci qui il tuo commento"
                value={contenutoCom}
                onChange={(e) => {
                  setContenutoCom(e.target.value);
                }}
              />
            </FloatingLabel>
            <FloatingLabel label="raiting" className="mb-3">
              <Form.Control
                type="test"
                placeholder="Modifica il rating"
                value={raitingCom}
                onChange={(e) => {
                  setRaitingCom(e.target.value);
                }}
              />
            </FloatingLabel>
            <Button variant="primary" type="submit">
              Commenta
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </>
  );
};
export default ModifyComModal;
