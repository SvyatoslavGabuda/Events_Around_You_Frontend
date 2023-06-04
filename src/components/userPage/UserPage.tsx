import { Col, Container, Row } from "react-bootstrap";
import "./userPage.scss";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import UserPageSingleComment from "./userPageComponents/UserPageSingleComment";
import UploadUserProfileImage from "./userPageComponents/UploadUserProfileImage";
import { BsFillCameraFill } from "react-icons/bs";
import { useState } from "react";
import CreaEventoModal from "./userPageComponents/CreaEventoModal";
import EventCardUser from "./userPageComponents/EventCardUser";
import { IuserProfile } from "../../interfaces/luoghiDiInteresseInt";
import { FaUserSecret, FaUserGraduate, FaUser } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { userProfileFetch } from "../../app/slices/userProfileSlice";
import useAuth from "../../auth/hooks/useAuth";
import { userProfileByIDFetch } from "../../app/slices/userProfileByIdSlice";

const UserPage = () => {
  const param = useParams();
  const { auth } = useAuth();
  const dispatch = useAppDispatch();
  const [userProfile, setUserProfile] = useState<IuserProfile>({} as IuserProfile);
  const userProfilemine: IuserProfile = useAppSelector((state) => state.userProfile.userLogged);
  const userProfileStatus = useAppSelector((state) => state.userProfile.status);
  const userProfile2: IuserProfile = useAppSelector((state) => state.userProfileById.userLogged);
  const [show, setShow] = useState(false);
  const [showMEv, setShowMEv] = useState(false);
  const [showComm, setShowComm] = useState(false);

  const handleShow = () => setShow(true);
  const handleShowEv = () => setShowMEv(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // console.log(param?.id);
    if (param.id === undefined) {
      setUserProfile(userProfilemine);
    } else {
      if (auth.accessToken) {
        dispatch(userProfileByIDFetch({ token: auth.accessToken, id: parseInt(param.id) })).then(
          () => {
            setIsLoading(false);
          }
        );
      }
    }
  }, [param, userProfileStatus]);

  useEffect(() => {
    if (!isLoading) {
      setUserProfile(userProfile2);
    }
  }, [isLoading]);
  return (
    <>
      {
        <Container className="profileContainer">
          <Row>
            <Col xs={12} sm={5} className="d-flex justify-content-center ">
              <div className="profilePic ">
                {userProfile?.urlImmagineProfilo !== null ? (
                  <img src={userProfile?.urlImmagineProfilo} alt="profile pic" />
                ) : (
                  <img
                    src="https://placehold.co/400x600"
                    alt="profile pic"
                    className="profilePic"
                  />
                )}
                {auth.username === userProfile.username ? (
                  <button className="updateFotoButton" onClick={handleShow}>
                    <BsFillCameraFill />
                  </button>
                ) : (
                  <></>
                )}
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
            <Col xs={12} sm={3} className="d-flex flex-column justify-content-center mx-2 mx-sm-0">
              <p className="userRole">
                Role:
                <br />
                {userProfile?.roles?.find((role) => role.roleName === "ROLE_ADMIN") ? (
                  <FaUserSecret />
                ) : userProfile?.roles?.find((role) => role.roleName === "ROLE_EVENTCREATOR") ? (
                  <FaUserGraduate />
                ) : (
                  <FaUser />
                )}
              </p>
            </Col>
          </Row>
          <Row>
            <Col className="mt-3 ms-3">
              <button className="creaEvento" onClick={() => setShowComm(!showComm)}>
                {!showComm ? "Vedi i commenti" : "Nascondi i commenti"}
              </button>
            </Col>
          </Row>
          {showComm && (
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
          )}
          <Row className="m-1 my-5">
            <Col xs={12} className="d-flex justify-content-between py-2">
              <h4>I tuoi eventi creati</h4>
              {auth.username === userProfile.username ? (
                <p>
                  <button className="creaEvento" onClick={handleShowEv}>
                    Crea Evento
                  </button>
                  <CreaEventoModal show={showMEv} setShow={setShowMEv} />
                </p>
              ) : (
                <></>
              )}
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
