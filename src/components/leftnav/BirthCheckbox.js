import React from "react";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import UserForm from "../leftnav/UserForm";
import "../../assets/css/ModalOne.css";
import Modal from "react-bootstrap/Modal";
function BirthCheckbox() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
     
      <Form>
        {["checkbox"].map((type) => (
          <div key={`default-${type}`}>
            <Form.Check // prettier-ignore
              type={type}
              id={`default-${type}`}
              label={`ऑनलाइन आवेदन के लिए क्लिक करें `}
              onClick={handleShow} required
            />
          </div>
        ))}
      </Form>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title className="nd-modal-title">
            नंदा गौरा योजना हेतु मुख्य अहर्ताएँ
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="nd-modal-body">
          <p className="nd-subheading">
            निम्न अहर्ताएँ पूर्ण करने वाली बालिका के माता -पिता /अभिभावक ही
            कन्या के जन्म पर नंदा गौरा योजना हेतु आवेदन करने के लिए पात्र होंगे।
          </p>
          <ol>
            <li>
              कन्या के जन्म पर लाभ लेने के लिए कन्या जन्म के 06 माह के भीतर
              आवेदन करना अनिवार्य है। इससे अधिक की अवधि होने पर आवेदन नही किया
              जा सकेगा।{" "}
            </li>
            <li>
              निर्धारित अधिकतम आय सीमा मासिक{" "}
              <span className="ruppees"> ₹11000/</span> है इसके लिए प्रमाण पत्र
              तहसीलदार द्वारा निर्गत होना चाहिए। ध्यान रहे आवेदन करते समय आय
              प्रमाण पत्र वैध हो।{" "}
            </li>
            <li>
              कन्या शिशु का जन्म सरकारी अस्पताल / निजी अस्पताल / ANM सेंटर तथा
              ग्रामीण क्षेत्र जगह अस्पताल की सुविधा उपलब्ध नहीं है पर प्रशिक्षित
              स्वास्थ्य कर्मी द्वारा ही होना चाहिए। सरकारी अस्पताल / निजी
              अस्पताल अन्यप्रदेशोंके भी मान्य होंगे| बालिका के जन्म के प्रमाण
              पत्र के साथ संस्थागत प्रसव के प्रमाण पत्र की प्रति संकलन करना
              अनिवार्य होगा शहरी क्षेत्र / ग्रामीण क्षेत्र में जिनका प्रस्ताव
              उपरोक्त संस्थाओं में नहीं हुआ है के संबंध में सम्बंधी नगर निकाय
              VPDO/ADO पंचायत द्वारा प्रदत जन्म प्रमाण पत्र मान्य होगा{" "}
            </li>
            <li>यह योजना एक परिवार की किन्ही दो बालिकाओं के लिए है।</li>
            <li>*मेरे द्वारा शासनादेश का पूर्णता अध्यन कर लिए गया है </li>
          </ol>
        </Modal.Body>
        <Modal.Footer className="nd-footer">
          <div className="nd-check-btn">
            <div className="nd-chek-box mb-3">
              <UserForm />
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default BirthCheckbox;
