import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa6";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Table, Form } from "react-bootstrap";

function SteponeView() {
  const [show, setShow] = useState(false);
  const [, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    user: "",
    kanya_name: "",
    moth_name: "",
    fath_name: "",
    abhi_name: "",
    dob: "",
    mem_name: "",
    prasav_name: "",
    district: "",
    project: "",
    awc: "",
    awc_type: "",
    awc_code: "",
    mobile_no: "",
    email_id: "",
    adhar_no: "",
    fam_mem: "",
    acno: "",
    ifsc_code: "",
    bank_name: "",
    branch_name: "",
  });

  // const { refreshToken, refreshAccessToken, logout } = useAuth();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // ✅ Auto refresh token
  // useEffect(() => {
  //   const handleRefresh = async () => {
  //     if (!refreshToken) {
  //       logout();
  //       navigate("/UserLogin");
  //       return;
  //     }
  //     const success = await refreshAccessToken();
  //     if (!success) {
  //       logout();
  //       navigate("/UserLogin");
  //     }
  //   };
  //   handleRefresh();
  // });

  // ✅ Load user/form data
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const user_id = localStorage.getItem("user_id");
    // const form_id = localStorage.getItem("form_id");

    if (!user || !user_id) {
      console.warn("User or user_id not found in localStorage.");
      navigate("/UserLogin");
      return;
    }

    const baseInfo = {
      kanya_name: user.name || "",
      adhar_no: user.aadhaar || "",
      district: user.district || "",
      project: user.block || "",
      mobile_no: user.phone || "",
      fam_mem: localStorage.getItem("family_member_count") || "",
      user: user_id,
    };

    setFormData((prev) => ({
      ...prev,
      ...baseInfo,
    }));

    const fetchFormData = async () => {
      try {
        const res = await fetch(`https://brjobsedu.com/Nandagora/api2/phase1/update/${user_id}/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        // if (res.status === 401 || res.status === 403) {
        //   logout();
        //   return;
        // }

        if (!res.ok) throw new Error("Failed to fetch form data");

        const data = await res.json();
        localStorage.setItem("mobile", data.mobile_no || "");

        setFormData((prev) => ({
          ...prev,
          ...data,
          user: user_id,
        }));
        setLoading(false);
      } catch (err) {
        console.error("❌ Error fetching form data:", err);
        setErrorMsg(err.message);
        setLoading(false);
      }
    };

    fetchFormData();
  },[]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    const user_id = localStorage.getItem("user_id");
    if (!user_id) {
      alert("User ID is missing.");
      return;
    }

    try {
      const res = await fetch(`https://brjobsedu.com/Nandagora/api2/phase1/update/${user_id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to update data");
      }

      await res.json();
      setSuccessMsg("Form updated Successfully.");
      localStorage.setItem("updatedPhase1Data", JSON.stringify(formData));
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  return (
    <>
      <div onClick={handleShow} className="nd-step1" style={{ cursor: "pointer" }}>
        <h3><FaCheck /> Step 1 : व्यक्तिगत जानकारी (Click to View)</h3>
      </div>

      <Modal show={show} onHide={handleClose} size="lg" scrollable>
        <Modal.Header closeButton>
          <Modal.Title className="nd-step1 nd-step1-view">
            <h3>कन्या के जन्म पर (प्रथम चरण हेतु)</h3>
            <h3>Step 1 : व्यक्तिगत जानकारी</h3>
            {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
            {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="nd-modal-body">
          <Form onSubmit={handleSubmit}>
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
                  { key: "kanya_name", label: "कन्या शिशु का नाम", editable: true },
                  { key: "moth_name", label: "माता का नाम", editable: true },
                  { key: "fath_name", label: "पिता का नाम", editable: true },
                  { key: "dob", label: "जन्म तिथि", editable: false, type: "date" },
                  { key: "mem_name", label: "जन्म पंजीकरण संख्या", editable: true },
                  { key: "prasav_name", label: "प्रसव स्थान", editable: true },
                  { key: "district", label: "जिला", editable: false },
                  { key: "project", label: "ब्लॉक", editable: false },
                  { key: "awc", label: "आंगनवाड़ी केंद्र", editable: true },
                  { key: "mobile_no", label: "मोबाइल नंबर", editable: false },
                  { key: "email_id", label: "ईमेल आईडी", editable: true },
                  { key: "adhar_no", label: "आधार नंबर", editable: false },
                  { key: "fam_mem", label: "परिवार के सदस्य", editable: true },
                  { key: "acno", label: "खाता संख्या", editable: true },
                  { key: "ifsc_code", label: "IFSC कोड", editable: true },
                  { key: "bank_name", label: "बैंक का नाम", editable: true },
                  { key: "branch_name", label: "शाखा का नाम", editable: true },
                ].map((field, index) => (
                  <tr key={field.key}>
                    <td>{index + 1}</td>
                    <td>{field.label}</td>
                    <td>{formData[field.key]}</td>
                    <td>
                      <Form.Control
                        type={field.type || "text"}
                        name={field.key}
                        value={formData[field.key] || ""}
                        onChange={handleChange}
                        readOnly={!field.editable}
                        disabled={!field.editable}
                      />
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={3}></td>
                  <td className="text-center">
                    <Button type="submit" className="nd-primary-dawnload">Update Details</Button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Form>
        </Modal.Body>

        <Modal.Footer className="nd-footer">
          <Button variant="secondary" onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SteponeView;
