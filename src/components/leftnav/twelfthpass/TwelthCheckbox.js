import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "../../../assets/css/ModalOne.css";
import TwelthdetailPopup from "./TwelthdetailPopup";

function TwelthCheckbox() {
  const [showModal, setShowModal] = useState({}); 

  // Handle checkbox click to open corresponding modal
  const handleShow = (id) => {
    setShowModal((prev) => ({
      ...prev,
      [id]: true, 
    }));
  };

  // Handle modal close
  const handleClose = (id) => {
    setShowModal((prev) => ({
      ...prev,
      [id]: false, 
    }));
  };

  const checkboxes = [
    { id: "modal1",  },
  ];

  return (
    <div>
      <Form>
        {checkboxes.map((checkbox) => (
          <div key={checkbox.id}>
            <Form.Check
            label="ऑनलाइन आवेदन के लिए क्लिक करें 1"
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
              {checkbox.label}
              नंदा गौरा योजना हेतु मुख्य अहर्ताएँ
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="nd-modal-body">
            <p className="nd-subheading">कक्षा 12वी उत्तीर्ण छात्राओं के लिए(2024-25)</p>
            <p>
              निम्न अहर्ताएँ पूर्ण करने वाली बालिका ही कक्षा 12वी उत्तीर्ण करने
              पर नंदा गौरा योजना हेतु आवेदन करने के लिए पात्र होगी ।
            </p>
            <ol>
              <li>
                द्वितीय चरण के लाभ हेतु प्रत्येक वित्तीय-वर्ष में आवेदन करने की
                अंतिम तिथि सम्बंधित वर्ष की 30 नवबंर निर्धारित की गयी हैं। इस
                तिथि के उपरांत आवेदन करने पर आवेदन स्वीकार नहीं किया जाएगा।
              </li>
              <li>
                निर्धारित अधिकतम आय सीमा मासिक{" "}
                <span className="ruppees"> ₹51000/</span> हैइसके लिए प्रमाण पत्र
                तहसीलदार द्वारा निर्गत होना चाहिए। ध्यान रहे आय प्रमाण आवेदन
                करने की तिथि से 12 माह से अधिक पुराना न हो।
              </li>
              <li>
                द्वितीय चरण के आवेदन के लिए कक्षा-12 उर्त्तीर्ण एवं अविवाहित
                होना अनिवार्य है।
              </li>
              <li> यह योजना एक परिवार की किन्ही दो बालिकाओं के लिए है।</li>
              <li>*मेरे द्वारा शासनादेश का पूर्णता अध्यन कर लिए गया है </li>
            </ol>
          </Modal.Body>
          <Modal.Footer className="nd-footer">
            <div className="nd-check-btn">
              <div >
                <TwelthdetailPopup />
              </div>
            </div>
          </Modal.Footer>
        </Modal>
      ))}
    </div>
  );
}

export default TwelthCheckbox;
