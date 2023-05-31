// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
// import Form from "react-bootstrap/Form";
import { Row, Col, Form, Modal, Button } from "react-bootstrap";

import { Ievento, IuserProfile } from "../../../interfaces/luoghiDiInteresseInt";
import { useState } from "react";
import useAuth from "../../../auth/hooks/useAuth";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { userProfileFetch } from "../../../app/slices/userProfileSlice";
interface mododalProps {
  show: boolean;
  setShow: (show: boolean) => void;
  ev: Ievento;
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
const ModificaEventoModal = ({ show, setShow, ev }: mododalProps) => {
  const { auth } = useAuth();
  const dispatch = useAppDispatch();
  const userProfile: IuserProfile = useAppSelector((state) => state.userProfile.userLogged);
  //dati per la modidica dei dati principali
  const [lat, setLat] = useState<number>(ev.lat);
  const [lng, setLng] = useState<number>(ev.lng);
  const [title, setTitle] = useState<string>(ev.title);
  const [subTitle, setSubTitle] = useState<string>(ev.subTitle);
  const [description, setDescription] = useState<string>(ev.description);
  const [startDate, setStartDate] = useState<Date>(new Date(ev.startDate));
  const [endDate, setEndDate] = useState<Date>(new Date(ev.endDate));
  const [duration, setDuration] = useState<number>(ev.duration);
  const [numMaxPartecipants, setNumMaxPartecipants] = useState<number>(ev.numMaxPartecipants);
  //dati per l'indirizzo del evento
  const [via, setVia] = useState<string>(ev.indirizzzo.via);
  const [civico, setCivico] = useState<number>(ev.indirizzzo.civico);
  const [citta, setCitta] = useState<string>(ev.indirizzzo.citta);
  const [cap, setCap] = useState<number>(ev.indirizzzo.cap);
  const [provincia, setProvincia] = useState<string>(ev.indirizzzo.provincia);
  // dati per l'immagine
  const [formData, setFormData] = useState<FormData>({ file: null });
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
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
      const response = await fetch("http://localhost:8081/events/generali/" + ev.idLuogo, {
        method: "PUT",
        body: JSON.stringify(EventoDto),
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + auth.accessToken,
        },
      });
      if (response.ok) {
        const data = await response.json();

        if (auth.username && auth.accessToken) {
          console.log("evento modificato con sucesso");
          dispatch(userProfileFetch({ username: auth.username, token: auth.accessToken }));
        }
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
      const response = await fetch("http://localhost:8081/events/" + ev.idLuogo, {
        method: "PUT",
        body: JSON.stringify(Indirizzo),
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + auth.accessToken,
        },
      });
      if (response.ok) {
        const data = await response.json();
        if (auth.username && auth.accessToken) {
          console.log("indirizzo modificato");
          dispatch(userProfileFetch({ username: auth.username, token: auth.accessToken }));
        }
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
      const response = await fetch("http://localhost:8081/events/img/" + ev.idLuogo, {
        method: "PUT",
        body: formDataToSend,
        headers: {
          Authorization: "Bearer " + auth.accessToken,
        },
      });
      if (response.ok) {
        if (auth.accessToken) {
          console.log("immagine caricata");
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
          <Modal.Title>Stai modificando: {ev.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="btnModifica">
            <h5>cosa vuoi modificare?</h5>
            <button
              onClick={() => {
                setShow1(true);
                setShow2(false);
                setShow3(false);
              }}
            >
              Informazioni generali
            </button>
            <button
              onClick={() => {
                setShow1(false);
                setShow2(true);
                setShow3(false);
              }}
            >
              indirizzo
            </button>
            <button
              onClick={() => {
                setShow1(false);
                setShow2(false);
                setShow3(true);
              }}
            >
              immagine
            </button>
          </div>
        </Modal.Body>
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
                        placeholder="Enter email"
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
                        placeholder="Enter email"
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
                    placeholder="Enter email"
                    onChange={(e) => setSubTitle(e.target.value)}
                    value={subTitle}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>desciption</Form.Label>
                  <Form.Control
                    as="textarea"
                    maxLength={255}
                    style={{ height: "120px" }}
                    placeholder="Enter email"
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
                        placeholder="Enter email"
                        value={startDate.toISOString().slice(0, -1)}
                        onChange={(e) => setStartDate(new Date(e.target.value))}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>endDate</Form.Label>
                      <Form.Control
                        type="datetime-local"
                        placeholder="Enter email"
                        value={endDate.toISOString().slice(0, -1)}
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
                        placeholder="Enter email"
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
                  Salva
                </button>
              </div>
            ) : (
              <></>
            )}
            {show2 && ev?.title ? (
              <div>
                <p>{ev.title}</p>
                <Form.Group className="mb-3">
                  <Form.Label>Cap</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter email"
                    onChange={(e) => setCap(Number(e.target.value))}
                    value={cap}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>civico</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter email"
                    onChange={(e) => setCivico(Number(e.target.value))}
                    value={civico}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>via</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter email"
                    onChange={(e) => setVia(e.target.value)}
                    value={via}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>citta</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter email"
                    onChange={(e) => setCitta(e.target.value)}
                    value={citta}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>provinca</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter email"
                    onChange={(e) => setProvincia(e.target.value)}
                    value={provincia}
                  />
                </Form.Group>
                <button
                  className="modalBtbBasic"
                  type="button"
                  onClick={(e) => {
                    handleSubmit2(e);
                  }}
                >
                  salva
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
                  salva
                </button>
              </div>
            ) : (
              <></>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="modalBtbBasic" variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModificaEventoModal;
