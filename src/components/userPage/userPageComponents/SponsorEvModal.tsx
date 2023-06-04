import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import useAuth from "../../../auth/hooks/useAuth";

import { useAppDispatch } from "../../../app/hooks";
import { userProfileFetch } from "../../../app/slices/userProfileSlice";
import { Ievento } from "../../../interfaces/luoghiDiInteresseInt";
import StripePayment from "../../stripePay/StripePayment";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import DotsLoading from "../../spinner/DotsLoading";
import CardLoading from "../../spinner/CardLoading";
interface SponEvProps {
  show: boolean;
  setShow: (show: boolean) => void;
  ev: Ievento;
}
const SponsorEvModal = ({ show, setShow, ev }: SponEvProps) => {
  const { auth } = useAuth();
  const dispatch = useAppDispatch();
  const [success, setSucces] = useState(false);
  const [loading, setLoading] = useState(true);
  const notifyOfSucess = () =>
    toast.success("Evento Sponsorizzato!", {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  const notifyOfInsucess = () =>
    toast.warn("Opss.. qualcosa è andato storto..", {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  const handleClose = () => {
    setShow(false);
  };

  const sponsorEv = async () => {
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
          notifyOfSucess();
          handleClose();

          dispatch(userProfileFetch({ username: auth.username, token: auth.accessToken }));
        }
      }
    } catch (error) {
      notifyOfInsucess();
      console.log(error);
    }
  };
  useEffect(() => {
    // console.log({ success });
    if (success) {
      sponsorEv();
      setSucces(false);
    }
  }, [success]);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Stai sponsorizzando {ev.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Il costo della sponsorizzazione è di <strong>10 €</strong>. <br /> se sei sicuro di
            voler sponsorizzare "{ev.title}" allora procedi con il pagamento
          </p>

          {/* <CardLoading /> */}
          {loading && <CardLoading />}
          <StripePayment setSuccess={setSucces} loading={loading} setLoading={setLoading} />
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
