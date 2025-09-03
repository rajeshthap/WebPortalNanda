import React from "react";
import { useState } from "react";
import "../../assets/css/ModalOne.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../../assets/css/ModalOne.css";
import { PiDownloadSimpleBold } from "react-icons/pi";
function BirthInfo() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button className="nd-primary-btn" onClick={handleShow}>
        Know more
      </Button>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title className="nd-modal-title">कन्या के जन्म पर</Modal.Title>
        </Modal.Header>
        <Modal.Body className="nd-modal-body">
          <ol>
            <li>कन्या शिशु की नवीनतम पासपोर्ट साइज फोटो</li>
            <li>माता / पिता / अभिभावक के हस्ताक्षर </li>
            <li>स्थाई निवास प्रमाण पत्र</li>
            <li>
              परिवार रजिस्टर की नकल <strong>या</strong> सभासद/पार्षद द्वारा दिया
              गया प्रमाण पत्र
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
              <Button variant="" className="nd-primary-dawnload">
              <PiDownloadSimpleBold className="nd-download-icon" /> (प्रारूप यहाँ से डाउनलोड करें।)
                </Button>
              </a>{" "}
            </li>
            <li>मातृशिशु प्रतिरक्षण / एम०सी० पी० (टीकाकरण) कार्ड </li>
            <li>
              परिवार के समस्त सदस्यों के बैंक पासबुक की प्रति एवं विगत 01 वर्ष
              के बैंक स्टेटमैन्ट की प्रति
            </li>
            <li>
              सामाजिक आर्थिक और जाति जनगणना (SECC) में परिवार की स्थिति के आंकलन
              की प्रति <span className="nd-span-text">(यदि उपलबध है)</span>
            </li>
            <li>
              शासनादेशानुसार योजना का लाभ केवल 02 बालिकाओं हेतु ही अनुमन्य है
              इसलिए आवेदित बालिका के परिवार की अन्य बालिकाओं को पूर्व में कन्या
              के जन्म पर योजना का लाभ दिये जाने / न दिये जाने विषयक शपथ –पत्र
              में निम्न बिंदु शामिल होंगे :-
              <ol>
                <li>
                  मैं प्रमाणित करता/ करती हूँ की यह लाभ मेरी प्रथम/द्वितीय
                  पुत्री द्वारा लिया जा रहा है
                </li>
                <li>
                  मेरे द्वारा चल अचल सम्पति एवं अन्य चाही गयी,समस्त सूचनाएं सही
                  –सही दी गयी है
                </li>
                <li>मेरे द्वारा किसी भी तथ्य को छुपाया नहीं गया है </li>
                <li>
                  मेरे द्वारा परिवार के समस्त खातो का विवरण,एक वर्ष के बैंक
                  स्टेटमेंट सहित दे दिया गया है{" "}
                </li>
              </ol>
            </li>

            <li>
              अन्य आवश्यक अभिलेख:-
              <ol>
                <li>
                  परिवार के विगत 03 बार के बिजली के बिलों की प्रति तथा विगत 01
                  बार के पानी के बिल की प्रति{" "}
                  <span className="nd-span-text">
                    कनेक्शन न होने की स्तिथि में शपथ पत्र में आवश्यक रूप से
                    उल्लेख करे।
                  </span>
                </li>
                <li>कोई अन्य दस्तावेज़ की प्रतिलिपि</li>
              </ol>
            </li>
          </ol>
        </Modal.Body>
        <Modal.Footer className="nd-footer">
          <Button
            variant="secondary"
            className="nd-close-btn"
            onClick={handleClose}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default BirthInfo;
