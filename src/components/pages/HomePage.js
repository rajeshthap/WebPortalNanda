import React from "react";

import { Row, Col, Card, Carousel} from "react-bootstrap";
import Nandonline from "../../assets/images/onlinenanda.png";
import OnlineImage from "../../assets/images/vig_2024.jpg";
import KanyaBorn from "../../assets/images/kanyaborn.jpg";
import Girls12th from "../../assets/images/girls12th.jpeg";
import AnathAshrm from "../../assets/images/anathashrm.jpg";
import PdfFile from "../../assets/images/12thpass.png";
import "../../assets/css/HomePage.css";
import ModalOne from "../modal/ModalOne";
import BirthInfo from "../modal/BirthInfo";
import Girls12thPass from "../modal/Girls12thPass";
import Orphanage from "../leftnav/Orphangirls/Orphanage";
function HomePage() {
  const carouselItems = [
    { id: 1, src: OnlineImage, alt: "Slide 1", caption: "" },
    { id: 2, src: OnlineImage, alt: "Slide 2", caption: "" },
  ];
  return (
    <div className="container-fluid">
      <Row>
        <Col lg={3} md={3} sm={12} className="d-flex nd-pd-0">
          <Card className="mt-4 pt-3 nd-Login-form flex-fill">
            <p className="text-center nd-card-title">
              नंदा गौरा आवेदन पत्र ऑनलाइन भरने से पूर्व निम्न निर्देशों का
              भली-भाँति अध्ययन कर लें :-
            </p>
            <div className="nd-card-img">
              <img
                src={Nandonline}
                alt="onlone-form"
                className="img-fluid"
              ></img>
            </div>
            <div className="nd-card-body">
              <ol className="mt-2">
                <li>
                आवेदन फार्म में सभी जानकारी पूर्ण रूप से सही भरें, अधूरी एवं गलत जानकारी भरने पर आवेदन निरस्त कर दिया जाएगा।
                </li>
                <li>
                यह योजना केवल उत्तराखण्ड राज्य के मूल/स्थायी बालिकाओं हेतु ही मान्य है ।
                </li>
                <li>
                एक परिवार की किन्हीं भी दो से अधिक बालिकाओं(जीवित बालिकाओं) को नंदा गौरा योजना से लाभान्वित नहीं किया जाएगा।
                </li>
                <li>
                एक कन्या/बालिका के लिए एक चरण के लिए एक से अधिक बार योजना के लाभ हेतु आवेदन करने पर आवेदन पत्र निरस्त कर दिया जाएगा।
                </li>
               
               
                <li>इस योजना का लाभ केवल कन्या जन्म(प्रथम चरण ) पर एवं बालिका के इंटर (कक्षा-12) उत्तीर्ण (द्वितीय चरण) करने पर ही देय है।</li>
                <li>कन्या के जन्म पर लाभ हेतु कन्या-शिशु जन्म के 06 माह के भीतर आवेदन करना अनिवार्य है। 06 माह के उपरांत आवेदन करने पर आवेदन स्वीकार नहीं किया जाएगा।</li>
              </ol>
            </div>
            <div className="nd-btn">
              <ModalOne />
              {/* <Button className="nd-card-btn ">Know more</Button> */}
            </div>
          </Card>
        </Col>
        <Col lg={3} md={3} sm={12} className="d-flex nd-pd-0">
          <Card className="mt-4 pt-3 nd-Login-form flex-fill">
            <p className="text-center nd-card-title">पूर्ण विज्ञप्ति:-</p>
            <Carousel className="carouael-slide">
              {carouselItems.map((item) => (
                <Carousel.Item key={item.id}>
                  <img
                    className="d-block w-100 imag"
                    src={item.src}
                    alt={item.alt}
                  />
                  <Carousel.Caption>
                    <h3>{item.caption}</h3>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
            <div className="nd-card-info">
              <p>
              नंदा गौरा योजना विषयक शासनादेश 
                <a
                href="/shashandesh_new_pdf.pdf"
                target="_blank"
                download
              > <span className="nd-card-icon">Download</span>
                <img src={PdfFile} alt="pdf-file"></img>
                  </a>
              </p>
            </div>
          </Card>
        </Col>
        <Col lg={2} md={2} sm={12} className="d-flex nd-pd-0">
          <Card className="mt-4 pt-3 nd-Login-form flex-fill">
            <p className="text-center nd-card-title">कन्या के जन्म पर</p>
            <div className="nd-card-img">
              <img
                src={KanyaBorn}
                alt="onlone-form"
                className="img-fluid"
              ></img>
            </div>
            <div className="nd-card-body">
              <ol className="mt-2">
                <li>कन्या शिशु की नवीनतम पासपोर्ट साइज फोटो</li>
                <li>माता / पिता / अभिभावक के हस्ताक्षर </li>
                <li>स्थाई निवास प्रमाण पत्र</li>
                <li>
                परिवार रजिस्टर की नकल या सभासद/पार्षद द्वारा दिया गया प्रमाण पत्र
                </li>
                <li>राशन कार्ड की प्रति</li>
                <li>संस्थागत प्रसव का प्रमाण पत्र</li>
                <li>जन्म पंजीकरण का प्रमाण पत्र</li>
                <li>आय प्रमाण पत्र</li>
                <li>माता और पिता / अभिभावक का आधार कार्ड</li>
                <li>
                  नगरीय / ग्रामीण स्थानीय निकाय द्वारा दिया गया गृह कर{" "}
                  <strong>या</strong> किराया समझौते के कागजात
                  <span className="nd-span-text">
                    {" "}
                    ना उपलब्ध होने की स्तिथि में गृह कर ना देने का ग्राम प्रधान/पार्षद द्वारा प्रदत प्रमाण पत्र
                  </span>
                </li>
                
              </ol>
            </div>
            <div className="nd-btn">
              <BirthInfo />
            </div>
            <div className="nd-card-info">
              <p>
                आंगनबाड़ी कार्यकर्ती द्वारा प्रदत्त प्रमाण-पत्र
                <a
                href="/born_child_aww_certificate.pdf"
                target="_blank"
                download
              > <span className="nd-card-icon">Download</span>
                <img src={PdfFile} alt="pdf-file"></img>
                  </a>
              </p>
            </div>
          </Card>
        </Col>
        <Col lg={2} md={2} sm={12} className="d-flex nd-pd-0">
          <Card className="mt-4 pt-3 nd-Login-form flex-fill">
            <p className="text-center nd-card-title">
              बालिका के इंटर उत्तीर्ण करने पर
            </p>
            <div className="nd-card-img">
              <img
                src={Girls12th}
                alt="onlone-form"
                className="img-fluid"
              ></img>
            </div>
            <div className="nd-card-body">
              <ol className="mt-2">
                <li>छात्रा की नवीनतम पासपोर्ट साइज फोटो ।</li>
                <li>छात्रा के हस्ताक्षर</li>
                <li>माता / पिता/अभिभावक के हस्ताक्षर</li>
                <li>हाईस्कूल का प्रमाण-पत्र</li>
                <li>
                कक्षा 12वीं उत्तीर्ण का अंक पत्र एवं प्रमाण पत्र
                </li>
                <span className="nd-spann-info" nd-or>
                  or
                </span>
                <p>
                राष्ट्रीय मुक्त विद्यालय / अन्य शिक्षण संस्थान से कक्षा 12 उत्तीर्ण करने वाली आवेदिका द्वारा स्वप्रमाणित अंक पत्र की छायाप्रति
                </p>
                <li>छात्रा एवं माता और पिता/अभिभावक का आधार कार्ड</li>
                <li>छात्रा का स्थाई निवास प्रमाण पत्र</li>
                <li>नगरीय / ग्रामीण स्थानीय निकाय द्वारा दिया गया गृह कर या किराया समझौते के</li>
                
              </ol>
            </div>
            <div className="nd-btn">
              <Girls12thPass />
            </div>
            <div className="nd-card-info">
              <p className="nd-card-info-data">
              प्रधानाचार्य द्वारा कक्षा 12 उत्तीर्ण का निर्गत प्रमाण पत्र केवल संस्थागत छात्रा के लिए 
                <span className="nd-card-icon">
                  
                <a
                href="/12_aww_certificate_rte (1).pdf"
                target="_blank"
                download
              > <span className="nd-card-icon">Download</span>
                <img src={PdfFile} alt="pdf-file"></img>
                </a></span>
               
              </p>
              <p>
              निजी विद्यालयों की छात्राओं हेतु प्रमाण पत्र (RTE के अंतर्गत पंजीकृत)
                <a
                href="/12_aww_certificate (1).pdf"
                target="_blank"
                download
              > <span className="nd-card-icon">Download</span>
                <img src={PdfFile} alt="pdf-file"></img>
                </a> </p>
                <p>
                आंगनबाड़ी कार्यकर्ती द्वारा प्रदत्त प्रमाण-पत्र। 
                <a
                href="/12_aww_certificate (1).pdf"
                target="_blank"
                download
              > <span className="nd-card-icon">Download</span>
                <img src={PdfFile} alt="pdf-file"></img>
                </a> </p>
            </div>
          </Card>
        </Col>
        <Col lg={2} md={2} sm={12} className="d-flex nd-pd-0">
          <Card className="mt-4 pt-3 nd-Login-form flex-fill">
            <p className="text-center nd-card-title">
              नारी निकेतन, अनाथ आश्रम में पलने वाली बालिका के इंटर उत्तीर्ण करने
              पर
            </p>
            <div className="nd-card-img">
              <img
                src={AnathAshrm}
                alt="onlone-form"
                className="img-fluid"
              ></img>
            </div>
            <div className="nd-card-body">
              <ol className="mt-2">
                <p className="nd-notic">उत्तराखण्ड राज्य में स्थापित बालिका निकेतन, नारी निकेतन, अनाथ आश्रम, उत्तराखण्ड राज्य सरकार द्वारा सहायतित अन्य गृहों में पलने वाली</p>
                <li>छात्रा की नवीनतम पासपोर्ट साइज फोटो ।</li>
                <li>छात्रा के हस्ताक्षर</li>
                <li>हाईस्कूल का प्रमाण-पत्र।</li>
                <li>कक्षा 12वीं उत्तीर्ण का अंक पत्र एवं प्रमाण पत्र</li>
                <span className="nd-spann-info" nd-or>
                  or
                </span>
                <p>
                  राष्ट्रीय मुक्त विद्यालय / अन्य शिक्षण संस्थान से कक्षा 12
                  उत्तीर्ण करने वाली आवेदिका द्वारा स्वप्रमाणित अंक पत्र की
                  छायाप्रति
                </p>
                
              </ol>
            </div>
            <div className="nd-btn">
              <Orphanage />
            </div>
            <div className="nd-card-info">
              <p>
              प्रधानाचार्य द्वारा कक्षा 12 उत्तीर्ण का निर्गत प्रमाण पत्र केवल संस्थागत छात्रा के लिए 

                <a
                href="/principle_12_certificate3.pdf"
                target="_blank"
                download
              > <span className="nd-card-icon">Download</span>
                <img src={PdfFile} alt="pdf-file"></img>
                  </a>
              </p>
              <p>
              संस्था की अधीक्षिका द्वारा जारी प्रमाण-पत्र 
                <a
                href="/sanstha_certificate (1).pdf"
                target="_blank"
                download
              > <span className="nd-card-icon">Download</span>
                <img src={PdfFile} alt="pdf-file"></img>
                  </a>
              </p>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default HomePage;
