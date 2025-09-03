import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "../../../assets/css/ModalOne.css";
import OrphanDetailPopup from "./OrphanDetailPopup";

function Orphanage() {
  const [showModal, setShowModal] = useState({});

  // Open modal for a specific checkbox
  const handleShow = (id) => {
    setShowModal((prev) => ({
      ...prev,
      [id]: true,
    }));
  };

  // Close modal
  const handleClose = (id) => {
    setShowModal((prev) => ({
      ...prev,
      [id]: false,
    }));
  };

  //  You can add multiple checkboxes later if needed
  const checkboxes = [
    { id: "orphanage1", label: "ऑनलाइन आवेदन के लिए क्लिक करें (अनाथ आश्रम)" },
  ];

  return (
    <div>
      <Form>
        {checkboxes.map((checkbox) => (
          <div key={checkbox.id}>
            <Form.Check
              label={checkbox.label}
              type="checkbox"
              id={checkbox.id}
              onClick={() => handleShow(checkbox.id)}
            />
          </div>
        ))}
      </Form>

      {checkboxes.map((checkbox) => (
        <Modal
          key={checkbox.id}
          show={!!showModal[checkbox.id]}
          onHide={() => handleClose(checkbox.id)}
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title className="nd-modal-title">
              नारी निकेतन, अनाथ आश्रम में पलने वाली बालिका के इंटर उत्तीर्ण करने पर
            </Modal.Title>
          </Modal.Header>

          <Modal.Body className="nd-modal-body">
            <ol>
              <li>छात्रा की नवीनतम पासपोर्ट साइज फोटो ।</li>
              <li>छात्रा के हस्ताक्षर</li>
              <li>हाईस्कूल का प्रमाण-पत्र।</li>
              <li>
                कक्षा 12वीं उत्तीर्ण का अंक पत्र एवं प्रमाण पत्र
                <center><strong>OR</strong></center>
                राष्ट्रीय मुक्त विद्यालय / अन्य शिक्षण संस्थान से कक्षा 12 उत्तीर्ण करने वाली आवेदिका द्वारा स्वप्रमाणित अंक पत्र की छायाप्रति
              </li>
              <li>छात्रा का आधार कार्ड</li>
              <li>छात्रा का पैन कार्ड</li>
              <li>अविवाहित होने का प्रमाण पत्र (स्वयं द्वारा प्रदत्त )</li>
              <li>लाभार्थी बालिका के बैंक पासबुक की छाया प्रति</li>
              <li>
                प्रधानाचार्य द्वारा कक्षा 12 उत्तीर्ण का निर्गत प्रमाण पत्र{" "}
                <span className="nd-span-text">केवल संस्थागत छात्रा के लिए </span>
                <a href="/principle_12_certificate3.pdf" target="_blank" download>
                  <button className="nd-primary-dawnload">
                    (प्रारूप यहाँ से डाउनलोड करें।)
                  </button>
                </a>
                <center><strong>OR</strong></center>
                राष्ट्रीय मुक्त विद्यालय / अन्य शिक्षण संस्थान से कक्षा 12 उत्तीर्ण करने वाली आवेदिका द्वारा स्वप्रमाणित अंक पत्र की छायाप्रति
              </li>
              <li>उच्च शिक्षा में दाखिले के पूर्ण अभिलेखों की प्रति </li>
              <li>
                संस्था की अधीक्षिका द्वारा जारी प्रमाण-पत्र{" "}
                <a href="/sanstha_certificate (1).pdf" target="_blank" download>
                  <button className="nd-primary-dawnload">
                    (प्रारूप यहाँ से डाउनलोड करें।)
                  </button>
                </a>
              </li>
            </ol>
          </Modal.Body>

          <Modal.Footer className="nd-footer">
            <div className="nd-check-btn">
              <div className="nd-chek-box mb-3">
                <OrphanDetailPopup />
              </div>
            </div>
          </Modal.Footer>
        </Modal>
      ))}
    </div>
  );
}

export default Orphanage;
