import React, { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa6";
import { Table, Form, Button, Modal } from "react-bootstrap";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from "axios";

const BASE_URL = "https://brjobsedu.com/Nandagora";
const MEDIA_URL = `${BASE_URL}/media`;

const uploadItems = [
  { id: "pp_photo", label: "छात्रा की नवीनतम पासपोर्ट साइज फोटो" },
  { id: "stu_sign", label: "छात्रा के हस्ताक्षर" },
  { id: "par_sign", label: " माता / पिता/अभिभावक के हस्ताक्षर जमा करें " },
  { id: "mark10", label: "हाईस्कूल का प्रमाण-पत्र। " },
  {
    id: "mark12",
    label: "कक्षा 12वीं उत्तीर्ण का अंक पत्र एवं प्रमाण पत्र।",
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
    label: "शासनादेशानुसार योजना का लाभ केवल 02 बालिकाओं हेतु ही अनुमन्य है...",
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

const resolveFileUrl = (filePath) => {
  if (!filePath) return null;
  if (filePath.startsWith("http")) return filePath;
  if (filePath.startsWith("/media/")) return `${BASE_URL}${filePath}`;
  if (filePath.startsWith("media/")) return `${BASE_URL}/${filePath}`;
  return `${MEDIA_URL}/${filePath}`;
};

const TwelfthStepFourView = ({ userId }) => {
  const [show, setShow] = useState(false);
  const [uploadedDocs, setUploadedDocs] = useState({});
  const [loading, setLoading] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Fetch uploaded docs
  useEffect(() => {
    if (!userId) return;
    const fetchDocs = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api4/step4update/${userId}/`);
        setUploadedDocs(res.data || {});
      } catch (err) {
        console.error("Failed to fetch step 4 docs:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDocs();
  }, [userId]);

  // Update file
  const handleUpdate = async (field, file) => {
    if (!file) return alert("Please select a file first!");
    const formData = new FormData();
    formData.append("user", userId);
    formData.append(field, file);

    try {
      const res = await axios.put(
        `${BASE_URL}/api4/step4update/${userId}/`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      alert("File updated successfully!");
      window.location.reload();
      setUploadedDocs((prev) => ({
        ...prev,
        [field]: res.data[field]
          ? resolveFileUrl(res.data[field])
          : prev[field],
      }));
    } catch (err) {
      console.error("Update failed:", err.response?.data || err.message);
      alert("Update failed");
    }
  };

  const handleDelete = async (field) => {
    if (!window.confirm("Are you sure you want to delete this document?"))
      return;

    try {
      await axios.delete(`${BASE_URL}/api4/step4update/${userId}/`, {
        params: { field },
      });
      alert("Document deleted successfully!");
      setUploadedDocs((prev) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    } catch (err) {
      console.error("Delete failed:", err.response?.data || err.message);
      alert("Delete failed");
    }
  };

  return (
    <>
      <div
        onClick={handleShow}
        style={{ cursor: "pointer" }}
        className="nd-step2"
      >
        <h3>
          <FaCheck /> Step 4 : व्यक्तिगत जानकारी (Click to View)
        </h3>
      </div>

      <Modal show={show} onHide={handleClose} size="lg" scrollable>
        <Modal.Header closeButton>
          <Modal.Title>
            <h3>Step 4 : अतिरिक्त जानकारी</h3>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {loading ? (
            <p>Loading documents...</p>
          ) : (
            <Form>
              <Table bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Document Type</th>
                    <th>Status</th>
                    <th>Preview</th>
                    <th>Update</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {uploadItems.map((item, idx) => {
                    const fileUrl = resolveFileUrl(uploadedDocs[item.id]);
                    return (
                      <tr key={item.id}>
                        <td>{idx + 1}</td>
                        <td>{item.label}</td>
                        <td>
                          {fileUrl ? (
                            <span className="text-success">Uploaded</span>
                          ) : (
                            <span className="text-danger">Not Uploaded</span>
                          )}
                        </td>
                        <td>
                          {fileUrl ? (
                            /\.(jpg|jpeg|png|gif)$/i.test(fileUrl) ? (
                              <a
                                href={fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <img
                                  src={fileUrl}
                                  alt={item.label}
                                  style={{
                                    width: "60px",
                                    height: "60px",
                                    objectFit: "cover",
                                    borderRadius: "6px",
                                    cursor: "pointer",
                                  }}
                                />
                              </a>
                            ) : (
                              <a
                                href={fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                View
                              </a>
                            )
                          ) : (
                            "-"
                          )}
                        </td>

                        <td>
                          <input
                            type="file"
                            accept="image/jpeg,image/png,application/pdf"
                            onChange={(e) =>
                              handleUpdate(item.id, e.target.files[0])
                            }
                          />
                        </td>
                        <td>
                          {fileUrl ? (
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => handleDelete(item.id)}
                            >
                              <RiDeleteBin6Line className="me-1" />
                              Delete
                            </Button>
                          ) : (
                            "-"
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Form>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TwelfthStepFourView;
