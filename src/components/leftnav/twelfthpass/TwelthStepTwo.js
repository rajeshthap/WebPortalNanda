import React, { useEffect, useState, useRef } from "react";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import { Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "../../../assets/css/LeftNav.css";
import "@fortawesome/fontawesome-free";
import "../../../assets/css/NandaStepOne.css";
import "../../../assets/css/HomePage.css";
import DashHeader from "../../leftnav/DashHeader";
import InnerNavigation from "../../leftnav/InnerNavigation";
import Footer from "../../footer/Footer";
import TwelthPass from "./TwelthPass";
import TwelfthStepOneView from "./TwelfthStepOneView";

const TwelthStepTwo = () => {
  const navigate = useNavigate();
  const lastUpdatedData = useRef(null);

  const [formData, setFormData] = useState({});
  const [siblings, setSiblings] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch siblings on load
  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (!userStr) return;

    const user = JSON.parse(userStr);

    setFormData((prev) => ({
      ...prev,
      girl_name: user.name || "",
      adhar_no: user.aadhaar || "",
      district: user.district || "",
      project: user.block || "",
    }));

    const fetchSiblings = async () => {
      try {
        const res = await axios.get(
          `https://brjobsedu.com/Nandagora/api4/step_one_updata__get/${user.id}/`
        );
        setSiblings(res.data.fam_sis || 0);
      } catch (err) {
        console.error("Error fetching siblings:", err);
      }
    };
    fetchSiblings();
  }, []);

  // auto-update from phase1
  useEffect(() => {
    const interval = setInterval(() => {
      const updatedDataStr = localStorage.getItem("updatedPhase1Data");
      if (!updatedDataStr) return;

      try {
        const updatedData = JSON.parse(updatedDataStr);
        if (
          JSON.stringify(updatedData) !==
          JSON.stringify(lastUpdatedData.current)
        ) {
          setFormData((prev) => {
            const hasAnyChange = Object.keys(updatedData).some(
              (key) => prev[key] !== updatedData[key]
            );
            if (!hasAnyChange) return prev;

            lastUpdatedData.current = updatedData;
            return { ...prev, ...updatedData };
          });
        }
      } catch (err) {
        console.error("Failed to parse updatedPhase1Data:", err);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    const userStr = localStorage.getItem("user");
    if (!userStr) {
      console.error("User not found in localStorage!");
      setIsSubmitting(false);
      return;
    }
    const user = JSON.parse(userStr);

    // normalize dependent fields
    ["fath", "moth", "abhi"].forEach((p) => {
      if (formData[`occu_${p}`] === "No") {
        formData[`mnrega_${p}`] = "N/A";
        formData[`mnrega_${p}_days`] = 0;
      } else {
        formData[`mnrega_${p}_days`] = parseInt(
          formData[`mnrega_${p}_days`] || 0,
          10
        );
      }
    });

    if (formData.elec_conn === "उपलब्ध है") formData.elec_reso = "N/A";
    if (formData.wate_conn === "उपलब्ध है") formData.wate_reso = "N/A";

    //  Phase2a: siblings (always post all rows) 
    try {
      const siblingsData = Array.from({ length: siblings }).map((_, index) => ({
        user: user.id,
        girl_name: user.name,
        district: user.district,
        project: user.block,
        adhar_no: user.aadhaar,
        mem_name: formData[`mem_name_${index}`] || "",
        mem_dob: formData[`mem_dob_${index}`] || "",
        ten_sch: formData[`ten_sch_${index}`] || "",
        twel_sch: formData[`twel_sch_${index}`] || "",
        grad_col: formData[`grad_col_${index}`] || "",
        pgrad_col: formData[`pgrad_col_${index}`] || "",
        work_det: formData[`work_det_${index}`] || "",
      }));

      await axios.post(
        "https://brjobsedu.com/Nandagora/api4/phase2a/create/",
        siblingsData,
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("✅ Phase2a submitted successfully (all siblings in one go)");
    } catch (error) {
      console.error(" Phase2a Error:", error.response?.data || error.message);
    }

    // Phase2c: previous girls (always post 3 rows) 
try {
 const prevGirlsData = Array.from({ length: 3 })
  .map((_, i) => ({
    user: user.id,
    district: user.district,
    project: user.block,
    adhar_no: user.aadhaar,
    girl_name: formData[`girl_name_${i}`]?.trim() || "",
    dob: formData[`dob_${i}`] || "",
    aadhaar_no: formData[`aadhaar_no_${i}`]?.trim() || "",
    benefit_year: formData[`benefit_year_${i}`]
      ? parseInt(formData[`benefit_year_${i}`], 10)
      : "",
  }))
  .filter(
    (row) =>
      row.girl_name || row.dob || row.aadhaar_no || row.benefit_year
  ); // keep only filled rows

if (prevGirlsData.length > 0) {
  await axios.post(
    "https://brjobsedu.com/Nandagora/api4/phase2c/create/",
    prevGirlsData,
    { headers: { "Content-Type": "application/json" } }
  );
  console.log("✅ Phase2C submitted successfully");
} else {
  console.log("No filled rows for Phase2C, skipping submission");
}

  await axios.post(
    "https://brjobsedu.com/Nandagora/api4/phase2c/create/",
    prevGirlsData,
    { headers: { "Content-Type": "application/json" } }
  );

  console.log("✅ Phase2c submitted successfully (all rows in one go)");
} 

catch (error) {
  const errDetail = error.response?.data?.detail || error.response?.data || error.message;
  console.error("Phase2C Error:", errDetail);
  alert("Phase2C submission failed:\n" + JSON.stringify(errDetail, null, 2));
}


    //  Phase2b: main form 
    try {
      const formPayload = new FormData();
      formPayload.append("user", user.id || "");
      formPayload.append("girl_name", user.name || "");
      formPayload.append("district", user.district || "");
      formPayload.append("project", user.block || "");
      formPayload.append("adhar_no", user.aadhaar || "");

      Object.entries(formData).forEach(([key, value]) => {
        const val =
          value === undefined || value === null || value === "" ? "" : value;
        formPayload.append(key, val);
      });

      await axios.post(
        "https://brjobsedu.com/Nandagora/api4/phase2b/",
        formPayload,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log("✅ Phase2b submitted successfully!");
    } catch (error) {
      console.error(" Phase2b Error:", error.response?.data || error.message);
    }

    setIsSubmitting(false);
    navigate("/TwelthStepThree");
  };

  return (
    <>
      <div>
        <DashHeader />
        <div className="main-container">
          <InnerNavigation />
          <div className="main">
            <TwelthPass />
            <div className="box-container">
              <Row>
                <div className="nd-step1">
                  <div>
                    <h3>Step 2 : सदस्यों / दस्तावेज़ों की जानकारी </h3>
                    <h3>
                      Note:किसी भी फील्ड को ब्लेंक ना छोड़े जानकारी/दस्तावेज ना
                      होने की स्थिति में "उपलब्धि नहीं है /Not Applicable "
                      लिखकर आगे बड़े।
                    </h3>
                  </div>
                  <TwelfthStepOneView step="one" />
                </div>
              </Row>

              {/* 1. Siblings */}
              <Row className="nd-stepform-box mb-4">
                <div className="nd-step-heading">
                  <h3>
                    1. आवेदक छात्रा के अन्य भाई/बहनो का विवरण{" "}
                    <span className="alert-txt">*</span>:-
                  </h3>
                </div>
                <Table bordered responsive="sm">
                  <thead className="nd-born-thead">
                    <tr>
                      <th rowSpan="2" className="nd-table-title nd-born-thead">
                        क्र0सं0
                      </th>
                      <th rowSpan="2" className="nd-table-title nd-born-thead">
                        भाई/बहन का नाम
                      </th>
                      <th rowSpan="2" className="nd-table-title nd-born-thead">
                        जन्म तिथि
                      </th>
                      <th
                        colSpan={4}
                        className="text-center nd-table-p nd-born-thead"
                      >
                        शैक्षिक अर्हता का विवरण
                      </th>
                      <th rowSpan="2" className="nd-table-title nd-born-thead">
                        यदि वर्त्तमान में नहीं पढ़ रह है, तो क्या कर रहे है।
                        (पूर्ण विवरण)
                        <span className="ruppees">₹</span>
                      </th>
                    </tr>
                    <tr>
                      <th className="nd-table-title nd-born-thead">
                        10वी तक के विद्यालय का नाम
                      </th>
                      <th className="nd-table-title nd-born-thead">
                        12वी तक के विद्यालय का नाम
                      </th>
                      <th className="nd-table-title nd-born-thead">
                        स्नातक के कॉलेज का नाम
                      </th>
                      <th className="nd-table-title nd-born-thead">
                        स्नातकोत्तर के कॉलेज का नाम
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: siblings }).map((_, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        {[
                          "mem_name",
                          "mem_dob",
                          "ten_sch",
                          "twel_sch",
                          "grad_col",
                          "pgrad_col",
                          "work_det",
                        ].map((field) => (
                          <td key={field}>
                            <Form.Control
                              type={field.includes("dob") ? "date" : "text"}
                              name={`${field}_${index}`}
                              value={formData[`${field}_${index}`] || ""}
                              onChange={(e) =>
                                handleChange(
                                  `${field}_${index}`,
                                  e.target.value
                                )
                              }
                              placeholder={
                                field === "mem_name"
                                  ? "Name"
                                  : field === "mem_dob"
                                  ? "DOB"
                                  : field === "ten_sch"
                                  ? "10th School"
                                  : field === "twel_sch"
                                  ? "12th School"
                                  : field === "grad_col"
                                  ? "Graduation College"
                                  : field === "pgrad_col"
                                  ? "Post Graduation College"
                                  : "Work Details"
                              }
                              className="shadow1 nd-mt-6"
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Row>

              {/* 2. Previous girls */}
              <Row className="nd-stepform-box mb-4">
                <div className="nd-step-heading">
                  <h3>
                    2. आवेदित बालिका के परिवार की अन्य बालिकाओं का विवरण जिनके
                    द्वारा पूर्व में 12वीं उत्तीर्ण होने पर योजना का लाभ लिया
                    गया है :-
                  </h3>
                </div>
                <Table bordered responsive="sm">
                  <thead className="nd-born-thead">
                    <tr>
                      <th className="nd-table-title nd-born-thead">क्र0सं0</th>
                      <th className="nd-table-title nd-born-thead">
                        बालिका का नाम
                      </th>
                      <th className="nd-table-title nd-born-thead">
                        बालिका की जन्म तिथि
                      </th>
                      <th className="nd-table-title nd-born-thead">
                        बालिका का आधार नम्बर
                      </th>
                      <th className="nd-table-title nd-born-thead">
                        लाभ प्राप्त करने का वर्ष
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: 3 }).map((_, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        {["girl_name", "dob", "aadhaar_no", "benefit_year"].map(
                          (field) => (
                            <td key={field}>
                              <Form.Control
                                type={field.includes("dob") ? "date" : "text"}
                                name={`${field}_${index}`}
                                value={formData[`${field}_${index}`] || ""}
                                onChange={(e) =>
                                  handleChange(
                                    `${field}_${index}`,
                                    e.target.value
                                  )
                                }
                                placeholder={
                                  field === "girl_name"
                                    ? "बालिका का नाम"
                                    : field === "dob"
                                    ? "DOB"
                                    : field === "aadhaar_no"
                                    ? "बालिका का आधार नम्बर"
                                    : "लाभ प्राप्त करने का वर्ष"
                                }
                                className="shadow1 nd-mt-6"
                              />
                            </td>
                          )
                        )}
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Row>

              {/* 3. Intermediate */}
              <Row className="nd-stepform-box mb-4">
                <div className="nd-step-heading">
                  <h3>
                    3. इण्टर मिडिएट उत्तीर्ण करने का विवरण{" "}
                    <span className="alert-txt">*</span>:-
                  </h3>
                </div>
                <Table bordered responsive="sm">
                  <thead className="nd-born-thead">
                    <tr>
                      <th className="nd-table-title nd-born-thead">
                        इण्टर मिडिएट उत्तीर्ण करने का वर्ष
                      </th>
                      <th className="nd-table-title nd-born-thead">
                        स्कूल का नाम
                      </th>
                      <th className="nd-table-title nd-born-thead">
                        बोर्ड का नाम
                      </th>
                      <th className="nd-table-title nd-born-thead">
                        इण्टर उपरान्त उच्च शिक्षा हेतु प्रवेश का विवरण:
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <Form.Control
                          type="text"
                          name="sch_pass"
                          value={formData.sch_pass || ""}
                          onChange={(e) =>
                            handleChange("sch_pass", e.target.value)
                          }
                          placeholder="इण्टर मिडिएट उत्तीर्ण करने का वर्ष"
                          className="shadow1 nd-mt-6"
                        />
                      </td>
                      <td>
                        <Form.Control
                          type="text"
                          name="sch_name"
                          value={formData.sch_name || ""}
                          onChange={(e) =>
                            handleChange("sch_name", e.target.value)
                          }
                          placeholder="स्कूल का नाम"
                          className="shadow1 nd-mt-6"
                        />
                      </td>
                      <td>
                        <Form.Control
                          type="text"
                          name="sch_board"
                          value={formData.sch_board || ""}
                          onChange={(e) =>
                            handleChange("sch_board", e.target.value)
                          }
                          placeholder="बोर्ड का नाम"
                          className="shadow1 nd-mt-6"
                        />
                      </td>
                      <td>
                        <Form.Control
                          type="text"
                          name="fur_edu"
                          value={formData.fur_edu || ""}
                          onChange={(e) =>
                            handleChange("fur_edu", e.target.value)
                          }
                          placeholder="विवरण"
                          className="shadow1 nd-mt-6"
                        />
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Row>

              {/* 4. PAN Cards */}
              <Row className="nd-stepform-box mb-4">
                <div className="nd-step-heading">
                  <h3>
                    4. पैन कार्ड का विवरण<span className="alert-txt">*</span> :-
                  </h3>
                </div>
                <Table bordered responsive="sm">
                  <thead className="nd-born-thead">
                    <tr>
                      <th className="nd-table-title nd-born-thead">
                        माता का पैन कार्ड
                      </th>
                      <th className="nd-table-title nd-born-thead">
                        पिता का पैन कार्ड
                      </th>
                      <th className="nd-table-title nd-born-thead">
                        अभिभावक का पैन कार्ड नंबर
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <Form.Control
                          type="text"
                          placeholder="माता का पैन कार्ड"
                          className="shadow1 nd-mt-6"
                          name="moth_pan"
                          value={formData.moth_pan || ""}
                          onChange={(e) =>
                            handleChange("moth_pan", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <Form.Control
                          type="text"
                          placeholder="पिता का पैन कार्ड"
                          className="shadow1 nd-mt-6"
                          name="fath_pan"
                          value={formData.fath_pan || ""}
                          onChange={(e) =>
                            handleChange("fath_pan", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <Form.Control
                          type="text"
                          placeholder="अभिभावक का पैन कार्ड नंबर"
                          className="shadow1 nd-mt-6"
                          name="abhi_pan"
                          value={formData.abhi_pan || ""}
                          onChange={(e) =>
                            handleChange("abhi_pan", e.target.value)
                          }
                        />
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Row>

              {/* 5. Income */}
              <Row className="nd-stepform-box mb-4">
                <div className="nd-step-heading">
                  <h3>
                    5. आय का विवरण<span className="alert-txt">*</span>:-
                  </h3>
                </div>
                <Table bordered responsive="sm">
                  <thead className="nd-born-thead">
                    <tr>
                      <th className="nd-table-title nd-born-thead">
                        बालिका के परिवार की वार्षिक आय (आय प्रमाण पत्र के आधार
                        पर)
                      </th>
                      <th className="nd-table-title nd-born-thead">
                        सक्षम अधिकारी द्वारा निर्गत आय प्रमाण पत्र का क्रमांक
                      </th>
                      <th className="nd-table-title nd-born-thead">
                        आय प्रमाण पत्र जारी करने की दिनांक
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <Form.Control
                          type="text"
                          name="annual_income"
                          value={formData.annual_income || ""}
                          onChange={(e) =>
                            handleChange("annual_income", e.target.value)
                          }
                          placeholder="वार्षिक आय"
                          className="shadow1 nd-mt-6"
                        />
                      </td>
                      <td>
                        <Form.Control
                          type="text"
                          name="income_cert"
                          value={formData.income_cert || ""}
                          onChange={(e) =>
                            handleChange("income_cert", e.target.value)
                          }
                          placeholder="आय प्रमाण पत्र का क्रमांक"
                          className="shadow1 nd-mt-6"
                        />
                      </td>
                      <td>
                        <Form.Control
                          type="date"
                          name="inc_cert_date"
                          value={formData.inc_cert_date || ""}
                          onChange={(e) =>
                            handleChange("inc_cert_date", e.target.value)
                          }
                          className="shadow1 nd-mt-6"
                        />
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Row>

              {/* 6. Connections */}
              <Row className="nd-stepform-box mb-4">
                <div className="nd-step-heading">
                  <h3>
                    6. बिजली/पानी का कनेक्शन उपलब्ध है
                    <span className="alert-txt">*</span>:-
                  </h3>
                </div>

                <Table bordered responsive="sm">
                  <thead className="nd-born-thead">
                    <tr>
                      <th className="nd-table-title nd-born-thead">
                        बिजली का कनेक्शन उपलब्ध है
                      </th>
                      <th className="nd-table-title nd-born-thead">
                        यदि उपलब्ध नहीं है तो कारण चुने
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {/* बिजली */}
                      <td>
                        <Form.Select
                          name="elec_conn"
                          value={formData.elec_conn || ""}
                          onChange={(e) => {
                            const value = e.target.value;
                            handleChange("elec_conn", value);
                            handleChange(
                              "elec_reso",
                              value === "उपलब्ध है" ? "N/A" : ""
                            );
                          }}
                          className="shadow1 nd-mt-6"
                        >
                          <option value="">-- चुने --</option>
                          <option value="उपलब्ध है">उपलब्ध है</option>
                          <option value="उपलब्ध नहीं है">उपलब्ध नहीं है</option>
                        </Form.Select>
                      </td>
                      <td>
                        <Form.Select
                          name="elec_reso"
                          value={formData.elec_reso || ""}
                          onChange={(e) =>
                            handleChange("elec_reso", e.target.value)
                          }
                          className="shadow1 nd-mt-6"
                          disabled={formData.elec_conn === "उपलब्ध है"}
                        >
                          <option value="">-- कारण चुने --</option>
                          <option value="अपना आवास नहीं है">
                            अपना आवास नहीं है
                          </option>
                          <option value="गांव में कनेक्शन उपलब्ध नहीं है">
                            गांव में कनेक्शन उपलब्ध नहीं है
                          </option>
                        </Form.Select>
                      </td>
                    </tr>
                  </tbody>
                </Table>

                <Table bordered responsive="sm" className="mt-3">
                  <thead className="nd-born-thead">
                    <tr>
                      <th className="nd-table-title nd-born-thead">
                        पानी का कनेक्शन उपलब्ध है
                      </th>
                      <th className="nd-table-title nd-born-thead">
                        यदि उपलब्ध नहीं है तो कारण चुने
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {/* पानी */}
                      <td>
                        <Form.Select
                          name="wate_conn"
                          value={formData.wate_conn || ""}
                          onChange={(e) => {
                            const value = e.target.value;
                            handleChange("wate_conn", value);
                            handleChange(
                              "wate_reso",
                              value === "उपलब्ध है" ? "N/A" : ""
                            );
                          }}
                          className="shadow1 nd-mt-6"
                        >
                          <option value="">-- चुने --</option>
                          <option value="उपलब्ध है">उपलब्ध है</option>
                          <option value="उपलब्ध नहीं है">उपलब्ध नहीं है</option>
                        </Form.Select>
                      </td>
                      <td>
                        <Form.Select
                          name="wate_reso"
                          value={formData.wate_reso || ""}
                          onChange={(e) =>
                            handleChange("wate_reso", e.target.value)
                          }
                          className="shadow1 nd-mt-6"
                          disabled={formData.wate_conn === "उपलब्ध है"}
                        >
                          <option value="">-- कारण चुने --</option>
                          <option value="अपना आवास नहीं है">
                            अपना आवास नहीं है
                          </option>
                          <option value="गांव में कनेक्शन उपलब्ध नहीं है">
                            गांव में कनेक्शन उपलब्ध नहीं है
                          </option>
                        </Form.Select>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Row>

              {/* 7. Occupation */}
              <Row className="nd-stepform-box mb-4">
                <div className="nd-step-heading">
                  <h3>
                    7. व्यवसाय का विवरण <span className="alert-txt">*</span>
                  </h3>
                </div>
                <Table bordered responsive="sm">
                  <thead className="nd-born-thead">
                    <tr>
                      <th className="nd-table-title nd-born-thead" colSpan="2">
                        व्यवसाय / कार्य का विवरण
                      </th>
                      <th className="nd-table-title nd-born-thead">
                        ग्रामीण क्षेत्रों की दशा में मनरेगा जॉब कार्ड नंबर
                      </th>
                      <th className="nd-table-title nd-born-thead">
                        विगत 03 वर्षों में प्राप्त हो रोज़गार दिवसों की संख्या
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {["fath", "moth", "abhi"].map((person) => (
                      <tr key={person}>
                        <td>
                          <Form.Label className="mt-3">
                            {person === "fath"
                              ? "पिता"
                              : person === "moth"
                              ? "माता"
                              : "अभिभावक"}{" "}
                            का व्यवसाय / कार्य का विवरण
                          </Form.Label>
                        </td>
                        <td>
                          <Form.Select
                            name={`occu_${person}`}
                            value={formData[`occu_${person}`] || ""}
                            onChange={(e) => {
                              const value = e.target.value;
                              handleChange(`occu_${person}`, value);

                              if (value === "No") {
                                handleChange(`mnrega_${person}`, "N/A");
                                handleChange(`mnrega_${person}_days`, 0);
                              } else {
                                handleChange(`mnrega_${person}`, "");
                                handleChange(`mnrega_${person}_days`, "");
                              }
                            }}
                            className="shadow1 nd-mt-6"
                            required
                          >
                            <option value="">व्यवसाय चुनें</option>
                            <option value="Yes">हाँ</option>
                            <option value="No">नहीं</option>
                          </Form.Select>

                          {person === "abhi" && (
                            <span className="nd-step-heading">
                              माता पिता के जीवित न होने की स्थिति में अभिभावक का
                              व्यवसाय कार्य का विवरण
                            </span>
                          )}
                        </td>
                        <td>
                          <Form.Control
                            type="text"
                            name={`mnrega_${person}`}
                            value={
                              formData[`occu_${person}`] === "No"
                                ? "N/A"
                                : formData[`mnrega_${person}`] || ""
                            }
                            onChange={(e) =>
                              handleChange(`mnrega_${person}`, e.target.value)
                            }
                            placeholder="मनरेगा जॉब कार्ड नंबर"
                            className="shadow1 nd-mt-6"
                            disabled={formData[`occu_${person}`] === "No"}
                          />
                        </td>
                        <td>
                          <Form.Control
                            type="number"
                            name={`mnrega_${person}_days`}
                            value={
                              formData[`occu_${person}`] === "No"
                                ? 0
                                : formData[`mnrega_${person}_days`] || ""
                            }
                            onChange={(e) =>
                              handleChange(
                                `mnrega_${person}_days`,
                                e.target.value
                              )
                            }
                            placeholder="0"
                            className="shadow1 nd-mt-6"
                            disabled={formData[`occu_${person}`] === "No"}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Row>

              <div className="nd-btnn text-center">
                <Button
                  type="button"
                  onClick={handleSubmit}
                  className="mt-3 nd-primary-btn btn btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TwelthStepTwo;
