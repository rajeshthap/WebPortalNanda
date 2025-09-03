import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { Table, Form, Button, Modal } from "react-bootstrap";
import axios from "axios";

const TwelfthStepTwoView = () => {
  const [show, setShow] = useState(false);

  const [formData, setFormData] = useState({
    user: localStorage.getItem("user_id") || "",
  });

  const [memberData, setMemberData] = useState([]);
  const [girlData, setGirlData] = useState([]);

  const [error2a, setError2a] = useState(null);
  const [error2b, setError2b] = useState(null);
  const [error2c, setError2c] = useState(null);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    if (!user_id) return;

    axios
      .get(`https://brjobsedu.com/Nandagora/api4/phase2a/update/${user_id}/`)
      .then((res) => setMemberData(Array.isArray(res.data) ? res.data : []))
      .catch(() => setError2a("सदस्य डेटा लोड करने में त्रुटि"));

    axios
      .get(`https://brjobsedu.com/Nandagora/api4/phase2b/${user_id}/`)
      .then((res) => setFormData((prev) => ({ ...prev, ...res.data })))
      .catch(() => setError2b("अन्य जानकारी लोड करने में त्रुटि"));

    axios
      .get(`https://brjobsedu.com/Nandagora/api4/phase2c/update/${user_id}/`)
      .then((res) => setGirlData(Array.isArray(res.data) ? res.data : []))
      .catch(() => setError2c("कन्या डेटा लोड करने में त्रुटि"));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updated = { ...prev, [name]: value };

      // Existing logic for connection fields
      if (name === "elec_conn" && value === "उपलब्ध है")
        updated.elec_reso = "N/A";
      if (name === "wate_conn" && value === "उपलब्ध है")
        updated.wate_reso = "N/A";
      if (name === "elec_conn" && value === "उपलब्ध नहीं है")
        updated.elec_reso = "";
      if (name === "wate_conn" && value === "उपलब्ध नहीं है")
        updated.wate_reso = "";

      // व्यावसाय logic
      if (name === "occu_fath" && value === "No") {
        updated.mnrega_fath = "N/A";
        updated.mnrega_fath_days = "N/A";
      }
      if (name === "occu_moth" && value === "No") {
        updated.mnrega_moth = "N/A";
        updated.mnrega_moth_days = "N/A";
      }
      if (name === "occu_abhi" && value === "No") {
        updated.mnrega_abhi = "N/A";
        updated.mnrega_abhi_days = "N/A";
      }

      // Clear fields if Yes
      if (name === "occu_fath" && value === "Yes") {
        updated.mnrega_fath = "";
        updated.mnrega_fath_days = "";
      }
      if (name === "occu_moth" && value === "Yes") {
        updated.mnrega_moth = "";
        updated.mnrega_moth_days = "";
      }
      if (name === "occu_abhi" && value === "Yes") {
        updated.mnrega_abhi = "";
        updated.mnrega_abhi_days = "";
      }

      return updated;
    });
  };

  // Handle Phase2a member data change
  const handleMemberChange = (index, key, value) => {
    const newData = [...memberData];
    newData[index][key] = value;
    setMemberData(newData);
  };

  // Handle Phase2c girl data change
  const handleGirlChange = (index, key, value) => {
    const newData = [...girlData];
    newData[index][key] = value;
    setGirlData(newData);
  };

  const updateAll = async () => {
    try {
      const user_id = localStorage.getItem("user_id");
      if (!user_id) return;

      // Prepare Phase2b payload
      const payload2b = { ...formData };

      // Handle व्यावसाय fields
      ["fath", "moth", "abhi"].forEach((person) => {
        if (payload2b[`occu_${person}`] === "No") {
          payload2b[`mnrega_${person}`] = "N/A";
          payload2b[`mnrega_${person}_days`] = 0;
        }
        // Optional: convert empty string to null
        if (payload2b[`mnrega_${person}`] === "")
          payload2b[`mnrega_${person}`] = null;
        if (payload2b[`mnrega_${person}_days`] === "")
          payload2b[`mnrega_${person}_days`] = null;
      });

      // Send Phase2b update
      await axios.put(
        `https://brjobsedu.com/Nandagora/api4/phase2b/${user_id}/`,
        payload2b
      );

      // Update Phase2a
      if (Array.isArray(memberData) && memberData.length > 0) {
        for (const row of memberData) {
          await axios.put(
            `https://brjobsedu.com/Nandagora/api4/phase2a/update/${row.id}/`,
            row
          );
        }
      }

      // Update Phase2c
      if (Array.isArray(girlData) && girlData.length > 0) {
        for (const row of girlData) {
          await axios.put(
            `https://brjobsedu.com/Nandagora/api4/phase2c/update/${row.id}/`,
            row
          );
        }
      }

      alert("सभी डेटा सफलतापूर्वक अपडेट हो गया!");
      window.location.href = "/TwelthStepThree";
    } catch (error) {
      console.error(error);
      alert("डेटा अपडेट करने में समस्या आई");
    }
  };

  const memberFields = [
    { key: "mem_name", label: "सदस्य का नाम" },
    { key: "mem_dob", label: "सदस्य की जन्मतिथि" },
    { key: "ten_sch", label: "10वीं विद्यालय का नाम" },
    { key: "twel_sch", label: "12वीं विद्यालय का नाम" },
    { key: "grad_col", label: "स्नातक कॉलेज का नाम" },
    { key: "pgrad_col", label: "स्नातकोत्तर कॉलेज का नाम" },
    { key: "work_det", label: "कार्य विवरण" },
  ];

  const girlFields = [
    { key: "girl_name", label: "लाभार्थी कन्या का नाम" },
    { key: "dob", label: "लाभार्थी कन्या की जन्मतिथि" },
    { key: "aadhaar_no", label: "लाभार्थी कन्या का आधार नंबर" },
    { key: "benefit_year", label: "लाभ का वर्ष" },
  ];

  const otherGroups = [
    {
      heading: "इण्टर मिडिएट उत्तीर्ण करने का विवरण ",
      fields: [
        { key: "sch_pass", label: "12वीं उत्तीर्ण वर्ष" },
        { key: "sch_name", label: "विद्यालय का नाम" },
        { key: "sch_board", label: "विद्यालय बोर्ड" },
        { key: "fur_edu", label: "आगे की शिक्षा" },
      ],
    },
    {
      heading: "पैन कार्ड का विवरण",
      fields: [
        { key: "moth_pan", label: "माता का पैन" },
        { key: "fath_pan", label: "पिता का पैन" },
        { key: "abhi_pan", label: "अभिभावक का पैन" },
      ],
    },
    {
      heading: "आय का विवरण",
      fields: [
        { key: "annual_income", label: "वार्षिक आय" },
        { key: "income_cert", label: "आय प्रमाणपत्र नंबर" },
        { key: "inc_cert_date", label: "आय प्रमाणपत्र तिथि", type: "date" },
      ],
    },
    {
      heading: "बिजली/पानी का कनेक्शन उपलब्ध है",
      fields: [
        { key: "elec_conn", label: "बिजली कनेक्शन" },
        { key: "wate_conn", label: "पानी कनेक्शन" },
        { key: "elec_reso", label: "बिजली स्रोत" },
        { key: "wate_reso", label: "पानी स्रोत" },
      ],
    },
  ];

  return (
    <>
      <div
        onClick={handleShow}
        style={{ cursor: "pointer" }}
        className="nd-step2"
      >
        <h3>
          <FaCheck /> Step 2 : व्यक्तिगत जानकारी (Click to View)
        </h3>
      </div>

      <Modal show={show} onHide={handleClose} size="lg" scrollable>
        <Modal.Header closeButton>
          <Modal.Title>
            <h3>Step 2 : अतिरिक्त जानकारी</h3>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            {/* Phase2a Table  */}
            <div style={{ marginBottom: "20px" }}>
              <h5 className="text-center">सदस्य की जानकारी</h5>
              <Table bordered responsive className="nd-born-table">
                <thead className="nd-born-thead">
                  <tr>
                    <th>क्रमांक</th>
                    {memberFields.map((f) => (
                      <th key={f.key}>{f.label}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {error2a ? (
                    <tr>
                      <td
                        colSpan={memberFields.length + 1}
                        className="text-danger text-center"
                      >
                        {error2a}
                      </td>
                    </tr>
                  ) : memberData.length > 0 ? (
                    memberData.map((row, idx) => (
                      <tr key={idx}>
                        <td>{idx + 1}</td>
                        {memberFields.map((f) => (
                          <td key={f.key}>
                            <Form.Control
                              type="text"
                              value={row[f.key] || ""}
                              onChange={(e) =>
                                handleMemberChange(idx, f.key, e.target.value)
                              }
                            />
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={memberFields.length + 1}
                        className="text-center"
                      >
                        कोई डेटा उपलब्ध नहीं
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>

            {/* Phase2c Table */}
            <div style={{ marginBottom: "20px" }}>
              <h5 className="text-center">लाभार्थी कन्या की जानकारी</h5>
              <Table bordered responsive className="nd-born-table">
                <thead className="nd-born-thead">
                  <tr>
                    <th>क्रमांक</th>
                    {girlFields.map((f) => (
                      <th key={f.key}>{f.label}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {error2c ? (
                    <tr>
                      <td
                        colSpan={girlFields.length + 1}
                        className="text-danger text-center"
                      >
                        {error2c}
                      </td>
                    </tr>
                  ) : girlData.length > 0 ? (
                    girlData.map((row, idx) => (
                      <tr key={idx}>
                        <td>{idx + 1}</td>
                        {girlFields.map((f) => (
                          <td key={f.key}>
                            <Form.Control
                              type="text"
                              value={row[f.key] || ""}
                              onChange={(e) =>
                                handleGirlChange(idx, f.key, e.target.value)
                              }
                            />
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={girlFields.length + 1}
                        className="text-center"
                      >
                        कोई डेटा उपलब्ध नहीं
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>

            {error2b ? (
              <p className="text-danger text-center">{error2b}</p>
            ) : (
              <>
                {otherGroups.map((group, gIndex) => (
                  <div key={gIndex} style={{ marginBottom: "20px" }}>
                    <h5 className="text-center">{group.heading}</h5>
                    <Table bordered responsive className="nd-born-table">
                      <thead className="nd-born-thead">
                        <tr>
                          <th>क्रमांक</th>
                          <th>शीर्षक</th>
                          <th>जानकारी</th>
                          <th>Update Info</th>
                        </tr>
                      </thead>
                      <tbody>
                        {group.fields.map((field, index) => {
                          // Handle electricity/water connection & reason
                          if (
                            [
                              "elec_conn",
                              "wate_conn",
                              "elec_reso",
                              "wate_reso",
                            ].includes(field.key)
                          ) {
                            const relatedConn =
                              field.key === "elec_reso"
                                ? formData.elec_conn
                                : field.key === "wate_reso"
                                ? formData.wate_conn
                                : null;

                            // If connection is available, send "N/A" for reason
                            const currentValue =
                              field.key.endsWith("_reso") &&
                              relatedConn === "उपलब्ध है"
                                ? "N/A"
                                : formData[field.key] || "";

                            return (
                              <tr key={field.key}>
                                <td>{index + 1}</td>
                                <td>{field.label}</td>
                                <td>{formData[field.key] || "-"}</td>
                                <td>
                                  <Form.Select
                                    name={field.key}
                                    value={currentValue}
                                    onChange={handleChange}
                                    disabled={
                                      field.key.endsWith("_reso") &&
                                      relatedConn === "उपलब्ध है"
                                    }
                                  >
                                    {field.key.endsWith("_reso") &&
                                      relatedConn !== "उपलब्ध है" && (
                                        <>
                                          <option value="">
                                            -- कारण चुने --
                                          </option>
                                          <option value="अपना आवास नहीं है">
                                            अपना आवास नहीं है
                                          </option>
                                          <option value="गांव में कनेक्शन उपलब्ध नहीं है">
                                            गांव में कनेक्शन उपलब्ध नहीं है
                                          </option>
                                        </>
                                      )}
                                    {(field.key === "elec_conn" ||
                                      field.key === "wate_conn") && (
                                      <>
                                        <option value="उपलब्ध है">
                                          उपलब्ध है
                                        </option>
                                        <option value="उपलब्ध नहीं है">
                                          उपलब्ध नहीं है
                                        </option>
                                      </>
                                    )}
                                    {field.key.endsWith("_reso") &&
                                      relatedConn === "उपलब्ध है" && (
                                        <option value="N/A">N/A</option>
                                      )}
                                  </Form.Select>
                                </td>
                              </tr>
                            );
                          }

                          return (
                            <tr key={field.key}>
                              <td>{index + 1}</td>
                              <td>{field.label}</td>
                              <td>{formData[field.key] || "-"}</td>
                              <td>
                                <Form.Control
                                  type={field.type || "text"}
                                  name={field.key}
                                  value={formData[field.key] || ""}
                                  onChange={handleChange}
                                />
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </div>
                ))}

                <div style={{ marginBottom: "20px" }}>
                  <h5 className="text-center">व्यवसाय का विवरण</h5>
                  <Table bordered responsive className="nd-born-table">
                    <thead className="nd-born-thead">
                      <tr>
                        <th>व्यक्ति</th>
                        <th>व्यवसाय (हाँ / ना)</th>
                        <th>मनरेगा कार्ड संख्या</th>
                        <th>मनरेगा दिवस</th>
                      </tr>
                    </thead>
                    <tbody>
                      {["fath", "moth", "abhi"].map((person) => (
                        <tr key={person}>
                          <td>
                            {person === "fath"
                              ? "पिता"
                              : person === "moth"
                              ? "माता"
                              : "अभिभावक"}
                          </td>
                          <td>
                            <Form.Select
                              name={`occu_${person}`}
                              value={formData[`occu_${person}`] || ""}
                              onChange={handleChange}
                            >
                              {!formData[`occu_${person}`] && (
                                <option value="">--चुनें--</option>
                              )}
                              <option value="Yes">हाँ</option>
                              <option value="No">ना</option>
                            </Form.Select>
                          </td>
                          <td>
                            <Form.Control
                              type="text"
                              name={`mnrega_${person}`}
                              value={formData[`mnrega_${person}`] || ""}
                              onChange={handleChange}
                              disabled={formData[`occu_${person}`] === "No"}
                            />
                          </td>
                          <td>
                            <Form.Control
                              type="text"
                              name={`mnrega_${person}_days`}
                              value={formData[`mnrega_${person}_days`] || ""}
                              onChange={handleChange}
                              disabled={formData[`occu_${person}`] === "No"}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </>
            )}

            <div className="text-center mt-3">
              <Button variant="primary" onClick={updateAll}>
                सभी जानकारी अपडेट करें
              </Button>
            </div>
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

export default TwelfthStepTwoView;
