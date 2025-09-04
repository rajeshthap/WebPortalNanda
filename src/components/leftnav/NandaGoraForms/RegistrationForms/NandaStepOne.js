import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import "../../../../assets/css/LeftNav.css";
import "@fortawesome/fontawesome-free";
import DashHeader from "../../DashHeader";
import "../../../../assets/css/NandaStepOne.css";
import "../../../../assets/css/HomePage.css";
import Footer from "../../../footer/Footer";
import InnerNavigation from "../../InnerNavigation";
import { Row, Col, Button } from "react-bootstrap";
import GirlsBornStep from "./GirlsBornStep";
import { useNavigate } from "react-router-dom";

import axios from "axios";


const NandaStepOne = () => {
 const [errors, setErrors] = useState({
    branch_name: "",
  });
  const navigate = useNavigate();
  const [awc, setAwc] = useState([{ angan_wadi_kendar: "", id: "" }]);
   const [bankList, setBankList] = useState([{bank_name: "", id: ""}]);

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
  const [selectedAwc, setSelectedAwc] = useState("");
  const [formData, setFormData] = useState({
    user: localStorage.getItem("user_id") || "",
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
    awc_type: "Rural",
    awc_code: "AWC001",
    mobile_no: "",
    email_id: "",
    adhar_no: "",
    fam_mem: "",
    acno: "",
    ifsc_code: "",
    bank_name: "",
    branch_name: "",
  });
  const [user, setUser] = useState(null);

  // Fetch Anganwadi data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://brjobsedu.com/Nandagora/api2/Anganwadi/");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const newData = await response.json();
        const dataArray = Array.isArray(newData) ? newData : newData.data || [];
        setAwc(dataArray);
        console.log("Fetched Anganwadi data:", dataArray);
      } catch (error) {
        console.error("Error fetching Anganwadi data:", error);
        setAwc([]);
      }
    };
    fetchData();
  }, []);

  // Load user data from localStorage
 
  useEffect(() => {
  const savedUser = localStorage.getItem("user");

  if (savedUser) {
    const parsedUser = JSON.parse(savedUser);
    setUser(parsedUser);

    console.log("User object from localStorage:", parsedUser);
    console.log("User ID:", parsedUser.id); // <-- Logging the user ID

    const updatedData = {
      kanya_name: parsedUser.name || localStorage.getItem("name") || "",
      adhar_no: parsedUser.aadhaar || localStorage.getItem("aadhaar") || "",
      district: parsedUser.district || localStorage.getItem("district") || "",
      project: parsedUser.block || localStorage.getItem("block") || "",
      mobile_no: parsedUser.phone || localStorage.getItem("phone") || "",
      fam_mem: localStorage.getItem("family_member_count") || "",
   
    };
  
    setFormData((prev) => ({
      ...prev,
      ...updatedData,
    }));
  } else {
    console.warn("No user object found in localStorage.");
  }
}, []);


  const handleChange = (e) => {
    setSelectedAwc(e.target.value);
    
    setFormData((prev) => ({
      ...prev,
      awc: e.target.value,
    }));
  };
const handleInput = (e) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);
    localStorage.setItem("userData", JSON.stringify(updated));
  };
  // const handleInput = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };
  const nameRegex = /^[\u0900-\u097Fa-zA-Z ]{2,50}$/;
  console.log("nameRegex", nameRegex)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      e.stopPropagation();
      alert("कृपया सभी आवश्यक फ़ील्ड भरें।");
      return;
    }
      const acno = formData.acno.trim();

// Check for numeric-only
if (!/^\d+$/.test(acno)) {
  setErrors({
    acno: "केवल संख्यात्मक मान दर्ज करें (Only numerical values allowed).",
  });
  return;
}

// Check length range
if (acno.length < 9 || acno.length > 16) {
  setErrors({
    acno: "खाता संख्या 9 से 16 अंकों के बीच होनी चाहिए (Account number must be 9 to 16 digits).",
  });
  return;
}


