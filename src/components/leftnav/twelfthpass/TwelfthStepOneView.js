import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa6";
import { Table, Form, Button, Modal } from "react-bootstrap";
import axios from "axios";

const SteponeViewModal = () => {
  const casteOptions = [
    { value: "General", label: "General" },
    { value: "ST", label: "ST" },
    { value: "OBC", label: "OBC" },
    { value: "SC", label: "SC" },
  ];

  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    user: localStorage.getItem("user_id") || "",
    girl_name: "",
    moth_name: "",
    fath_name: "",
    dob: "",
    caste_category: "",
    mem_name: "",
    district: localStorage.getItem("district") || "",
    project: "",
    sector: "",
    awc: "",
    awc_type: "",
    awc_code: "",
    mobile_no: "",
    email_id: "",
    adhar_no: "",
    fam_mem: "",
    fam_sis: "",
    acno: "",
    ifsc_code: "",
    bank_name: "",
    branch_name: "",
    pan_card: "",
  });

  const [errors, setErrors] = useState({ branch_name: "", acno: "" });
  const [bankList, setBankList] = useState([]);
  const [allDistrictData, setAllDistrictData] = useState([]);
  const [sectorData, setSectorData] = useState([]);
  const [awcData, setAwcData] = useState([]);
  const [awc_codeData, setAwcCodeData] = useState([]);
  const [awc_typeData, setAwcTypeData] = useState([]);
  const [user, setUser] = useState(null);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  // Fetch bank list
  useEffect(() => {
    axios
      .get("https://brjobsedu.com/Nandagora/api2/Bankdetails/")
      .then((res) => setBankList(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Fetch district data
  useEffect(() => {
    if (!formData.district) return;
    axios
      .get(
        `https://brjobsedu.com/Nandagora/api3/district-data/?district=${formData.district}`
      )
      .then((res) => setAllDistrictData(res.data || []))
      .catch(console.error);
  }, [formData.district]);

  // Fetch user info
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      setUser(savedUser);
      const updatedData = {
        girl_name: savedUser.name || "",
        adhar_no: savedUser.aadhaar || "",
        district: savedUser.district || "",
        project: savedUser.block || "",
        mobile_no: savedUser.phone || "",
      };
      setFormData((prev) => ({ ...prev, ...updatedData }));
    }
  }, []);

  // Fetch edit data
  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    if (!user_id) return;
    axios
      .get(
        `https://brjobsedu.com/Nandagora/api4/step_one_updata__get/${user_id}/`
      )
      .then((res) => {
        setFormData((prev) => ({ ...prev, ...res.data }));
      })
      .catch(console.error);
  }, []);

  // Cascading dropdowns
  useEffect(() => {
    setSectorData(
      allDistrictData.filter(
        (item, index, self) =>
          index === self.findIndex((t) => t.sector === item.sector)
      )
    );
  }, [allDistrictData]);

  useEffect(() => {
    const filtered = allDistrictData.filter(
      (item) => item.sector === formData.sector
    );
    setAwcData(
      filtered.filter(
        (item, index, self) =>
          index === self.findIndex((t) => t.awc === item.awc)
      )
    );
  }, [formData.sector, allDistrictData]);

  useEffect(() => {
    const filtered = allDistrictData.filter(
      (item) => item.sector === formData.sector && item.awc === formData.awc
    );
    setAwcCodeData(
      filtered.filter(
        (item, index, self) =>
          index === self.findIndex((t) => t.awc_code === item.awc_code)
      )
    );
  }, [formData.awc, formData.sector, allDistrictData]);

  useEffect(() => {
    const filtered = allDistrictData.filter(
      (item) => item.awc_code === formData.awc_code
    );
    setAwcTypeData(
      filtered.filter(
        (item, index, self) =>
          index === self.findIndex((t) => t.awc_type === item.awc_type)
      )
    );
  }, [formData.awc_code, allDistrictData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "sector" && { awc: "", awc_code: "", awc_type: "" }),
      ...(name === "awc" && { awc_code: "", awc_type: "" }),
      ...(name === "awc_code" && { awc_type: "" }),
    }));
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const updateform1 = async () => {
    try {
      const user_id = localStorage.getItem("user_id");
      if (!user_id) return;

      await axios.put(
        `https://brjobsedu.com/Nandagora/api4/step_one_updata__get/${user_id}/`,
        formData
      );
      alert("Form updated successfully!");
      window.location.href = "/TwelthStepTwo";
    } catch (error) {
      alert("Failed to update form");
    }
  };

  return (
    <>
        <div
          onClick={handleShow}
          style={{ cursor: "pointer" }}
          className="nd-step2"
        >
          <h3>
            <FaCheck /> Step 1 : व्यक्तिगत जानकारी (Click to View)
          </h3>
        </div>

      <Modal show={show} onHide={handleClose} size="lg" scrollable>
        <Modal.Header closeButton>
          <Modal.Title>
            <h3>कक्षा 12वी उत्तीर्ण छात्राओं के लिए (द्वितीय चरण हेतु)</h3>
            <h3>Step 1 : व्यक्तिगत जानकारी</h3>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Table bordered responsive>
              <thead className="nd-born-thead">
                <tr>
                  <th>क्रमांक</th>
                  <th>शीर्षक</th>
                  <th>जानकारी</th>
                  <th>Update Info here</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    key: "girl_name",
                    label: "कन्या शिशु का नाम",
                    editable: false,
                  },
                  { key: "moth_name", label: "माता का नाम", editable: true },
                  { key: "fath_name", label: "पिता का नाम", editable: true },
                  {
                    key: "pan_card",
                    label: "स्थायी खाता संख्या कार्ड (PAN CARD)",
                    editable: true,
                  },
                  {
                    key: "dob",
                    label: "कन्या की जन्म तिथि",
                    editable: true,
                    type: "date",
                  },
                  {
                    key: "caste_category",
                    label: "जाति श्रेणी",
                    editable: true,
                    type: "select",
                    options: casteOptions,
                  },
                  { key: "mobile_no", label: "मोबाइल नंबर", editable: false },
                  { key: "district", label: "जिला", editable: false },
                  {
                    key: "project",
                    label: "परियोजना / ब्लॉक",
                    editable: false,
                  },
                  {
                    key: "sector",
                    label: "क्षेत्र / सेक्टर ",
                    editable: true,
                    type: "select",
                    options: sectorData.map((i) => i.sector),
                  },
                  {
                    key: "awc",
                    label: "आंगनवाड़ी केंद्र का नाम",
                    editable: true,
                    type: "select",
                    options: awcData.map((i) => i.awc),
                  },
                  {
                    key: "awc_code",
                    label: "AWC कोड",
                    editable: true,
                    type: "select",
                    options: awc_codeData.map((i) => i.awc_code),
                  },
                  {
                    key: "awc_type",
                    label: "AWC टाइप",
                    editable: true,
                    type: "select",
                    options: awc_typeData.map((i) => i.awc_type),
                  },

                  { key: "email_id", label: "ईमेल आईडी", editable: true },
                  {
                    key: "adhar_no",
                    label: "माता/कन्या का आधार नंबर",
                    editable: false,
                  },
                  { key: "fam_mem", label: "परिवार के सदस्य", editable: true },
                  {
                    key: "fam_sis",
                    label: "भाई बहन की संख्या",
                    editable: true,
                  },
                  {
                    key: "acno",
                    label:
                      "माता/पिता/संरक्षक एवं कन्या शिशु के संयुक्त खाता संख्या",
                    editable: true,
                  },
                  {
                    key: "ifsc_code",
                    label: "बैंक खाते का IFSC कोड",
                    editable: true,
                  },
                  {
                    key: "bank_name",
                    label: "बैंक का नाम",
                    editable: true,
                    type: "select",
                    options: bankList.map((b) => b.bank_name),
                  },
                  { key: "branch_name", label: "शाखा का नाम", editable: true },
                ].map((field, index) => (
                  <tr key={field.key}>
                    <td>{index + 1}</td>
                    <td>{field.label}</td>
                    <td>{formData[field.key]}</td>
                    <td>
                      {field.type === "select" ? (
                        <Form.Select
                          name={field.key}
                          value={formData[field.key] || ""}
                          onChange={handleChange}
                          disabled={!field.editable}
                        >
                          <option value="">Select</option>
                          {field.options.map((opt) =>
                            typeof opt === "object" ? (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ) : (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            )
                          )}
                        </Form.Select>
                      ) : (
                        <Form.Control
                          type={field.type || "text"}
                          name={field.key}
                          value={formData[field.key] || ""}
                          onChange={handleInput}
                          disabled={!field.editable}
                        />
                      )}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={3}></td>
                  <td className="text-center">
                    <Button variant="primary" onClick={updateform1}>
                      अपडेट करें
                    </Button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SteponeViewModal;
