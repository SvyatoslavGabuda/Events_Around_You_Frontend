import { Row, Col, Form, Button, FloatingLabel } from "react-bootstrap";
import "./eventPageCard.scss";
import { useState, useEffect } from "react";
import CommentoEventPage from "./CommentoEventPage";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import useAuth from "../../../../auth/hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

import { FcInfo } from "react-icons/fc";
import { FaArrowCircleLeft } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { showLoginM } from "../../../../app/slices/loginModalSlice";

import format from "date-fns/format";
import { likeEvFetch, userLikes } from "../../../../app/slices/eventsSlices/eventLikeSlice";
import { Icommento, Ievento, IuserProfile } from "../../../../interfaces/luoghiDiInteresseInt";
import ModaleSegnalazione from "../modaleSegnalazione/ModaleSegnalazione";
import { getEventByID } from "../../../../app/slices/eventsSlices/eventByIdSlice";
import { TbInfoSquareRounded } from "react-icons/tb";
import { GoCommentDiscussion, GoReport } from "react-icons/go";
import { BiCommentAdd } from "react-icons/bi";

interface evProps {
  ev: Ievento;
  updateF: any;
}
const EventPageCard = ({ ev, updateF }: evProps) => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const userProfile: IuserProfile = useAppSelector((state) => state.userProfile.userLogged);
  const userlikes: number[] = useAppSelector((state) => state.likeDaUtenu.userLikes);
  const dispatch = useAppDispatch();
  const [showCommenti, setShowCommenti] = useState(false);
  const [addComment, setAddComment] = useState(false);

  const [titoloCom, setTitoloCom] = useState<string>("");
  const [contenutoCom, setContenutoCom] = useState<string>("");
  const [raitingCom, setRaitingCom] = useState<string>("");
  //modale Segnalazioni
  const [showS, setShowS] = useState(false);
  const handleShow = () => setShowS(true);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const commentoDto = {
      raitin: Number(raitingCom),
      contenuto: contenutoCom,
      titoloCommento: titoloCom,
    };
    try {
      const responce = await fetch(
        "http://localhost:8081/comments/" + userProfile.idUtente + "/" + ev.idLuogo,
        {
          method: "POST",
          body: JSON.stringify(commentoDto),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.accessToken,
          },
        }
      );
      if (responce.ok) {
        console.log("tutto okk");
        setTitoloCom("");
        setRaitingCom("");
        setContenutoCom("");
        updateF();
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log("effect like");
    userProfile?.likes?.forEach((ev) => dispatch(userLikes(ev.idLuogo)));
  }, []);
  return (
    <>
      <Row className="py-3 justify-content-center">
        <Col xs={12} className="py-0">
          <div className="eventPageCard">
            <div className="eventPageTexContainer">
              <h2 className="eventPageTitolo">{ev.title}</h2>
              <h3 className="eventPageSottoTitolo">{ev.subTitle}</h3>
              <div className="eventoPageTimeContainer">
                <time className="eventPageTime">
                  inzio evento: <span> {format(new Date(ev.startDate), "d-MMM-y hh:mm")}</span>
                </time>
                <time className="eventPageTime">
                  fine evento: <span>{format(new Date(ev.endDate), "d-MMM-y hh:mm")}</span>
                </time>
              </div>
              <p className="eventPagedescrizione">{ev.description}</p>
              <div>
                <p className="eventPageIndirizzo">
                  Indirizzo: {ev.indirizzzo.citta}, {ev.indirizzzo.via}, numero{" "}
                  {ev.indirizzzo.civico}
                </p>
                <p className="eventPagePartecipanti">
                  numero massimo partecipanti: {ev.numMaxPartecipants}{" "}
                  <span>vai sul sito per avere più info</span>
                </p>
              </div>
              <div className="eventPageButtonContainer">
                <button
                  onClick={() => {
                    navigate("/events/" + ev.idLuogo);

                    dispatch(getEventByID({ id_eve: ev.idLuogo }));
                  }}
                >
                  <TbInfoSquareRounded style={{ fontSize: "1.3rem" }} />
                </button>
                <button
                  onClick={() => {
                    setShowCommenti(!showCommenti);
                  }}
                >
                  {ev.commenti.length} <GoCommentDiscussion style={{ fontSize: "1.3rem" }} />
                </button>
                <button
                  onClick={(e) => {
                    if (auth.accessToken) {
                      dispatch(
                        likeEvFetch({
                          token: auth.accessToken,
                          id_user: userProfile.idUtente,
                          id_eve: ev.idLuogo,
                        })
                      );
                      dispatch(userLikes(ev.idLuogo));
                    }
                  }}
                >
                  {ev.likeDaUtenti.length}
                  {
                    /* {ev.likeDaUtenti.find((u) => u.username === userProfile.username) || */
                    userlikes?.includes(ev.idLuogo) ? (
                      <AiFillHeart style={{ fontSize: "1.3rem" }} />
                    ) : (
                      <AiOutlineHeart style={{ fontSize: "1.3rem" }} />
                    )
                  }
                </button>
                {auth.accessToken ? (
                  <>
                    <button onClick={handleShow}>
                      <GoReport style={{ fontSize: "1.3rem" }} />
                    </button>
                    <ModaleSegnalazione
                      showS={showS}
                      setShowS={setShowS}
                      ev={ev}
                      user={userProfile}
                    />
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="eventPageTexImageContainerWrapper">
              <div className="eventPageTexImageContainer">
                <img src={ev.urlImage} alt="immagine ev" />
              </div>
            </div>
          </div>
        </Col>
        {showCommenti ? (
          auth.username ? (
            <Col xs={12} className="sezioneCommenti">
              <button
                onClick={() => {
                  setAddComment(!addComment);
                }}
              >
                <BiCommentAdd />
              </button>
              {addComment ? (
                <Form onSubmit={handleSubmit} style={{ margin: "20px" }}>
                  <FloatingLabel label="Titolo del tuo commento" className="mb-3">
                    <Form.Control
                      type="test"
                      placeholder="inserisci qui il tuo commento"
                      value={titoloCom}
                      onChange={(e) => {
                        setTitoloCom(e.target.value);
                      }}
                    />
                  </FloatingLabel>
                  <FloatingLabel label="inserisci qui il tuo commento" className="mb-3">
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
                      placeholder="inserisci qui il tuo commento"
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
              ) : (
                <></>
              )}{" "}
              {ev?.commenti?.length > 0 ? (
                <>
                  {[...ev.commenti]
                    .sort(
                      (a: Icommento, b: Icommento) =>
                        new Date(b.dataCommento).getTime() - new Date(a.dataCommento).getTime()
                    )
                    .map((com) => (
                      <CommentoEventPage
                        com={com}
                        key={com.idCommento + "commento" + ev.idLuogo}
                        updateF={() => updateF()}
                      />
                    ))}
                </>
              ) : (
                <>
                  <p>non ci sono commenti</p>
                </>
              )}
            </Col>
          ) : (
            <>
              {" "}
              <Row>
                <Col className="d-flex justify-content-start">
                  <p className="warningMessage">
                    <FcInfo /> Effetua il login per visualizzare i commenti!{" "}
                    <span
                      onClick={() => {
                        dispatch(showLoginM());
                      }}
                    >
                      Login
                    </span>{" "}
                    <FaArrowCircleLeft />
                    <br /> Non sei reggistrato? <Link to="/register">Registarti! </Link>
                    <FaArrowCircleLeft />{" "}
                  </p>
                </Col>
              </Row>
            </>
          )
        ) : (
          <></>
        )}
      </Row>
    </>
  );
};
export default EventPageCard;
