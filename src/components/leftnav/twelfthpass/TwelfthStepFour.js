import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { Row, Col, Button } from "react-bootstrap";
import UploadFile from "../../../assets/images/upload-icon.png";
import { RiDeleteBin6Line } from "react-icons/ri";
import DashHeader from "../DashHeader";
import InnerNavigation from "../InnerNavigation";
import Footer from "../../footer/Footer";
import TwelthPass from "./TwelthPass";
import TwelfthStepOneView from "./TwelfthStepOneView";
import TwelfthStepTwoView from "./TwelfthStepTwoView";
import TwelfthStepThreeView from "./TwelfthStepThreeView";
import TwelfthStepFourView from "./TwelfthStepFourView";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://brjobsedu.com/Nandagora";

const uploadItems = [
  { id: "pp_photo", label: "छात्रा की नवीनतम पासपोर्ट साइज फोटो" },
  { id: "stu_sign", label: "छात्रा के हस्ताक्षर" },
  { id: "par_sign", label: " माता / पिता/अभिभावक के हस्ताक्षर जमा करें " },
  { id: "mark10", label: "हाईस्कूल का प्रमाण-पत्र। " },
  {
    id: "mark12",
    label:
      "कक्षा 12वीं उत्तीर्ण का अंक पत्र एवं प्रमाण पत्र। OR राष्ट्रीय मुक्त विद्यालय / अन्य शिक्षण संस्थान से कक्षा 12 उत्तीर्ण करने वाली आवेदिका द्वारा स्वप्रमाणित अंक पत्र की छायाप्रति ",
  },
  { id: "stu_adhar", label: "छात्रा एवं माता-पिता/अभिभावक का आधार कार्ड" },
  { id: "stu_pan", label: "छात्रा एवं माता-पिता/अभिभावक का पैन कार्ड " },
  { id: "stu_dom", label: " छात्रा का स्थाई निवास प्रमाण पत्र " },
  {
    id: "hou_tax",
    label:
      " राष्ट्रीय मुक्त विद्यालय / अन्य शिक्षण संस्थान से कक्षा 12 उत्तीर्ण करने वाली आवेदिका द्वारा स्वप्रमाणित अंक पत्र की छायाप्रति ",
  },
  { id: "inc_cer", label: "आय प्रमाण पत्र" },
  {
    id: "fam_reg",
    label:
      "परिवार रजिस्टर की नकल या सभासद/पार्षद द्वारा दिया गया प्रमाण पत्र तथा राशन कार्ड की प्रति (बालिका का नाम राशन कार्ड में अंकित होना अनिवार्य है) ",
  },
  {
    id: "cas_cer",
    label:
      " सामाजिक आर्थिक और जाति जनगणना(SECC) में परिवार की स्थिति के आंकलन की प्रति (यदि उपलबध है)",
  },
  {
    id: "unm_cer",
    label:
      "  परिवार के विगत 03 बार के बिजली के बिलों की प्रति तथा विगत 01 बार के पानी के बिल की प्रति कनेक्शन न होने की स्तिथि में शपथ पत्र में आवश्यक रूप से उल्लेख करे।",
  },
  {
    id: "old_ben",
    label: (
      <>
        "शासनादेशानुसार योजना का लाभ केवल 02 बालिकाओं हेतु ही अनुमन्य है इसलिए
        आवेदित बालिका के परिवार की अन्य बालिकाओं को पूर्व में 12वीं कक्षा पूरी
        करने पर योजना का लाभ दिये जाने / न दिये जाने विषयक शपथ –पत्र में निम्न
        बिंदु आवश्यक रूप से शामिल होंगे :- <br />
        मैं प्रमाणित करता/ करती हूँ की यह लाभ मेरी प्रथम/द्वितीय पुत्री द्वारा
        लिया जा रहा है, मेरी यह पुत्री अविवाहित है।
        <br /> मेरे द्वारा चल अचल सम्पति एवं अन्य चाही गयी समस्त सूचनाएं सही
        –सहीदी गयी है मेरे द्वारा किसी भी तथ्य को छुपाया नहीं गया है | <br />{" "}
        मेरे द्वारा परिवार के समस्त खातो का विवरण,एक वर्ष के बैंक स्टेटमेंट सहित
        दे दिया गया है"
      </>
    ),
  },
  { id: "gir_pas", label: "लाभार्थी बालिका के बैंक पासबुक की छाया प्रति " },
  {
    id: "fam_pas",
    label:
      " परिवार के समस्त सदस्यों के बैंक पासबुक की प्रति / विगत 01 वर्ष के बैंक स्टेटमैन्ट की प्रति ",
  },
  { id: "fur_edu", label: "उच्च शिक्षा में दाखिले के पूर्ण अभिलेखों की प्रति" },
  {
    id: "sch_doc",
    label:
      " विद्यालय द्वारा जारी प्रमाण पत्र    स्वप्रमाणित अंक पत्र की छायाप्रति",
  },
  { id: "aww_doc", label: "आंगनबाड़ी कार्यकर्ती द्वारा प्रदत्त प्रमाण-पत्र।" },
];

