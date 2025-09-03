import React from "react";
// import { Link } from "react-router-dom";
import "../../assets/css/LeftNav.css";
import Accordion from "react-bootstrap/Accordion";
// import UKLogon from "../../assets/images/UKLogo.png";
import "@fortawesome/fontawesome-free"; // Font Awesome library
import { Row, Col, Card, Button } from "react-bootstrap";
import KanyaBorn from "../../assets/images/kanyaborn.jpg";
import Girls12th from "../../assets/images/girls12th.jpeg";
import AnathAshram from "../../assets/images/anathashrm.jpg";
import Twelve from "../../assets/images/12thpass.png";
import "../../assets/css/HomePage.css";
import Footer from "../footer/Footer";
import DashboardIndex from "./DashboardIndex";
import BirthCheckbox from "./BirthCheckbox";
import InnerNavigation from "./InnerNavigation";
import DashHeader from "./DashHeader";
import { PiDownloadSimpleBold } from "react-icons/pi";
import TwelthCheckbox from "./twelfthpass/TwelthCheckbox";
import TwelthdetailPopup from "./twelfthpass/TwelthdetailPopup";
import Orphanage from "./Orphangirls/Orphanage";
import OrphanDetailPopup from "./Orphangirls/OrphanDetailPopup";

const UserDashboard = () => {
  
  return (
    <>
      <div>
    
        <DashHeader />

        {/* Main Container */}
        <div className="main-container">
          {/* Navigation */}
          <InnerNavigation />

          {/* Main Content */}

          <div className="main">
            <DashboardIndex />

            <div className="box-container">
              <div className="nd-12th-title">
                <a
                  href="/12thpassfile.jpg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  <p>
                    <img src={Twelve} alt="12वीं पासआउट 2024"></img> 12वीं
                    पासआउट 2024 के लिए नए आवेदन की अंतिम तिथि 20 दिसंबर 2024 तक
                    बढ़ाने के संबंध{" "}
                  </p>
                </a>
              </div>
              <Accordion className="nd-accordion">
                <Accordion.Item eventKey="0">
                  <Accordion.Header> कन्या के जन्म पर</Accordion.Header>
                  <Accordion.Body>
                    {/* <Card className="mt-4 pt-3 nd-Login-form flex-fill"> */}
                    <p className="text-center nd-card-title">
                      कन्या के जन्म पर
                    </p>
                    <div className="nd-card-img">
                      <img
                        src={KanyaBorn}
                        alt="onlone-form"
                        className="img-fluid"
                      ></img>
                    </div>
                    <div className="nd-card-body">
                      <ol>
                        <li>कन्या शिशु की नवीनतम पासपोर्ट साइज फोटो</li>
                        <li>माता / पिता / अभिभावक के हस्ताक्षर </li>
                        <li>स्थाई निवास प्रमाण पत्र</li>
                        <li>
                          परिवार रजिस्टर की नकल <strong>या</strong> सभासद/पार्षद
                          द्वारा दिया गया प्रमाण पत्र
                        </li>
                        <li>राशन कार्ड की प्रति</li>
                        <li>संस्थागत प्रसव का प्रमाण पत्र</li>
                        <li>जन्म पंजीकरण का प्रमाण पत्र</li>
                        <li>आय प्रमाण पत्र</li>
                        <li>माता और पिता / अभिभावक का आधार कार्ड</li>
                        <li>
                          नगरीय / ग्रामीण स्थानीय निकाय द्वारा दिया गया गृह कर{" "}
                          <strong>या</strong> किराया समझौते के कागजात{" "}
                          <small>
                            {" "}
                            ना उपलब्ध होने की स्तिथि में गृह कर ना देने का ग्राम
                            प्रधान/पार्षद द्वारा प्रदत प्रमाण पत्र
                          </small>
                        </li>
                        <li>माता और पिता / अभिभावक का पैन कार्ड</li>
                        <li>
                          आंगनबाड़ी कार्यकर्ती द्वारा प्रदत्त प्रमाण-पत्र।{" "}
                          <a
                            href="/born_child_aww_certificate.pdf"
                            target="_blank"
                            download
                          >
                            <Button
                              variant="secondary"
                              className="nd-primary-dawnload"
                            >
                              <PiDownloadSimpleBold className="nd-download-icon" />{" "}
                              (प्रारूप यहाँ से डाउनलोड करें।)
                            </Button>
                          </a>{" "}
                        </li>
                        <li>
                          मातृशिशु प्रतिरक्षण / एम०सी० पी० (टीकाकरण) कार्ड{" "}
                        </li>
                        <li>
                          परिवार के समस्त सदस्यों के बैंक पासबुक की प्रति एवं
                          विगत 01 वर्ष के बैंक स्टेटमैन्ट की प्रति
                        </li>
                        <li>
                          सामाजिक आर्थिक और जाति जनगणना (SECC) में परिवार की
                          स्थिति के आंकलन की प्रति{" "}
                          <span className="nd-span-text">(यदि उपलबध है)</span>
                        </li>
                        <li>
                          शासनादेशानुसार योजना का लाभ केवल 02 बालिकाओं हेतु ही
                          अनुमन्य है इसलिए आवेदित बालिका के परिवार की अन्य
                          बालिकाओं को पूर्व में कन्या के जन्म पर योजना का लाभ
                          दिये जाने / न दिये जाने विषयक शपथ –पत्र में निम्न
                          बिंदु शामिल होंगे :-
                          <ol>
                            <li>
                              मैं प्रमाणित करता/ करती हूँ की यह लाभ मेरी
                              प्रथम/द्वितीय पुत्री द्वारा लिया जा रहा है
                            </li>
                            <li>
                              मेरे द्वारा चल अचल सम्पति एवं अन्य चाही गयी,समस्त
                              सूचनाएं सही –सही दी गयी है
                            </li>
                            <li>
                              मेरे द्वारा किसी भी तथ्य को छुपाया नहीं गया है{" "}
                            </li>
                            <li>
                              मेरे द्वारा परिवार के समस्त खातो का विवरण,एक वर्ष
                              के बैंक स्टेटमेंट सहित दे दिया गया है{" "}
                            </li>
                          </ol>
                        </li>

                        <li>
                          अन्य आवश्यक अभिलेख:-
                          <ol>
                            <li>
                              परिवार के विगत 03 बार के बिजली के बिलों की प्रति
                              तथा विगत 01 बार के पानी के बिल की प्रति{" "}
                              <span className="nd-span-text">
                                कनेक्शन न होने की स्तिथि में शपथ पत्र में आवश्यक
                                रूप से उल्लेख करे।
                              </span>
                            </li>
                            <li>कोई अन्य दस्तावेज़ की प्रतिलिपि</li>
                          </ol>
                        </li>
                      </ol>
                    </div>
                    <div className="nd-check-btn">
                      <div className="nd-chek-box mb-3">
                        <BirthCheckbox />
                      </div>
                    </div>

                    {/* </Card> */}
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>
                    बालिका के इंटर उत्तीर्ण करने पर
                  </Accordion.Header>
                  <Accordion.Body>
                    {/* <Card className="mt-4 pt-3 nd-Login-form flex-fill"> */}
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
                          कक्षा 12वीं उत्तीर्ण का अंक पत्र एवं प्रमाण पत्र।
                          राष्ट्रीय मुक्त विद्यालय / अन्य शिक्षण संस्थान से
                          कक्षा 12 उत्तीर्ण करने वाली आवेदिका द्वारा स्वप्रमाणित
                          अंक पत्र की छायाप्रति
                        </li>
                        <li>छात्रा एवं माता और पिता/अभिभावक का आधार कार्ड</li>
                        <li>छात्रा एवं माता और पिता/अभिभावक का पैन कार्ड</li>
                        <li>छात्रा का स्थाई निवास प्रमाण पत्र</li>
                        <li>
                          नगरीय / ग्रामीण स्थानीय निकाय द्वारा दिया गया गृह कर{" "}
                          <strong>या</strong> किराया समझौते के कागजात{" "}
                          <span className="nd-span-text">
                            ना उपलब्ध होने की स्तिथि में गृह कर ना देने का ग्राम
                            प्रधान/पार्षद द्वारा प्रदत प्रमाण पत्र
                          </span>
                        </li>
                        <li>आय प्रमाण पत्र</li>
                        <li>
                          परिवार रजिस्टर की नकल <strong>या</strong> सभासद/पार्षद
                          द्वारा दिया गया प्रमाण पत्र तथा राशन कार्ड की प्रति
                          (बालिका का नाम राशन कार्ड में अंकित होना अनिवार्य है)
                        </li>
                        <li>
                          सामाजिक आर्थिक और जाति जनगणना में परिवार की स्थिति के
                          आंकलन की प्रति{" "}
                          <span className="ns-span-text">(यदि उपलबध है)</span>
                        </li>
                        <li>
                          परिवार के विगत 03 बार के बिजली के बिलों की प्रति तथा
                          विगत 01 बार के पानी के बिल की प्रति{" "}
                          <span className="nd-span-text">
                            कनेक्शन न होने की स्तिथि में शपथ पत्र में आवश्यक रूप
                            से उल्लेख करे।{" "}
                          </span>
                        </li>
                        <li>
                          शासनादेशानुसार योजना का लाभ केवल 02 बालिकाओं हेतु ही
                          अनुमन्य है इसलिए आवेदित बालिका के परिवार की अन्य
                          बालिकाओं को पूर्व में 12वीं कक्षा पूरी करने पर योजना
                          का लाभ दिये जाने / न दिये जाने विषयक शपथ –पत्र में
                          निम्न बिंदु आवश्यक रूप से शामिल होंगे :
                          <ol>
                            <li>
                              मैं प्रमाणित करता/ करती हूँ की यह लाभ मेरी
                              प्रथम/द्वितीय पुत्री द्वारा लिया जा रहा है, मेरी
                              यह पुत्री अविवाहित है।{" "}
                            </li>
                            <li>
                              मेरे द्वारा चल अचल सम्पति एवं अन्य चाही गयी समस्त
                              सूचनाएं सही –सहीदी गयी है
                            </li>
                            <li>
                              मेरे द्वारा किसी भी तथ्य को छुपाया नहीं गया है{" "}
                            </li>
                            <li>
                              मेरे द्वारा परिवार के समस्त खातो का विवरण,एक वर्ष
                              के बैंक स्टेटमेंट सहित दे दिया गया है
                            </li>
                          </ol>
                        </li>
                        <li>लाभार्थी बालिका के बैंक पासबुक की छाया प्रति</li>
                        <li>
                          परिवार के समस्त सदस्यों के बैंक पासबुक की प्रति एवं
                          विगत 01 वर्ष के बैंक स्टेटमैन्ट की प्रति
                        </li>
                        <li>
                          उच्च शिक्षा में दाखिले के पूर्ण अभिलेखों की प्रति
                        </li>
                        <li>
                          प्रधानाचार्य द्वारा कक्षा 12 उत्तीर्ण का निर्गत प्रमाण
                          पत्र{" "}
                          <span className="nd-span-text">
                            केवल संस्थागत छात्रा के लिए{" "}
                          </span>
                          <a
                            href="/principle_12_certificate.pdf"
                            target="_blank"
                            download
                          >
                            <Button
                              variant="secondary"
                              className="nd-primary-dawnload"
                            >
                              <PiDownloadSimpleBold className="nd-download-icon" />{" "}
                              (प्रारूप यहाँ से डाउनलोड करें।)
                            </Button>
                          </a>{" "}
                        </li>
                        <span className="nd-spann-info" nd-or>
                          or
                        </span>
                        <p>
                          राष्ट्रीय मुक्त विद्यालय / अन्य शिक्षण संस्थान से
                          कक्षा 12 उत्तीर्ण करने वाली आवेदिका द्वारा स्वप्रमाणित
                          अंक पत्र की छायाप्रति
                        </p>
                        <span className="nd-spann-info" nd-or>
                          or
                        </span>
                        <p>
                          निजी विद्यालयों की छात्राओं हेतु प्रमाण पत्र{" "}
                          <span className="nd-span-text">
                            (RTE के अंतर्गत पंजीकृत)
                          </span>
                          <a
                            href="/12_aww_certificate_rte (1).pdf"
                            target="_blank"
                            download
                          >
                            <Button
                              variant="secondary"
                              className="nd-primary-dawnload"
                            >
                              <PiDownloadSimpleBold className="nd-download-icon" />{" "}
                              (प्रारूप यहाँ से डाउनलोड करें।)
                            </Button>
                          </a>{" "}
                        </p>
                        <li>
                          आंगनबाड़ी कार्यकर्ती द्वारा प्रदत्त प्रमाण-पत्र।{" "}
                          <a
                            href="/12_aww_certificate (1).pdf"
                            target="_blank"
                            download
                          >
                            <Button
                              variant="secondary"
                              className="nd-primary-dawnload"
                            >
                              <PiDownloadSimpleBold className="nd-download-icon" />{" "}
                              (प्रारूप यहाँ से डाउनलोड करें।)
                            </Button>
                          </a>{" "}
                        </li>
                      </ol>
                    </div>
                    <div className="nd-check-btn">
                      <div className="nd-chek-box mb-3">
                        <TwelthdetailPopup />
                      </div>
                    </div>

                    {/* </Card> */}
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                  <Accordion.Header>अनाथ आश्रम</Accordion.Header>
                  <Accordion.Body>
                    {/* <Card className="mt-4 pt-3 nd-Login-form flex-fill"> */}
                    <p className="text-center nd-card-title">अनाथ आश्रम</p>
                    <div className="nd-card-img">
                      <img
                        src={AnathAshram}
                        alt="onlone-form"
                        className="img-fluid"
                      ></img>
                    </div>
                    <div className="nd-card-body">
                      <ol>
                        <p className="nd-notic">
                          उत्तराखण्ड राज्य में स्थापित बालिका निकेतन, नारी
                          निकेतन, अनाथ आश्रम, उत्तराखण्ड राज्य सरकार द्वारा
                          सहायतित अन्य गृहों में पलने वाली
                        </p>
                        <li>छात्रा की नवीनतम पासपोर्ट साइज फोटो ।</li>
                        <li>छात्रा के हस्ताक्षर</li>
                        <li>हाईस्कूल का प्रमाण-पत्र।</li>
                        <li>
                          कक्षा 12वीं उत्तीर्ण का अंक पत्र एवं प्रमाण पत्र
                          <center>
                            <strong>OR</strong>
                          </center>
                          राष्ट्रीय मुक्त विद्यालय / अन्य शिक्षण संस्थान से
                          कक्षा 12 उत्तीर्ण करने वाली आवेदिका द्वारा स्वप्रमाणित
                          अंक पत्र की छायाप्रति
                        </li>

                        <li>छात्रा का आधार कार्ड</li>
                        <li>छात्रा का पैन कार्ड</li>
                        <li>
                          अविवाहित होने का प्रमाण पत्र (स्वयं द्वारा प्रदत्त )
                        </li>
                        <li>लाभार्थी बालिका के बैंक पासबुक की छाया प्रति</li>
                        <li>
                          प्रधानाचार्य द्वारा कक्षा 12 उत्तीर्ण का निर्गत प्रमाण
                          पत्र{" "}
                          <span className="nd-span-text">
                            केवल संस्थागत छात्रा के लिए{" "}
                          </span>
                          <a
                            href="/principle_12_certificate3.pdf"
                            target="_blank"
                            download
                          >
                            <Button
                              variant="secondary"
                              className="nd-primary-dawnload"
                            >
                              <PiDownloadSimpleBold className="nd-download-icon" />{" "}
                              (प्रारूप यहाँ से डाउनलोड करें।)
                            </Button>
                          </a>
                          <center>
                            <strong>OR</strong>
                          </center>
                          राष्ट्रीय मुक्त विद्यालय / अन्य शिक्षण संस्थान से
                          कक्षा 12 उत्तीर्ण करने वाली आवेदिका द्वारा स्वप्रमाणित
                          अंक पत्र की छायाप्रति
                        </li>
                        <li>
                          उच्च शिक्षा में दाखिले के पूर्ण अभिलेखों की प्रति{" "}
                        </li>
                        <li>
                          संस्था की अधीक्षिका द्वारा जारी प्रमाण-पत्र{" "}
                          <a
                            href="/sanstha_certificate (1).pdf"
                            target="_blank"
                            download
                          >
                            <Button
                              variant="secondary"
                              className="nd-primary-dawnload"
                            >
                              <PiDownloadSimpleBold className="nd-download-icon" />{" "}
                              (प्रारूप यहाँ से डाउनलोड करें।)
                            </Button>
                          </a>{" "}
                        </li>
                      </ol>
                    </div>
                    <div className="nd-check-btn nd-primary-btn1">
                      <div className="nd-chek-box mb-3">
                        <OrphanDetailPopup />
                      </div>
                    </div>

                    {/* </Card> */}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              <Row className="nd-box">
                <Col lg={4} md={4} sm={12} className="d-flex">
                  <Card className="mt-4 pt-3 nd-Login-form flex-fill">
                    <p className="text-center nd-card-title">
                      कन्या के जन्म पर
                    </p>
                    <div className="nd-card-img">
                      <img
                        src={KanyaBorn}
                        alt="onlone-form"
                        className="img-fluid"
                      ></img>
                    </div>
                    <div className="nd-card-body nd-start-item nd-start-item1">
                      <ol>
                        <li>कन्या शिशु की नवीनतम पासपोर्ट साइज फोटो</li>
                        <li>माता / पिता / अभिभावक के हस्ताक्षर </li>
                        <li>स्थाई निवास प्रमाण पत्र</li>
                        <li>
                          परिवार रजिस्टर की नकल <strong>या</strong> सभासद/पार्षद
                          द्वारा दिया गया प्रमाण पत्र
                        </li>
                        <li>राशन कार्ड की प्रति</li>
                        <li>संस्थागत प्रसव का प्रमाण पत्र</li>
                        <li>जन्म पंजीकरण का प्रमाण पत्र</li>
                        <li>आय प्रमाण पत्र</li>
                        <li>माता और पिता / अभिभावक का आधार कार्ड</li>
                        <li>
                          नगरीय / ग्रामीण स्थानीय निकाय द्वारा दिया गया गृह कर{" "}
                          <strong>या</strong> किराया समझौते के कागजात{" "}
                          <small>
                            {" "}
                            ना उपलब्ध होने की स्तिथि में गृह कर ना देने का ग्राम
                            प्रधान/पार्षद द्वारा प्रदत प्रमाण पत्र
                          </small>
                        </li>
                        <li>माता और पिता / अभिभावक का पैन कार्ड</li>
                        <li>
                          आंगनबाड़ी कार्यकर्ती द्वारा प्रदत्त प्रमाण-पत्र।{" "}
                          <a
                            href="/born_child_aww_certificate.pdf"
                            target="_blank"
                            download
                          >
                            <Button
                              variant="secondary"
                              className="nd-primary-dawnload"
                            >
                              <PiDownloadSimpleBold className="nd-download-icon" />{" "}
                              (प्रारूप यहाँ से डाउनलोड करें।)
                            </Button>
                          </a>{" "}
                        </li>
                        <li>
                          मातृशिशु प्रतिरक्षण / एम०सी० पी० (टीकाकरण) कार्ड{" "}
                        </li>
                        <li>
                          परिवार के समस्त सदस्यों के बैंक पासबुक की प्रति एवं
                          विगत 01 वर्ष के बैंक स्टेटमैन्ट की प्रति
                        </li>
                        <li>
                          सामाजिक आर्थिक और जाति जनगणना (SECC) में परिवार की
                          स्थिति के आंकलन की प्रति{" "}
                          <span className="nd-span-text">(यदि उपलबध है)</span>
                        </li>
                        <li>
                          शासनादेशानुसार योजना का लाभ केवल 02 बालिकाओं हेतु ही
                          अनुमन्य है इसलिए आवेदित बालिका के परिवार की अन्य
                          बालिकाओं को पूर्व में कन्या के जन्म पर योजना का लाभ
                          दिये जाने / न दिये जाने विषयक शपथ –पत्र में निम्न
                          बिंदु शामिल होंगे :-
                          <ol>
                            <li>
                              मैं प्रमाणित करता/ करती हूँ की यह लाभ मेरी
                              प्रथम/द्वितीय पुत्री द्वारा लिया जा रहा है
                            </li>
                            <li>
                              मेरे द्वारा चल अचल सम्पति एवं अन्य चाही गयी,समस्त
                              सूचनाएं सही –सही दी गयी है
                            </li>
                            <li>
                              मेरे द्वारा किसी भी तथ्य को छुपाया नहीं गया है{" "}
                            </li>
                            <li>
                              मेरे द्वारा परिवार के समस्त खातो का विवरण,एक वर्ष
                              के बैंक स्टेटमेंट सहित दे दिया गया है{" "}
                            </li>
                          </ol>
                        </li>

                        <li>
                          अन्य आवश्यक अभिलेख:-
                          <ol>
                            <li>
                              परिवार के विगत 03 बार के बिजली के बिलों की प्रति
                              तथा विगत 01 बार के पानी के बिल की प्रति{" "}
                              <span className="nd-span-text">
                                कनेक्शन न होने की स्तिथि में शपथ पत्र में आवश्यक
                                रूप से उल्लेख करे।
                              </span>
                            </li>
                            <li>कोई अन्य दस्तावेज़ की प्रतिलिपि</li>
                          </ol>
                        </li>
                      </ol>
                    </div>
                    <div className="nd-check-btn">
                      <div className="nd-chek-box mb-3">
                        <BirthCheckbox />
                      </div>
                    </div>
                  </Card>
                </Col>
                <Col lg={4} md={4} sm={12} className="d-flex">
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
                    <div className="nd-card-body nd-start-item nd-start-item1">
                      <ol>
                        <li>छात्रा की नवीनतम पासपोर्ट साइज फोटो ।</li>
                        <li>छात्रा के हस्ताक्षर</li>
                        <li>माता / पिता/अभिभावक के हस्ताक्षर</li>
                        <li>हाईस्कूल का प्रमाण-पत्र</li>
                        <li>
                          कक्षा 12वीं उत्तीर्ण का अंक पत्र एवं प्रमाण पत्र।
                          राष्ट्रीय मुक्त विद्यालय / अन्य शिक्षण संस्थान से
                          कक्षा 12 उत्तीर्ण करने वाली आवेदिका द्वारा स्वप्रमाणित
                          अंक पत्र की छायाप्रति
                        </li>
                        <li>छात्रा एवं माता और पिता/अभिभावक का आधार कार्ड</li>
                        <li>छात्रा एवं माता और पिता/अभिभावक का पैन कार्ड</li>
                        <li>छात्रा का स्थाई निवास प्रमाण पत्र</li>
                        <li>
                          नगरीय / ग्रामीण स्थानीय निकाय द्वारा दिया गया गृह कर{" "}
                          <strong>या</strong> किराया समझौते के कागजात{" "}
                          <span className="nd-span-text">
                            ना उपलब्ध होने की स्तिथि में गृह कर ना देने का ग्राम
                            प्रधान/पार्षद द्वारा प्रदत प्रमाण पत्र
                          </span>
                        </li>
                        <li>आय प्रमाण पत्र</li>
                        <li>
                          परिवार रजिस्टर की नकल <strong>या</strong> सभासद/पार्षद
                          द्वारा दिया गया प्रमाण पत्र तथा राशन कार्ड की प्रति
                          (बालिका का नाम राशन कार्ड में अंकित होना अनिवार्य है)
                        </li>
                        <li>
                          सामाजिक आर्थिक और जाति जनगणना में परिवार की स्थिति के
                          आंकलन की प्रति{" "}
                          <span className="ns-span-text">(यदि उपलबध है)</span>
                        </li>
                        <li>
                          परिवार के विगत 03 बार के बिजली के बिलों की प्रति तथा
                          विगत 01 बार के पानी के बिल की प्रति{" "}
                          <span className="nd-span-text">
                            कनेक्शन न होने की स्तिथि में शपथ पत्र में आवश्यक रूप
                            से उल्लेख करे।{" "}
                          </span>
                        </li>
                        <li>
                          शासनादेशानुसार योजना का लाभ केवल 02 बालिकाओं हेतु ही
                          अनुमन्य है इसलिए आवेदित बालिका के परिवार की अन्य
                          बालिकाओं को पूर्व में 12वीं कक्षा पूरी करने पर योजना
                          का लाभ दिये जाने / न दिये जाने विषयक शपथ –पत्र में
                          निम्न बिंदु आवश्यक रूप से शामिल होंगे :
                          <ol>
                            <li>
                              मैं प्रमाणित करता/ करती हूँ की यह लाभ मेरी
                              प्रथम/द्वितीय पुत्री द्वारा लिया जा रहा है, मेरी
                              यह पुत्री अविवाहित है।{" "}
                            </li>
                            <li>
                              मेरे द्वारा चल अचल सम्पति एवं अन्य चाही गयी समस्त
                              सूचनाएं सही –सहीदी गयी है
                            </li>
                            <li>
                              मेरे द्वारा किसी भी तथ्य को छुपाया नहीं गया है{" "}
                            </li>
                            <li>
                              मेरे द्वारा परिवार के समस्त खातो का विवरण,एक वर्ष
                              के बैंक स्टेटमेंट सहित दे दिया गया है
                            </li>
                          </ol>
                        </li>
                        <li>लाभार्थी बालिका के बैंक पासबुक की छाया प्रति</li>
                        <li>
                          परिवार के समस्त सदस्यों के बैंक पासबुक की प्रति एवं
                          विगत 01 वर्ष के बैंक स्टेटमैन्ट की प्रति
                        </li>
                        <li>
                          उच्च शिक्षा में दाखिले के पूर्ण अभिलेखों की प्रति
                        </li>
                        <li>
                          प्रधानाचार्य द्वारा कक्षा 12 उत्तीर्ण का निर्गत प्रमाण
                          पत्र{" "}
                          <span className="nd-span-text">
                            केवल संस्थागत छात्रा के लिए{" "}
                          </span>
                          <a
                            href="/principle_12_certificate.pdf"
                            target="_blank"
                            download
                          >
                            <Button
                              variant="secondary"
                              className="nd-primary-dawnload"
                            >
                              <PiDownloadSimpleBold className="nd-download-icon" />{" "}
                              (प्रारूप यहाँ से डाउनलोड करें।)
                            </Button>
                          </a>{" "}
                        </li>
                        <span className="nd-spann-info" nd-or>
                          or
                        </span>
                        <p>
                          राष्ट्रीय मुक्त विद्यालय / अन्य शिक्षण संस्थान से
                          कक्षा 12 उत्तीर्ण करने वाली आवेदिका द्वारा स्वप्रमाणित
                          अंक पत्र की छायाप्रति
                        </p>
                        <span className="nd-spann-info" nd-or>
                          or
                        </span>
                        <p>
                          निजी विद्यालयों की छात्राओं हेतु प्रमाण पत्र{" "}
                          <span className="nd-span-text">
                            (RTE के अंतर्गत पंजीकृत)
                          </span>
                          <a
                            href="/12_aww_certificate_rte (1).pdf"
                            target="_blank"
                            download
                          >
                            <Button
                              variant="secondary"
                              className="nd-primary-dawnload"
                            >
                              <PiDownloadSimpleBold className="nd-download-icon" />{" "}
                              (प्रारूप यहाँ से डाउनलोड करें।)
                            </Button>
                          </a>{" "}
                        </p>
                        <li>
                          आंगनबाड़ी कार्यकर्ती द्वारा प्रदत्त प्रमाण-पत्र।{" "}
                          <a
                            href="/12_aww_certificate (1).pdf"
                            target="_blank"
                            download
                          >
                            <Button
                              variant="secondary"
                              className="nd-primary-dawnload"
                            >
                              <PiDownloadSimpleBold className="nd-download-icon" />{" "}
                              (प्रारूप यहाँ से डाउनलोड करें।)
                            </Button>
                          </a>{" "}
                        </li>
                      </ol>
                    </div>
                    <div className="nd-check-btn">
                      <div className="nd-chek-box mb-3">
                        <TwelthCheckbox />
                      </div>
                    </div>
                  </Card>
                </Col>
                <Col lg={4} md={4} sm={12} className="d-flex">
                  <Card className="mt-4 pt-3 nd-Login-form flex-fill">
                    <p className="text-center nd-card-title">
                      नारी निकेतन, अनाथ आश्रम में पलने वाली बालिका के इंटर
                      उत्तीर्ण करने पर
                    </p>
                    <div className="nd-card-img">
                      <img
                        src={AnathAshram}
                        alt="onlone-form"
                        className="img-fluid"
                      ></img>
                    </div>
                    <div className="nd-card-body nd-start-item nd-start-item1">
                      <ol>
                        <p className="nd-notic">
                          उत्तराखण्ड राज्य में स्थापित बालिका निकेतन, नारी
                          निकेतन, अनाथ आश्रम, उत्तराखण्ड राज्य सरकार द्वारा
                          सहायतित अन्य गृहों में पलने वाली
                        </p>
                        <li>छात्रा की नवीनतम पासपोर्ट साइज फोटो ।</li>
                        <li>छात्रा के हस्ताक्षर</li>
                        <li>हाईस्कूल का प्रमाण-पत्र।</li>
                        <li>
                          कक्षा 12वीं उत्तीर्ण का अंक पत्र एवं प्रमाण पत्र
                          <center>
                            <strong>OR</strong>
                          </center>
                          राष्ट्रीय मुक्त विद्यालय / अन्य शिक्षण संस्थान से
                          कक्षा 12 उत्तीर्ण करने वाली आवेदिका द्वारा स्वप्रमाणित
                          अंक पत्र की छायाप्रति
                        </li>

                        <li>छात्रा का आधार कार्ड</li>
                        <li>छात्रा का पैन कार्ड</li>
                        <li>
                          अविवाहित होने का प्रमाण पत्र (स्वयं द्वारा प्रदत्त )
                        </li>
                        <li>लाभार्थी बालिका के बैंक पासबुक की छाया प्रति</li>
                        <li>
                          प्रधानाचार्य द्वारा कक्षा 12 उत्तीर्ण का निर्गत प्रमाण
                          पत्र{" "}
                          <span className="nd-span-text">
                            केवल संस्थागत छात्रा के लिए{" "}
                          </span>
                          <a
                            href="/principle_12_certificate3.pdf"
                            target="_blank"
                            download
                          >
                            <Button
                              variant="secondary"
                              className="nd-primary-dawnload"
                            >
                              <PiDownloadSimpleBold className="nd-download-icon" />{" "}
                              (प्रारूप यहाँ से डाउनलोड करें।)
                            </Button>
                          </a>
                          <center>
                            <strong>OR</strong>
                          </center>
                          राष्ट्रीय मुक्त विद्यालय / अन्य शिक्षण संस्थान से
                          कक्षा 12 उत्तीर्ण करने वाली आवेदिका द्वारा स्वप्रमाणित
                          अंक पत्र की छायाप्रति
                        </li>
                        <li>
                          उच्च शिक्षा में दाखिले के पूर्ण अभिलेखों की प्रति{" "}
                        </li>
                        <li>
                          संस्था की अधीक्षिका द्वारा जारी प्रमाण-पत्र{" "}
                          <a
                            href="/sanstha_certificate (1).pdf"
                            target="_blank"
                            download
                          >
                            <Button
                              variant="secondary"
                              className="nd-primary-dawnload"
                            >
                              <PiDownloadSimpleBold className="nd-download-icon" />{" "}
                              (प्रारूप यहाँ से डाउनलोड करें।)
                            </Button>
                          </a>{" "}
                        </li>
                      </ol>
                    </div>
                    <div className="nd-check-btn">
                      <div className="nd-chek-box mb-3">
                        <Orphanage />
                      </div>
                    </div>
                  </Card>
                </Col>
              </Row>
            </div>
            <div>
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
