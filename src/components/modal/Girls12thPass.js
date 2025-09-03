import React from "react";
import { PiDownloadSimpleBold } from "react-icons/pi";
import { useState } from "react";
import "../../assets/css/ModalOne.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../../assets/css/ModalOne.css";
function Girls12thPass() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button className="nd-primary-btn" onClick={handleShow}>Know more</Button>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title className="nd-modal-title">
          बालिका के इंटर उत्तीर्ण करने पर
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="nd-modal-body">
        <ol>
          <li>छात्रा की नवीनतम पासपोर्ट साइज फोटो ।</li>
              <li>छात्रा के हस्ताक्षर</li>
              <li>माता / पिता/अभिभावक के हस्ताक्षर</li>
              <li>हाईस्कूल का प्रमाण-पत्र</li>
              <li>कक्षा 12वीं उत्तीर्ण का अंक पत्र एवं प्रमाण पत्र।
                
               
                राष्ट्रीय मुक्त विद्यालय / अन्य शिक्षण संस्थान से कक्षा 12 उत्तीर्ण करने वाली आवेदिका द्वारा स्वप्रमाणित अंक पत्र की छायाप्रति
              </li>
              <li>छात्रा एवं माता और पिता/अभिभावक का आधार कार्ड</li>
              <li>छात्रा एवं माता और पिता/अभिभावक का पैन कार्ड</li>
              <li>छात्रा का स्थाई निवास प्रमाण पत्र</li>
              <li>नगरीय / ग्रामीण स्थानीय निकाय द्वारा दिया गया गृह कर <strong>या</strong> किराया समझौते के कागजात <span className="nd-span-text">ना उपलब्ध होने की स्तिथि में गृह कर ना देने का ग्राम प्रधान/पार्षद द्वारा प्रदत प्रमाण पत्र</span></li>
              <li>आय प्रमाण पत्र</li>
              <li>परिवार रजिस्टर की नकल <strong>या</strong> सभासद/पार्षद द्वारा दिया गया प्रमाण पत्र तथा राशन कार्ड की प्रति (बालिका का नाम राशन कार्ड में अंकित होना अनिवार्य है)</li>
              <li>सामाजिक आर्थिक और जाति जनगणना में परिवार की स्थिति के आंकलन की प्रति <span className="ns-span-text">(यदि उपलबध है)</span></li>
              <li>परिवार के विगत 03 बार के बिजली के बिलों की प्रति तथा विगत 01 बार के पानी के बिल की प्रति <span className="nd-span-text">कनेक्शन न होने की स्तिथि में शपथ पत्र में आवश्यक रूप से उल्लेख करे। </span></li>
              <li>शासनादेशानुसार योजना का लाभ केवल 02 बालिकाओं हेतु ही अनुमन्य है इसलिए आवेदित बालिका के परिवार की अन्य बालिकाओं को पूर्व में 12वीं कक्षा पूरी करने पर योजना का लाभ दिये जाने / न दिये जाने विषयक शपथ –पत्र में निम्न बिंदु आवश्यक रूप से शामिल होंगे :
                <ol>
                  <li>मैं प्रमाणित करता/ करती हूँ की यह लाभ मेरी प्रथम/द्वितीय पुत्री द्वारा लिया जा रहा है, मेरी यह पुत्री अविवाहित है। </li>
                  <li>मेरे द्वारा चल अचल सम्पति एवं अन्य चाही गयी समस्त सूचनाएं सही –सहीदी गयी है</li>
                  <li>मेरे द्वारा किसी भी तथ्य को छुपाया नहीं गया है </li>
                  <li>मेरे द्वारा परिवार के समस्त खातो का विवरण,एक वर्ष के बैंक स्टेटमेंट सहित दे दिया गया है</li>

                </ol>
              </li>
              <li>लाभार्थी बालिका के बैंक पासबुक की छाया प्रति</li>
              <li>परिवार के समस्त सदस्यों के बैंक पासबुक की प्रति एवं विगत 01 वर्ष के बैंक स्टेटमैन्ट की प्रति</li>
              <li>उच्च शिक्षा में दाखिले के पूर्ण अभिलेखों की प्रति</li>
              <li>प्रधानाचार्य द्वारा कक्षा 12 उत्तीर्ण का निर्गत प्रमाण पत्र <span className="nd-span-text">केवल संस्थागत छात्रा के लिए </span>
               <a
                href="/principle_12_certificate.pdf"
                target="_blank"
                download
              >
              <Button variant="secondary" className="nd-primary-dawnload">
              <PiDownloadSimpleBold className="nd-download-icon" /> (प्रारूप यहाँ से डाउनलोड करें।)
                </Button>
              </a>{" "}</li>
              <span className="nd-spann-info" nd-or>
                  or
                </span>
                <p>
                राष्ट्रीय मुक्त विद्यालय / अन्य शिक्षण संस्थान से कक्षा 12 उत्तीर्ण करने वाली आवेदिका द्वारा स्वप्रमाणित अंक पत्र की छायाप्रति
                </p>
                <span className="nd-spann-info" nd-or>
                  or
                </span>
                <p>
                निजी विद्यालयों की छात्राओं हेतु प्रमाण पत्र <span className="nd-span-text">(RTE के अंतर्गत पंजीकृत)</span> 
                 <a
                href="/12_aww_certificate_rte (1).pdf"
                target="_blank"
                download
              >
              <Button variant="secondary" className="nd-primary-dawnload">
              <PiDownloadSimpleBold className="nd-download-icon" /> (प्रारूप यहाँ से डाउनलोड करें।)
                </Button>
              </a>{" "}
                </p>
                <li>आंगनबाड़ी कार्यकर्ती द्वारा प्रदत्त प्रमाण-पत्र।   <a
                href="/12_aww_certificate (1).pdf"
                target="_blank"
                download
              >
              <Button variant="secondary" className="nd-primary-dawnload">
              <PiDownloadSimpleBold className="nd-download-icon" /> (प्रारूप यहाँ से डाउनलोड करें।)
                </Button>
              </a>{" "}</li>

               
             
         </ol>
        </Modal.Body>
        <Modal.Footer className="nd-footer">
          <Button variant="secondary" className="nd-close-btn" onClick={handleClose}>
            Close
          </Button>
         
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Girls12thPass;
