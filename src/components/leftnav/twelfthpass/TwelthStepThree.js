import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import "../../../assets/css/LeftNav.css";
import "@fortawesome/fontawesome-free";
import DashHeader from "../DashHeader";
import "../../../assets/css/NandaStepOne.css";
import "../../../assets/css/HomePage.css";
import Footer from "../../footer/Footer";
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

  // get user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  // Step 6: Bank Details
  const [bankRows, setBankRows] = useState([
    { det1: "", det2: "", det3: "", det4: "", type: "account" },
  ]);

  const [banks, setBanks] = useState([]);

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

  const addBankRow = () => {
    setBankRows([
      ...bankRows,
      { det1: "", det2: "", det3: "", det4: "", type: "account" },
    ]);
  };
  const deleteBankRow = (index) => {
    const updatedRows = [...bankRows];
    updatedRows.splice(index, 1);
    setBankRows(updatedRows);
  };
  const handleBankChange = (index, field, value) => {
    const updatedRows = [...bankRows];
    updatedRows[index][field] = value;
    setBankRows(updatedRows);
  };

  // Step 7: Movable Property (Vehicles)
  const [vehicleRows, setVehicleRows] = useState([
    { vec_model: "", vec_number: "", vec_amt: "", vec_other: "" },
  ]);

  const handleVehicleChange = (index, field, value) => {
    const updatedRows = [...vehicleRows];
    updatedRows[index][field] = value;
    setVehicleRows(updatedRows);
  };

  const addVehicleRow = () => {
    setVehicleRows([
      ...vehicleRows,
      { vec_model: "", vec_number: "", vec_amt: "", vec_other: "" },
    ]);
  };

  const deleteVehicleRow = (index) => {
    if (vehicleRows.length > 1) {
      setVehicleRows(vehicleRows.filter((_, i) => i !== index));
    }
  };

  // Step 8: Electricity Bill Details
  const [electricityRows, setElectricityRows] = useState([
    { acno: "", date: "", amount: "" },
    { acno: "", date: "", amount: "" },
    { acno: "", date: "", amount: "" },
  ]);

  const handleElectricityChange = (index, field, value) => {
    const updatedRows = [...electricityRows];
    updatedRows[index][field] = value;
    setElectricityRows(updatedRows);
  };

  // Step 9: Water Bill Details
  const [waterBillRow, setWaterBillRow] = useState({
    acno: "",
    date: "",
    amount: "",
  });

  const handleWaterBillChange = (field, value) => {
    setWaterBillRow({
      ...waterBillRow,
      [field]: value,
    });
  };

  // Step 3A: Static Property Data
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

  // handle change
  const handleStaticChange = (field, value) => {
    setStaticData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!user) {
      console.error("No user found in localStorage");
      setIsSubmitting(false);
      return;
    }

    try {
      // STEP 3A - Static Data
      let staticPayload = {
        user: user?.id,
        girl_name: user?.name,
        district: user?.district,
        project: user?.block,
        adhar_no: user?.aadhaar,
        socio_eco: staticData.socio_eco,
        bhoomi_type: staticData.bhoomi_type,
        bhoomi_typer: staticData.bhoomi_typer,
        bhoomi_shetr: staticData.bhoomi_shetr,
        curr_amt: staticData.curr_amt,
        res_type: staticData.res_type,
        rooms: staticData.rooms,
        area: staticData.area,
        curr_pri: staticData.curr_pri,
      };

      try {
        await axios.post(
          "https://brjobsedu.com/Nandagora/api4/step3a/",
          staticPayload
        );
        console.log("Step 3A submitted successfully!");
      } catch (error) {
        if (error.response?.data?.detail?.includes("already submitted")) {
          console.log("Step 3A already submitted — skipping...");
        } else {
          console.error(
            "Error submitting Step 3A:",
            error.response?.data || error.message
          );
        }
      }

      // STEP 3B - Bank Data (send all rows in one request)
      const bankData = bankRows
        .map((row) => ({
          user: user?.id,
          girl_name: user?.name,
          district: user?.district,
          project: user?.block,
          adhar_no: user?.aadhaar,
          type: row.type || "account",
          det1: row.det1 || "",
          det2: row.det2 || "",
          det3: row.det3 || "",
          det4: row.det4 || "",
        }))
        .filter((b) => b.det1 || b.det2 || b.det3 || b.det4); 

      if (bankData.length > 0) {
        try {
          await axios.post(
            "https://brjobsedu.com/Nandagora/api4/step3bcreate/",
            bankData
          );
          console.log(" Step 3B (Bank) submitted successfully!");
        } catch (error) {
          if (
            error.response?.data?.detail?.includes("Phase 2 form not found")
          ) {
            console.warn(
              " Cannot submit Step 3B (Bank) — please complete Phase 2 first!"
            );
          } else {
            console.error(
              " Error submitting Step 3B (Bank):",
              error.response?.data || error.message
            );
          }
        }
      }

      // STEP 3Vech - Vehicle Data
      const vehicleData = vehicleRows
        .map((row) => ({
          user: user?.id,
          girl_name: user?.name,
          district: user?.district,
          project: user?.block,
          adhar_no: user?.aadhaar,
          vec_model: row.vec_model || "",
          vec_number: row.vec_number || "",
          vec_amt: row.vec_amt || "",
          vec_other: row.vec_other || "",
        }))
        .filter((v) => v.vec_model || v.vec_number || v.vec_amt || v.vec_other);

      if (vehicleData.length > 0) {
        try {
          await axios.post(
            "https://brjobsedu.com/Nandagora/api4/step3vech/",
            vehicleData
          );
          console.log("Step 3Vech (Vehicle) submitted successfully!");
        } catch (error) {
          if (
            error.response?.data?.detail?.includes("Phase 2 form not found")
          ) {
            console.warn(
              "Cannot submit Step 3 vehicles — please complete Phase 2 first!"
            );
          } else {
            console.error(
              "Error submitting Step 3Vech:",
              error.response?.data || error.message
            );
          }
        }
      }

      // Electricity + Water Bills
      const combinedData = [
        ...electricityRows.map((row) => ({
          user: user?.id,
          girl_name: user?.name,
          district: user?.district,
          project: user?.block,
          adhar_no: user?.aadhaar,
          type: "electric",
          acno: row.acno || "N/A",
          date: row.date || "N/A",
          amount: row.amount || "N/A",
        })),
        {
          user: user?.id,
          girl_name: user?.name,
          district: user?.district,
          project: user?.block,
          adhar_no: user?.aadhaar,
          type: "water",
          acno: waterBillRow.acno || "N/A",
          date: waterBillRow.date || "N/A",
          amount: waterBillRow.amount || "N/A",
        },
      ];

      try {
        await axios.post(
          "https://brjobsedu.com/Nandagora/api4/step3bill/",
          combinedData
        );
        console.log("Step 3C (Electric + Water) submitted successfully!");
      } catch (error) {
        if (error.response?.data?.detail?.includes("Phase 2 form not found")) {
          console.warn("Cannot submit bills — please complete Phase 2 first!");
        } else {
          console.error(
            "Error submitting Step 3C:",
            error.response?.data || error.message
          );
        }
      }

      navigate("/TwelfthStepFour");
    } catch (error) {
      console.error("Unexpected error:", error.response?.data || error.message);
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
                          >
                            <option value="">प्रकार चुने </option>
                            <option value="स्वतः सम्मिलित">
                              स्वतः सम्मिलित
                            </option>
                            <option value="सम्मिलित नही">सम्मिलित नही</option>
                          </Form.Select>
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
                          >
                            <option value="">भूमि प्रकार चुने </option>
                            <option value="पैतृक भूमि">पैतृक भूमि</option>
                            <option value="क्रय भूमि">क्रय भूमि</option>
                            <option value="पट्टा/Lease">पट्टा/Lease</option>
                            <option value="भूमिहीन">भूमिहीन</option>
                          </Form.Select>
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
                          >
                            <option value="">आवासीय भूमि प्रकार चुने </option>
                            <option value="पैतृक भूमि">पैतृक भूमि</option>
                            <option value="रजिस्ट्री">रजिस्ट्री</option>
                            <option value="पट्टे की भूमि">पट्टे की भूमि</option>
                            <option value="किराया">किराया</option>
                          </Form.Select>
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
                        />
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
                        />
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
                        >
                          <option value="">आवासीय भूमि प्रकार चुने </option>
                          <option value="कच्चा">कच्चा</option>
                          <option value="पक्का">पक्का</option>
                        </Form.Select>
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
                        />
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
                        />
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
                        />
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
                                    type="text"
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
                                    className="shadow1"
                                  />
                                </td>
                                <td>
                                  <Form.Control
                                    type="date"
                                    placeholder="dd-mm-yyyy"
                                    value={row.date}
                                    onChange={(e) =>
                                      handleElectricityChange(
                                        index,
                                        "date",
                                        e.target.value
                                      )
                                    }
                                    className="shadow1"
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
                                  />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
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
                                  className="shadow1"
                                />
                              </td>
                              <td>
                                <Form.Control
                                  type="date"
                                  placeholder="dd-mm-yyyy"
                                  value={waterBillRow.date}
                                  onChange={(e) =>
                                    handleWaterBillChange(
                                      "date",
                                      e.target.value
                                    )
                                  }
                                  className="shadow1"
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
                                />
                              </td>
                            </tr>
                          </tbody>
                        </Table>
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

              <Footer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TwelthStepThree;
