import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import { ToastContainer, toast } from "react-toastify";
import useAuth from "../../../auth/hooks/useAuth";
import { eliminaEvento } from "./EventCardUser";
import { useDispatch } from "react-redux";
import { useAppDispatch } from "../../../app/hooks";
import { userProfileFetch } from "../../../app/slices/userProfileSlice";
interface delEvProps {
  show: boolean;
  setShow: (show: boolean) => void;
  idEv: number;
  token: string;
  username: string;
}
const DelEvModal = ({ show, setShow, idEv, token, username }: delEvProps) => {
  const dispatch = useAppDispatch();
  const handleClose = () => {
    setShow(false);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await eliminaEvento({ idEv: idEv, token: token, username: username });
    dispatch(userProfileFetch({ username: username, token: token }));
    handleClose();
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sicuro di voler eliminare questo Evento?</Modal.Title>
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
