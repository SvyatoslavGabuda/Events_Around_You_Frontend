import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import { ToastContainer, toast } from "react-toastify";
import useAuth from "../../../auth/hooks/useAuth";
interface delEvProps {
  show: boolean;
  setShow: (show: boolean) => void;
  idCom: number;
  updateF: any;
}
const DelEvModal = ({ show, setShow }: delEvProps) => {
  const { auth } = useAuth();
  const handleClose = () => {
    setShow(false);
  };
  const notifyOfSucess = () =>
    toast.info("Commento Eliminato", {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  const notifyOfInsucess = () =>
    toast.warn("Opss.. qualcosa è andato storto..", {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8081/comments/", {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + auth.accessToken,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        console.log("ok");
        handleClose();
        notifyOfSucess();
        // updateF();
      } else {
        console.log("not ok");
        notifyOfInsucess();
      }
    } catch (error) {
      notifyOfInsucess();
      console.log(error);
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sicuro di voler eliminare questo commento?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="Confermo di voler eliminare il commento"
                required
              />
            </Form.Group>
            <button className="modalBtbBasic" type="submit">
              Elimina
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
export default DelEvModal;
