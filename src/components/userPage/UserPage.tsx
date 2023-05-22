import { Col, Container, Row } from "react-bootstrap";
import "./userPage.scss";
import { useAppSelector } from "../../app/hooks";

import UserPageSingleComment from "./userPageComponents/UserPageSingleComment";
import UploadUserProfileImage from "./userPageComponents/UploadUserProfileImage";
import { BsFillCameraFill } from "react-icons/bs";
import { useState } from "react";
import CreaEventoModal from "./userPageComponents/CreaEventoModal";
import EventCardUser from "./userPageComponents/EventCardUser";
import { IuserProfile } from "../../interfaces/luoghiDiInteresseInt";
import { FaUserSecret, FaUserGraduate, FaUser } from "react-icons/fa";

const UserPage = () => {
  const userProfile: IuserProfile = useAppSelector((state) => state.userProfile.userLogged);
  const [show, setShow] = useState(false);
  const [showMEv, setShowMEv] = useState(false);

  const handleShow = () => setShow(true);
  const handleShowEv = () => setShowMEv(true);
  return (
    <>
      {
        <Container className="profileContainer">
          <Row>
            <Col xs={12} sm={6} className="d-flex justify-content-center ">
              <div className="profilePic ">
                {userProfile?.urlImmagineProfilo !== null ? (
                  <img src={userProfile.urlImmagineProfilo} alt="profile pic" />
                ) : (
                  <img
                    src="https://placehold.co/600x400"
                    alt="profile pic"
                    className="profilePic"
                  />
                )}
                <button className="updateFotoButton" onClick={handleShow}>
                  <BsFillCameraFill />
                </button>
              </div>

              <UploadUserProfileImage show={show} setShow={setShow} />
            </Col>
            {userProfile?.username ? (
              <Col
                xs={12}
                sm={4}
                className="d-flex flex-column justify-content-center mx-2 mx-sm-0"
              >
                <h3 className="text-center text-sm-start">
                  {userProfile.name} {userProfile.lastname}
                </h3>

                <h5 className="text-center text-sm-start">
                  Con noi da: {userProfile.dataReggistrazione}
                </h5>
              </Col>
            ) : (
              <>
                <p>problema di caricamento del</p>
              </>
            )}
            <Col xs={12} sm={2} className="d-flex flex-column justify-content-center mx-2 mx-sm-0">
              <p>
                Your Role:{" "}
                {userProfile.roles.find((role) => role.roleName === "ROLE_ADMIN") ? (
                  <FaUserSecret />
                ) : userProfile.roles.find((role) => role.roleName === "ROLE_EVENTCREATOR") ? (
                  <FaUserGraduate />
                ) : (
                  <FaUser />
                )}
              </p>
            </Col>
          </Row>
          <Row className="commentContainer">
            <h4>I tuoi commenti:</h4>
            {userProfile?.commenti?.length > 0 ? (
              userProfile.commenti.map((com) => (
                <UserPageSingleComment commento={com} key={com.idCommento + "comento"} />
              ))
            ) : (
              <>
                <p>non hai nessun commento! </p>
              </>
            )}
          </Row>
          <Row className="m-1 my-5">
            <Col xs={12} className="d-flex justify-content-between py-2">
              <h4>I tuoi eventi creati</h4>
              <p>
                <button className="creaEvento" onClick={handleShowEv}>
                  Crea Evento
                </button>
                <CreaEventoModal show={showMEv} setShow={setShowMEv} />
              </p>
            </Col>
            <Col xs={12}>
              <Row className="row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 m-0 justify-content-center w-100">
                {userProfile?.eventiCreati?.length > 0 ? (
                  userProfile?.eventiCreati?.map((ev) => (
                    <EventCardUser key={ev.idLuogo + "evento"} ev={ev} />
                  ))
                ) : (
                  <>
                    <p>non hai nessun evento creato</p>
                  </>
                )}
              </Row>
            </Col>
          </Row>
        </Container>
      }
    </>
  );
};
export default UserPage;
