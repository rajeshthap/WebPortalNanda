import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { Row, Col, Button } from "react-bootstrap";
import UploadFile from "../../../assets/images/upload-icon.png";
import { RiDeleteBin6Line } from "react-icons/ri";
import DashHeader from "../DashHeader";
import InnerNavigation from "../InnerNavigation";
import Footer from "../../footer/Footer";
import TwelthPass from "../../leftnav/twelfthpass/TwelthPass";
import OrphanStepOneView from "./OrphanStepOneView";
import OrphanStepTwoView from "./OrphanStepTwoView";
import OrphanStepThreeView from "./OrphanStepThreeView";
import OrphanStepFourView from "./OrphanStepFourView";
import axios from "axios";

const uploadItems = [
  { id: "pp_photo", label: "छात्रा की नवीनतम पासपोर्ट साइज फोटो" },
  { id: "stu_sign", label: "छात्रा के हस्ताक्षर" },
  { id: "par_sign", label: " माता / पिता/अभिभावक के हस्ताक्षर जमा करें " },
  { id: "mark10", label: "हाईस्कूल का प्रमाण-पत्र। " },
  {
    id: "mark12",
    label: [
      "कक्षा 12वीं उत्तीर्ण का अंक पत्र एवं प्रमाण पत्र।",
      "OR",
      "राष्ट्रीय मुक्त विद्यालय / अन्य शिक्षण संस्थान से कक्षा 12 उत्तीर्ण करने वाली आवेदिका द्वारा स्वप्रमाणित अंक पत्र की छायाप्रति",
    ],
  },
  { id: "stu_adhar", label: "छात्रा एवं माता-पिता/अभिभावक का आधार कार्ड" },
  { id: "stu_pan", label: "छात्रा एवं माता-पिता/अभिभावक का पैन कार्ड " },
  { id: "stu_dom", label: " छात्रा का स्थाई निवास प्रमाण पत्र " },
  {
    id: "hou_tax",
    label: " नगरीय / ग्रामीण स्थानीय निकाय द्वारा दिया गया गृह कर...",
  },
  { id: "inc_cer", label: "आय प्रमाण पत्र" },
  { id: "fam_reg", label: "परिवार रजिस्टर की नकल..." },
  { id: "cas_cer", label: "सामाजिक आर्थिक और जाति जनगणना(SECC)..." },
  { id: "unm_cer", label: " परिवार के विगत 03 बार के बिजली के बिलों..." },
  {
    id: "old_ben",
    label: [
      "शासनादेशानुसार योजना का लाभ केवल 02 बालिकाओं हेतु ही अनुमन्य है...",
      "1. मैं प्रमाणित करता/ करती हूँ...",
      "2. मेरे द्वारा चल अचल सम्पति...",
      "3. मेरे द्वारा किसी भी तथ्य को छुपाया नहीं गया है।",
      "4. मेरे द्वारा परिवार के समस्त खातो का विवरण...",
    ],
  },
  { id: "gir_pas", label: "लाभार्थी बालिका के बैंक पासबुक की छाया प्रति " },
  {
    id: "fam_pas",
    label: "परिवार के समस्त सदस्यों के बैंक पासबुक की प्रति...",
  },
  { id: "fur_edu", label: "उच्च शिक्षा में दाखिले के पूर्ण अभिलेखों की प्रति" },
  { id: "sch_doc", label: "विद्यालय द्वारा जारी प्रमाण पत्र..." },
  { id: "aww_doc", label: "आंगनबाड़ी कार्यकर्ती द्वारा प्रदत्त प्रमाण-पत्र।" },
];

