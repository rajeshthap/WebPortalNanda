import React, { useState } from "react";
import axios from "axios";
import "../../assets/css/UserRegistration.css";
import "../../assets/css/ModalOne.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

function UserRegistration() {
  const [show, setShow] = useState(false);
  const [phone, setphone] = useState("");
  const [district, setDistrict] = useState("");
  const [districtData, setDistrictData] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const districtOptions = [
  { name: "Almora" },
  { name: "Bageshwar" },
  { name: "Chamoli" },
  { name: "Champawat" },
  { name: "Dehradun" },
  { name: "Haridwar" },
  { name: "Nainital" },
  { name: "Pauri Garhwal"},
  { name: "Pithoragarh" },
  { name: "Rudraprayag" },
  { name: "Tehri Garhwal" },
  { name: "Usnagar" },
  { name: "Uttarkashi" }
];

  const handleClose = () => {
    setShow(false);
    setErrors({});
    setphone("");
    setDistrict("");
    setDistrictData(null);
  };

  const handleShow = () => setShow(true);

  const validateForm = () => {
    const newErrors = {};

    if (!phone.trim()) {
      newErrors.phone = "मोबाइल नंबर आवश्यक है।";
    } else if (!/^[6-9]\d{9}$/.test(phone)) {
      newErrors.phone = "कृपया वैध भारतीय मोबाइल नंबर दर्ज करें (6-9 से शुरू होकर 10 अंकों का)।";
    }

    if (!district) {
      newErrors.district = "कृपया जिला चुनें।";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // जिला चुनने पर API Call
  const handleDistrictChange = async (e) => {
    const selected = e.target.value;
    setDistrict(selected);
    setDistrictData(null);
    // if (selected) {
    //   try {
    //     const response = await axios.post("https://brjobsedu.com/Nandagora/api3/get-district-data/", {
    //       district: selected,
    //     });
       
    //   } catch (error) {
    //     console.error(error);
    //     alert(error.response?.data?.message ||
    //       "जिला जानकारी लाने में समस्या आई.");
    //   }
    // }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const response = await axios.post("https://brjobsedu.com/Nandagora/api/send-otp/", {
        phone: phone,
        district: district,
      });

      if (response.status === 200 || response.status === 201) {
        //  Save to localStorage
        localStorage.setItem("phone", phone);
        localStorage.setItem("district", district);

        alert("OTP सफलतापूर्वक भेजा गया है.");

        handleClose();

        navigate("/UserOtp", { state: { phone: phone, purpose: "register" } });
      } else {
        alert("OTP भेजने में विफल। कृपया पुनः प्रयास करें।");
      }
    } catch (error) {
      console.error("OTP API Error.", error);
      alert(error.response?.data?.message ||
        "सर्वर त्रुटि। कृपया पुनः प्रयास करें.");
    }
  };

  return (
    <>
      <p onClick={handleShow} style={{ cursor: "pointer" }}>
        नए आवेदक/उपयोगकर्त अभी पंजीकरण करें
      </p>
      <Modal show={show} onHide={handleClose} size="md">
        <Modal.Header closeButton>
          <Modal.Title className="nd-modal-title">
            नए आवेदक/उपयोगकर्ता पंजीकरण जानकारी
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="nd-modal-body">
          <Form.Group className="mb-3 nd-label-input">
            <Form.Label className="nd-form-label">
              पंजीकरण फॉर्म पर आगे बढ़ने के लिए अपना वैध मोबाइल नंबर दर्ज करें।
            </Form.Label>
            <Form.Control
              className="nd-forgot-input"
              type="text"              placeholder="मोबाइल नंबर दर्ज करें"
              value={phone}
              onChange={(e) => setphone(e.target.value)}
              isInvalid={!!errors.phone}
            />
            <Form.Control.Feedback type="invalid">
              {errors.phone}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3 nd-label-input">
            <Form.Label className="nd-form-label">
              अपने जिले का नाम चुनें
            </Form.Label>
            <Form.Select
              className="nd-form-label"
              value={district}
              onChange={(e) => handleDistrictChange(e)}
              isInvalid={!!errors.district}
            >
              <option value="">Choose District Name</option>
              {districtOptions.map((dist) => (
  <option key={dist.distirct_code} value={dist.name}>
    {dist.name}
  </option>
))}

            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.district}
            </Form.Control.Feedback>
          </Form.Group>

          {/*जिला जानकारी*/}
          {districtData && (
            <div className="district-info">
              <h5>जिला जानकारी</h5>
              <pre>{JSON.stringify(districtData, null, 2)}</pre>
            </div>
          )}

        </Modal.Body>
        <Modal.Footer className="nd-registration">
          <Button variant="secondary" className="nd-primary-btn" onClick={handleSubmit}>
            जानकारी दर्ज करें
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UserRegistration;
