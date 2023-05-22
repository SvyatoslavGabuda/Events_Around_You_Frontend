import "./header.scss";
import { Container, Navbar, Nav, NavDropdown, Form } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../../auth/hooks/useAuth";
const Header = () => {
  const { auth, setAuth } = useAuth();
  return (
    <>
      <Navbar expand="lg" className="myNavbar">
        <Container className="">
          <Navbar.Brand href="#home">Events Aroud You</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Link to="/" className="nav-link">
                Home
              </Link>
              <NavDropdown title="Contenuti per categoria" id="basic-nav-dropdown">
                <Link to="/events" data-rr-ui-dropdown-item className="dropdown-item">
                  Eventi
                </Link>
                <Link to="/hotels" data-rr-ui-dropdown-item className="dropdown-item">
                  Hotels
                </Link>
                <Link to="/ristoranti" data-rr-ui-dropdown-item className="dropdown-item">
                  Ristoranti
                </Link>
                <Link to="/attrazioni" data-rr-ui-dropdown-item className="dropdown-item">
                  Attrazioni
                </Link>

                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
              {auth?.username ? (
                <>
                  <p className="helloUser" style={{ color: "white", fontWeight: "600" }}>
                    Hello {auth.username}!!
                  </p>
                  <Link to="/user" className="nav-link">
                    Profilo
                  </Link>
                  {auth?.roles?.find((role: any) => role === "ROLE_ADMIN") ? (
                    <Link to="/admin" className="nav-link">
                      admin{" "}
                    </Link>
                  ) : (
                    <></>
                  )}
                  <p
                    className="nav-link logout"
                    onClick={() => {
                      setAuth({ accessToken: null, roles: null, tokenType: null, username: null });
                    }}
                  >
                    Logout
                  </p>
                </>
              ) : (
                <>
                  <Link to="/register" className="nav-link">
                    Register
                  </Link>
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
export default Header;
