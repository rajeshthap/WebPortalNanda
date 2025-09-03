import React from "react";
import { Row, Col, Container, Card } from "react-bootstrap";
import "../../assets/css/ContactHeader.css";
import LocationIcon from "../../assets/images/location_icon.png";
import UserIcon from "../../assets/images/user_icon.png";
import PhoneIcon from "../../assets/images/phone_icon.png";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";

function ContactUs() {
  return (
    <div>
      <Container fluid>
        <Row className="nd-header">
          <Col lg={4} md={4} sm={12} className="nd-header-subtitle ">
            <h1 className="offset-3 pt-3" >नंदा गौरा योजना</h1>
          </Col>
          <Col lg={8} md={8} sm={12} className="nd-subtitle">
           
              <p className="pt-3">District-Wise Nodal Officer Contact Details
              <br/>
                विभागीय कर्मियों से कॉल के दौरान अनुशाशनहीनता किये जाने पर
                वैधानिक कार्यवाही की जाएगी |
                </p>
            
          </Col>
        </Row>
      </Container>
      <Container className="mt-2 mb-2">
        <Row className="nd-contact-main">
          <div className="nd-contact-title">
            {" "}
            <h2>
              Legal action will be taken if there is indiscipline during the
              call.
            </h2>
          </div>

          <Col lg={3} md={4} sm={12}>
            <Card className="m-2 nd-contact-box">
              <Row>
                <div className="d-flex ">
                  <Col lg={2} md={2} sm={2} className="nd-image">
                    <img src={LocationIcon} alt="Location"></img>
                  </Col>
                  <Col lg={10} md={10} sm={10} className="nd-contact-info">
                    <span>District: </span> Almora
                  </Col>
                </div>
              </Row>
              <Row>
                <div className="d-flex ">
                  <Col lg={2} className="nd-image">
                    <img src={UserIcon} alt="user name"></img>
                  </Col>
                  <Col lg={10} className="nd-contact-info">
                    <span>Officer Name:</span> RAJEEV KUMAR TIWARI
                  </Col>
                </div>
              </Row>
              <Row>
                <div className="d-flex">
                  <Col lg={2} className="nd-image">
                    <img src={PhoneIcon} alt="phone number"></img>
                  </Col>
                  <Col lg={10} className="nd-contact-info">
                    <span> Mobile No.:</span> 9557110679
                  </Col>
                </div>
              </Row>
            </Card>
          </Col>
          <Col lg={3} md={4} sm={12}>
            <Card className="m-2 nd-contact-box">
              <Row>
                <div className="d-flex ">
                  <Col lg={2} md={2} sm={2} className="nd-image">
                    <img src={LocationIcon} alt="Location"></img>
                  </Col>
                  <Col lg={10} md={10} sm={10} className="nd-contact-info">
                    <span>District: </span> Almora
                  </Col>
                </div>
              </Row>
              <Row>
                <div className="d-flex ">
                  <Col lg={2} className="nd-image">
                    <img src={UserIcon} alt="user name"></img>
                  </Col>
                  <Col lg={10} className="nd-contact-info">
                    <span>Officer Name:</span> RAJEEV KUMAR TIWARI
                  </Col>
                </div>
              </Row>
              <Row>
                <div className="d-flex">
                  <Col lg={2} className="nd-image">
                    <img src={PhoneIcon} alt="phone number"></img>
                  </Col>
                  <Col lg={10} className="nd-contact-info">
                    <span> Mobile No.:</span> 9557110679
                  </Col>
                </div>
              </Row>
            </Card>
          </Col>
          <Col lg={3} md={4} sm={12}>
            <Card className="m-2 nd-contact-box">
              <Row>
                <div className="d-flex ">
                  <Col lg={2} md={2} sm={2} className="nd-image">
                    <img src={LocationIcon} alt="Location"></img>
                  </Col>
                  <Col lg={10} md={10} sm={10} className="nd-contact-info">
                    <span>District: </span> Almora
                  </Col>
                </div>
              </Row>
              <Row>
                <div className="d-flex ">
                  <Col lg={2} className="nd-image">
                    <img src={UserIcon} alt="user name"></img>
                  </Col>
                  <Col lg={10} className="nd-contact-info">
                    <span>Officer Name:</span> RAJEEV KUMAR TIWARI
                  </Col>
                </div>
              </Row>
              <Row>
                <div className="d-flex">
                  <Col lg={2} className="nd-image">
                    <img src={PhoneIcon} alt="phone number"></img>
                  </Col>
                  <Col lg={10} className="nd-contact-info">
                    <span> Mobile No.:</span> 9557110679
                  </Col>
                </div>
              </Row>
            </Card>
          </Col>
          <Col lg={3} md={4} sm={12}>
            <Card className="m-2 nd-contact-box">
              <Row>
                <div className="d-flex ">
                  <Col lg={2} md={2} sm={2} className="nd-image">
                    <img src={LocationIcon} alt="Location"></img>
                  </Col>
                  <Col lg={10} md={10} sm={10} className="nd-contact-info">
                    <span>District: </span> Almora
                  </Col>
                </div>
              </Row>
              <Row>
                <div className="d-flex ">
                  <Col lg={2} className="nd-image">
                    <img src={UserIcon} alt="user name"></img>
                  </Col>
                  <Col lg={10} className="nd-contact-info">
                    <span>Officer Name:</span> RAJEEV KUMAR TIWARI
                  </Col>
                </div>
              </Row>
              <Row>
                <div className="d-flex">
                  <Col lg={2} className="nd-image">
                    <img src={PhoneIcon} alt="phone number"></img>
                  </Col>
                  <Col lg={10} className="nd-contact-info">
                    <span> Mobile No.:</span> 9557110679
                  </Col>
                </div>
              </Row>
            </Card>
          </Col>
          <Col lg={3} md={4} sm={12}>
            <Card className="m-2 nd-contact-box">
              <Row>
                <div className="d-flex ">
                  <Col lg={2} md={2} sm={2} className="nd-image">
                    <img src={LocationIcon} alt="Location"></img>
                  </Col>
                  <Col lg={10} md={10} sm={10} className="nd-contact-info">
                    <span>District: </span> Almora
                  </Col>
                </div>
              </Row>
              <Row>
                <div className="d-flex ">
                  <Col lg={2} className="nd-image">
                    <img src={UserIcon} alt="user name"></img>
                  </Col>
                  <Col lg={10} className="nd-contact-info">
                    <span>Officer Name:</span> RAJEEV KUMAR TIWARI
                  </Col>
                </div>
              </Row>
              <Row>
                <div className="d-flex">
                  <Col lg={2} className="nd-image">
                    <img src={PhoneIcon} alt="phone number"></img>
                  </Col>
                  <Col lg={10} className="nd-contact-info">
                    <span> Mobile No.:</span> 9557110679
                  </Col>
                </div>
              </Row>
            </Card>
          </Col>
          <Col lg={3} md={4} sm={12}>
            <Card className="m-2 nd-contact-box">
              <Row>
                <div className="d-flex ">
                  <Col lg={2} md={2} sm={2} className="nd-image">
                    <img src={LocationIcon} alt="Location"></img>
                  </Col>
                  <Col lg={10} md={10} sm={10} className="nd-contact-info">
                    <span>District: </span> Almora
                  </Col>
                </div>
              </Row>
              <Row>
                <div className="d-flex ">
                  <Col lg={2} className="nd-image">
                    <img src={UserIcon} alt="user name"></img>
                  </Col>
                  <Col lg={10} className="nd-contact-info">
                    <span>Officer Name:</span> RAJEEV KUMAR TIWARI
                  </Col>
                </div>
              </Row>
              <Row>
                <div className="d-flex">
                  <Col lg={2} className="nd-image">
                    <img src={PhoneIcon} alt="phone number"></img>
                  </Col>
                  <Col lg={10} className="nd-contact-info">
                    <span> Mobile No.:</span> 9557110679
                  </Col>
                </div>
              </Row>
            </Card>
          </Col>
          <Col lg={3} md={4} sm={12}>
            <Card className="m-2 nd-contact-box">
              <Row>
                <div className="d-flex ">
                  <Col lg={2} md={2} sm={2} className="nd-image">
                    <img src={LocationIcon} alt="Location"></img>
                  </Col>
                  <Col lg={10} md={10} sm={10} className="nd-contact-info">
                    <span>District: </span> Almora
                  </Col>
                </div>
              </Row>
              <Row>
                <div className="d-flex ">
                  <Col lg={2} className="nd-image">
                    <img src={UserIcon} alt="user name"></img>
                  </Col>
                  <Col lg={10} className="nd-contact-info">
                    <span>Officer Name:</span> RAJEEV KUMAR TIWARI
                  </Col>
                </div>
              </Row>
              <Row>
                <div className="d-flex">
                  <Col lg={2} className="nd-image">
                    <img src={PhoneIcon} alt="phone number"></img>
                  </Col>
                  <Col lg={10} className="nd-contact-info">
                    <span> Mobile No.:</span> 9557110679
                  </Col>
                </div>
              </Row>
            </Card>
          </Col>
          <Col lg={3} md={4} sm={12}>
            <Card className="m-2 nd-contact-box">
              <Row>
                <div className="d-flex ">
                  <Col lg={2} md={2} sm={2} className="nd-image">
                    <img src={LocationIcon} alt="Location"></img>
                  </Col>
                  <Col lg={10} md={10} sm={10} className="nd-contact-info">
                    <span>District: </span> Almora
                  </Col>
                </div>
              </Row>
              <Row>
                <div className="d-flex ">
                  <Col lg={2} className="nd-image">
                    <img src={UserIcon} alt="user name"></img>
                  </Col>
                  <Col lg={10} className="nd-contact-info">
                    <span>Officer Name:</span> RAJEEV KUMAR TIWARI
                  </Col>
                </div>
              </Row>
              <Row>
                <div className="d-flex">
                  <Col lg={2} className="nd-image">
                    <img src={PhoneIcon} alt="phone number"></img>
                  </Col>
                  <Col lg={10} className="nd-contact-info">
                    <span> Mobile No.:</span> 9557110679
                  </Col>
                </div>
              </Row>
            </Card>
          </Col>
          <Col lg={3} md={4} sm={12}>
            <Card className="m-2 nd-contact-box">
              <Row>
                <div className="d-flex ">
                  <Col lg={2} md={2} sm={2} className="nd-image">
                    <img src={LocationIcon} alt="Location"></img>
                  </Col>
                  <Col lg={10} md={10} sm={10} className="nd-contact-info">
                    <span>District: </span> Almora
                  </Col>
                </div>
              </Row>
              <Row>
                <div className="d-flex ">
                  <Col lg={2} className="nd-image">
                    <img src={UserIcon} alt="user name"></img>
                  </Col>
                  <Col lg={10} className="nd-contact-info">
                    <span>Officer Name:</span> RAJEEV KUMAR TIWARI
                  </Col>
                </div>
              </Row>
              <Row>
                <div className="d-flex">
                  <Col lg={2} className="nd-image">
                    <img src={PhoneIcon} alt="phone number"></img>
                  </Col>
                  <Col lg={10} className="nd-contact-info">
                    <span> Mobile No.:</span> 9557110679
                  </Col>
                </div>
              </Row>
            </Card>
          </Col>
          <Col lg={3} md={4} sm={12}>
            <Card className="m-2 nd-contact-box">
              <Row>
                <div className="d-flex ">
                  <Col lg={2} md={2} sm={2} className="nd-image">
                    <img src={LocationIcon} alt="Location"></img>
                  </Col>
                  <Col lg={10} md={10} sm={10} className="nd-contact-info">
                    <span>District: </span> Almora
                  </Col>
                </div>
              </Row>
              <Row>
                <div className="d-flex ">
                  <Col lg={2} className="nd-image">
                    <img src={UserIcon} alt="user name"></img>
                  </Col>
                  <Col lg={10} className="nd-contact-info">
                    <span>Officer Name:</span> RAJEEV KUMAR TIWARI
                  </Col>
                </div>
              </Row>
              <Row>
                <div className="d-flex">
                  <Col lg={2} className="nd-image">
                    <img src={PhoneIcon} alt="phone number"></img>
                  </Col>
                  <Col lg={10} className="nd-contact-info">
                    <span> Mobile No.:</span> 9557110679
                  </Col>
                </div>
              </Row>
            </Card>
          </Col>
          <Col lg={3} md={4} sm={12}>
            <Card className="m-2 nd-contact-box">
              <Row>
                <div className="d-flex ">
                  <Col lg={2} md={2} sm={2} className="nd-image">
                    <img src={LocationIcon} alt="Location"></img>
                  </Col>
                  <Col lg={10} md={10} sm={10} className="nd-contact-info">
                    <span>District: </span> Almora
                  </Col>
                </div>
              </Row>
              <Row>
                <div className="d-flex ">
                  <Col lg={2} className="nd-image">
                    <img src={UserIcon} alt="user name"></img>
                  </Col>
                  <Col lg={10} className="nd-contact-info">
                    <span>Officer Name:</span> RAJEEV KUMAR TIWARI
                  </Col>
                </div>
              </Row>
              <Row>
                <div className="d-flex">
                  <Col lg={2} className="nd-image">
                    <img src={PhoneIcon} alt="phone number"></img>
                  </Col>
                  <Col lg={10} className="nd-contact-info">
                    <span> Mobile No.:</span> 9557110679
                  </Col>
                </div>
              </Row>
            </Card>
          </Col>
          <Col lg={3} md={4} sm={12}>
            <Card className="m-2 nd-contact-box">
              <Row>
                <div className="d-flex ">
                  <Col lg={2} md={2} sm={2} className="nd-image">
                    <img src={LocationIcon} alt="Location"></img>
                  </Col>
                  <Col lg={10} md={10} sm={10} className="nd-contact-info">
                    <span>District: </span> Almora
                  </Col>
                </div>
              </Row>
              <Row>
                <div className="d-flex ">
                  <Col lg={2} className="nd-image">
                    <img src={UserIcon} alt="user name"></img>
                  </Col>
                  <Col lg={10} className="nd-contact-info">
                    <span>Officer Name:</span> RAJEEV KUMAR TIWARI
                  </Col>
                </div>
              </Row>
              <Row>
                <div className="d-flex">
                  <Col lg={2} className="nd-image">
                    <img src={PhoneIcon} alt="phone number"></img>
                  </Col>
                  <Col lg={10} className="nd-contact-info">
                    <span> Mobile No.:</span> 9557110679
                  </Col>
                </div>
              </Row>
            </Card>
          </Col>

          <Col lg={12}>
            <Card className="nd-office-contact-info">
              <Row>
                <Col lg={4} md={4} sm={12}>
                  <div className="p-3">
                    <div className="nd-contact-information">
                      <h2>
                        <MdOutlineMailOutline />
                        &nbsp; EMAIL
                      </h2>
                    </div>
                    <div className="nd-contact-subinfo">
                      <p>
                        {" "}
                        help.wecduk@gmail.com
                        <br />
                        dir.icds.ua@gmail.com
                      </p>
                    </div>
                  </div>
                </Col>
                <Col lg={4} md={4} sm={12}>
                  <div className="p-3">
                    <div className="nd-contact-information">
                      <h2>
                        <FaPhoneAlt />
                        &nbsp; CONTACT
                      </h2>
                    </div>
                    <div className="nd-contact-subinfo">
                      <p>
                        {" "}
                        +91 76681 51041 (Technical Helpline)
                        <br /> +91 92595 53906 (Scheme Helpline)
                      </p>
                    </div>
                  </div>
                </Col>
                <Col lg={4} md={4} sm={12}>
                  <div className="p-3">
                    <div className="nd-contact-information">
                      <h2>
                        <FaMapMarkerAlt />
                        &nbsp; ADDRESS
                      </h2>
                    </div>
                    <div className="nd-contact-subinfo">
                      <p>
                        {" "}
                        ICDS office,Dehradun,U.KUMAR
                        <br />
                        Near Nanda ki chowki, Chakrata Road, Dehradun
                      </p>
                    </div>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ContactUs;
