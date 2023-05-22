import { Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { hideLoginM } from "../../app/slices/loginModalSlice";
import LoginForm from "./LoginForm";

const LoginModal = () => {
  const dispatch = useAppDispatch();
  const show = useAppSelector((state) => state.loginModal.show);
  const handleClose = () => dispatch(hideLoginM());

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Welcome Back!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoginForm inModal={true} />
        </Modal.Body>
      </Modal>
    </>
  );
};
export default LoginModal;
