import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import DashHeader from "../../DashHeader";
import InnerNavigation from "../../InnerNavigation";
import GirlsBornStep from "./GirlsBornStep";
import SteponeView from "../../../modal/SteponeView";
import Footer from "../../../footer/Footer";
import "../../../../assets/css/LeftNav.css";
import "../../../../assets/css/NandaStepOne.css";
import "../../../../assets/css/NandaStepTwo.css";
import "../../../../assets/css/HomePage.css";
import { useAuth } from "../../../AuthContext";

const NandaStepTwo = () => {

  //  const { refreshToken, refreshAccessToken, logout } = useAuth(); // ✅ CLEANER
  // Get yesterday's date in YYYY-MM-DD format


  
  const navigate = useNavigate();
  const lastUpdatedData = useRef(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    adhar_no: "",
    kanya_name: "",
    district: "",
    project: "",
    moth_pan: "",
    fath_pan: "",
    abhi_pan: "",
    annual_income: "",
    income_cert: "",
    inc_cert_date: "",
    elec_conn: "",
    wate_conn: "",
    elec_reso: "",
    wate_reso: "",
    occu_fath: "",
    occu_moth: "",
    occu_abhi: "",
    mnrega_fath: "",
    mnrega_moth: "",
    mnrega_abhi: "",
    mnrega_fath_days: "",
    mnrega_moth_days: "",
    mnrega_abhi_days: "",
  });
//  useEffect(() => {
//       const handleRefresh = async () => {
//         if (!refreshToken) {
//           logout();
//           navigate("/UserLogin");
//           return;
//         }
  
//         const success = await refreshAccessToken();
//         if (!success) {
//           logout();
//           navigate("/UserLogin");
//         }
//       };
  
