import React, { useState, useEffect, useRef } from "react";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import DashHeader from "../../DashHeader";
import Footer from "../../../footer/Footer";
import InnerNavigation from "../../InnerNavigation";
import { Row, Button, Col, Alert } from "react-bootstrap";
import GirlsBornStep from "./GirlsBornStep";
import SteponeView from "../../../modal/SteponeView";
import SteptwoView from "../../../modal/SteptwoView";
import { useNavigate } from "react-router-dom";
import "../../../../assets/css/LeftNav.css";
import "../../../../assets/css/NandaStepOne.css";
import "../../../../assets/css/HomePage.css";
import axios from 'axios';
import { useAuth } from "../../../AuthContext";
const NandaStepThree = () => {
  const lastUpdatedData = useRef(null);
  const navigate = useNavigate();
     
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessages, setErrorMessages] = useState({});
  const [familyMemberCount, setFamilyMemberCount] = useState(0);
const [bankList, setBankList] = useState([{ bank_name: "", id: "" }]);

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await axios.get("https://brjobsedu.com/Nandagora/api2/Bankdetails/"); // Update URL if needed
        setBankList(response.data);
      } catch (error) {
        console.error("Error fetching banks:", error);
      }
    };

    fetchBanks();
  }, []);
  const [formData, setFormData] = useState({
    adhar_no: "",
    kanya_name: "",
    district: "",
    project: "",
    socio_eco: "",
    bhoomi_type: "",
    bhoomi_typer: "",
    bhoomi_shetr: "",
    curr_amt: "",
    res_type: "",
    rooms: "",
    area: "",
    curr_pri: "",
    form_id: "",
  });

  const [electricityBills, setElectricityBills] = useState([
    { acno: "", date: "", amount: "" },
    { acno: "", date: "", amount: "" },
    { acno: "", date: "", amount: "" },
  ]);

  const [waterBill, setWaterBill] = useState([{ acno: "", date: "", amount: "" }]);
  const [bankDetails, setBankDetails] = useState([]);
  const [hasVehicle, setHasVehicle] = useState(null);
  const [vehicleDetails, setVehicleDetails] = useState([]);

  // const bankOptions = [
  //   "District Cooperative Bank Ltd. Chamoli",
  //   "Uttarakhand Gramin Bank",
  // ];

  useEffect(() => {
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
          localStorage.setItem("formData", JSON.stringify(updatedData));
        }
      } catch (err) {
        console.error("Failed to parse updatedPhase1Data:", err);
      }
    }, 1000);

    const storedFormData = JSON.parse(localStorage.getItem("formData")) || {};
    const adhar_no = storedFormData.adhar_no || localStorage.getItem("adhar_no") || "";
    const kanya_name = storedFormData.kanya_name || localStorage.getItem("kanya_name") || "";
    const district = storedFormData.district || localStorage.getItem("district") || "";
    const project = storedFormData.project || localStorage.getItem("project") || "";
    const form_id = storedFormData.form_id || localStorage.getItem("form_id") || "";
    const count = parseInt(localStorage.getItem("family_member_count") || "0");

    setFormData((prev) => ({
      ...prev,
      adhar_no,
      kanya_name,
      district,
      project,
      form_id,
    }));
    setFamilyMemberCount(count);

    if (count > 0) {
      setBankDetails(
        Array(count)
          .fill()
          .map(() => ({
            name: "",
            bank: "",
            account: "",
            amount: "",
          }))
      );
    }

    return () => clearInterval(interval);
  }, []);

  const handleChange = (field, value) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      localStorage.setItem("formData", JSON.stringify(updated));
      return updated;
    });
    setErrorMessages((prev) => ({ ...prev, [field]: "" }));
  };

  const handleBankDetailsChange = (index, field, value) => {
    setBankDetails((prev) => {
      const updated = prev.map((detail, i) =>
        i === index ? { ...detail, [field]: value } : detail
      );
      localStorage.setItem("bankDetails", JSON.stringify(updated));
      return updated;
    });
    setErrorMessages((prev) => ({ ...prev, [`bank_${field}_${index}`]: "" }));
  };

  const handleElectricityBillChange = (index, field, value) => {
    setElectricityBills((prev) => {
      const updated = prev.map((bill, i) => (i === index ? { ...bill, [field]: value } : bill));
      localStorage.setItem("electricityBills", JSON.stringify(updated));
      return updated;
    });
    setErrorMessages((prev) => ({ ...prev, [`electricity_${field}_${index}`]: "" }));
  };

  const handleWaterBillChange = (index, field, value) => {
    setWaterBill((prev) => {
      const updated = prev.map((bill, i) => (i === index ? { ...bill, [field]: value } : bill));
      localStorage.setItem("waterBill", JSON.stringify(updated));
      return updated;
    });
    setErrorMessages((prev) => ({ ...prev, [`water_${field}_${index}`]: "" }));
  };

  const handleVehicleDetailsChange = (index, field, value) => {
    setVehicleDetails((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      localStorage.setItem("vehicleDetails", JSON.stringify(updated));
      return updated;
    });
    setErrorMessages((prev) => ({ ...prev, [`vehicle_${field}_${index}`]: "" }));
  };

  const addNewVehicleRow = () => {
    setVehicleDetails((prev) => {
      const updated = [
        ...prev,
        {
          vec_model: "",
          vec_number: "",
          vec_amt: "",
          vec_other: "",
        },
      ];
      localStorage.setItem("vehicleDetails", JSON.stringify(updated));
      return updated;
    });
  };

  const handleHasVehicleChange = (value) => {
    setHasVehicle(value);
    let updatedVehicles;
    if (value === "no") {
      updatedVehicles = [
        {
          vec_model: "none",
          vec_number: "none",
          vec_amt: "none",
          vec_other: "none",
        },
      ];
    } else {
      updatedVehicles = [
        {
          vec_model: "",
          vec_number: "",
          vec_amt: "",
          vec_other: "",
        },
      ];
    }
    setVehicleDetails(updatedVehicles);
    localStorage.setItem("vehicleDetails", JSON.stringify(updatedVehicles));
  };

  const validateForm = () => {
    const errors = {};
    const requiredFields = [
      "adhar_no",
      "kanya_name",
      "district",
      "project",
      "socio_eco",
      "bhoomi_type",
      "bhoomi_typer",
      "bhoomi_shetr",
      "curr_amt",
      "res_type",
      "rooms",
      "area",
      "curr_pri",
      "form_id",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        errors[field] = "This field is required.";
      }
    });

    bankDetails.forEach((detail, index) => {
      if (!detail.name) errors[`bank_name_${index}`] = "Name is required.";
      if (!detail.bank) errors[`bank_bank_${index}`] = "Bank is required.";
      if (!detail.account) errors[`bank_account_${index}`] = "Account number is required.";
      if (!detail.amount) errors[`bank_amount_${index}`] = "Amount is required.";

    

    // Validate account number (9 to 16 digits, only numbers allowed)
    if (!detail.account || detail.account.trim() === "") {
      errors[`bank_account_${index}`] = "Account number is required.";
    } else if (!/^\d{9,16}$/.test(detail.account)) {
      errors[`bank_account_${index}`] = "Account number must be 9 to 16 digits and contain only numbers.";
    }

    // Validate amount (required, assuming it should be a positive number)
    if (!detail.amount || detail.amount.trim() === "") {
      errors[`bank_amount_${index}`] = "Amount is required.";
    } else if (isNaN(detail.amount) || Number(detail.amount) <= 0) {
      errors[`bank_amount_${index}`] = "Amount must be a valid positive number.";
    }
    }
  
  
  );

    electricityBills.forEach((bill, index) => {
  if (bill.acno || bill.date || bill.amount) {
    if (!bill.acno) {
      errors[`electricity_acno_${index}`] = "Account number is required.";
    } else if (!/^\d+$/.test(bill.acno)) {
      errors[`electricity_acno_${index}`] = "Only numbers are allowed in account number.";
    }

    if (!bill.date) {
      errors[`electricity_date_${index}`] = "Date is required.";
    }

    if (!bill.amount) {
      errors[`electricity_amount_${index}`] = "Amount is required.";
    }
  }
});



   waterBill.forEach((bill, index) => {
  if (bill.acno || bill.date || bill.amount) {
    if (!bill.acno) errors[`water_acno_${index}`] = "Account number is required.";
    if (!bill.date) errors[`water_date_${index}`] = "Date is required.";
    if (!bill.amount) errors[`water_amount_${index}`] = "Amount is required.";
  }
});

    if (hasVehicle === "yes") {
      vehicleDetails.forEach((vehicle, index) => {
        if (!vehicle.vec_model) errors[`vehicle_vec_model_${index}`] = "Vehicle model is required.";
        if (!vehicle.vec_number) errors[`vehicle_vec_number_${index}`] = "Vehicle number is required.";
        if (!vehicle.vec_amt) errors[`vehicle_vec_amt_${index}`] = "Vehicle amount is required.";
      });
    } else if (hasVehicle === null) {
      errors.vehicle = "Please specify if you have a vehicle.";
    }

    return errors;
  };

  const handleSubmit = async () => {
    try {
      const errors = validateForm();
      if (Object.keys(errors).length > 0) {
        setErrorMessages(errors);
        alert("Please fill all required fields before submitting.");
        return;
      }

      const phase3Data = {
        user: localStorage.getItem("user_id") || "",
        adhar_no: formData.adhar_no,
        kanya_name: formData.kanya_name,
        district: formData.district,
        project: formData.project,
        type: "property_details",
        socio_eco: formData.socio_eco,
        bhoomi_type: formData.bhoomi_type,
        bhoomi_typer: formData.bhoomi_typer,
        bhoomi_shetr: formData.bhoomi_shetr,
        curr_amt: formData.curr_amt,
        res_type: formData.res_type,
        rooms: formData.rooms,
        area: formData.area,
        curr_pri: formData.curr_pri,
        form_id: formData.form_id,
      };

      const phase3Response = await fetch(
        "https://brjobsedu.com/Nandagora/api2/phase3/submit/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(phase3Data),
        }
      );

      if (!phase3Response.ok) {
        const errorData = await phase3Response.json();
        throw new Error(`Failed to submit main form: ${JSON.stringify(errorData)}`);
      }

      const responseData = await phase3Response.json();
      localStorage.setItem("phase3Response", JSON.stringify(responseData));

      const bankDetailsData = bankDetails.map((detail) => ({
        user: localStorage.getItem("user_id") || "",
        form_id: formData.form_id,
        adhar_no: formData.adhar_no,
        kanya_name: formData.kanya_name,
        district: formData.district,
        project: formData.project,
        type: "bank_details",
        det1: detail.name,
        det2: detail.bank,
        det3: detail.account,
        det4: detail.amount,
      }));

      if (bankDetailsData.length > 0) {
        const bankResponse = await fetch(
          "https://brjobsedu.com/Nandagora/api2/phase3A/submit/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(bankDetailsData),
          }
        );

        if (!bankResponse.ok) {
          const errorData = await bankResponse.json();
          throw new Error(`Failed to submit bank details: ${JSON.stringify(errorData)}`);
        }

        const responseDatabank = await bankResponse.json();
        localStorage.setItem("bankResponse", JSON.stringify(responseDatabank));
      }

      const vehicleData = vehicleDetails
        .filter((vehicle) => hasVehicle === "yes" && vehicle.vec_model && vehicle.vec_number && vehicle.vec_amt)
        .map((vehicle) => ({
          user: localStorage.getItem("user_id") || "",
          form_id: formData.form_id,
          adhar_no: formData.adhar_no,
          kanya_name: formData.kanya_name,
          district: formData.district,
          project: formData.project,
          vec_model: vehicle.vec_model,
          vec_number: vehicle.vec_number,
          vec_amt: vehicle.vec_amt,
          vec_other: vehicle.vec_other || "",
        }));

      if (vehicleData.length > 0) {
        const vehicleResponse = await fetch(
          "https://brjobsedu.com/Nandagora/api2/Nandavahacreteview/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(vehicleData),
          }
        );

        if (!vehicleResponse.ok) {
          const errorData = await vehicleResponse.json();
          throw new Error(`Failed to submit vehicle details: ${JSON.stringify(errorData)}`);
        }

        const responseDatavahan = await vehicleResponse.json();
        localStorage.setItem("vehicleResponse", JSON.stringify(responseDatavahan));
      }

      const billsData = [
        ...electricityBills
          .filter((bill) => bill.acno && bill.date && bill.amount)
          .map((bill) => ({
            user: localStorage.getItem("user_id") || "",
            form_id: formData.form_id,
            adhar_no: formData.adhar_no,
            kanya_name: formData.kanya_name,
            district: formData.district,
            project: formData.project,
            type: "electricity",
            acno: bill.acno,
            date: bill.date,
            amount: bill.amount,
          })),
        ...waterBill
          .filter((bill) => bill.acno && bill.date && bill.amount)
          .map((bill) => ({
            user: localStorage.getItem("user_id") || "",
            form_id: formData.form_id,
            adhar_no: formData.adhar_no,
            kanya_name: formData.kanya_name,
            district: formData.district,
            project: formData.project,
            type: "water",
            acno: bill.acno,
            date: bill.date,
            amount: bill.amount,
          })),
      ];

      if (billsData.length > 0) {
        const billsResponse = await fetch(
          "https://brjobsedu.com/Nandagora/api2/Nandabills/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(billsData),
          }
        );

        if (!billsResponse.ok) {
          const errorData = await billsResponse.json();
          throw new Error(`Failed to submit bills data: ${JSON.stringify(errorData)}`);
        }

        const responseDatabill = await billsResponse.json();
        localStorage.setItem("billsResponse", JSON.stringify(responseDatabill));
      }

      setShowSuccessMessage(true);
      setErrorMessages({});
      alert("Step Third Form submitted successfully!");

      setTimeout(() => {
        navigate("/NandaStep4th");
      }, 2000);
    } catch (err) {
      setErrorMessages({ general: err.message });
      setShowSuccessMessage(false);
      alert(`Submission failed: ${err.message}`);
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
              {showSuccessMessage && (
                <Alert
                  variant="success"
                  onClose={() => setShowSuccessMessage(false)}
                  dismissible
                >
                  Data submitted successfully!
                </Alert>
              )}
              {errorMessages.general && (
                <Alert
                  variant="danger"
                  onClose={() => setErrorMessages({})}
                  dismissible
                >
                  {errorMessages.general}
                </Alert>
              )}
              <Row>
                <div className="nd-step2">
                  <SteponeView />
                </div>
                <div className="nd-step2">
                  <SteptwoView />
                </div>
                <div className="nd-step1">
                  <h3>Step 3: चल / अचल सम्पत्ति का विवरण</h3>
                </div>
              </Row>
              <div className="nd-step-3rd-note">
                <h3>
                  नोट- यदि आवेदक उत्तराखण्ड के किसी अन्य जनपद से हो तो वहाँ की
                  भी समस्त अचल सम्मपत्ति का पूर्ण विवरण -{" "}
                  <span className="alert-txt">*</span>{" "}
                </h3>
              </div>
              <Form>
               
                <Row>
                  <Col lg={4} md={4} sm={12}>
                    <Form.Group className="mb-3 nd-req-text" controlId="socioEco">
                      <Form.Label className="nd-step1" >
                       <h3> 1. सामाजिक आर्थिक जाति जनगणना में परिवार की स्थिति का  विवरण <span className="alert-txt">*</span></h3>
                        
                      </Form.Label>
                      <Form.Select
                        value={formData.socio_eco}
                        onChange={(e) => handleChange("socio_eco", e.target.value)}
                        isInvalid={!!errorMessages.socio_eco}
                      >
                        <option value="" disabled>
                          प्रकार चुने
                        </option>
                        <option value="स्वतः सम्मिलित">स्वतः सम्मिलित</option>
                        <option value="सम्मिलित नही">सम्मिलित नही</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errorMessages.socio_eco}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col lg={4} md={4} sm={12}>
                    <Form.Group className="mb-3 nd-req-text" controlId="bhoomiType">
                      <Form.Label className="nd-step1">
                       <h3>2. बालिका के परिवार के पास उपलब्ध भूमि का प्रकार <span className="alert-txt">*</span></h3> 
                        
                      </Form.Label>
                      <Form.Select
                        value={formData.bhoomi_type}
                        onChange={(e) => handleChange("bhoomi_type", e.target.value)}
                        isInvalid={!!errorMessages.bhoomi_type}
                      >
                        <option value="" disabled>
                          भूमि प्रकार चुने
                        </option>
                        <option value="पैतृक भूमि">पैतृक भूमि</option>
                        <option value="क्रय भूमि">क्रय भूमि</option>
                        <option value="पट्टा/Lease">पट्टा/Lease</option>
                        <option value="भूमिहीन">भूमिहीन</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errorMessages.bhoomi_type}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col lg={4} md={4} sm={12}>
                    <Form.Group className="mb-3 nd-req-text" controlId="resType">
                      <Form.Label  className="nd-step1">
                        <h3>3. बालिका के परिवार के पास आवासीय उपलब्ध भूमि का प्रकार  <span className="alert-txt">*</span></h3>
                       
                      </Form.Label>
                      <Form.Select
                        value={formData.bhoomi_typer}
                        onChange={(e) => handleChange("bhoomi_typer", e.target.value)}
                        isInvalid={!!errorMessages.bhoomi_typer}
                      >
                        <option value="" disabled>
                          आवासीय भूमि प्रकार चुने
                        </option>
                        <option value="रजिस्ट्री">रजिस्ट्री</option>
                        <option value="पट्टे की भूमि">पट्टे की भूमि</option>
                        <option value="किराया">किराया</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errorMessages.bhoomi_typer}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <div className="nd-step1">
                  <h3>
                    4. बालिका के परिवार के पास उपलब्ध कुल (कृषि / आवासीय) भूमि
                    :-<span className="alert-txt">*</span>
                  </h3>
                </div>
                <Row>
                  <Col lg={6} md={6} sm={12}>
                    <Form.Group className="mb-3 nd-req-text" controlId="bhoomiShetr">
                      <Form.Label>
                        i. भूमि का क्षेत्रफल (हेक्टेयर में){" "}
                        <span className="alert-txt">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="भूमि का क्षेत्रफल"
                        value={formData.bhoomi_shetr}
                        onChange={(e) => handleChange("bhoomi_shetr", e.target.value)}
                        isInvalid={!!errorMessages.bhoomi_shetr}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errorMessages.bhoomi_shetr}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col lg={6} md={6} sm={12}>
                    <Form.Group className="mb-3 nd-req-text" controlId="currAmt">
                      <Form.Label>
                        ii. वर्तमान मूल्य (₹){" "}
                        <span className="alert-txt">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="वर्तमान मूल्य"
                        value={formData.curr_amt}
                        onChange={(e) => handleChange("curr_amt", e.target.value)}
                        isInvalid={!!errorMessages.curr_amt}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errorMessages.curr_amt}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <div className="nd-step1">
                  <h3>
                    5. आवास का विवरण :<span className="alert-txt">*</span>
                  </h3>
                </div>
                <Row>
                  <Col lg={3} md={3} sm={12}>
                    <Form.Group className="mb-3 nd-req-text" controlId="resType2">
                      <Form.Label>
                        i. आवासीय भूमि<span className="alert-txt">*</span>
                      </Form.Label>
                      <Form.Select
                        value={formData.res_type}
                        onChange={(e) => handleChange("res_type", e.target.value)}
                        isInvalid={!!errorMessages.res_type}
                      >
                        <option value="" disabled>
                          आवासीय भूमि प्रकार चुने
                        </option>
                        <option value="कच्चा">कच्चा</option>
                        <option value="पक्का">पक्का</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errorMessages.res_type}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col lg={3} md={3} sm={12}>
                    <Form.Group className="mb-3 nd-req-text" controlId="rooms">
                      <Form.Label>
                        ii. कक्षों की संख्या- :-
                        <span className="alert-txt">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="कक्षों की संख्या"
                        value={formData.rooms}
                        onChange={(e) => handleChange("rooms", e.target.value)}
                        isInvalid={!!errorMessages.rooms}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errorMessages.rooms}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col lg={3} md={3} sm={12}>
                    <Form.Group className="mb-3 nd-req-text" controlId="area">
                      <Form.Label>
                        iii. क्षेत्रफल- (हेक्टेयर में)
                        <span className="alert-txt">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="एरिया वर्ग मीटर में"
                        value={formData.area}
                        onChange={(e) => handleChange("area", e.target.value)}
                        isInvalid={!!errorMessages.area}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errorMessages.area}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col lg={3} md={3} sm={12}>
                    <Form.Group className="mb-3 nd-req-text" controlId="currPri">
                      <Form.Label>
                        iv. वर्तमान मूल्य- (₹):-{" "}
                        <span className="alert-txt">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="वर्तमान मूल्य"
                        value={formData.curr_pri}
                        onChange={(e) => handleChange("curr_pri", e.target.value)}
                        isInvalid={!!errorMessages.curr_pri}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errorMessages.curr_pri}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                {familyMemberCount > 0 && (
                  <>
                    <div className="nd-step1">
                      <h3>
                        6. बैंक विवरण<span className="alert-txt">*</span>
                      </h3>
                    </div>
                    <Table responsive="sm">
                      <thead className="nd-born-thead">
                        <tr>
                          <th className="nd-born-thead">क्र0सं0</th>
                          <th className="nd-born-thead">सदस्यों का नाम</th>
                          <th className="nd-born-thead">बैंक का नाम</th>
                          <th className="nd-born-thead">खाता संख्या</th>
                          <th className="nd-born-thead">
                            कुल जमा धनराशि (विगत एक वर्ष में)
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {bankDetails.map((member, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                              <Form.Control
                                type="text"
                                placeholder="सदस्य का नाम"
                                value={member.name}
                                onChange={(e) =>
                                  handleBankDetailsChange(index, "name", e.target.value)
                                }
                                className="shadow1 nd-mt-6"
                                isInvalid={!!errorMessages[`bank_name_${index}`]}
                              />
                              <Form.Control.Feedback type="invalid">
                                {errorMessages[`bank_name_${index}`]}
                              </Form.Control.Feedback>
                            </td>
                            <td>
  <Form.Select
    value={member.bank}
    onChange={(e) =>
      handleBankDetailsChange(index, "bank", e.target.value)
    }
    className="shadow1 nd-mt-6"
    isInvalid={!!errorMessages[`bank_bank_${index}`]}
  >
    <option value="" disabled>
      बैंक का नाम
    </option>
    {bankList.map((bank, i) => (
      <option key={bank.id} value={bank.id}>
        {bank.bank_name}
      </option>
    ))}
  </Form.Select>
  <Form.Control.Feedback type="invalid">
    {errorMessages[`bank_bank_${index}`]}
  </Form.Control.Feedback>
</td>

                            <td>
                              <Form.Control
                                type="number"
                                placeholder="खाता संख्या"
                                value={member.account}
                                onChange={(e) =>
                                  handleBankDetailsChange(index, "account", e.target.value)
                                }
                                className="shadow1 nd-mt-6"
                                isInvalid={!!errorMessages[`bank_account_${index}`]}
                              />
                              <Form.Control.Feedback type="invalid">
                                {errorMessages[`bank_account_${index}`]}
                              </Form.Control.Feedback>
                            </td>
                            <td>
                              <Form.Control
                                type="number"
                                placeholder="धनराशि"
                                value={member.amount}
                                onChange={(e) =>
                                  handleBankDetailsChange(index, "amount", e.target.value)
                                }
                                className="shadow1 nd-mt-6"
                                isInvalid={!!errorMessages[`bank_amount_${index}`]}
                              />
                              <Form.Control.Feedback type="invalid">
                                {errorMessages[`bank_amount_${index}`]}
                              </Form.Control.Feedback>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </>
                )}
                <div className="nd-step1 p-3">
                  <h3>
                    7. वाहन का विवरण :-<span className="alert-txt text-danger">*</span>
                  </h3>
                  <div className="mb-3">
                    <Form.Check
                      inline
                      label="हां, मेरे पास वाहन है"
                      name="hasVehicle"
                      type="radio"
                      id="has-vehicle-yes"
                      onChange={() => handleHasVehicleChange("yes")}
                      checked={hasVehicle === "yes"}
                    />
                    <Form.Check
                      inline
                      label="नहीं, मेरे पास कोई वाहन नहीं है"
                      name="hasVehicle"
                      type="radio"
                      id="has-vehicle-no"
                      onChange={() => handleHasVehicleChange("no")}
                      checked={hasVehicle === "no"}
                    />
                  </div>
                  {errorMessages.vehicle && (
                    <Alert variant="danger">{errorMessages.vehicle}</Alert>
                  )}
                  {hasVehicle === "yes" && (
                    <>
                      <Table responsive="sm" bordered className="mt-3">
                        <thead className="nd-born-thead">
                          <tr>
                            <th>क्र0सं0</th>
                            <th>वाहन का मेक एंड मॉडल</th>
                            <th>वाहन की संख्या</th>
                            <th>अनुमानित मूल्य</th>
                            <th>अन्य विवरण</th>
                          </tr>
                        </thead>
                        <tbody>
                          {vehicleDetails.map((vehicle, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>
                                <Form.Control
                                  type="text"
                                  placeholder="वाहन का मेक और मॉडल" required
                                  value={vehicle.vec_model}
                                  onChange={(e) =>
                                    handleVehicleDetailsChange(index, "vec_model", e.target.value)
                                  }
                                  className="shadow1 nd-mt-6"
                                />
                              </td>
                              <td>
                                <Form.Control
                                  type="text" required
                                  placeholder="वाहन की संख्या"
                                  value={vehicle.vec_number}
                                  onChange={(e) =>
                                    handleVehicleDetailsChange(index, "vec_number", e.target.value)
                                  }
                                  className="shadow1 nd-mt-6"
                                />
                              </td>
                              <td>
                                <Form.Control
                                  type="number"
                                  placeholder="अनुमानित मूल्य" required
                                  value={vehicle.vec_amt}
                                  onChange={(e) =>
                                    handleVehicleDetailsChange(index, "vec_amt", e.target.value)
                                  }
                                  className="shadow1 nd-mt-6"
                                />
                              </td>
                              <td>
                                <Form.Control
                                  type="text"
                                  placeholder="अन्य विवरण" required
                                  value={vehicle.vec_other}
                                  onChange={(e) =>
                                    handleVehicleDetailsChange(index, "vec_other", e.target.value)
                                  }
                                  className="shadow1 nd-mt-6"
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                      <Button variant="primary" onClick={addNewVehicleRow}>
                        नया वाहन जोड़ें
                      </Button>
                    </>
                  )}
                  {hasVehicle === "no" && (
                    <Alert variant="info" className="mt-3">
                      उपयोगकर्ता ने संकेत दिया है कि उसके पास कोई वाहन नहीं है।
                    </Alert>
                  )}
                </div>
                <div className="nd-step1">
                  <h3>
                    8. परिवार के विगत 03 बार के बिजली के बिलों का विवरण
                    <span className="alert-txt">*</span>
                  </h3>
                </div>
                <Table responsive="sm">
                  <thead className="nd-born-thead">
                    <tr>
                      <th className="nd-born-thead">बिजली के बिल का खाता संख्या</th>
                      <th className="nd-born-thead">बिजली के बिलों को जमा करने की तिथि</th>
                      <th className="nd-born-thead">धनराशि</th>
                    </tr>
                  </thead>
                  <tbody>
                    {electricityBills.map((bill, index) => (
                      <tr key={index}>
                        <td>
                          <Form.Control
                            type="text"
                            placeholder="खाता संख्या लिखें" required
                            value={bill.acno} 
                            onChange={(e) =>
                              handleElectricityBillChange(index, "acno", e.target.value)
                            }
                            className="shadow1 nd-mt-6"
                            isInvalid={!!errorMessages[`electricity_acno_${index}`]}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errorMessages[`electricity_acno_${index}`]}
                          </Form.Control.Feedback>
                        </td>
                        <td>
                          <Form.Control
                            type="date" required
                            value={bill.date} 
                            onChange={(e) =>
                              handleElectricityBillChange(index, "date", e.target.value)
                            }
                            className="shadow1 nd-mt-6"
                            isInvalid={!!errorMessages[`electricity_date_${index}`]}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errorMessages[`electricity_date_${index}`]}
                          </Form.Control.Feedback>
                        </td>
                        <td>
                          <Form.Control
                            type="number"
                            placeholder="धनराशि" required
                            value={bill.amount}
                            onChange={(e) =>
                              handleElectricityBillChange(index, "amount", e.target.value)
                            }
                            className="shadow1 nd-mt-6"
                            isInvalid={!!errorMessages[`electricity_amount_${index}`]}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errorMessages[`electricity_amount_${index}`]}
                          </Form.Control.Feedback>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <div className="nd-step1">
                  <h3>
                    9. परिवार के विगत 01 बार के पानी के बिल का विवरण 
                    <span className="alert-txt">*</span>
                  </h3>
                </div>
                <Table responsive="sm">
                  <thead className="nd-born-thead">
                    <tr>
                      <th className="nd-born-thead">पानी के बिल का खाता संख्या</th>
                      <th className="nd-born-thead">पानी के बिलों को जमा करने की तिथि</th>
                      <th className="nd-born-thead">धनराशि</th>
                    </tr>
                  </thead>
                  <tbody>
                    {waterBill.map((bill, index) => (
                      <tr key={index}>
                        <td>
                          <Form.Control
                            type="text"
                            placeholder="खाता संख्या लिखें"
                            value={bill.acno} required
                            onChange={(e) =>
                              handleWaterBillChange(index, "acno", e.target.value)
                            }
                            className="shadow1 nd-mt-6"
                            isInvalid={!!errorMessages[`water_acno_${index}`]}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errorMessages[`water_acno_${index}`]}
                          </Form.Control.Feedback>
                        </td>
                        <td>
                          <Form.Control
                            type="date" required
                            value={bill.date}
                            onChange={(e) =>
                              handleWaterBillChange(index, "date", e.target.value)
                            }
                            className="shadow1 nd-mt-6"
                            isInvalid={!!errorMessages[`water_date_${index}`]}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errorMessages[`water_date_${index}`]}
                          </Form.Control.Feedback>
                        </td>
                        <td>
                          <Form.Control
                            type="number"
                            placeholder="धनराशि" required
                            value={bill.amount}
                            onChange={(e) =>
                              handleWaterBillChange(index, "amount", e.target.value)
                            }
                            className="shadow1 nd-mt-6"
                            isInvalid={!!errorMessages[`water_amount_${index}`]}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errorMessages[`water_amount_${index}`]}
                          </Form.Control.Feedback>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <div className="nd-btnn text-center">
                  <Button className="mt-3 nd-primary-btn" onClick={handleSubmit}>
                    सबमिट करे
                  </Button>
                </div>
              </Form>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default NandaStepThree;