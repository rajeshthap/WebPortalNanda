import React from "react";
import Form from "react-bootstrap/Form";
import "../../assets/css/ModalOne.css";
function FormStatuspending() {
  return (
    <div>
       <Form>
  {["checkbox"].map((type) => (
    <div key={`default-${type}`} className="nd-label">
      <Form.Check
        className="nd-check-box-btn"
        type={type}
        id={`default-${type}`}
        label="**मेरे द्वारा शासनादेश का पूर्णता अध्यन कर लिए गया है" // Corrected label
        style={{ cursor: "pointer" }}
      />
    </div>
  ))}
</Form>
    </div>
  );
}

export default FormStatuspending;
