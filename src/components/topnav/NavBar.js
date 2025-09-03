import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {FaUserShield, FaGlobe, FaPhoneAlt } from "react-icons/fa";
import "../../assets/css/NavBar.css";
import UKLogon from "../../assets/images/UKLogo.png";
import { Link } from "react-router-dom";
function NavBar() {
  
  return (
    <>
      <Navbar
        sticky="top"
        expand="lg"
        className="bg-body-tertiary navbar-top nd-main  justify-content-between"
      >
        <Container fluid className="container-fluid nd-mob-responsive">
          <Link to="/" className="logo-page">
            <img src={UKLogon} alt="logo" className="logo" />
          </Link>
          <div className="nd-title">
            <span className="nd-subtitle">
              उत्तराखंड सरकार | Gov.t of Uttarakhand{" "}
            </span>
            <span className="subtitle">
              महिला सशक्तिकरण एवं बाल विकास विभाग उत्तराखंड
            </span>
          </div>
          <Link to="../Home" className="logo-page"></Link>
          <Navbar.Brand
            href="#home"
            className="ml-4 navbar-title"
          ></Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="toggle-logo"
          />
          <Navbar.Collapse id="basic-navbar-nav ">
            <Nav className="me-auto justify-content-end flex-grow-1 nd-nav">
              <Nav.Link href="/Home">
                <FaGlobe className="me-1"/>
                Official Website
              </Nav.Link>

              <Nav.Link href="/AdminBanner">
                <FaUserShield className="me-1"/>
                Login(Admin)
              </Nav.Link>
              <Nav.Link href="/ContactUs">
                <FaPhoneAlt className="me-1"/> Contact Us
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
export default NavBar;
