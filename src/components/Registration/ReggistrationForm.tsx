import { useEffect, useRef, useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FcCheckmark } from "react-icons/fc";
import { TiTimes } from "react-icons/ti";
import { ToastContainer, toast } from "react-toastify";
import { FaCheck } from "react-icons/fa";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{4,24}$/;
const ReggistrationForm = () => {
  const navigate = useNavigate();
  const userRef = useRef();
  const errRef = useRef();
  const [email, setEmail] = useState("");
  const [validEmail, SetValidEmail] = useState(true);
  const [emailFocus, setEmailFocus] = useState(false);
  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [inputCheked, setInputCheked] = useState(false);
  const notifyOfInsucess = (testo: string) =>
    toast.error(testo, {
      position: toast.POSITION.TOP_CENTER,
    });
  const notifyOfSucces = (testo: string) =>
    toast.info(testo, {
      position: toast.POSITION.TOP_CENTER,
    });

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    // userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const registerDto = {
      username: user,
      name: name,
      lastname: lastname,
      email: email,
      password: pwd,
    };
    try {
      const response = await fetch("http://localhost:8081/api/auth/register", {
        method: "POST",
        body: JSON.stringify(registerDto),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        // console.log("tutto apposto");
        notifyOfSucces("La reggistrazione è andata a buon fine");
        navigate("/login");
      } else {
        // console.log("qualcosa è andato storoto");
        const errorData = await response.json();
        // console.log({ errorData });
        const message = errorData.message;
        // console.error(message);
        notifyOfInsucess(message);
      }
    } catch (error) {
      // console.log(error);
      notifyOfInsucess("Opss.. Si è verificato un problema grave, riprova più tardi..");
    }
  };
  return (
    <>
      <Container>
        <Row className="justify-content-center py-5">
          <Col xs={12} md={8} lg={6}>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Indirizzio Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="example@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  value={email}
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                />
                <Form.Text className={emailFocus && email ? "text-muted" : "d-none"}>
                  Non condivideremo mai la tua email con nessun altro.
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>
                  Username
                  <FaCheck style={{ color: "green" }} className={validName ? "" : "d-none"} />
                  <TiTimes
                    style={{ color: "red" }}
                    className={validName || !userFocus ? "d-none" : ""}
                  />
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Inserisci un tuo Username"
                  onChange={(e) => setUser(e.target.value)}
                  required
                  value={user}
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                />
                <Form.Text className={userFocus && user && !validName ? "text-muted" : "d-none"}>
                  Da 4 a 24 caratteri.
                  <br />
                  Deve iniziare con una lettera.
                  <br />
                  Sono consentiti, lettere, numeri, trattini.
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Inserisci il tuo nome"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Cognome</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Inserisci il tuo cognome"
                  onChange={(e) => setLastname(e.target.value)}
                  value={lastname}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  Password{" "}
                  <FaCheck style={{ color: "green" }} className={validPwd ? "" : "d-none"} />
                  <TiTimes
                    style={{ color: "red" }}
                    className={validPwd || !pwd ? "d-none" : ""}
                  />{" "}
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  required
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                />

                <Form.Text className={pwdFocus && !validPwd ? "text-muted" : "d-none"}>
                  Da 4 a 24 caratteri.
                  <br />
                  Deve includere lettere maiuscole e minuscole, un numero e un carattere speciale.
                  <br />
                  Caratteri speciali consentiti: <span aria-label="exclamation mark">!</span>
                  <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span>
                  <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>
                  Conferma la password
                  <FaCheck
                    style={{ color: "green" }}
                    className={validMatch && validPwd ? "" : "d-none"}
                  />
                  <TiTimes
                    style={{ color: "red" }}
                    className={validMatch || !matchPwd ? "d-none" : ""}
                  />{" "}
                  {!validMatch ? (
                    <span className="text-muted">
                      Attenzione le password inserite non corrispondono
                    </span>
                  ) : (
                    ""
                  )}
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setMatchPwd(e.target.value)}
                  value={matchPwd}
                  required
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                />

                <Form.Text className={matchFocus && !validMatch ? "text-muted" : "d-none"}>
                  Deve corrispondere al campo di immissione della password.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label="Accetto termini e condizioni"
                  onChange={(e) => setInputCheked(!inputCheked)}
                  checked={inputCheked}
                />
              </Form.Group>
              <div className="d-flex justify-content-center">
                <button
                  className="basicBtn"
                  type="submit"
                  disabled={!validName || !validPwd || !validMatch || !inputCheked ? true : false}
                >
                  Registrati
                </button>
              </div>
            </Form>
            <ToastContainer />
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default ReggistrationForm;