const TwelfthStepFour = () => {
  const navigate = useNavigate();

  // back button code
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

  const [selectedFiles, setSelectedFiles] = useState({});
  const [uploadFiles, setUploadFiles] = useState({});
  const [dragOver, setDragOver] = useState(null);
  const [loading, setLoading] = useState(true);

  let user = {};
  try {
    user = JSON.parse(localStorage.getItem("user")) || {};
  } catch {
    user = {};
  }
  const user_id = user?.id;

  const isImage = (name) => /\.(jpg|jpeg|png|gif)$/i.test(name);
  const isPdf = (name) => /\.pdf$/i.test(name);

  useEffect(() => {
    if (!user_id) return;

    const fetchUploadedFiles = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api4/step4update/${user_id}/`);
        const apiFiles = res.data || {};
        const prefilledFiles = {};

        uploadItems.forEach((item, index) => {
          const key = `${item.id}-${index}`;
          if (apiFiles[item.id]) {
            const fullUrl = apiFiles[item.id].startsWith("http")
              ? apiFiles[item.id]
              : `${BASE_URL}${apiFiles[item.id]}`;
            prefilledFiles[key] = {
              name: fullUrl.split("/").pop(),
              type: "uploaded",
              data: fullUrl,
            };
          }
        });

        setSelectedFiles(prefilledFiles);
      } catch (err) {
        console.error("API से डेटा लाने में त्रुटि:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUploadedFiles();
  }, [user_id]);

  useEffect(() => {
    localStorage.setItem("uploadedFiles", JSON.stringify(selectedFiles));
  }, [selectedFiles]);

  const validateFileSize = (file) => {
    const min = 100 * 1024;
    const max = 1024 * 1024;
    if (file.size < min || file.size > max) {
      alert("फ़ाइल का आकार 100KB से 1MB के बीच होना चाहिए।");
      return false;
    }
    return true;
  };

  const handleFileChange = (e, fileKey) => {
    const file = e.target.files[0];
    if (file && validateFileSize(file)) {
      setUploadFiles((prev) => ({ ...prev, [fileKey]: file }));
    }
  };

  const handleDragOver = (e, fileKey) => {
    e.preventDefault();
    setDragOver(fileKey);
  };

  const handleDragLeave = () => setDragOver(null);

  const handleDrop = (e, fileKey) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && validateFileSize(file)) {
      setUploadFiles((prev) => ({ ...prev, [fileKey]: file }));
    }
    setDragOver(null);
  };

  const handleDelete = (fileKey) => {
    setSelectedFiles((prev) => {
      const updated = { ...prev };
      delete updated[fileKey];
      return updated;
    });
    setUploadFiles((prev) => {
      const updated = { ...prev };
      delete updated[fileKey];
      return updated;
    });
  };

  const handleSingleSubmit = async (fileKey) => {
    const file = uploadFiles[fileKey];
    if (!file) {
      alert("कृपया पहले फ़ाइल चुनें!");
      return;
    }

    const fieldName = fileKey.split("-")[0];
    const formData = new FormData();
    formData.append("user", user?.id || "");
    formData.append("girl_name", user?.name || "");
    formData.append("district", user?.district || "");
    formData.append("project", user?.block || "");
    formData.append("adhar_no", user?.aadhaar || "");
    formData.append(fieldName, file, file.name);

    try {
      await axios.post(`${BASE_URL}/api4/step4/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(`${fieldName} सफलतापूर्वक अपलोड हो गया`);
      window.location.reload();

      setSelectedFiles((prev) => ({
        ...prev,
        [fileKey]: {
          name: file.name,
          type: file.type,
          data: URL.createObjectURL(file),
        },
      }));

      setUploadFiles((prev) => {
        const updated = { ...prev };
        delete updated[fileKey];
        return updated;
      });
    } catch (err) {
      console.error("अपलोड विफल:", err.response?.data || err.message);
      alert("अपलोड विफल। पुनः प्रयास करें।");
    }
  };

  const handleSubmit = () => {
    const requiredFields = uploadItems.map(
      (item, index) => `${item.id}-${index}`
    );
    const missingFields = requiredFields.filter(
      (fileKey) => !selectedFiles[fileKey]
    );
    if (missingFields.length > 0) {
      alert(
        `कृपया सभी आवश्यक दस्तावेज़ अपलोड करें।\nअपूर्ण: ${missingFields.join(
          ", "
        )}`
      );
      return;
    }
    alert("चरण 4 सफलतापूर्वक सबमिट हो गया। सभी दस्तावेज़ अपलोड हो चुके हैं।");
    navigate("/TwelfthFinalView");
  };

  if (loading) return <p>लोड हो रहा है...</p>;

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
                  <h3>Step 4 : चयन मानक सम्बंधित प्रमाण पत्र</h3>
                  <h3>
                    Note: किसी भी फील्ड को ब्लेंक ना छोड़े, जानकारी/दस्तावेज ना
                    होने की स्थिति में "उपलब्धि नहीं है / Not Applicable" लिखकर
                    आगे बढ़े।
                  </h3>
                </div>
                <div>
                  <TwelfthStepOneView step="one" />
                  <TwelfthStepTwoView step="two" />
                  <TwelfthStepThreeView step="three" />
                  <TwelfthStepFourView step="four" userId={user?.id} />
                </div>
              </div>
            </Row>

            <div className="p-2 nd-data-doc">
              <Form>
                <Row>
                  {uploadItems.map((item, index) => {
                    const fileKey = `${item.id}-${index}`;
                    return (
                      <Col
                        key={index}
                        lg={12}
                        md={12}
                        sm={12}
                        className="nd-p-12 mb-3"
                      >
                        <h5 style={{ fontSize: "14px", marginBottom: "5px" }}>
                          {index + 1}.{" "}
                          {Array.isArray(item.label)
                            ? item.label.join(" ")
                            : item.label}{" "}
                          <span className="alert-txt">*</span>
                        </h5>

                        <Row
                          className="nd-stepform-box align-items-center"
                          style={{ minHeight: "80px" }}
                        >
                          <Col lg={5} md={5} sm={12}>
                            <fieldset
                              className={`upload_dropZone d-flex align-items-center justify-content-center py-2 ${
                                dragOver === fileKey
                                  ? "border border-primary"
                                  : ""
                              }`}
                              onDragOver={(e) => handleDragOver(e, fileKey)}
                              onDragLeave={handleDragLeave}
                              onDrop={(e) => handleDrop(e, fileKey)}
                            >
                              <div className="d-flex flex-column upload-box">
                                <img src={UploadFile} alt="upload-file" />
                                <p
                                  className="nd-drop-txt mb-1"
                                  style={{ fontSize: "12px" }}
                                >
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
                                <label
                                  className="btn nd-primary-btn py-1"
                                  htmlFor={fileKey}
                                >
                                  Choose file
                                </label>
                                <p
                                  className="nd-upload-file mb-0"
                                  style={{ fontSize: "12px" }}
                                >
                                  Upload size 100KB - 1MB (PDF, JPG, PNG)
                                </p>
                              </div>
                            </fieldset>
                          </Col>

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

                          {selectedFiles[fileKey] && !uploadFiles[fileKey] && (
                            <Col
                              lg={7}
                              md={7}
                              sm={12}
                              className="d-flex flex-column align-items-start mt-2 mt-lg-0"
                            >
                              <div className="d-flex align-items-center">
                                {isImage(selectedFiles[fileKey].name) ? (
                                  <img
                                    src={selectedFiles[fileKey].data}
                                    alt={selectedFiles[fileKey].name}
                                    style={{
                                      width: "50px",
                                      height: "50px",
                                      objectFit: "cover",
                                      borderRadius: "5px",
                                      marginRight: "10px",
                                    }}
                                  />
                                ) : isPdf(selectedFiles[fileKey].name) ? (
                                  <div
                                    style={{
                                      width: "50px",
                                      height: "50px",
                                      marginRight: "10px",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      background: "#f0f0f0",
                                      borderRadius: "5px",
                                      fontSize: "12px",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    PDF
                                  </div>
                                ) : (
                                  <span className="text-success fw-bold">
                                    {selectedFiles[fileKey].name}
                                  </span>
                                )}
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
              <Button className="mt-3 nd-secondary-btn" onClick={handleSubmit}>
                Final View
              </Button>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default TwelfthStepFour;
