import React, { useState, useEffect } from "react";
import { Modal, Button, Table, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import axios from "axios";

const OrphanStepOneView = ({ data, onUpdate }) => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState(data || {});
  const [banks, setBanks] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    setFormData(data || {});
  }, [data]);

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const res = await axios.get(
          "https://brjobsedu.com/Nandagora/api2/Bankdetails/"
        );
        setBanks(res.data || []);
      } catch (error) {
        console.error("Error fetching banks:", error);
      }
    };
    fetchBanks();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    // Capitalize mother/father name
    if (name === "moth_name" || name === "fath_name") {
      newValue = value
        .split(" ")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
    }

    // Uppercase PAN
    if (name === "pan_no") {
      newValue = value.toUpperCase().slice(0, 10);
    }

    // Only digits for account number
    if (name === "acn_no") {
      newValue = value.replace(/\D/g, "");
    }

    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    if (name === "moth_name" || name === "fath_name") {
      if (value && !/^[A-Za-z\u0900-\u097F ]+$/.test(value)) {
        setErrors((prev) => ({
          ...prev,
          [name]: (<span>"केवल अक्षर और स्पेस मान्य हैं।"</span>),
        }));
      } else {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    }

    if (name === "pan_no") {
      if (!/^[A-Z0-9]{10}$/.test(value)) {
        setErrors((prev) => ({
          ...prev,
          pan_no: (<span>"PAN नंबर 10 अक्षरों/अंकों का होना चाहिए।"</span>),
        }));
      } else {
        setErrors((prev) => ({ ...prev, pan_no: "" }));
      }
    }

    if (name === "acn_no") {
      if (value.length < 9 || value.length > 16) {
        setErrors((prev) => ({
          ...prev,
          acn_no: (<span>"खाता संख्या 9 से 16 अंकों की होनी चाहिए."</span>),
        }));
      } else {
        setErrors((prev) => ({ ...prev, acn_no: "" }));
      }
    }

    if (name === "email_id") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setErrors((prev) => ({
          ...prev,
          email_id: (<span>"कृपया मान्य ईमेल आईडी दर्ज करें।"</span>),
        }));
      } else {
        setErrors((prev) => ({ ...prev, email_id: "" }));
      }
    }
  };

  const validateAll = () => {
    let valid = true;
    const newErrors = {};

    if (
      formData.moth_name &&
      !/^[A-Za-z\u0900-\u097F ]+$/.test(formData.moth_name)
    ) {
      newErrors.moth_name = (<span>"केवल अक्षर और स्पेस मान्य हैं।"</span>);
      valid = false;
    }

    if (
      formData.fath_name &&
      !/^[A-Za-z\u0900-\u097F ]+$/.test(formData.fath_name)
    ) {
      newErrors.fath_name = (<span>"केवल अक्षर और स्पेस मान्य हैं।"</span>);
      valid = false;
    }

    if (!/^[A-Z0-9]{10}$/.test(formData.pan_no)) {
      newErrors.pan_no = (<span>"PAN नंबर 10 अक्षरों/अंकों का होना चाहिए।"</span>);
      valid = false;
    }

    if (!/^\d{9,16}$/.test(formData.acn_no)) {
      newErrors.acn_no = (<span>"खाता संख्या 9 से 16 अंकों की होनी चाहिए."</span>);
      valid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email_id)) {
      newErrors.email_id = (<span>"कृपया मान्य ईमेल आईडी दर्ज करें।"</span>);
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleUpdate = async () => {
    if (!validateAll()) {
      alert("कृपया सभी त्रुटियों को ठीक करें।");
      return;
    }

    try {
      const res = await axios.put(
        `https://brjobsedu.com/Nandagora/api4/stepone/${formData.id}/`,
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
      alert("डेटा सफलतापूर्वक अपडेट हो गया!");
      onUpdate(res.data);
      setShow(false);
      navigate("/OrphanStepTwo");
    } catch (error) {
      console.error("Update failed:", error);
      alert("डेटा अपडेट करने में समस्या हुई।");
    }
  };

  return (
    <>
      <div
        onClick={() => setShow(true)}
        style={{ cursor: "pointer" }}
        className="nd-step2"
      >
        <h3>
          <FaCheck /> Step 1 : व्यक्तिगत जानकारी (Click to View)
        </h3>
      </div>

      <Modal show={show} onHide={() => setShow(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>अनाथ कन्या स्टेप 1 विवरण</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table bordered>
            <thead>
              <tr>
                <th>क्रमांक</th>
                <th>शीर्षक</th>
                <th>जानकारी</th>
                <th>अपडेट करें</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  key: "girl_name",
                  label: "कन्या शिशु का नाम",
                  disabled: true,
                },
                { key: "moth_name", label: "माता का नाम" },
                { key: "fath_name", label: "पिता का नाम" },
                { key: "dob", label: "जन्म तिथि", type: "date" },
                { key: "mobile_no", label: "मोबाइल नंबर", disabled: true },
                { key: "email_id", label: "ईमेल आईडी", type: "email" },
                { key: "adhar_no", label: "आधार नंबर", disabled: true },
                { key: "district", label: "जिला", disabled: true },
                { key: "project", label: "परियोजना / ब्लॉक", disabled: true },
                { key: "girl_add", label: "कन्या का पता", as: "textarea" },
                { key: "org_tele", label: "संगठन का टेलीफोन" },
                { key: "pan_no", label: "पैन नंबर" },
              ].map((field, index) => (
                <tr key={field.key}>
                  <td>{index + 1}</td>
                  <td>{field.label}</td>
                  <td>{formData[field.key] || ""}</td>
                  <td>
                    <Form.Control
                      as={field.as || "input"}
                      type={field.type || "text"}
                      name={field.key}
                      value={formData[field.key] || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={field.disabled}
                      isInvalid={!!errors[field.key]}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors[field.key]}
                    </Form.Control.Feedback>
                  </td>
                </tr>
              ))}

              {/* 12वीं उत्तीर्ण */}
              <tr>
                <td>13</td>
                <td>12वीं उत्तीर्ण</td>
                <td>
                  <div>
                    <div>
                      <strong>वर्ष:</strong> {formData.twelfth_pass_year || ""}
                    </div>
                    <div>
                      <strong>विद्यालय:</strong> {formData.school_name || ""}
                    </div>
                    <div>
                      <strong>बोर्ड:</strong> {formData.board_name || ""}
                    </div>
                    <div>
                      <strong>विवरण:</strong> {formData.vivran || ""}
                    </div>
                  </div>
                </td>
                <td>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <Form.Select
                      name="twelfth_pass_year"
                      value={formData.twelfth_pass_year || ""}
                      onChange={handleChange}
                      size="sm"
                    >
                      <option value="">-- वर्ष चुनें --</option>
                      {Array.from({ length: 50 }, (_, i) => 2025 - i).map(
                        (year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        )
                      )}
                    </Form.Select>
                    <Form.Control
                      type="text"
                      placeholder="विद्यालय"
                      name="school_name"
                      value={formData.school_name || ""}
                      onChange={handleChange}
                      size="sm"
                    />
                    <Form.Control
                      type="text"
                      placeholder="बोर्ड"
                      name="board_name"
                      value={formData.board_name || ""}
                      onChange={handleChange}
                      size="sm"
                    />
                    <Form.Control
                      as="textarea"
                      rows={2}
                      placeholder="विवरण"
                      name="vivran"
                      value={formData.vivran || ""}
                      onChange={handleChange}
                      size="sm"
                    />
                  </div>
                </td>
              </tr>

              {/* बैंक और शाखा */}
              <tr>
                <td>14</td>
                <td>खाता नंबर</td>
                <td>{formData.acn_no || ""}</td>
                <td>
                  <Form.Control
                    type="text"
                    name="acn_no"
                    value={formData.acn_no || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={!!errors.acn_no}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.acn_no}
                  </Form.Control.Feedback>
                </td>
              </tr>

              <tr>
                <td>15</td>
                <td>IFSC कोड</td>
                <td>{formData.ifsc_code || ""}</td>
                <td>
                  <Form.Control
                    type="text"
                    name="ifsc_code"
                    value={formData.ifsc_code || ""}
                    onChange={handleChange}
                  />
                </td>
              </tr>

              <tr>
                <td>16</td>
                <td>बैंक का नाम</td>
                <td>{formData.bank_name || ""}</td>
                <td>
                  <Form.Select
                    name="bank_name"
                    value={formData.bank_name || ""}
                    onChange={handleChange}
                  >
                    <option value="">बैंक का चयन करें</option>
                    {banks.map((bank) => (
                      <option key={bank.id} value={bank.bank_name}>
                        {bank.bank_name}
                      </option>
                    ))}
                  </Form.Select>
                </td>
              </tr>

              <tr>
                <td>17</td>
                <td>शाखा का नाम</td>
                <td>{formData.branch_name || ""}</td>
                <td>
                  <Form.Control
                    type="text"
                    name="branch_name"
                    value={formData.branch_name || ""}
                    onChange={handleChange}
                  />
                </td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            बंद करें
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            अपडेट करें
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default OrphanStepOneView;
