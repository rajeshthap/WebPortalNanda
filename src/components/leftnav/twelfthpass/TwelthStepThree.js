import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import "../../../assets/css/LeftNav.css";
import "@fortawesome/fontawesome-free";
import DashHeader from "../DashHeader";
import "../../../assets/css/NandaStepOne.css";
import "../../../assets/css/HomePage.css";
import InnerNavigation from "../InnerNavigation";
import { Row, Col, Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import TwelthPass from "./TwelthPass";
import TwelfthStepTwoView from "./TwelfthStepTwoView";
import TwelfthStepOneView from "./TwelfthStepOneView";
import axios from "axios";

const TwelthStepThree = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const user = JSON.parse(localStorage.getItem("user"));
  const user_id = localStorage.getItem("user_id");

  // --- Fetch bank list ---
  const [banks, setBanks] = useState([]);
  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    const handlePopState = () => {
      window.history.pushState(null, "", window.location.href);
    };
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate]);
  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const res = await axios.get(
          "https://brjobsedu.com/Nandagora/api2/Bankdetails/"
        );
        const bankData = res.data.results ? res.data.results : res.data;
        setBanks(bankData);
      } catch (error) {
        console.error("Error fetching banks:", error);
      }
    };
    fetchBanks();
  }, []);

  // --- Separate disable states for electricity and water ---
  const [disableElectricityTable, setDisableElectricityTable] = useState(true);
  const [disableWaterTable, setDisableWaterTable] = useState(true);

  // --- Fetch elec/water connection status and set disables & N/A values ---
  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const res = await axios.get(
          `https://brjobsedu.com/Nandagora/api4/phase2b/${user_id}/`
        );
        const data = res.data;

        // Check electricity
        if (data.elec_conn === "उपलब्ध है") {
          setDisableElectricityTable(false);
        } else {
          setDisableElectricityTable(true);
          setElectricityRows([
            { acno: "N/A", date: "N/A", amount: "N/A" },
            { acno: "N/A", date: "N/A", amount: "N/A" },
            { acno: "N/A", date: "N/A", amount: "N/A" },
          ]);
        }

        // Check water
        if (data.wate_conn === "उपलब्ध है") {
          setDisableWaterTable(false);
        } else {
          setDisableWaterTable(true);
          setWaterBillRow({ acno: "N/A", date: "N/A", amount: "N/A" });
        }
      } catch (err) {
        console.error("Error fetching connections:", err);
        setDisableElectricityTable(true);
        setDisableWaterTable(true);
        setElectricityRows([
          { acno: "N/A", date: "N/A", amount: "N/A" },
          { acno: "N/A", date: "N/A", amount: "N/A" },
          { acno: "N/A", date: "N/A", amount: "N/A" },
        ]);
        setWaterBillRow({ acno: "N/A", date: "N/A", amount: "N/A" });
      }
    };

    if (user_id) fetchConnections();
  }, [user_id]);

  // --- State for dynamic tables ---
  const [bankRows, setBankRows] = useState([
    { det1: "", det2: "", det3: "", det4: "", type: "account" },
  ]);
  const addBankRow = () =>
    setBankRows([
      ...bankRows,
      { det1: "", det2: "", det3: "", det4: "", type: "account" },
    ]);
  const deleteBankRow = (index) =>
    setBankRows(bankRows.filter((_, i) => i !== index));
  const handleBankChange = (index, field, value) => {
    const updated = [...bankRows];
    updated[index][field] = value;
    setBankRows(updated);
  };

  const [vehicleRows, setVehicleRows] = useState([
    { vec_model: "", vec_number: "", vec_amt: "", vec_other: "" },
  ]);
  const handleVehicleChange = (index, field, value) => {
    const updated = [...vehicleRows];
    updated[index][field] = value;
    setVehicleRows(updated);
  };
  const addVehicleRow = () =>
    setVehicleRows([
      ...vehicleRows,
      { vec_model: "", vec_number: "", vec_amt: "", vec_other: "" },
    ]);
  const deleteVehicleRow = (index) =>
    setVehicleRows(vehicleRows.filter((_, i) => i !== index));

  const [electricityRows, setElectricityRows] = useState([
    { acno: "", date: "", amount: "" },
    { acno: "", date: "", amount: "" },
    { acno: "", date: "", amount: "" },
  ]);
  const handleElectricityChange = (index, field, value) => {
    const updated = [...electricityRows];
    updated[index][field] = value;
    setElectricityRows(updated);
  };

  const [waterBillRow, setWaterBillRow] = useState({
    acno: "",
    date: "",
    amount: "",
  });
  const handleWaterBillChange = (field, value) =>
    setWaterBillRow({ ...waterBillRow, [field]: value });

  const [staticData, setStaticData] = useState({
    socio_eco: "",
    bhoomi_type: "",
    bhoomi_typer: "",
    bhoomi_shetr: "",
    curr_amt: "",
    res_type: "",
    rooms: "",
    area: "",
    curr_pri: "",
  });
  const handleStaticChange = (field, value) => {
    setStaticData((prev) => ({ ...prev, [field]: value }));
    // Clear error on change if value is provided
    if (value) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // --- Validation function ---
  const validateForm = () => {
    const newErrors = {};
    let valid = true;

    // Validate user data
    if (!user?.id) {
      newErrors.user_id = "उपयोगकर्ता ID आवश्यक है";
      valid = false;
    }
    if (!user?.name) {
      newErrors.user_name = "उपयोगकर्ता नाम आवश्यक है";
      valid = false;
    }
    if (!user?.phone) {
      newErrors.user_phone = "उपयोगकर्ता फोन नंबर आवश्यक है";
      valid = false;
    }
    if (!user?.aadhaar) {
      newErrors.user_aadhaar = "उपयोगकर्ता आधार नंबर आवश्यक है";
      valid = false;
    }
    if (!user?.block) {
      newErrors.user_block = "उपयोगकर्ता ब्लॉक आवश्यक है";
      valid = false;
    }
    if (!user?.district) {
      newErrors.user_district = "उपयोगकर्ता जिला आवश्यक है";
      valid = false;
    }

    // Validate static data
    if (!staticData.socio_eco) {
      newErrors.socio_eco = "यह फ़ील्ड आवश्यक है";
      valid = false;
    }
    if (!staticData.bhoomi_type) {
      newErrors.bhoomi_type = "यह फ़ील्ड आवश्यक है";
      valid = false;
    }
    if (!staticData.bhoomi_typer) {
      newErrors.bhoomi_typer = "यह फ़ील्ड आवश्यक है";
      valid = false;
    }
    if (!staticData.bhoomi_shetr || parseFloat(staticData.bhoomi_shetr) < 0) {
      newErrors.bhoomi_shetr = staticData.bhoomi_shetr
        ? "सकारात्मक संख्या दर्ज करें"
        : "यह फ़ील्ड आवश्यक है";
      valid = false;
    }
    if (!staticData.curr_amt || parseFloat(staticData.curr_amt) < 0) {
      newErrors.curr_amt = staticData.curr_amt
        ? "सकारात्मक संख्या दर्ज करें"
        : "यह फ़ील्ड आवश्यक है";
      valid = false;
    }
    if (!staticData.res_type) {
      newErrors.res_type = "यह फ़ील्ड आवश्यक है";
      valid = false;
    }
    if (!staticData.rooms || parseInt(staticData.rooms) < 0) {
      newErrors.rooms = staticData.rooms
        ? "सकारात्मक संख्या दर्ज करें"
        : "यह फ़ील्ड आवश्यक है";
      valid = false;
    }
    if (!staticData.area || parseFloat(staticData.area) < 0) {
      newErrors.area = staticData.area
        ? "सकारात्मक संख्या दर्ज करें"
        : "यह फ़ील्ड आवश्यक है";
      valid = false;
    }
    if (!staticData.curr_pri || parseFloat(staticData.curr_pri) < 0) {
      newErrors.curr_pri = staticData.curr_pri
        ? "सकारात्मक संख्या दर्ज करें"
        : "यह फ़ील्ड आवश्यक है";
      valid = false;
    }

    // Validate bank rows (allow empty if no rows with data, but if partial, error)
    bankRows.forEach((row, index) => {
      const hasData = row.det1 || row.det2 || row.det3 || row.det4;
      if (
        hasData &&
        (!row.det1 ||
          !row.det2 ||
          !row.det3 ||
          !row.det4 ||
          parseFloat(row.det4) < 0)
      ) {
        newErrors[`bank_${index}`] = `बैंक पंक्ति ${
          index + 1
        } में सभी फ़ील्ड भरें और धनराशि सकारात्मक होनी चाहिए`;
        valid = false;
      }
    });

    // Validate vehicle rows (similar)
    vehicleRows.forEach((row, index) => {
      const hasData =
        row.vec_model || row.vec_number || row.vec_amt || row.vec_other;
      if (
        hasData &&
        (!row.vec_model ||
          !row.vec_number ||
          !row.vec_amt ||
          parseFloat(row.vec_amt) < 0)
      ) {
        newErrors[`vehicle_${index}`] = `वाहन पंक्ति ${
          index + 1
        } में सभी आवश्यक फ़ील्ड भरें और मूल्य सकारात्मक हो`;
        valid = false;
      }
    });

    // Validate electricity bills if enabled
    if (!disableElectricityTable) {
      electricityRows.forEach((row, index) => {
        if (
          !row.acno ||
          !row.date ||
          !row.amount ||
          parseFloat(row.amount) < 0
        ) {
          newErrors[`elec_${index}`] = `बिजली बिल पंक्ति ${
            index + 1
          } में सभी फ़ील्ड भरें और धनराशि सकारात्मक हो`;
          valid = false;
        }
      });
    }

    // Validate water bill if enabled
    if (!disableWaterTable) {
      if (
        !waterBillRow.acno ||
        !waterBillRow.date ||
        !waterBillRow.amount ||
        parseFloat(waterBillRow.amount) < 0
      ) {
        newErrors.water = "पानी बिल में सभी फ़ील्ड भरें और धनराशि सकारात्मक हो";
        valid = false;
      }
    }

    setErrors(newErrors);
    return valid;
  };

  // --- Handle field blur for live validation ---
  const handleBlur = (field, value, isNumber = false, min = 0) => {
    let err = "";
    if (!value) {
      err = "यह फ़ील्ड आवश्यक है";
    } else if (isNumber && (isNaN(value) || parseFloat(value) < min)) {
      err = "सकारात्मक संख्या दर्ज करें";
    }
    setErrors((prev) => ({ ...prev, [field]: err }));
  };

  // --- Handle Submit (validate first, then submit all APIs in sequence if valid) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert("कृपया सभी आवश्यक फ़ील्ड भरें और त्रुटियाँ सुधारें।");
      return;
    }

    setIsSubmitting(true);

    if (!user) {
      alert("User not found! Please login again.");
      setIsSubmitting(false);
      return;
    }

    try {
      // Common user data for all payloads
      const userData = {
        user: user.id,
        girl_name: user.name,
        phone: user.phone,
        adhar_no: user.aadhaar, // Map aadhaar to adhar_no
        project: user.block,
        district: user.district,
      };

      // Step 3A
      const staticPayload = {
        ...userData,
        ...staticData,
      };
      await axios.post(
        "https://brjobsedu.com/Nandagora/api4/step3a/",
        staticPayload
      );

      // Step 3B (banks)
      const bankData = bankRows
        .filter((b) => b.det1 && b.det2 && b.det3 && b.det4)
        .map((b) => ({ ...userData, ...b }));
      if (bankData.length)
        await axios.post(
          "https://brjobsedu.com/Nandagora/api4/step3bcreate/",
          bankData
        );

      // Step 3Vehicle
      const vehicleData = vehicleRows
        .filter((v) => v.vec_model && v.vec_number && v.vec_amt && v.vec_other)
        .map((v) => ({ ...userData, ...v }));
      if (vehicleData.length)
        await axios.post(
          "https://brjobsedu.com/Nandagora/api4/step3vech/",
          vehicleData
        );

      // Step 3Bills (combined electricity and water)
      const combinedData = [
        ...electricityRows.map((r) => ({
          ...userData,
          type: "electric",
          ...r,
        })),
        { ...userData, type: "water", ...waterBillRow },
      ];
      await axios.post(
        "https://brjobsedu.com/Nandagora/api4/step3bill/",
        combinedData
      );

      alert("Step 3 submitted successfully!");
      navigate("/TwelfthStepFour");
    } catch (error) {
      console.error(error);
      alert(
        "Error submitting data: " +
          (error.response?.data?.detail || error.message)
      );
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
            <TwelthPass />
            <div className="box-container">
              <Row>
                <div className="nd-step1">
                  <div>
                    <h3>Step 3 : चल / अचल सम्पत्ति का विवरण </h3>
                    <h3>
                      Note: किसी भी फील्ड को ब्लेंक ना छोड़े, जानकारी/दस्तावेज ना
                      होने की स्थिति में "उपलब्धि नहीं है / Not Applicable"
                      लिखकर आगे बढ़े।
                    </h3>
                  </div>
                  <div>
                    <TwelfthStepOneView step="one" />
                    <TwelfthStepTwoView step="two" />
                  </div>
                </div>
              </Row>

              <div className="p-2 nd-data-doc">
                <Form onSubmit={handleSubmit}>
                  <Row>
                    {/* 1. सामाजिक आर्थिक जाति जनगणना */}
                    <Row className="nd-stepform-box mb-4 align-items-center">
                      <Col lg={10} md={10} sm={12} className="nd-p-12">
                        <div className="nd-step-heading">
                          <h3>
                            1. सामाजिक आर्थिक जाति जनगणना में परिवार की स्थिति
                            का विवरण <span className="alert-txt">*</span>
                          </h3>
                        </div>
                      </Col>
                      <Col lg={2} md={2} sm={12} className="nd-p-12">
                        <Form.Group>
                          <Form.Select
                            value={staticData.socio_eco}
                            onChange={(e) =>
                              handleStaticChange("socio_eco", e.target.value)
                            }
                            onBlur={(e) =>
                              handleBlur("socio_eco", e.target.value)
                            }
                          >
                            <option value="">प्रकार चुने </option>
                            <option value="स्वतः सम्मिलित">
                              स्वतः सम्मिलित
                            </option>
                            <option value="सम्मिलित नही">सम्मिलित नही</option>
                          </Form.Select>
                          <Form.Text className="text-danger">
                            {errors.socio_eco}
                          </Form.Text>
                        </Form.Group>
                      </Col>
                    </Row>

                    {/* 2. भूमि का प्रकार */}
                    <Row className="nd-stepform-box mb-4 align-items-center">
                      <Col lg={10} md={10} sm={12} className="nd-p-12">
                        <div className="nd-step-heading">
                          <h3>
                            2. वालिका के परिवार के पास उपलब्ध भूमि का प्रकार{" "}
                            <span className="alert-txt">*</span>
                          </h3>
                        </div>
                      </Col>
                      <Col lg={2} md={2} sm={12} className="nd-p-12">
                        <Form.Group>
                          <Form.Select
                            value={staticData.bhoomi_type}
                            onChange={(e) =>
                              handleStaticChange("bhoomi_type", e.target.value)
                            }
                            onBlur={(e) =>
                              handleBlur("bhoomi_type", e.target.value)
                            }
                          >
                            <option value="">भूमि प्रकार चुने </option>
                            <option value="पैतृक भूमि">पैतृक भूमि</option>
                            <option value="क्रय भूमि">क्रय भूमि</option>
                            <option value="पट्टा/Lease">पट्टा/Lease</option>
                            <option value="भूमिहीन">भूमिहीन</option>
                          </Form.Select>
                          <Form.Text className="text-danger">
                            {errors.bhoomi_type}
                          </Form.Text>
                        </Form.Group>
                      </Col>
                    </Row>

                    {/* 3. आवासीय भूमि */}
                    <Row className="nd-stepform-box mb-4 align-items-center">
                      <Col lg={10} md={10} sm={12} className="nd-p-12">
                        <div className="nd-step-heading">
                          <h3>
                            3. वालिका के परिवार के पास आवासीय उपलब्ध भूमि का
                            प्रकार <span className="alert-txt">*</span>
                          </h3>
                        </div>
                      </Col>
                      <Col lg={2} md={2} sm={12} className="nd-p-12">
                        <Form.Group>
                          <Form.Select
                            value={staticData.bhoomi_typer}
                            onChange={(e) =>
                              handleStaticChange("bhoomi_typer", e.target.value)
                            }
                            onBlur={(e) =>
                              handleBlur("bhoomi_typer", e.target.value)
                            }
                          >
                            <option value="">आवासीय भूमि प्रकार चुने </option>
                            <option value="पैतृक भूमि">पैतृक भूमि</option>
                            <option value="रजिस्ट्री">रजिस्ट्री</option>
                            <option value="पट्टे की भूमि">पट्टे की भूमि</option>
                            <option value="किराया">किराया</option>
                          </Form.Select>
                          <Form.Text className="text-danger">
                            {errors.bhoomi_typer}
                          </Form.Text>
                        </Form.Group>
                      </Col>
                    </Row>

                    {/* 4. कुल भूमि */}
                    <Row className="nd-stepform-box mb-4">
                      <Col lg={12} md={12} sm={12} className="nd-p-12">
                        <div className="nd-step-heading">
                          <h3>
                            4. बालिका के परिवार के पास उपलब्ध कुल (कृषि/आवासीय)
                            भूमि <span className="alert-txt">*</span>
                          </h3>
                        </div>
                      </Col>

                      {/* Sub-row (i) */}
                      <Col
                        lg={10}
                        md={10}
                        sm={12}
                        className="nd-p-12 d-flex align-items-center"
                      >
                        <Form.Label className="mb-0 w-100">
                          i.) भूमि का क्षेत्रफल (हेक्टेयर में){" "}
                          <span className="alert-txt">*</span>
                        </Form.Label>
                      </Col>
                      <Col lg={2} md={2} sm={12} className="nd-p-12">
                        <Form.Control
                          type="number"
                          placeholder="भूमि का क्षेत्रफल"
                          className="shadow1"
                          value={staticData.bhoomi_shetr}
                          onChange={(e) =>
                            handleStaticChange("bhoomi_shetr", e.target.value)
                          }
                          onBlur={(e) =>
                            handleBlur("bhoomi_shetr", e.target.value, true)
                          }
                        />
                        <Form.Text className="text-danger">
                          {errors.bhoomi_shetr}
                        </Form.Text>
                      </Col>

                      {/* Sub-row (ii) */}
                      <Col
                        lg={10}
                        md={10}
                        sm={12}
                        className="nd-p-12 d-flex align-items-center"
                      >
                        <Form.Label className="mb-0 w-100">
                          ii.) वर्तमान मूल्य{" "}
                          <span className="alert-txt">(₹)*</span>
                        </Form.Label>
                      </Col>
                      <Col lg={2} md={2} sm={12} className="nd-p-12">
                        <Form.Control
                          type="number"
                          placeholder="वर्तमान मूल्य"
                          className="shadow1"
                          value={staticData.curr_amt}
                          onChange={(e) =>
                            handleStaticChange("curr_amt", e.target.value)
                          }
                          onBlur={(e) =>
                            handleBlur("curr_amt", e.target.value, true)
                          }
                        />
                        <Form.Text className="text-danger">
                          {errors.curr_amt}
                        </Form.Text>
                      </Col>
                    </Row>

                    {/* 5. आवास का विवरण */}
                    <Row className="nd-stepform-box mb-4">
                      <Col lg={12} md={12} sm={12} className="nd-p-12">
                        <div className="nd-step-heading">
                          <h3>
                            5. आवास का विवरण{" "}
                            <span className="alert-txt">*</span>
                          </h3>
                        </div>
                      </Col>

                      {/* i. आवासीय भूमि */}
                      <Col
                        lg={10}
                        md={10}
                        sm={12}
                        className="nd-p-12 d-flex align-items-center"
                      >
                        <Form.Label className="mb-0 w-100">
                          (i) आवासीय भूमि <span className="alert-txt">*</span>
                        </Form.Label>
                      </Col>
                      <Col lg={2} md={2} sm={12} className="nd-p-12">
                        <Form.Select
                          className="shadow1"
                          value={staticData.res_type}
                          onChange={(e) =>
                            handleStaticChange("res_type", e.target.value)
                          }
                          onBlur={(e) => handleBlur("res_type", e.target.value)}
                        >
                          <option value="">आवासीय भूमि प्रकार चुने </option>
                          <option value="कच्चा">कच्चा</option>
                          <option value="पक्का">पक्का</option>
                        </Form.Select>
                        <Form.Text className="text-danger">
                          {errors.res_type}
                        </Form.Text>
                      </Col>

                      {/* ii. कक्षों की संख्या */}
                      <Col
                        lg={10}
                        md={10}
                        sm={12}
                        className="nd-p-12 d-flex align-items-center"
                      >
                        <Form.Label className="mb-0 w-100">
                          (ii) कक्षों की संख्या{" "}
                          <span className="alert-txt">*</span>
                        </Form.Label>
                      </Col>
                      <Col lg={2} md={2} sm={12} className="nd-p-12">
                        <Form.Control
                          type="number"
                          placeholder="कक्षों की संख्या"
                          className="shadow1"
                          value={staticData.rooms}
                          onChange={(e) =>
                            handleStaticChange("rooms", e.target.value)
                          }
                          onBlur={(e) =>
                            handleBlur("rooms", e.target.value, true)
                          }
                        />
                        <Form.Text className="text-danger">
                          {errors.rooms}
                        </Form.Text>
                      </Col>

                      {/* iii. क्षेत्रफल */}
                      <Col
                        lg={10}
                        md={10}
                        sm={12}
                        className="nd-p-12 d-flex align-items-center"
                      >
                        <Form.Label className="mb-0 w-100">
                          (iii) क्षेत्रफल (हेक्टेयर में){" "}
                          <span className="alert-txt">*</span>
                        </Form.Label>
                      </Col>
                      <Col lg={2} md={2} sm={12} className="nd-p-12">
                        <Form.Control
                          type="number"
                          className="shadow1"
                          placeholder="क्षेत्रफल हेक्टेयर में"
                          value={staticData.area}
                          onChange={(e) =>
                            handleStaticChange("area", e.target.value)
                          }
                          onBlur={(e) =>
                            handleBlur("area", e.target.value, true)
                          }
                        />
                        <Form.Text className="text-danger">
                          {errors.area}
                        </Form.Text>
                      </Col>

                      {/* iv. वर्तमान मूल्य */}
                      <Col
                        lg={10}
                        md={10}
                        sm={12}
                        className="nd-p-12 d-flex align-items-center"
                      >
                        <Form.Label className="mb-0 w-100">
                          (iv) वर्तमान मूल्य (₹){" "}
                          <span className="alert-txt">*</span>
                        </Form.Label>
                      </Col>
                      <Col lg={2} md={2} sm={12} className="nd-p-12">
                        <Form.Control
                          type="number"
                          className="shadow1"
                          placeholder="वर्तमान मूल्य"
                          value={staticData.curr_pri}
                          onChange={(e) =>
                            handleStaticChange("curr_pri", e.target.value)
                          }
                          onBlur={(e) =>
                            handleBlur("curr_pri", e.target.value, true)
                          }
                        />
                        <Form.Text className="text-danger">
                          {errors.curr_pri}
                        </Form.Text>
                      </Col>
                    </Row>

                    {/* 6. बैंक विवरण */}
                    <Row className="nd-stepform-box mb-4">
                      <Col lg={12} md={12} sm={12} className="nd-p-12">
                        <div className="nd-step-heading">
                          <h3>
                            6.) परिवार के समस्त सदस्यों के बैंक खातों का विवरण{" "}
                            <span className="alert-txt">*</span>
                          </h3>
                        </div>
                      </Col>

                      <Col lg={12} md={12} sm={12}>
                        <Table
                          bordered
                          hover
                          responsive
                          className="shadow1 mt-3"
                        >
                          <thead className="nd-born-thead">
                            <tr>
                              <th>क्रम सं०</th>
                              <th>सदस्य का नाम</th>
                              <th>बैंक का नाम</th>
                              <th>खाता संख्या</th>
                              <th>कुल जमा धनराशि (₹)</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {bankRows.map((row, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                  <Form.Control
                                    type="text"
                                    placeholder="Name"
                                    value={row.det1}
                                    onChange={(e) =>
                                      handleBankChange(
                                        index,
                                        "det1",
                                        e.target.value
                                      )
                                    }
                                    className="shadow1"
                                  />
                                </td>
                                <td>
                                  <Form.Select
                                    value={row.det2}
                                    onChange={(e) =>
                                      handleBankChange(
                                        index,
                                        "det2",
                                        e.target.value
                                      )
                                    }
                                    className="shadow1"
                                  >
                                    <option value="">बैंक का नाम </option>
                                    {banks.map((bank) => (
                                      <option
                                        key={bank.id}
                                        value={bank.bank_name}
                                      >
                                        {bank.bank_name}
                                      </option>
                                    ))}
                                  </Form.Select>
                                </td>
                                <td>
                                  <Form.Control
                                    type="text"
                                    placeholder="A/c No."
                                    value={row.det3}
                                    onChange={(e) =>
                                      handleBankChange(
                                        index,
                                        "det3",
                                        e.target.value
                                      )
                                    }
                                    className="shadow1"
                                  />
                                </td>
                                <td>
                                  <Form.Control
                                    type="number"
                                    placeholder="Amount"
                                    value={row.det4}
                                    onChange={(e) =>
                                      handleBankChange(
                                        index,
                                        "det4",
                                        e.target.value
                                      )
                                    }
                                    className="shadow1"
                                  />
                                </td>
                                <td>
                                  <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => deleteBankRow(index)}
                                  >
                                    Delete
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                        <Button
                          variant="primary"
                          className="mt-2"
                          onClick={addBankRow}
                        >
                          + Add Row
                        </Button>
                        <div className="text-danger">
                          {Object.keys(errors)
                            .filter((k) => k.startsWith("bank_"))
                            .map((k) => (
                              <div key={k}>{errors[k]}</div>
                            ))}
                        </div>
                      </Col>
                    </Row>

                    {/* 7. वाहन का विवरण */}
                    <Row className="nd-stepform-box mb-4">
                      <Col lg={12} md={12} sm={12} className="nd-p-12">
                        <div className="nd-step-heading">
                          <h3>
                            7.) वाहन का विवरण{" "}
                            <span className="alert-txt">*</span>
                          </h3>
                        </div>
                      </Col>

                      <Col lg={12} md={12} sm={12}>
                        <Table
                          bordered
                          hover
                          responsive
                          className="shadow1 mt-3"
                        >
                          <thead className="nd-born-thead">
                            <tr>
                              <th>क्रम सं०</th>
                              <th>वाहन का मेक एंड मॉडल</th>
                              <th>वाहन की संख्या</th>
                              <th>अनुमानित मूल्य</th>
                              <th>अन्य विवरण</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {vehicleRows.map((row, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                  <Form.Control
                                    type="text"
                                    placeholder="वाहन का प्रकार लिखें"
                                    value={row.vec_model}
                                    onChange={(e) =>
                                      handleVehicleChange(
                                        index,
                                        "vec_model",
                                        e.target.value
                                      )
                                    }
                                    className="shadow1"
                                  />
                                </td>
                                <td>
                                  <Form.Control
                                    type="text"
                                    placeholder="वाहन की संख्या लिखें"
                                    value={row.vec_number}
                                    onChange={(e) =>
                                      handleVehicleChange(
                                        index,
                                        "vec_number",
                                        e.target.value
                                      )
                                    }
                                    className="shadow1"
                                  />
                                </td>
                                <td>
                                  <Form.Control
                                    type="number"
                                    placeholder="अनुमानित मूल्य लिखें"
                                    value={row.vec_amt}
                                    onChange={(e) =>
                                      handleVehicleChange(
                                        index,
                                        "vec_amt",
                                        e.target.value
                                      )
                                    }
                                    className="shadow1"
                                  />
                                </td>
                                <td>
                                  <Form.Control
                                    type="text"
                                    placeholder="अन्य विवरण लिखें"
                                    value={row.vec_other}
                                    onChange={(e) =>
                                      handleVehicleChange(
                                        index,
                                        "vec_other",
                                        e.target.value
                                      )
                                    }
                                    className="shadow1"
                                  />
                                </td>
                                <td>
                                  <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => deleteVehicleRow(index)}
                                  >
                                    Delete
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                        <Button
                          variant="primary"
                          className="mt-2"
                          onClick={addVehicleRow}
                        >
                          + Add Row
                        </Button>
                        <div className="text-danger">
                          {Object.keys(errors)
                            .filter((k) => k.startsWith("vehicle_"))
                            .map((k) => (
                              <div key={k}>{errors[k]}</div>
                            ))}
                        </div>
                      </Col>
                    </Row>

                    {/* 8. बिजली बिल का विवरण */}
                    <Row className="nd-stepform-box mb-4">
                      <Col lg={12} md={12} sm={12} className="nd-p-12">
                        <div className="nd-step-heading">
                          <h3>
                            8.) परिवार के विगत 03 बार के बिजली के बिलों का विवरण{" "}
                            <span className="alert-txt">*</span>
                          </h3>
                        </div>
                      </Col>

                      <Col lg={12} md={12} sm={12}>
                        <Table
                          bordered
                          hover
                          responsive
                          className="shadow1 mt-3"
                        >
                          <thead className="nd-born-thead">
                            <tr>
                              <th>बिजली के बिल का खाता संख्या</th>
                              <th>बिजली के बिलों को जमा करने की तिथि</th>
                              <th>धनराशि</th>
                            </tr>
                          </thead>
                          <tbody>
                            {electricityRows.map((row, index) => (
                              <tr key={index}>
                                <td>
                                  <Form.Control
                                    type="text"
                                    placeholder="खाता संख्या लिखें"
                                    value={row.acno}
                                    onChange={(e) =>
                                      handleElectricityChange(
                                        index,
                                        "acno",
                                        e.target.value
                                      )
                                    }
                                    disabled={disableElectricityTable}
                                  />
                                </td>
                                <td>
                                  <Form.Control
                                    type="date"
                                    value={row.date}
                                    onChange={(e) =>
                                      handleElectricityChange(
                                        index,
                                        "date",
                                        e.target.value
                                      )
                                    }
                                    className="shadow1"
                                    disabled={disableElectricityTable}
                                  />
                                </td>
                                <td>
                                  <Form.Control
                                    type="number"
                                    placeholder="भुगतान की धनराशि लिखें"
                                    value={row.amount}
                                    onChange={(e) =>
                                      handleElectricityChange(
                                        index,
                                        "amount",
                                        e.target.value
                                      )
                                    }
                                    className="shadow1"
                                    disabled={disableElectricityTable}
                                  />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                        <div className="text-danger">
                          {Object.keys(errors)
                            .filter((k) => k.startsWith("elec_"))
                            .map((k) => (
                              <div key={k}>{errors[k]}</div>
                            ))}
                        </div>
                      </Col>
                    </Row>

                    {/* 9. पानी बिल का विवरण */}
                    <Row className="nd-stepform-box mb-4">
                      <Col lg={12} md={12} sm={12} className="nd-p-12">
                        <div className="nd-step-heading">
                          <h3>
                            9.) परिवार के विगत 01 बार के पानी के बिल का विवरण{" "}
                            <span className="alert-txt">*</span>
                          </h3>
                        </div>
                      </Col>

                      <Col lg={12} md={12} sm={12}>
                        <Table
                          bordered
                          hover
                          responsive
                          className="shadow1 mt-3"
                        >
                          <thead className="nd-born-thead">
                            <tr>
                              <th>पानी के बिल का खाता संख्या</th>
                              <th>पानी के बिल को जमा करने की तिथि</th>
                              <th>धनराशि</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <Form.Control
                                  type="text"
                                  placeholder="खाता संख्या लिखें"
                                  value={waterBillRow.acno}
                                  onChange={(e) =>
                                    handleWaterBillChange(
                                      "acno",
                                      e.target.value
                                    )
                                  }
                                  disabled={disableWaterTable}
                                />
                              </td>
                              <td>
                                <Form.Control
                                  type="date"
                                  value={waterBillRow.date}
                                  onChange={(e) =>
                                    handleWaterBillChange(
                                      "date",
                                      e.target.value
                                    )
                                  }
                                  className="shadow1"
                                  disabled={disableWaterTable}
                                />
                              </td>
                              <td>
                                <Form.Control
                                  type="number"
                                  placeholder="भुगतान की धनराशि लिखें"
                                  value={waterBillRow.amount}
                                  onChange={(e) =>
                                    handleWaterBillChange(
                                      "amount",
                                      e.target.value
                                    )
                                  }
                                  className="shadow1"
                                  disabled={disableWaterTable}
                                />
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                        <Form.Text className="text-danger">
                          {errors.water}
                        </Form.Text>
                      </Col>
                    </Row>
                  </Row>

                  <div className="nd-btnn text-center">
                    <Button
                      type="submit"
                      className="mt-3 nd-primary-btn"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "कृपया प्रतीक्षा करें..." : "सबमिट करे"}
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TwelthStepThree;
