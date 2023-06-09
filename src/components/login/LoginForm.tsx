import { useRef, useState, useEffect, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import useAuth from "../../auth/hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { useAppDispatch } from "../../app/hooks";
import { userProfileFetch } from "../../app/slices/userProfileSlice";
import { hideLoginM } from "../../app/slices/loginModalSlice";
import { ToastContainer, toast } from "react-toastify";
interface logingProps {
  inModal: boolean;
}
const LoginForm = ({ inModal }: logingProps) => {
  const { setAuth } = useAuth();
  const dispatch = useAppDispatch();
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const notifyOfInsucess = (testo: string) =>
    toast.error(testo, {
      position: toast.POSITION.TOP_CENTER,
    });
  useEffect(() => {
    if (userRef.current !== null) {
      userRef.current.focus();
    }
  }, []);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loginDto = {
      username: user,
      password: pwd,
    };
    try {
      const response = await fetch("http://localhost:8081/api/auth/login", {
        method: "POST",
        body: JSON.stringify(loginDto),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        // console.log(response);
        const data = await response.json();
        const accessToken = data.accessToken;
        const roles = data.roles;

        setAuth({
          username: user,
          roles: roles,
          accessToken: accessToken,
          tokenType: data.tokenType,
        });
        //carico i dati del utente loggato e svuoto i campi
        dispatch(userProfileFetch({ username: user, token: accessToken }));
        setUser("");
        setPwd("");
        if (!inModal) {
          navigate(from, { replace: true });
        } else {
          dispatch(hideLoginM());
        }
      } else {
        const errorData = await response.json();
        const message = errorData.message;
        console.error(message);
        notifyOfInsucess(message);
        // setErrMsg(message);
      }
    } catch (error) {
      // setErrMsg("Si è verificato un errore durante la richiesta di login.");
      notifyOfInsucess("Si è verificato un errore durante la richiesta di login.");
    }
  };
  return (
    <>
      {" "}
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6} className="py-5">
            {errMsg !== "" && <p>{errMsg}</p>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>UserName</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your username"
                  autoComplete="off"
                  ref={userRef}
                  onChange={(e) => setUser(e.target.value)}
                  value={user}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  required
                />
              </Form.Group>
              <div className="d-flex justify-content-center">
                <button type="submit" className="basicBtn">
                  Login
                </button>
              </div>
            </Form>
          </Col>
          <ToastContainer />
        </Row>
      </Container>
    </>
  );
};
export default LoginForm;