const OrphanStepFour = () => {
  const [selectedFiles, setSelectedFiles] = useState({});
  const [uploadFiles, setUploadFiles] = useState({});

  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem("user")) || {};

  // Load files from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("uploadedFiles");
    if (stored) setSelectedFiles(JSON.parse(stored));
  }, []);

  // Save files to localStorage
  useEffect(() => {
    localStorage.setItem("uploadedFiles", JSON.stringify(selectedFiles));
  }, [selectedFiles]);

  const handleFileChange = (e, id) => {
    const file = e.target.files[0];
    if (file) {
      setUploadFiles((prev) => ({
        ...prev,
        [id]: file,
      }));
    }
  };

  const handleDelete = (id) => {
    // remove from uploaded list
    setSelectedFiles((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });

    // remove from temporary upload list
    setUploadFiles((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  const handleSubmit = () => {
    const requiredFields = uploadItems.map((item, index) => `${item.id}-${index}`);
    const missingFields = requiredFields.filter((id) => !selectedFiles[id]);

    if (missingFields.length > 0) {
      alert(`Please upload all required documents before final submit.\nMissing: ${missingFields.join(", ")}`);
      return;
    }

    alert("Step 4 submitted Successfully. All documents are uploaded.");
  };

  const handleSingleSubmit = async (id) => {
    const file = uploadFiles[id];
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("user", user?.id);
    formData.append("girl_name", user?.name);
    formData.append("district", user?.district);
    formData.append("project", user?.block);
    formData.append("adhar_no", user?.aadhaar);
    formData.append(id, file);

    try {
      const response = await axios.post(
        "https://brjobsedu.com/Nandagora/api4/step4/",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("Uploaded:", response.data);
      alert(`${id} uploaded Successfully`);

      setSelectedFiles((prev) => ({
        ...prev,
        [id]: {
          name: file.name,
          type: file.type,
          data: URL.createObjectURL(file),
        },
      }));

      setUploadFiles((prev) => {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      });
    } catch (err) {
      console.error("Upload failed:", err.response?.data || err.message);
      alert("Upload failed");
    }
  };

  return (
    <>
      <DashHeader />
      <div className="main-container">
        <InnerNavigation />
        <div className="main">
          <TwelthPass />
          <div className="box-container">
            <Row>
              <div className="nd-step1">
                <div>
                  <h3>Step 4 : चयन मानक सम्बंधित प्रमाण पत्र </h3>
                  <h3>Note: किसी भी फील्ड को ब्लेंक ना छोड़े...</h3>
                </div>
                <div>
                  <OrphanStepOneView />
                  <OrphanStepTwoView />
                  <OrphanStepThreeView />
                  <OrphanStepFourView />
                </div>
              </div>
            </Row>

            <div className="p-2 nd-data-doc">
              <Form>
                <Row>
                  {uploadItems.map((item, index) => {
                    const fileKey = `${item.id}-${index}`;
                    return (
                      <Col key={index} lg={12} md={12} sm={12} className="nd-p-12 mb-3">
                        <h5 style={{ fontSize: "14px", marginBottom: "5px" }}>
                          {index + 1}.{" "}
                          {Array.isArray(item.label) ? item.label.join(" ") : item.label}{" "}
                          <span className="alert-txt">*</span>
                        </h5>

                        <Row
                          className="nd-stepform-box align-items-center"
                          style={{ minHeight: "80px" }}
                        >
                          <Col lg={5} md={5} sm={12}>
                            <fieldset className="upload_dropZone d-flex align-items-center justify-content-center py-2">
                              <img
                                src={UploadFile}
                                alt="upload-file"
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  marginRight: "10px",
                                }}
                              />
                              <div className="d-flex flex-column">
                                <p className="nd-drop-txt mb-1" style={{ fontSize: "12px" }}>
                                  Drag & drop files <br />
                                  <i>or</i>
                                </p>
                                <input
                                  id={fileKey}
                                  type="file"
                                  className="position-absolute invisible"
                                  accept="image/jpeg, image/png, image/svg+xml, application/pdf"
                                  onChange={(e) => handleFileChange(e, fileKey)}
                                />
                                <label className="btn nd-primary-btn py-1" htmlFor={fileKey}>
                                  Choose file
                                </label>
                                <p className="nd-upload-file mb-0" style={{ fontSize: "12px" }}>
                                  Upload size 100KB - 1MB (PDF, JPG, PNG)
                                </p>
                              </div>
                            </fieldset>
                          </Col>

                          {/* If file is waiting for upload */}
                          {uploadFiles[fileKey] && (
                            <Col
                              lg={7}
                              md={7}
                              sm={12}
                              className="d-flex flex-column align-items-start mt-2 mt-lg-0"
                            >
                              <div className="d-flex align-items-center mb-1">
                                <Button
                                  variant="success"
                                  size="sm"
                                  onClick={() => handleSingleSubmit(fileKey)}
                                >
                                  Upload
                                </Button>
                                <Button
                                  variant="outline-danger"
                                  size="sm"
                                  className="ms-2"
                                  onClick={() => handleDelete(fileKey)}
                                >
                                  <RiDeleteBin6Line className="me-1" /> Remove
                                </Button>
                              </div>
                            </Col>
                          )}

                          {/* If file already uploaded */}
                          {selectedFiles[fileKey] && !uploadFiles[fileKey] && (
                            <Col
                              lg={7}
                              md={7}
                              sm={12}
                              className="d-flex flex-column align-items-start mt-2 mt-lg-0"
                            >
                              <div className="d-flex align-items-center">
                                <span className="text-success fw-bold">
                                  ✅ {selectedFiles[fileKey].name} uploaded
                                </span>
                                <Button
                                  variant="outline-danger"
                                  size="sm"
                                  className="ms-2"
                                  onClick={() => handleDelete(fileKey)}
                                >
                                  <RiDeleteBin6Line className="me-1" /> Remove
                                </Button>
                              </div>
                            </Col>
                          )}
                        </Row>
                      </Col>
                    );
                  })}
                </Row>
              </Form>
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
    </>
  );
};

export default OrphanStepFour;
