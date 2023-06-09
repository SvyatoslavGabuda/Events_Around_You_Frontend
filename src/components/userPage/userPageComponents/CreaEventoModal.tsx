import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import Form from "react-bootstrap/Form";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useEffect, useState } from "react";
import useAuth from "../../../auth/hooks/useAuth";
import { userProfileFetch } from "../../../app/slices/userProfileSlice";
import { Ievento, IuserProfile } from "../../../interfaces/luoghiDiInteresseInt";
import { Col, Row } from "react-bootstrap";

interface modalProps {
  show: boolean;
  setShow: any;
}
interface FormData {
  file: File | null;
}
interface Indirizzo {
  via: string;
  civico: number;
  citta: string;
  cap: number;
  provincia: string;
}
interface IEventoDto {
  lat: number;
  lng: number;
  title: string;
  subTitle: string;
  description: string;
  startDate: Date;
  endDate: Date;
  // startTime: Date;
  duration: number;
  numMaxPartecipants: number;
  creatore: number;
}
const CreaEventoModal = ({ show, setShow }: modalProps) => {
  const { auth } = useAuth();
  const dispatch = useAppDispatch();
  const userProfile: IuserProfile = useAppSelector((state) => state.userProfile.userLogged);
  // Ho dato dei valori di defaut per una creazione più veloce durante il testing
  const [lat, setLat] = useState<number>(45.463221);
  const [lng, setLng] = useState<number>(9.204529);
  const [title, setTitle] = useState<string>("Capstone Presentation");
  const [subTitle, setSubTitle] = useState<string>("My Capstone Presentation");
  const [description, setDescription] = useState<string>(
    "My Capstone Presentation: A culmination of hard work, creativity, and passion. Excited to share my journey and insights"
  );
  const [formData, setFormData] = useState<FormData>({ file: null });
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [duration, setDuration] = useState<number>(3);
  const [numMaxPartecipants, setNumMaxPartecipants] = useState<number>(50);
  //dati per l'indirizzo del evento
  const [via, setVia] = useState<string>("via Roma");
  const [civico, setCivico] = useState<number>(20);
  const [citta, setCitta] = useState<string>("Milano");
  const [cap, setCap] = useState<number>(20120);
  const [provincia, setProvincia] = useState<string>("Lombardia");
  //controllo di avvenuto salvataggio
  const [eventoSalvato, setEventoSalvato] = useState<Ievento | null>(null);

  const handleClose = () => setShow(false);
  //apertura e chiusura parti del modale
  const [show1, setShow1] = useState(true);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFormData({ file: event.target.files[0] });
    }
  };
  const handleSubmit1 = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const EventoDto: IEventoDto = {
      lat: lat,
      lng: lng,
      title: title,
      subTitle: subTitle,
      description: description,
      startDate: startDate,
      endDate: endDate,
      duration: duration,
      numMaxPartecipants: numMaxPartecipants,
      creatore: userProfile.idUtente,
    };

    try {
      const response = await fetch("http://localhost:8081/events", {
        method: "POST",
        body: JSON.stringify(EventoDto),
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + auth.accessToken,
        },
      });
      if (response.ok) {
        const data = await response.json();
        // console.log(data);
        setEventoSalvato(data);
        setShow1(false);
        setShow2(true);
      } else {
        console.log("errore");
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
  const handleSubmit2 = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const Indirizzo: Indirizzo = {
      via: via,
      civico: civico,
      citta: citta,
      cap: cap,
      provincia: provincia,
    };
    try {
      const response = await fetch("http://localhost:8081/events/" + eventoSalvato?.idLuogo, {
        method: "PUT",
        body: JSON.stringify(Indirizzo),
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + auth.accessToken,
        },
      });
      if (response.ok) {
        const data = await response.json();
      } else {
        console.log("errore");
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
  const handleSubmit3 = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("file", formData.file as Blob);
    console.log("Bearer " + auth.accessToken);
    try {
      const response = await fetch("http://localhost:8081/events/img/" + eventoSalvato?.idLuogo, {
        method: "PUT",
        body: formDataToSend,
        headers: {
          Authorization: "Bearer " + auth.accessToken,
        },
      });
      if (response.ok) {
        // console.log("immagine caricata");
        handleClose();
        setShow1(true);
        setShow3(false);
        if (auth.accessToken) {
          dispatch(userProfileFetch({ username: userProfile.username, token: auth.accessToken }));
        }
      } else {
        console.log("errore");
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Crea il tuo Evento!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {show1 ? (
              <div>
                <Row>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>lat</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter lat"
                        onChange={(e) => setLat(Number(e.target.value))}
                        value={lat}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>lng</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Lng"
                        onChange={(e) => setLng(Number(e.target.value))}
                        value={lng}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Label>title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter email"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>SubTitle</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Subtitle"
                    onChange={(e) => setSubTitle(e.target.value)}
                    value={subTitle}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>desciption</Form.Label>
                  <Form.Control
                    as="textarea"
                    maxLength={255}
                    placeholder="Enter a description"
                    style={{ height: "120px" }}
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                  />
                </Form.Group>

                <Row>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>startDate</Form.Label>
                      <Form.Control
                        type="datetime-local"
                        placeholder="Enter time"
                        onChange={(e) => setStartDate(new Date(e.target.value))}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>endDate</Form.Label>
                      <Form.Control
                        type="datetime-local"
                        placeholder="Enter time"
                        onChange={(e) => setEndDate(new Date(e.target.value))}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>duration in minutes</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter a duration in min"
                        onChange={(e) => setDuration(Number(e.target.value))}
                        value={duration}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Number of max part</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter email"
                        onChange={(e) => setNumMaxPartecipants(Number(e.target.value))}
                        value={numMaxPartecipants}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <button
                  className="modalBtbBasic"
                  type="button"
                  onClick={(e) => {
                    handleSubmit1(e);
                  }}
                >
                  next
                </button>
              </div>
            ) : (
              <></>
            )}
            {show2 && eventoSalvato?.title ? (
              <div>
                <p>{eventoSalvato?.title}</p>
                <Form.Group className="mb-3">
                  <Form.Label>Cap</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter cap"
                    onChange={(e) => setCap(Number(e.target.value))}
                    value={cap}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>civico</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter n civico"
                    onChange={(e) => setCivico(Number(e.target.value))}
                    value={civico}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>via</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter via"
                    onChange={(e) => setVia(e.target.value)}
                    value={via}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>citta</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter citta"
                    onChange={(e) => setCitta(e.target.value)}
                    value={citta}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>provinca</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter provincia"
                    onChange={(e) => setProvincia(e.target.value)}
                    value={provincia}
                  />
                </Form.Group>
                <button
                  className="modalBtbBasic"
                  type="button"
                  onClick={(e) => {
                    handleSubmit2(e);
                    setShow2(false);
                    setShow3(true);
                  }}
                >
                  next
                </button>
              </div>
            ) : (
              <></>
            )}
            {show3 ? (
              <div>
                <Form.Group className="mb-3">
                  <Form.Label>Load image</Form.Label>
                  <Form.Control type="file" placeholder="Enter email" onChange={handleChange} />
                </Form.Group>
                <button
                  className="modalBtbBasic"
                  type="button"
                  onClick={(e) => {
                    handleSubmit3(e);
                  }}
                >
                  finish
                </button>
              </div>
            ) : (
              <></>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <p>Pagina {show1 ? "1/3" : show2 ? "2/3" : "3/3"}</p>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default CreaEventoModal;