// If valid, clear errors
setErrors({
  acno: "",
});




    const token = localStorage.getItem("access_token");
    const user_id = localStorage.getItem("id");
   
    console.log("user data", user_id);
    if (!token) {
      alert("Please login first.");
      navigate("/UserLogin");
      return;
    }

    if (!user) {
      alert("User data missing. Please login again.");
      navigate("/UserLogin");
      return;
    }

    const payload = {
      user: user_id,
      ...formData,
    };

    try {
  const res = await axios.post(
    "https://brjobsedu.com/Nandagora/api2/phase1/submit/",
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const returnedId = res.data.id || res.data.form_id || null;
  const data = res.data
  console.log("dtaa list" , data);
  console.log("Submitted Form ID:", returnedId);
  console.log("formData:", data);

  if (returnedId) {
    localStorage.setItem("adhar_no", formData.adhar_no);
    localStorage.setItem("kanya_name", formData.kanya_name);
    localStorage.setItem("district", formData.district);
    localStorage.setItem("project", formData.project);
    localStorage.setItem("form_id", returnedId);

    //  Store full formData object as JSON string
     localStorage.setItem("submitted_form", JSON.stringify(formData));

  // //  Store API response separately
  // localStorage.setItem("api_response", JSON.stringify(res.data));

    localStorage.setItem("family_member_count", formData.fam_mem);
  } else {
    console.warn("No ID returned in response.");
  }

  alert(res.data.message || "Step One Form submitted Successfully!");

  //  Just log the value of fam_mem_count if needed
  const fam_mem_count = formData.fam_mem;
  console.log("fam_mem_count:", fam_mem_count);
  console.log("form_list",formData)

  navigate("/NandaStepTwo");

} catch (error) {
  console.error("Submission error:", error.response?.data || error.message);
  alert(error.response?.data?.message || "यह डेटा पहले ही मौजूद है।");
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
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Row>
                    <div className="nd-step1">
                      <h3>Step 1 : व्यक्तिगत जानकारी</h3>
                    </div>
                  </Row>

                  {/* कन्या शिशु का नाम */}
                  <Col lg={4} md={4} sm={12}>
                    <Form.Group className="mb-3 nd-req-text" controlId="kanya_name">
                      <Form.Label>
                        कन्या शिशु का नाम <span className="alert-txt">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="kanya_name"
                        placeholder="कन्या शिशु का नाम"
                        className="shadow1 nd-required"
                        required
                        value={formData.kanya_name}
                        disabled
                        onChange={handleInput} 
                      />
                      <span>कन्या का नाम परिवर्तित होने पर शपथ पत्र देना अनिवार्य है</span>
                    </Form.Group>
                  </Col>

                  {/* माता का नाम */}
                  <Col lg={4} md={4} sm={12}>
  <Form.Group className="mb-3 nd-req-text" controlId="moth_name">
    <Form.Label>
      माता का नाम <span className="alert-txt">*</span>
    </Form.Label>
    <Form.Control
      type="text"
      name="moth_name"
      placeholder="माता का नाम"
      className="shadow1"
      required
      pattern="^[\u0900-\u097Fa-zA-Z ]{2,50}$"
      value={formData.moth_name}
      onChange={handleInput}
    />
  </Form.Group>
</Col>


                  {/* पिता का नाम */}
                  <Col lg={4} md={4} sm={12}>
                    <Form.Group className="mb-3 nd-req-text" controlId="fath_name">
                      <Form.Label>
                        पिता का नाम <span className="alert-txt">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="fath_name"
                        placeholder="पिता का नाम"
                        className="shadow1"
                        required pattern="^[\u0900-\u097F a-zA-Z]{2,50}$"
                        value={formData.fath_name}
                        onChange={handleInput}
                      />
                    </Form.Group>
                  </Col>

                  {/* अभिभावक का नाम */}
                  <Col lg={4} md={4} sm={12}>
                    <Form.Group className="mb-3 nd-req-text" controlId="abhi_name">
                      <Form.Label>अभिभावक का नाम</Form.Label>
                      <Form.Control
                        type="text"
                        name="abhi_name"
                        placeholder="अभिभावक का नाम"
                        className="shadow1"
                        value={formData.abhi_name}
                        onChange={handleInput} pattern="^[\u0900-\u097F a-zA-Z]{2,50}$"
                      />
                      <span>माता पिता के जीवित न होने की स्थिति में अभिभावक का नाम</span>
                    </Form.Group>
                  </Col>

                  {/* जन्म तिथि */}
                  <Col lg={4} md={4} sm={12}>
                    <Form.Group className="mb-3 nd-req-text" controlId="dob">
                      <Form.Label>
                        कन्या की जन्म तिथि <span className="alert-txt">*</span>
                      </Form.Label>
                      <Form.Control
                        type="date"
                        name="dob"
                        className="shadow1"
                        required
                        value={formData.dob}
                        onChange={handleInput}
                      />
                    </Form.Group>
                  </Col>

                  {/* जन्म पंजीकरण संख्या */}
                  <Col lg={4} md={4} sm={12}>
                    <Form.Group className="mb-3 nd-req-text" controlId="mem_name">
                      <Form.Label>
                        जन्म पंजीकरण संख्या <span className="alert-txt">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="mem_name"
                        placeholder="जन्म पंजीकरण संख्या"
                        className="shadow1"
                        required
                        value={formData.mem_name}
                        onChange={handleInput}
                      />
                      <span>परिवार के कुल सदस्यों की संख्या</span>
                    </Form.Group>
                  </Col>

                  {/* प्रसव कहाँ करवाया गया */}
                  <Col lg={4} md={4} sm={12}>
                    <Form.Group className="mb-3 nd-req-text" controlId="prasav_name">
                      <Form.Label>
                        प्रसव कहाँ करवाया गया <span className="alert-txt">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="prasav_name"
                        placeholder="प्रसव कहाँ करवाया गया"
                        className="shadow1"
                        required
                        value={formData.prasav_name}
                        onChange={handleInput}
                      />
                    </Form.Group>
                  </Col>

                  {/* जिला */}
                  <Col lg={4} md={4} sm={12}>
                    <Form.Group className="mb-3 nd-req-text" controlId="district">
                      <Form.Label>
                        जिला <span className="alert-txt">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="district"
                        placeholder="जिला"
                        className="shadow1"
                        required
                        value={formData.district}
                        onChange={handleInput}
                        disabled
                      />
                    </Form.Group>
                  </Col>

                  {/* परियोजना / ब्लॉक */}
                  <Col lg={4} md={4} sm={12}>
                    <Form.Group className="mb-3 nd-req-text" controlId="project">
                      <Form.Label>
                        परियोजना / ब्लॉक <span className="alert-txt">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="project"
                        placeholder="परियोजना / ब्लॉक"
                        className="shadow1"
                        required
                        value={formData.project}
                        onChange={handleInput}
                        disabled
                      />
                    </Form.Group>
                  </Col>

                  {/* आंगनवाड़ी केंद्र का नाम */}
                  <Col lg={4} md={4} sm={12}>
                    <Form.Group className="mb-3 nd-req-text" controlId="awc">
                      <Form.Label>
                        आंगनवाड़ी केंद्र का नाम <span className="alert-txt">*</span>
                      </Form.Label>
                      <Form.Select
                        name="awc"
                        className="shadow1"
                        required
                        value={selectedAwc}
                        onChange={handleChange}
                      >
                        <option value="">आंगनवाड़ी चुनें</option>
                        {Array.isArray(awc) &&
                          awc.map((anganwadi) => (
                            <option
                              key={anganwadi.id}
                              value={anganwadi.angan_wadi_kendar}
                            >
                              {anganwadi.angan_wadi_kendar}
                            </option>
                          ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  {/* मोबाइल नंबर */}
                  <Col lg={4} md={4} sm={12}>
                    <Form.Group className="mb-3 nd-req-text" controlId="mobile_no">
                      <Form.Label>
                        मोबाइल नंबर <span className="alert-txt">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="mobile_no"
                        placeholder="मोबाइल नंबर"
                        className="shadow1"
                        required
                        value={formData.mobile_no}
                        onChange={handleInput}
                        disabled
                      />
                    </Form.Group>
                  </Col>

                  {/* ईमेल आईडी */}
                  <Col lg={4} md={4} sm={12}>
                    <Form.Group className="mb-3 nd-req-text" controlId="email_id">
                      <Form.Label>
                        ईमेल आईडी <span className="alert-txt">*</span>
                      </Form.Label>
                      <Form.Control
                        type="email"
                        name="email_id"
                        placeholder="ईमेल आईडी"
                        className="shadow1"
                        required
                        value={formData.email_id}
                        onChange={handleInput}
                      />
                    </Form.Group>
                  </Col>

                  {/* आधार नंबर */}
                  <Col lg={4} md={4} sm={12}>
                    <Form.Group className="mb-3 nd-req-text" controlId="adhar_no">
                      <Form.Label>
                        माता/कन्या का आधार नंबर <span className="alert-txt">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="adhar_no"
                        placeholder="आधार नंबर"
                        className="shadow1"
                        required
                        value={formData.adhar_no}
                        onChange={handleInput}
                        disabled
                      />
                    </Form.Group>
                  </Col>

                  {/* परिवार के सदस्य */}
                  <Col lg={4} md={4} sm={12}>
                    <Form.Group className="mb-3 nd-req-text" controlId="fam_mem">
                      <Form.Label>
                        परिवार के सदस्य <span className="alert-txt">*</span>
                      </Form.Label>
                      <Form.Control
                        type="number"
                        name="fam_mem"
                        placeholder="परिवार के सदस्य"
                        className="shadow1"
                        required
                        value={formData.fam_mem}
                        onChange={handleInput}
                      />
                    </Form.Group>
                  </Col>

                  {/* खाता संख्या */}
                 <Col lg={4} md={4} sm={12}>
        <Form.Group className="mb-3 nd-req-text" controlId="acno">
          <Form.Label>
            माता/पिता/संरक्षक एवं कन्या शिशु के संयुक्त खाता संख्या{" "}
            <span className="alert-txt">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            name="acno"
            placeholder="खाता संख्या"
            className="shadow1"
            required
            value={formData.acno}
            onChange={handleInput}
            isInvalid={!!errors.acno}
          />
          <Form.Control.Feedback type="invalid">
            {errors.acno}
          </Form.Control.Feedback>
        </Form.Group>
      </Col>

                  {/* IFSC Code */}
                  <Col lg={4} md={4} sm={12}>
                    <Form.Group className="mb-3 nd-req-text" controlId="ifsc_code">
                      <Form.Label>
                        बैंक खाते का IFSC कोड <span className="alert-txt">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="ifsc_code"
                        placeholder="IFSC कोड"
                        className="shadow1"
                        required
                        value={formData.ifsc_code}
                        onChange={handleInput}
                      />
                    </Form.Group>
                  </Col>

                  {/* बैंक का नाम */}
                  <Col lg={4} md={4} sm={12}>
  <Form.Group className="mb-3 nd-req-text" controlId="bank_name">
    <Form.Label>
      बैंक का नाम <span className="alert-txt">*</span>
    </Form.Label>
    <Form.Select
      name="bank_name"
      className="shadow1"
      required
      value={formData.bank_name}
      onChange={handleInput}
    >
      <option value="">बैंक का चयन करें</option>
      {bankList.map((bank) => (
        <option key={bank.id} value={bank.bank_name}>
          {bank.bank_name}
        </option>
      ))}
    </Form.Select>
  </Form.Group>
</Col>


                  {/* शाखा का नाम */}
                  <Col lg={4} md={4} sm={12}>
        <Form.Group className="mb-3 nd-req-text" controlId="branch_name">
          <Form.Label>
            शाखा का नाम <span className="alert-txt">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            name="branch_name"
            placeholder="शाखा का नाम"
            className="shadow1"
            required
            value={formData.branch_name}
            onChange={handleInput}
            isInvalid={!!errors.branch_name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.branch_name}
          </Form.Control.Feedback>
        </Form.Group>
      </Col>
                </Row>

                <Button variant="primary" type="submit" className="nd-btn">
                  Submit
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NandaStepOne;