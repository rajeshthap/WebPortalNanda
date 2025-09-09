import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { Row, Col, Button } from "react-bootstrap";
import UploadFile from "../../../assets/images/upload-icon.png";
import { RiDeleteBin6Line } from "react-icons/ri";
import DashHeader from "../DashHeader";
import InnerNavigation from "../InnerNavigation";
import Footer from "../../footer/Footer";
import OrphanStepOneView from "./OrphanStepOneView";
import OrphanStepTwoView from "./OrphanStepTwoView";
import axios from "axios";
import OrphanTwelfth from "./OrphanTwelfth";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://brjobsedu.com/Nandagora";

const uploadItems = [
  { id: "pp_photo", label: "छात्रा की नवीनतम पासपोर्ट साइज फोटो" },
  { id: "stu_sign", label: "छात्रा के हस्ताक्षर" },
  { id: "par_sign", label: " संस्था के मुखिया / संचालक के हस्ताक्षर जमा करें" },
  { id: "mark10", label: "जन्म तिथि प्रमाण पत्र अथवा हाईस्कूल का प्रमाण पत्र।" },
  { id: "mark12", label: ["कक्षा 12वीं उत्तीर्ण अंक पत्र एवं प्रमाण पत्र।"] },
  { id: "stu_adhar", label: "छात्रा का आधार कार्ड" },
  { id: "stu_pan", label: "छात्रा का पैन कार्ड" },
  { id: "stu_dom", label: " अविवाहित होने का प्रमाण पत्र (स्वयं द्वारा हस्ताक्षरित)" },
  { id: "hou_tax", label: " लाभार्थी बालिका के बैंक पासबुक की छाया प्रति" },
  {
    id: "inc_cer",
    label: (
      <>
        "प्रधानाचार्य द्वारा कक्षा 12 उत्तीर्ण का निर्गत प्रमाण पत्र केवल
        सरस्वती छात्रा के लिए (प्रपत्र यहाँ से डाउनलोड करें)
        <br />
        OR
        <br />
        राष्ट्रीय मुक्त विद्यालय / अन्य शिक्षण संस्थान से कक्षा 12 उत्तीर्ण करने
        वाली आवेदिका द्वारा स्वप्रमाणित अंक पत्र की छायाप्रति"
      </>
    ),
  },
  {
    id: "fam_reg",
    label:
      "राष्ट्रीय मुक्त विद्यालय / अन्य शिक्षण संस्थान से कक्षा 12 उत्तीर्ण करने वाली आवेदिका द्वारा स्वप्रमाणित अंक पत्र की छायाप्रति",
  },
  { id: "old_ben", label: "उच्च शिक्षा में लिखित के हुए आवेदनपत्र की प्रति" },
  { id: "gir_pas", label: "संस्था की अधीक्षिका द्वारा जारी प्रमाण-पत्र" },
];

const OrphanStepTwo = () => {
  const navigate = useNavigate();
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

  // Fetch already uploaded files from API
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

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("orphanUploadedFiles", JSON.stringify(selectedFiles));
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
      await axios.post(`${BASE_URL}/api2/step2/`, formData, {
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
    alert("चरण 2 सफलतापूर्वक सबमिट हो गया। सभी दस्तावेज़ अपलोड हो चुके हैं।");
    navigate("/OrphanFinalView");
  };

  if (loading) return <p>लोड हो रहा है...</p>;

  return (
    <>
      <DashHeader />
      <div className="main-container">
        <InnerNavigation />
        <div className="main">
          <OrphanTwelfth />
          <div className="box-container">
            <Row>
              <div className="nd-step1">
                <div>
                  <h3>
                    उत्तराखण्ड राज्य में स्थापित बालिका निकेतन, नारी निकेतन,
                    अनाथ आश्रम, उत्तराखण्ड राज्य सरकार द्वारा सहायित अन्य गृहों
                    में पलने वाली
                  </h3>
                  <h3>Step 2 : अपलोड प्रमाण पत्र</h3>
                  <h3>
                    <span className="alert-txt">
                      Note: किसी भी फील्ड को ब्लेंक ना छोड़े
                    </span>
                  </h3>
                </div>
                <div>
                  <OrphanStepOneView step="one" />
                  <OrphanStepTwoView step="two" userId={user?.id}/>
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
                              onDragOver={(e) => {
                                e.preventDefault();
                                setDragOver(fileKey);
                              }}
                              onDragLeave={() => setDragOver(null)}
                              onDrop={(e) => {
                                e.preventDefault();
                                const file = e.dataTransfer.files[0];
                                if (file && validateFileSize(file)) {
                                  setUploadFiles((prev) => ({
                                    ...prev,
                                    [fileKey]: file,
                                  }));
                                }
                                setDragOver(null);
                              }}
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
                                  onChange={(e) =>
                                    handleFileChange(e, fileKey)
                                  }
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

export default OrphanStepTwo;
