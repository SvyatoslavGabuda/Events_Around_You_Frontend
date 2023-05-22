import { Container, Row } from "react-bootstrap";
import Segnalazione from "./componetsAdminPage/Segnalazione";
import useAuth from "../../auth/hooks/useAuth";
import { useState, useEffect } from "react";
import { IuserProfile } from "../../interfaces/luoghiDiInteresseInt";
import { IIndirizzo } from "../../interfaces/luoghiDiInteresseInt";

export interface Isegnalazioni {
  id_segnalazione: number;
  contenuto: string;
  utenteSegnalatore: IuserProfile;
  cosaSegnalata: CosaSegnalata;
}
export interface CosaSegnalata {
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
const AdminPage = () => {
  const [segnalazioni, setSegnalazioni] = useState<Isegnalazioni[]>([]);
  const { auth } = useAuth();
  const loadSegnalazioni = async () => {
    try {
      const response = await fetch("http://localhost:8081/segnalazioni", {
        headers: {
          Authorization: "Bearer " + auth.accessToken,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setSegnalazioni(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadSegnalazioni();
  }, []);
  return (
    <>
      <Container>
        <Row>
          <h3>Segnalazioni da parte dei utenti</h3>
        </Row>
        <Row>
          {segnalazioni?.length > 0 ? (
            segnalazioni.map((s: Isegnalazioni) => (
              <Segnalazione key={s.id_segnalazione + "segnalazione"} segnalazione={s} />
            ))
          ) : (
            <></>
          )}
        </Row>
        <Row>
          <button>mostra segnalazioni archiviate</button>
        </Row>
      </Container>
    </>
  );
};
export default AdminPage;
