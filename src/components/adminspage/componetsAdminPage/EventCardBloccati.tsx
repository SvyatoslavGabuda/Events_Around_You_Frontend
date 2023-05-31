import { Col } from "react-bootstrap";
import { Ievento } from "../../../interfaces/luoghiDiInteresseInt";
import useAuth from "../../../auth/hooks/useAuth";
import { bloccaEvento } from "./Segnalazione";
import { eliminaEvento } from "../../userPage/userPageComponents/EventCardUser";
import { loadEventiBloccati } from "../AdminPage";

interface props {
  ev: Ievento;
  setEvB: React.Dispatch<React.SetStateAction<Ievento[]>>;
}
const EventCardBloccati = ({ ev, setEvB }: props) => {
  const { auth } = useAuth();
  const handleBloccaEvento = async () => {
    if (auth.accessToken) {
      await bloccaEvento({ idEv: ev.idLuogo, token: auth.accessToken });
      await loadEventiBloccati({ token: auth.accessToken, setEvB: setEvB });
    }
  };
  const handleEliminaEvento = async () => {
    if (auth.accessToken && auth.username) {
      await eliminaEvento({ idEv: ev.idLuogo, token: auth.accessToken, username: auth.username });
      await loadEventiBloccati({ token: auth.accessToken, setEvB: setEvB });
    }
  };
  return (
    <>
      <Col className="containerEvCardB">
        <div className="evCardBimgCont">
          <img src={ev.urlImage} alt="ev pic" />
        </div>
        <div className="evCardBTextCont">
          <h4>{ev.title}</h4>
          <h5>{ev.subTitle}</h5>
          <p>{ev.description}</p>
          <p>creato da : {ev.creatore.username}</p>
        </div>
        <div>
          <button className="modalBtbBasic" onClick={handleEliminaEvento}>
            elimina
          </button>
          <button className="modalBtbBasic" onClick={handleBloccaEvento}>
            Sblocca
          </button>
        </div>
      </Col>
    </>
  );
};
export default EventCardBloccati;
