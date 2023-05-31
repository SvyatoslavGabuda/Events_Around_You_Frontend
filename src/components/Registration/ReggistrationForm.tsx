import { useEffect, useRef, useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{2,24}$/;
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
        console.log("tutto apposto");
        navigate("/login");
      } else {
        console.log("qualcosa è andato storoto");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Container>
        <Row className="justify-content-center py-5">
          <Col xs={12} md={8} lg={6}>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  value={email}
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                />
                <Form.Text className={emailFocus && email ? "text-muted" : "d-none"}>
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Username"
                  onChange={(e) => setUser(e.target.value)}
                  required
                  value={user}
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                />
                <Form.Text className={userFocus && user && !validName ? "text-muted" : "d-none"}>
                  4 to 24 characters.
                  <br />
                  Must begin with a letter.
                  <br />
                  Letters, numbers, underscores, hyphens allowed.
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter yor name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Lastname</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter yor surname"
                  onChange={(e) => setLastname(e.target.value)}
                  value={lastname}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
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
                  2 to 24 characters.
                  <br />
                  Must include uppercase and lowercase letters, a number and a special character.
                  <br />
                  Allowed special characters: <span aria-label="exclamation mark">!</span>
                  <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span>
                  <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
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
                  Must match the first password input field.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label="I agree with term and policy"
                  onChange={(e) => setInputCheked(!inputCheked)}
                  //onClick={(e) => setInputCheked(!inputCheked)}
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
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default ReggistrationForm;