//       handleRefresh();
//     });
  const [familyMembers, setFamilyMembers] = useState([]);
  const [familyMemberCount, setFamilyMemberCount] = useState(0);

  useEffect(() => {
    const adhar_no = localStorage.getItem("adhar_no") || "";
    const kanya_name = localStorage.getItem("kanya_name") || "";
    const district = localStorage.getItem("district") || "";
    const project = localStorage.getItem("project") || "";
    const memberCount = parseInt(localStorage.getItem("family_member_count") || "0");

    setFormData((prev) => ({
      ...prev,
      adhar_no,
      kanya_name,
      district,
      project,
    }));
    setFamilyMemberCount(memberCount);

    const initialMembers = Array.from({ length: memberCount }, () => ({
      user: localStorage.getItem("user_id"),
      kanya_name,
      adhar_no,
      district,
      project,
      mem_nam: "",
      mem_rel: "",
      mem_edu: "",
      mem_adh: "",
      mem_mob: "",
    }));
    setFamilyMembers(initialMembers);

    const interval = setInterval(() => {
      const updatedDataStr = localStorage.getItem("updatedPhase1Data");
      if (!updatedDataStr) return;

      try {
        const updatedData = JSON.parse(updatedDataStr);
        if (JSON.stringify(updatedData) !== JSON.stringify(lastUpdatedData.current)) {
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
    setFormData((prev) => {
      const newFormData = { ...prev, [field]: value };

      if (field === "mnrega_fath" && value === "No") {
        newFormData.mnrega_fath_days = "none";
      } else if (field === "mnrega_moth" && value === "No") {
        newFormData.mnrega_moth_days = "none";
      } else if (field === "mnrega_abhi" && value === "No") {
        newFormData.mnrega_abhi_days = "none";
      }

      return newFormData;
    });

    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleFamilyMemberChange = (index, field, value) => {
    setFamilyMembers((prev) =>
      prev.map((member, i) =>
        i === index ? { ...member, [field]: value } : member
      )
    );
    setErrors((prev) => ({ ...prev, [`family_${index}_${field}`]: "" }));
  };
const getyesterday = () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() + 1);
    return yesterday.toISOString().split('T')[0];
  };
  const validateForm = () => {
    const newErrors = {};

    const requiredFields = [
      { field: "moth_pan", label: "माता का पैन नंबर" },
      { field: "fath_pan", label: "पिता का पैन नंबर" },
      { field: "abhi_pan", label: "अभिभावक का पैन नंबर" },
      { field: "annual_income", label: "वार्षिक आय" },
      { field: "income_cert", label: "आय प्रमाण पत्र संख्या" },
      { field: "inc_cert_date", label: "आय प्रमाण पत्र तिथि" },
      { field: "elec_conn", label: "बिजली कनेक्शन" },
      { field: "wate_conn", label: "जल कनेक्शन" },
      { field: "occu_fath", label: "पिता का व्यवसाय / शिक्षा" },
      { field: "occu_moth", label: "माता का व्यवसाय / शिक्षा" },
      { field: "occu_abhi", label: "अभिभावक का व्यवसाय / शिक्षा" },
      { field: "mnrega_fath", label: "पिता के लिए मनरेगा कार्यरत" },
      { field: "mnrega_moth", label: "माता के लिए मनरेगा कार्यरत" },
      { field: "mnrega_abhi", label: "अभिभावक के लिए मनरेगा कार्यरत" },
    ];

    requiredFields.forEach(({ field, label }) => {
      if (!formData[field] || formData[field].toString().trim() === "") {
        newErrors[field] = `कृपया "${label}" फ़ील्ड को भरें।`;
      }
    });

    if (formData.elec_conn === "No" && (!formData.elec_reso || formData.elec_reso.trim() === "")) {
      newErrors.elec_reso = "कृपया बिजली न होने का कारण फ़ील्ड को भरें।";
    }
    if (formData.wate_conn === "No" && (!formData.wate_reso || formData.wate_reso.trim() === "")) {
      newErrors.wate_reso = "कृपया जल कनेक्शन न होने का कारण फ़ील्ड को भरें।";
    }

    if (formData.mnrega_fath === "Yes" && (!formData.mnrega_fath_days || formData.mnrega_fath_days.trim() === "")) {
      newErrors.mnrega_fath_days = "पिता के लिए मनरेगा कार्य दिन अनिवार्य है।";
    }
    if (formData.mnrega_moth === "Yes" && (!formData.mnrega_moth_days || formData.mnrega_moth_days.trim() === "")) {
      newErrors.mnrega_moth_days = "माता के लिए मनरेगा कार्य दिन अनिवार्य है।";
    }
    if (formData.mnrega_abhi === "Yes" && (!formData.mnrega_abhi_days || formData.mnrega_abhi_days.trim() === "")) {
      newErrors.mnrega_abhi_days = "अभिभावक के लिए मनरेगा कार्य दिन अनिवार्य है।";
    }

    const isValidAadhar = (aadhar) => /^\d{12}$/.test(aadhar);
    const isValidMobile = (mobile) => /^\d{10}$/.test(mobile);

    familyMembers.forEach((member, index) => {
      const familyFields = [
        { field: "mem_nam", label: "सदस्य का नाम" },
        { field: "mem_rel", label: "रिश्ता" },
        { field: "mem_edu", label: "शिक्षा" },
        { field: "mem_adh", label: "आधार नंबर" },
        { field: "mem_mob", label: "मोबाइल नंबर" },
      ];

      familyFields.forEach(({ field, label }) => {
        if (!member[field] || member[field].trim() === "") {
          newErrors[`family_${index}_${field}`] = `परिवारिक सदस्य ${index + 1} के लिए "${label}" फ़ील्ड अनिवार्य है।`;
        }
      });

      if (member.mem_adh && !isValidAadhar(member.mem_adh)) {
        newErrors[`family_${index}_mem_adh`] = `परिवारिक सदस्य ${index + 1} के लिए आधार नंबर 12 अंकों का होना चाहिए।`;
      }
      if (member.mem_mob && !isValidMobile(member.mem_mob)) {
        newErrors[`family_${index}_mem_mob`] = `परिवारिक सदस्य ${index + 1} के लिए मोबाइल नंबर 10 अंकों का होना चाहिए।`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      alert("कृपया सभी अनिवार्य फ़ील्ड्स को भरें।");
      return;
    }

    setIsSubmitting(true);

    try {
      const submitData = {
        user: localStorage.getItem("user_id"),
        adhar_no: formData.adhar_no,
        kanya_name: formData.kanya_name,
        district: formData.district,
        project: formData.project,
        moth_pan: formData.moth_pan,
        fath_pan: formData.fath_pan,
        abhi_pan: formData.abhi_pan,
        annual_income: formData.annual_income,
        income_cert: formData.income_cert,
        inc_cert_date: formData.inc_cert_date,
        elec_conn: formData.elec_conn,
        wate_conn: formData.wate_conn,
        elec_reso: formData.elec_conn === "Yes" ? "Yes" : formData.elec_reso,
        wate_reso: formData.wate_conn === "Yes" ? "Yes" : formData.wate_reso,
        occu_fath: formData.occu_fath,
        occu_moth: formData.occu_moth,
        occu_abhi: formData.occu_abhi,
        mnrega_fath: formData.mnrega_fath,
        mnrega_moth: formData.mnrega_moth,
        mnrega_abhi: formData.mnrega_abhi,
        mnrega_fath_days: formData.mnrega_fath === "No" ? "none" : formData.mnrega_fath_days,
        mnrega_moth_days: formData.mnrega_moth === "No" ? "none" : formData.mnrega_moth_days,
        mnrega_abhi_days: formData.mnrega_abhi === "No" ? "none" : formData.mnrega_abhi_days,
      };

      const familyMembersData = familyMembers.map((member) => ({
        user: localStorage.getItem("user_id"),
        kanya_name: member.kanya_name,
        adhar_no: member.adhar_no,
        district: member.district,
        project: member.project,
        mem_nam: member.mem_nam,
        mem_rel: member.mem_rel,
        mem_edu: member.mem_edu,
        mem_adh: member.mem_adh,
        mem_mob: member.mem_mob,
      }));

      const [phase2bResponse, ...familyResponses] = await Promise.all([
        fetch("https://brjobsedu.com/Nandagora/api2/phase2b/submit/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submitData),
        }),
        ...familyMembersData.map((memberData) =>
          fetch("https://brjobsedu.com/Nandagora/api2/phase2a/submit/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(memberData),
          })
        ),
      ]);

      if (!phase2bResponse.ok) {
        const errorData = await phase2bResponse.json();
        throw new Error(`मुख्य फॉर्म सबमिट करने में विफल: ${JSON.stringify(errorData)}`);
      }

      for (let i = 0; i < familyResponses.length; i++) {
        if (!familyResponses[i].ok) {
          const errorData = await familyResponses[i].json();
          throw new Error(`परिवारिक सदस्य ${i + 1} डेटा सबमिट करने में विफल: ${JSON.stringify(errorData)}`);
        }
      }

      localStorage.setItem("family_list", JSON.stringify(familyMembers));

      alert("Step Two Form submitted Successfully!");
      navigate("/NandaStepThree");
    } catch (err) {
      console.error("Error submitting data:", err);
      alert(`सबमिशन में त्रुटि: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div>
        <DashHeader />
        <div className="main-container">
          <InnerNavigation />
          <div className="main">
            <GirlsBornStep />
            <div className="box-container">
              <Row>
                <div className="nd-step2">
                  <SteponeView />
                </div>
                <div className="nd-step1">
                  <h3>Step 2: सदस्यों / दस्तावेज़ों की जानकारी</h3>
                </div>
              </Row>

              <div className="nd-step1">
                <h3>1. सदस्यों की जानकारी <span className="alert-txt">*</span></h3>
              </div>
              {familyMemberCount > 0 && (
                <Table className="table table-responsive table-bordered">
                  <thead className="nd-born-thead">
                    <tr>
                      <th>क्र.सं.</th>
                      <th>सदस्य का नाम</th>
                      <th>रिश्ता</th>
                      <th>शिक्षा</th>
                      <th>आधार नंबर</th>
                      <th>मोबाइल नंबर</th>
                    </tr>
                  </thead>
                  <tbody>
                    {familyMembers.map((member, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          <Form.Control
                            type="text"
                            required
                            value={member.mem_nam}
                            onChange={(e) => handleFamilyMemberChange(index, "mem_nam", e.target.value)}
                            className="shadow1 nd-mt-6"
                            placeholder="सदस्य का नाम"
                            isInvalid={!!errors[`family_${index}_mem_nam`]}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors[`family_${index}_mem_nam`]}
                          </Form.Control.Feedback>
                        </td>
                        <td>
                          <Form.Control
                            type="text"
                            required
                            value={member.mem_rel}
                            onChange={(e) => handleFamilyMemberChange(index, "mem_rel", e.target.value)}
                            className="shadow1 nd-mt-6"
                            placeholder="रिश्ता"
                            isInvalid={!!errors[`family_${index}_mem_rel`]}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors[`family_${index}_mem_rel`]}
                          </Form.Control.Feedback>
                        </td>
                        <td>
                          <Form.Control
                            type="text"
                            required
                            value={member.mem_edu}
                            onChange={(e) => handleFamilyMemberChange(index, "mem_edu", e.target.value)}
                            className="shadow1 nd-mt-6"
                            placeholder="शिक्षा"
                            isInvalid={!!errors[`family_${index}_mem_edu`]}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors[`family_${index}_mem_edu`]}
                          </Form.Control.Feedback>
                        </td>
                        <td>
                          <Form.Control
                            type="text"
                            required
                            value={member.mem_adh}
                            onChange={(e) => handleFamilyMemberChange(index, "mem_adh", e.target.value)}
                            className="shadow1 nd-mt-6"
                            placeholder="आधार नंबर"
                            maxLength="12"
                            isInvalid={!!errors[`family_${index}_mem_adh`]}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors[`family_${index}_mem_adh`]}
                          </Form.Control.Feedback>
                        </td>
                        <td>
                          <Form.Control
                            type="text"
                            required
                            value={member.mem_mob}
                            onChange={(e) => handleFamilyMemberChange(index, "mem_mob", e.target.value)}
                            className="shadow1 nd-mt-6"
                            placeholder="मोबाइल नंबर"
                            maxLength="10"
                            isInvalid={!!errors[`family_${index}_mem_mob`]}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors[`family_${index}_mem_mob`]}
                          </Form.Control.Feedback>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}

              <div className="nd-step1 mt-4">
                <h3>2. व्यवसाय / शिक्षा <span className="alert-txt">*</span></h3>
              </div>
              <Table className="table table-responsive table-bordered">
                <thead className="nd-born-thead">
                  <tr>
                    <th>क्र.सं.</th>
                    <th>व्यवसाय / कार्य</th>
                    <th>मनरेगा में कार्यरत?</th>
                    <th>मनरेगा कार्य दिन</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>
                      <Form.Control
                        type="text"
                        value={formData.occu_fath}
                        onChange={(e) => handleChange("occu_fath", e.target.value)}
                        className="shadow1 nd-mt-6"
                        placeholder="पिता का व्यवसाय / शिक्षा"
                        required
                        isInvalid={!!errors.occu_fath}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.occu_fath}
                      </Form.Control.Feedback>
                    </td>
                    <td>
                      <Form.Select
                        value={formData.mnrega_fath}
                        onChange={(e) => handleChange("mnrega_fath", e.target.value)}
                        className="shadow1 nd-mt-6"
                        required
                        isInvalid={!!errors.mnrega_fath}
                      >
                        <option value="">Select</option>
                        <option value="Yes">हाँ</option>
                        <option value="No">नहीं</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.mnrega_fath}
                      </Form.Control.Feedback>
                    </td>
                    <td>
                      <Form.Control
                        type="text"
                        value={formData.mnrega_fath === "No" ? "none" : formData.mnrega_fath_days}
                        onChange={(e) => handleChange("mnrega_fath_days", e.target.value)}
                        className="shadow1 nd-mt-6"
                        placeholder="मनरेगा कार्य दिन"
                        disabled={formData.mnrega_fath === "No"}
                        required={formData.mnrega_fath === "Yes"}
                        isInvalid={!!errors.mnrega_fath_days}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.mnrega_fath_days}
                      </Form.Control.Feedback>
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>
                      <Form.Control
                        type="text"
                        value={formData.occu_moth}
                        onChange={(e) => handleChange("occu_moth", e.target.value)}
                        className="shadow1 nd-mt-6"
                        placeholder="माता का व्यवसाय / शिक्षा"
                        required
                        isInvalid={!!errors.occu_moth}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.occu_moth}
                      </Form.Control.Feedback>
                    </td>
                    <td>
                      <Form.Select
                        value={formData.mnrega_moth}
                        onChange={(e) => handleChange("mnrega_moth", e.target.value)}
                        className="shadow1 nd-mt-6"
                        required
                        isInvalid={!!errors.mnrega_moth}
                      >
                        <option value="">Select</option>
                        <option value="Yes">हाँ</option>
                        <option value="No">नहीं</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.mnrega_moth}
                      </Form.Control.Feedback>
                    </td>
                    <td>
                      <Form.Control
                        type="text"
                        value={formData.mnrega_moth === "No" ? "none" : formData.mnrega_moth_days}
                        onChange={(e) => handleChange("mnrega_moth_days", e.target.value)}
                        className="shadow1 nd-mt-6"
                        placeholder="मनरेगा कार्य दिन"
                        disabled={formData.mnrega_moth === "No"}
                        required={formData.mnrega_moth === "Yes"}
                        isInvalid={!!errors.mnrega_moth_days}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.mnrega_moth_days}
                      </Form.Control.Feedback>
                    </td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>
                      <Form.Control
                        type="text"
                        value={formData.occu_abhi}
                        onChange={(e) => handleChange("occu_abhi", e.target.value)}
                        className="shadow1 nd-mt-6"
                        placeholder="अभिभावक का व्यवसाय / शिक्षा"
                        required
                        isInvalid={!!errors.occu_abhi}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.occu_abhi}
                      </Form.Control.Feedback>
                    </td>
                    <td>
                      <Form.Select
                        value={formData.mnrega_abhi}
                        onChange={(e) => handleChange("mnrega_abhi", e.target.value)}
                        className="shadow1 nd-mt-6"
                        required
                        isInvalid={!!errors.mnrega_abhi}
                      >
                        <option value="">Select</option>
                        <option value="Yes">हाँ</option>
                        <option value="No">नहीं</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.mnrega_abhi}
                      </Form.Control.Feedback>
                    </td>
                    <td>
                      <Form.Control
                        type="text"
                        value={formData.mnrega_abhi === "No" ? "none" : formData.mnrega_abhi_days}
                        onChange={(e) => handleChange("mnrega_abhi_days", e.target.value)}
                        className="shadow1 nd-mt-6"
                        placeholder="मनरेगा कार्य दिन"
                        disabled={formData.mnrega_abhi === "No"}
                        required={formData.mnrega_abhi === "Yes"}
                        isInvalid={!!errors.mnrega_abhi_days}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.mnrega_abhi_days}
                      </Form.Control.Feedback>
                    </td>
                  </tr>
                </tbody>
              </Table>

              <div className="nd-step1 mt-4">
                <h3>3. वार्षिक आय / आय प्रमाण पत्र विवरण <span className="alert-txt">*</span></h3>
              </div>
              <Row>
                <Col md={4}>
                  <Form.Control
                    placeholder="वार्षिक आय"
                    value={formData.annual_income}
                    onChange={(e) => handleChange("annual_income", e.target.value)}
                    className="shadow1 nd-mt-6"
                    required
                    isInvalid={!!errors.annual_income}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.annual_income}
                  </Form.Control.Feedback>
                </Col>
                <Col md={4}>
                  <Form.Control
                    placeholder="आय प्रमाण पत्र संख्या"
                    value={formData.income_cert}
                    onChange={(e) => handleChange("income_cert", e.target.value)}
                    className="shadow1 nd-mt-6"
                    required
                    isInvalid={!!errors.income_cert}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.income_cert}
                  </Form.Control.Feedback>
                </Col>
                <Col md={4}>
                  <Form.Control
                    type="date"
                    placeholder="आय प्रमाण पत्र तिथि"
                    value={formData.inc_cert_date}
      
                     onChange={(e) =>
    setFormData({ ...formData, inc_cert_date: e.target.value })
  }
  max={getyesterday()}
                    className="shadow1 nd-mt-6"
                    required
                    isInvalid={!!errors.inc_cert_date}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.inc_cert_date}
                  </Form.Control.Feedback>
                </Col>
              </Row>

              <div className="nd-step1 mt-4">
                <h3>4. बिजली और जल कनेक्शन <span className="alert-txt">*</span></h3>
              </div>
              <Row>
                <Col md={6}>
                  <Form.Label>बिजली कनेक्शन</Form.Label>
                  <Form.Select
                    value={formData.elec_conn}
                    onChange={(e) => {
                      const val = e.target.value;
                      handleChange("elec_conn", val);
                      if (val === "Yes") {
                        handleChange("elec_reso", "Yes");
                      } else {
                        handleChange("elec_reso", "");
                      }
                    }}
                    className="shadow1 nd-mt-6"
                    required
                    isInvalid={!!errors.elec_conn}
                  >
                    <option value="">Select</option>
                    <option value="Yes">हाँ</option>
                    <option value="No">नहीं</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.elec_conn}
                  </Form.Control.Feedback>
                  <Form.Control
                    placeholder="बिजली न होने का कारण"
                    value={formData.elec_reso}
                    onChange={(e) => handleChange("elec_reso", e.target.value)}
                    disabled={formData.elec_conn === "Yes"}
                    className="mt-2 shadow1"
                    required={formData.elec_conn === "No"}
                    isInvalid={!!errors.elec_reso}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.elec_reso}
                  </Form.Control.Feedback>
                </Col>
                <Col md={6}>
                  <Form.Label>जल कनेक्शन</Form.Label>
                  <Form.Select
                    value={formData.wate_conn}
                    onChange={(e) => {
                      const val = e.target.value;
                      handleChange("wate_conn", val);
                      if (val === "Yes") {
                        handleChange("wate_reso", "Yes");
                      } else {
                        handleChange("wate_reso", "");
                      }
                    }}
                    className="shadow1 nd-mt-6"
                    required
                    isInvalid={!!errors.wate_conn}
                  >
                    <option value="">Select</option>
                    <option value="Yes">हाँ</option>
                    <option value="No">नहीं</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.wate_conn}
                  </Form.Control.Feedback>
                  <Form.Control
                    placeholder="जल कनेक्शन न होने का कारण"
                    value={formData.wate_reso}
                    onChange={(e) => handleChange("wate_reso", e.target.value)}
                    disabled={formData.wate_conn === "Yes"}
                    className="mt-2 shadow1"
                    required={formData.wate_conn === "No"}
                    isInvalid={!!errors.wate_reso}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.wate_reso}
                  </Form.Control.Feedback>
                </Col>
              </Row>

              <div className="nd-step1 mt-4">
                <h3>5. पैन कार्ड नंबर <span className="alert-txt">*</span></h3>
              </div>
              <Row>
                <Col md={4}>
                  <Form.Control
                    placeholder="माता का पैन नंबर"
                    value={formData.moth_pan}
                    onChange={(e) => handleChange("moth_pan", e.target.value)}
                    className="shadow1 nd-mt-6"
                    required
                    isInvalid={!!errors.moth_pan}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.moth_pan}
                  </Form.Control.Feedback>
                </Col>
                <Col md={4}>
                  <Form.Control
                    placeholder="पिता का पैन नंबर"
                    value={formData.fath_pan}
                    onChange={(e) => handleChange("fath_pan", e.target.value)}
                    className="shadow1 nd-mt-6"
                    required
                    isInvalid={!!errors.fath_pan}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.fath_pan}
                  </Form.Control.Feedback>
                </Col>
                <Col md={4}>
                  <Form.Control
                    placeholder="अभियान का पैन नंबर"
                    value={formData.abhi_pan}
                    onChange={(e) => handleChange("abhi_pan", e.target.value)}
                    className="shadow1 nd-mt-6"
                    required
                    isInvalid={!!errors.abhi_pan}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.abhi_pan}
                  </Form.Control.Feedback>
                </Col>
              </Row>

              {errors.general && (
                <div className="alert alert-danger mt-4" role="alert">
                  {errors.general}
                </div>
              )}

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

export default NandaStepTwo;