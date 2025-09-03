import React, { useState, useEffect,useRef } from "react";
import { Row, Col, Button} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import DashHeader from "../../DashHeader";
import InnerNavigation from "../../InnerNavigation";
import GirlsBornStep from "./GirlsBornStep";
import SteponeView from "../../../modal/SteponeView";
import SteptwoView from "../../../modal/SteptwoView";
import StepthreeView from "../../../modal/StepthreeView";
import Footer from "../../../footer/Footer";
import UploadFile from "../../../../assets/images/upload-icon.png";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaCheckCircle } from "react-icons/fa";
import "../../../../assets/css/LeftNav.css";
import "../../../../assets/css/NandaStepOne.css";
import "../../../../assets/css/HomePage.css";
import { useAuth } from "../../../AuthContext";

const NandaStep4th = () => {
    const lastUpdatedData = useRef(null);
  const [elecConn, setElecConn] = useState(null);

  const navigate = useNavigate();
  const { refreshToken, refreshAccessToken, logout } = useAuth(); // ✅ CLEANER


  const [preview, setPreview] = useState({}); // Object to store preview URLs for each field
  const [formData, setFormData] = useState({
    adhar_no: "",
    kanya_name: "",
    district: "",
    project: "",
    pp_photo: null,
    par_sign: null,
    stu_dom: null,
    fam_reg: null,
    rat_car: null,
    bir_pra: null,
    inc_cer: null,
    stu_adhar: null,
    tik_cer: null,
    hou_tax: null,
    stu_pan: null,
    aww_doc: null,
    cas_cer: null,
    old_ben: null,
    fur_edu: null,
    san_pra: null,
    fam_pas: null,
  });

  const [uploadStatus, setUploadStatus] = useState({
     adhar_no: "",
    kanya_name: "",
    district: "",
    project: "",
    pp_photo: false,
    par_sign: false,
    stu_dom: false,
    fam_reg: false,
    rat_car: false,
    bir_pra: false,
    inc_cer: false,
    stu_adhar: false,
    tik_cer: false,
    hou_tax: false,
    stu_pan: false,
    aww_doc: false,
    cas_cer: false,
    old_ben: false,
    fur_edu: false,
    san_pra: false,
    fam_pas: false,
  });

  
  // ✅ Refresh token on component mount
  useEffect(() => {
    const handleRefresh = async () => {
      if (!refreshToken) {
        logout();
        navigate("/UserLogin");
        return;
      }

      const success = await refreshAccessToken();
      if (!success) {
        logout();
        navigate("/UserLogin");
      }
    };

    handleRefresh();
  });
 const [formDataa, setFormDataa] = useState({
    user: "",
    adhar_no: "",
    kanya_name: "",
    district: "",
    project: "",
   
    // other fields if needed
  });

  useEffect(() => {
  const user = localStorage.getItem("user") || "";
  const adhar_no = localStorage.getItem("adhar_no") || "";
  const kanya_name = localStorage.getItem("kanya_name") || "";
  const district = localStorage.getItem("district") || "";
  const project = localStorage.getItem("project") || "";
 
 setInterval(() => {
      // const storedUser = JSON.parse(localStorage.getItem("user"));
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
  // Now safe to use
  setFormData((prev) => ({
    ...prev,
    user,
    adhar_no ,
    kanya_name,
    district,
    project,
   
  }));
}, []);


const user_id = localStorage.getItem("user_id");

if (user_id) {
  fetch(`https://brjobsedu.com/Nandagora/api2/phase2b/update/${user_id}/`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch");
      }
      return res.json();
    })
    .then((data) => {
      console.log("img data", data);
      if (data.elec_reso === "Yes") {
        setElecConn(true);
      } else {
        setElecConn(false);
      }
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}


  const handleFileChange = (field, e) => {
    const imageFile = e.target.files[0]; // Get only the first file
    if (!imageFile) {
      return;
    }

   const allFieldsWithLimit = [
  "pp_photo", "par_sign", "stu_dom", "fam_reg", "rat_car", "san_pra", "bir_pra",
  "inc_cer", "stu_adhar", "tik_cer", "fam_pas", "hou_tax", "stu_pan", "aww_doc",
  "cas_cer", "old_ben", "fur_edu"
];

// Allowed formats: JPEG and PNG only
const allowedFormats = ["image/jpeg", "image/png"];

// Apply size limits only to specific fields
const minSizeKB = allFieldsWithLimit.includes(field) ? 100 : 10;
const maxSizeKB = allFieldsWithLimit.includes(field) ? 200 : 1024;

    if (!allowedFormats.includes(imageFile.type)) {
      alert(`File format for ${field} must be ${allowedFormats.join(", ")}.`);
      return;
    }

    if (imageFile.size / 1024 < minSizeKB || imageFile.size / 1024 > maxSizeKB) {
      alert(`File size for ${field} must be between ${minSizeKB}KB and ${maxSizeKB}KB.`);
      return;
    }

    setFormData((prev) => ({ ...prev, [field]: imageFile }));
    setUploadStatus((prev) => ({ ...prev, [field]: true }));

    // Update preview only for images
    if (imageFile.type.startsWith("image/")) {
      const generateUrl = URL.createObjectURL(imageFile);
      setPreview((prev) => ({ ...prev, [field]: generateUrl }));
    } else {
      setPreview((prev) => ({ ...prev, [field]: null }));
    }

    // Clear the input to allow re-uploading the same file
    e.target.value = null;
  };

  const handleRemoveFile = (field) => {
    setFormData((prev) => ({ ...prev, [field]: null }));
    setUploadStatus((prev) => ({ ...prev, [field]: false }));
    setPreview((prev) => {
      if (prev[field]) {
        URL.revokeObjectURL(prev[field]); // Clean up previous URL
      }
      return { ...prev, [field]: null };
    });
  };
  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };
  const handleSubmit = async () => {
    try {
      const userId = localStorage.getItem("user_id");
      const accessToken = localStorage.getItem("access_token");
      if (!userId) {
        throw new Error("User ID not found in localStorage. Please log in again.");
      }
      if (!accessToken) {
        throw new Error("Access token not found. Please log in again.");
      }

      const requiredTextFields = ["adhar_no", "kanya_name", "district", "project"];
      for (const field of requiredTextFields) {
        if (!formData[field]) {
          throw new Error(`कृपया ${field} भरें।`);
        }
      }
      if (!/^\d{12}$/.test(formData.adhar_no)) {
        throw new Error("आधार नंबर 12 अंकों का होना चाहिए।");
      }

      const requiredFileFields = [
        "pp_photo", "par_sign", "stu_dom", "fam_reg", "rat_car","san_pra","bir_pra",
        "inc_cer", "stu_adhar", "tik_cer", "fam_pas", "hou_tax", "stu_pan", "aww_doc",
        "cas_cer", "old_ben", "fur_edu"
      ];
      for (const field of requiredFileFields) {
        if (!formData[field]) {
          throw new Error(`कृपया ${field} अपलोड करें।`);
        }
      }

      const formDataToSend = new FormData();
//       if (name) formDataToSend.append("kanya_name", name);     
// if (aadhaar) formDataToSend.append("adhar_no", aadhaar); 
// if (district) formDataToSend.append("district", district); 
// if (block) formDataToSend.append("project", block); 
      formDataToSend.append("user", userId);
      requiredTextFields.forEach((field) => {
        formDataToSend.append(field, formData[field]);
      });
      requiredFileFields.forEach((field) => {
        if (formData[field]) {
          formDataToSend.append(field, formData[field]);
        }
      });
 const name = localStorage.getItem("name") || "";
const aadhaar = localStorage.getItem("aadhaar") || "";
const district = localStorage.getItem("district") || "";
const block = localStorage.getItem("block") || "";

// Add them if they exist

if (name) formDataToSend.append("kanya_name", name);
if (aadhaar) formDataToSend.append("adhar_no", aadhaar);
if (district) formDataToSend.append("district", district);
if (block) formDataToSend.append("project", block);


requiredFileFields.forEach((field) => {
  if (formData[field]) {
    formDataToSend.append(field, formData[field]);
  }
});

      console.log("Submitting data:", Object.fromEntries(formDataToSend));

      const response = await fetch("https://brjobsedu.com/Nandagora/api2/phase4/submit/", {
        method: "POST",
        body: formDataToSend,
        
      });

      if (!response.ok) {
        const text = await response.text();
        console.error("Response text:", text);
        try {
          const errorData = JSON.parse(text);
          throw new Error(`फॉर्म सबमिट करने में विफल: ${JSON.stringify(errorData)}`);
        } catch (e) {
          throw new Error(`फॉर्म सबमिट करने में विफल: ${text.substring(0, 100)}...`);
        }
      }

      const data = await response.json();
      alert("Step 4rth Form Submited Succefully !")
      localStorage.setItem("phase4_id", data.id);
      navigate("/FinalView"); // Redirect to home or success page
    } catch (err) {
      console.error("Submission error:", err);
      alert(err.message);
    }
  };

  const renderUploadSection = (field, label, isImageOnly = false) => (
    <Col lg={6} md={12} sm={12} className="nd-p-12">
      <Row className="nd-stepform-box">
        <Col lg={5} md={5} sm={5}>
          <form>
            <fieldset className="upload_dropZone text-center">
              <legend className="visually-hidden">File uploader</legend>
              <img src={UploadFile} alt="upload-file" />
              <p className="nd-drop-txt my-2">
                Drag & drop files
                <br />
                <i>or</i>
              </p>
              <input
                id={`upload_${field}`}
                className="position-absolute invisible"
                type="file"
                accept={isImageOnly ? "image/jpeg,image/png" : "image/jpeg,image/png,application/pdf"}
                onChange={(e) => handleFileChange(field, e)}
              />
              <label className="btn nd-primary-btn mb-1" htmlFor={`upload_${field}`}>
                Choose file
              </label>
              <p className="nd-upload-file">
                Upload size: {isImageOnly ? "10KB to 100KB" : "100KB to 1MB"} (Format: {isImageOnly ? "JPG, PNG" : "PDF, JPG, PNG"})
              </p>
            </fieldset>
          </form>
        </Col>
        <Col lg={7} md={7} sm={7} className="nd-doc-subinfo mt-2">
          <h3>
            {label} {requiredFileFields.includes(field) && <span className="alert-txt">*</span>}
          </h3>
          <div className="d-flex nd-doc-info">
            <Col lg={3} md={3} sm={3}>
              {new Date().toLocaleDateString("en-GB").split("/").join(".")}
            </Col>
            <Col lg={9} md={9} sm={9} className="px-4 nd-success-doc">
              {uploadStatus[field] ? (
                <>
                  <FaCheckCircle /> Uploaded Successfully
                </>
              ) : (
                "Not Uploaded"
              )}
            </Col>
          </div>
          {preview[field] && formData[field]?.type.startsWith("image/") && (
            <div className="preview-container" style={{ marginTop: "10px" }}>
              <img
                src={preview[field]}
                alt="preview"
                style={{
                  maxWidth: "100%",
                  maxHeight: "150px",
                  objectFit: "contain",
                  borderRadius: "4px",
                  border: "1px solid #ddd",
                  padding: "5px",
                  backgroundColor: "#f9f9f9"
                }}
              />
            </div>
          )}
          {uploadStatus[field] && (
            <div
              className="col nd-delete-icon"
              onClick={() => handleRemoveFile(field)}
              style={{ cursor: "pointer", color: "#dc3545", marginTop: "10px" }}
            >
              <h3>
                <RiDeleteBin6Line /> Click to Remove
              </h3>
            </div>
          )}
        </Col>
      </Row>
    </Col>
  );

  const requiredFileFields = [
    "pp_photo", "par_sign", "stu_dom", "fam_reg", "rat_car","san_pra", "bir_pra",
    "inc_cer", "stu_adhar", "tik_cer", "fam_pas", "hou_tax", "stu_pan", "aww_doc",
    "cas_cer", "old_ben", "fur_edu"
  ];

  return (
    <div>
      <DashHeader />
      <div className="main-container">
        <InnerNavigation />
        <div className="main">
          <GirlsBornStep />
          <div className="box-container">
            <Row>
              <div className="nd-step2"><SteponeView /></div>
              <div className="nd-step2"><SteptwoView /></div>
              <div className="nd-step2"><StepthreeView /></div>
              <div className="nd-step1">
                <h3>Step 4 : दस्तावेज़ अपलोड</h3>
              </div>
              <span className="nd-step3-note">
                आवेदन पत्र के साथ सलग्न किए गए प्रमाणित अभिलेखों की प्रतिलिपि का विवरण।
              </span>
              <span className="nd-step-note">
                यदि अपलोड के बाद दस्तावेज़ नहीं दिख रहे हैं, कृपया हटाएं और पुनः अपलोड करें।
              </span>
            </Row>
            <div className="p-2">
               <Row>
                <Col lg={12} md={12} sm={12}>
                 
                  
                </Col>
              </Row> 
              <Row>
                {renderUploadSection("pp_photo", "कन्या की नवीनतम पासपोर्ट साइज फोटो")}
                {renderUploadSection("par_sign", "माता / पिता / अभिभावक के हस्ताक्षर")}
                {renderUploadSection("stu_dom", "स्थायी निवास प्रमाण पत्र")}
                {renderUploadSection("fam_reg", "परिवार रजिस्टर की नकल या सभासद/पार्षद द्वारा प्रमाण पत्र")}
                {renderUploadSection("rat_car", "राशन कार्ड की प्रति")}
                {renderUploadSection("san_pra", "राशन कार्ड की प्रति image one")}
                {renderUploadSection("bir_pra", "जन्म पंजीकरण का प्रमाण पत्र")}
                {renderUploadSection("inc_cer", "आय प्रमाण पत्र")}
                {renderUploadSection("stu_adhar", "माता और पिता / अभिभावक का आधार कार्ड")}
             
                {renderUploadSection("hou_tax", "हाउस टैक्स रसीद")}
                
                {renderUploadSection("stu_pan", "कन्या का पैन कार्ड")}
                {renderUploadSection("aww_doc", "कन्या का पैन कार्ड Aww")}
                   {renderUploadSection("tik_cer", "मातृशिशु प्रतिरक्षण / एम०सी० पी० (टीकाकरण) कार्ड")}
                  {elecConn === true && renderUploadSection("fam_pas", "बिजली के बिलों की प्रतिलिपि")}
                  {/* {elecConn === true 
  ? renderUploadSection("fam_pas", "बिजली के बिलों की प्रतिलिपि") 
  : (
    <input type="hidden" name="fam_pas" value="not_applicable" />
  )
} */}

                {renderUploadSection("cas_cer", "जाति प्रमाण पत्र")}
                {renderUploadSection("old_ben", "पुराने लाभ का दस्तावेज")}
                {renderUploadSection("fur_edu", "bill water electricity connection")}
                
               
              </Row>
            </div>
            <div className="nd-btnn text-center">
              <Button className="mt-3 nd-primary-btn" onClick={handleSubmit}>
                सबमिट करे
              </Button>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default NandaStep4th;