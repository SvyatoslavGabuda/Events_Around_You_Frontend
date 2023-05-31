import "./adminPage.scss";
import { Container, Row } from "react-bootstrap";
import Segnalazione from "./componetsAdminPage/Segnalazione";
import useAuth from "../../auth/hooks/useAuth";
import { useState, useEffect } from "react";
import { Ievento, IuserProfile } from "../../interfaces/luoghiDiInteresseInt";
import { IIndirizzo } from "../../interfaces/luoghiDiInteresseInt";
import Nav from "react-bootstrap/Nav";
import EventCardBloccati from "./componetsAdminPage/EventCardBloccati";

export interface Isegnalazioni {
  archiviato: boolean;
  id_segnalazione: number;
  contenuto: string;
  utenteSegnalatore: IuserProfile;
  cosaSegnalata: CosaSegnalata;
}
export interface CosaSegnalata {
  bloccato: boolean;
  idLuogo: number;
  lat: number;
  lng: number;
  title: string;
  subTitle: string;
  description: string;
  urlImage: string;
  raiting: number;
  indirizzzo: IIndirizzo;
  startDate: Date;
  endDate: Date;
  duration: number;
  numMaxPartecipants: number;
  sponsored: boolean;
  tipoEvento: null;
}
export interface IloadSegnalazioni {
  stato: boolean;
  token: string;
  setSegnalazioni: React.Dispatch<React.SetStateAction<Isegnalazioni[]>>;
}
export const loadSegnalazioni = async ({ stato, token, setSegnalazioni }: IloadSegnalazioni) => {
  try {
    const response = await fetch("http://localhost:8081/segnalazioni/archiviato/" + stato, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setSegnalazioni(data.content);
    }
  } catch (error) {
    console.log(error);
  }
};
export interface IloadEventiBloccati {
  token: string;
  setEvB: React.Dispatch<React.SetStateAction<Ievento[]>>;
}
export const loadEventiBloccati = async ({ token, setEvB }: IloadEventiBloccati) => {
  try {
    const response = await fetch("http://localhost:8081/events/bloccati", {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setEvB(data.content);
    }
  } catch (error) {
    console.log(error);
  }
};
const AdminPage = () => {
  const [segnalazioni, setSegnalazioni] = useState<Isegnalazioni[]>([]);
  const { auth } = useAuth();
  const [showSegnalazioni, setShowSegnalazioni] = useState(true);
  const [showSegnalazioniArc, setShowSegnalazioniArc] = useState(false);
  const [showEvBloccati, setShowEvBloccati] = useState(false);
  const [evB, setEvB] = useState<Ievento[]>([]);

  const handleEventiBloccati = async () => {
    if (auth.accessToken) {
      await loadEventiBloccati({ token: auth.accessToken, setEvB: setEvB });
    }
  };
  useEffect(() => {
    if (auth.accessToken) {
      loadSegnalazioni({ stato: false, token: auth.accessToken, setSegnalazioni: setSegnalazioni });
    }
  }, []);
  return (
    <>
      <Container style={{ minHeight: "80vh" }}>
        <Row>
          <Nav fill variant="tabs" defaultActiveKey="link-1" className="navAdmin">
            <Nav.Item>
              <Nav.Link
                eventKey="link-1"
                onClick={() => {
                  setShowSegnalazioni(true);
                  setShowSegnalazioniArc(false);
                  setShowEvBloccati(false);
                  if (auth.accessToken) {
                    loadSegnalazioni({
                      stato: false,
                      token: auth.accessToken,
                      setSegnalazioni: setSegnalazioni,
                    });
                  }
                }}
              >
                Segnalazioni
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="link-2"
                onClick={() => {
                  setShowSegnalazioni(false);
                  setShowSegnalazioniArc(true);
                  setShowEvBloccati(false);
                  if (auth.accessToken) {
                    loadSegnalazioni({
                      stato: true,
                      token: auth.accessToken,
                      setSegnalazioni: setSegnalazioni,
                    });
                  }
                }}
              >
                Segnalazioni Archiviate
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="link-3"
                onClick={() => {
                  setShowSegnalazioni(false);
                  setShowSegnalazioniArc(false);
                  setShowEvBloccati(true);
                  handleEventiBloccati();
                }}
              >
                Eventi Bloccati
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Row>

        {showSegnalazioni ? (
          <>
            <Row>
              <h3>Segnalazioni da parte dei utenti</h3>
            </Row>
            <Row>
              {segnalazioni?.length > 0 ? (
                segnalazioni.map((s: Isegnalazioni) => (
                  <Segnalazione
                    key={s.id_segnalazione + "segnalazione"}
                    segnalazione={s}
                    setSegnalazioni={setSegnalazioni}
                  />
                ))
              ) : (
                <></>
              )}
            </Row>
          </>
        ) : (
          <></>
        )}
        {showSegnalazioniArc ? (
          <>
            <Row>
              <h3>Segnalazioni archiviate</h3>
            </Row>
            <Row>
              {segnalazioni?.length > 0 ? (
                segnalazioni.map((s: Isegnalazioni) => (
                  <Segnalazione
                    key={s.id_segnalazione + "segnalazione"}
                    segnalazione={s}
                    setSegnalazioni={setSegnalazioni}
                  />
                ))
              ) : (
                <>
                  <p>non ci sono segnalazioni dai utenti</p>
                </>
              )}
            </Row>
          </>
        ) : (
          <></>
        )}
        {showEvBloccati ? (
          <>
            <Row>
              <h3>Eventi Sbloccati</h3>
            </Row>
            <Row className="row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 m-0 justify-content-center w-100">
              {evB?.length > 0 ? (
                evB.map((ev) => <EventCardBloccati ev={ev} setEvB={setEvB} />)
              ) : (
                <>
                  <p>non ci sono eventi bloccati</p>
                </>
              )}
            </Row>
          </>
        ) : (
          <></>
        )}
      </Container>
    </>
  );
};
export default AdminPage;
