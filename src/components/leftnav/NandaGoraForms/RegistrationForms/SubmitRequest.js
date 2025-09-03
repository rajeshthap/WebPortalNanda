import React, { useState, useEffect, useCallback } from "react";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import { Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { MdAccessTime } from "react-icons/md";

import DashHeader from "../../DashHeader";
import InnerNavigation from "../../InnerNavigation";
import Footer from "../../../footer/Footer";
import NandaYojana from "../../NandaYojana";

import "../../../../assets/css/LeftNav.css";
import "../../../../assets/css/SubmitRequest.css";
import "../../../../assets/css/NandaStepOne.css";
import "../../../../assets/css/NandaStepTwo.css";
import "../../../../assets/css/HomePage.css";

const SubmitRequest = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    aadhaar: "",
    district: "",
    block: "",
    description: "",
  });

  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("access_token");
  const user_id = localStorage.getItem("user_id");

  // Fetch user profile to prefill formData
  const fetchUserData = useCallback(async () => {
    if (!token) return;

    try {
      const res = await fetch("https://brjobsedu.com/Nandagora/api/userprofile/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch profile data");

      const data = await res.json();

      setFormData({
        name: data.name || "",
        phone: data.phone || "",
        aadhaar: data.aadhaar || "",
        district: data.district || "",
        block: data.block || "",
        description: "",
      });
    } catch (err) {
      alert("Session expired or failed to load profile. Please login again.");
      localStorage.removeItem("access_token");
      localStorage.removeItem("user_id");
      navigate("/UserLogin");
    }
  }, [navigate, token]);

  // Load saved requests from localStorage for this user
  const loadRequests = useCallback(() => {
    const stored = localStorage.getItem("user_requests");
    if (stored && user_id) {
      const allRequests = JSON.parse(stored);
      const filtered = allRequests.filter((req) => req.user_id === user_id);
      setRequests(filtered);
    }
  }, [user_id]);

  useEffect(() => {
    if (!token || !user_id) {
      navigate("/UserLogin");
      return;
    }

    fetchUserData();
    loadRequests();
  }, [fetchUserData, loadRequests, navigate, token, user_id]);

  // Handle form submission and save with user_id
  const handleSubmit = (e) => {
    e.preventDefault();

    const newRequest = {
      id: Date.now(),
      user_id,
      name: formData.name,
      phone: formData.phone,
      aadhaar: formData.aadhaar,
      district: formData.district,
      block: formData.block,
      description: formData.description.trim(),
      status: "Pending",
      response: "N/A",
    };

    // Get all requests from localStorage
    const stored = localStorage.getItem("user_requests");
    const allRequests = stored ? JSON.parse(stored) : [];

    const updatedRequests = [...allRequests, newRequest];
    localStorage.setItem("user_requests", JSON.stringify(updatedRequests));

    // Update current user's requests in state
    const filtered = updatedRequests.filter((req) => req.user_id === user_id);
    setRequests(filtered);

    setFormData((prev) => ({ ...prev, description: "" }));
  };

  const renderStatus = (status) => {
    if (status === "Pending") {
      return (
        <span style={{ display: "flex", alignItems: "center", color: "orange" }}>
          <MdAccessTime size={18} style={{ marginRight: 6 }} />
          Pending
        </span>
      );
    }
    return status;
  };

  return (
    <>
      <DashHeader />
      <div className="main-container">
        <InnerNavigation />
        <div className="main">
          <NandaYojana />
          <div className="box-container nd-Request">
            <Row>
              <div className="nd-step1">
                <h3>Submit Request/Query</h3>
              </div>
              <p>
                <span className="nd-red">Note:</span> फाइनल सबमिट हुए आवेदन फॉर्म में अपडेट करने हेतु{" "}
                <span className="nd-red">Contact Us</span> पेज से सुपरवाइजर से संपर्क करे
              </p>

              <Form onSubmit={handleSubmit}>
                <Row className="nd-stepform-box">
                  {[ 
                    { label: "Name", key: "name" },
                    { label: "Phone", key: "phone" },
                    { label: "Aadhar", key: "aadhaar" },
                    { label: "District", key: "district" },
                    { label: "Block", key: "block" },
                  ].map(({ label, key }) => (
                    <Col lg={4} md={4} sm={12} key={key}>
                      <Form.Group className="mb-3 nd-req-text">
                        <Form.Label>{label}</Form.Label>
                        <Form.Control
                          type="text"
                          name={key}
                          value={formData[key]}
                          readOnly
                          disabled
                          className="shadow1 nd-required"
                        />
                      </Form.Group>
                    </Col>
                  ))}

                  <Col lg={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Description of Request</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        name="description"
                        value={formData.description}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <div className="nd-btnn text-center">
                  <Button type="submit" className="mt-3 nd-primary-btn">
                    Submit Request
                  </Button>
                </div>
              </Form>

              <div className="mt-3">
                <p>
                  अनुरोध लिखने के बाद <span className="nd-red">Contact Us page</span> से{" "}
                  <span className="nd-red">Technical Helpline</span> से संपर्क करें, लाभार्थी का फॉर्म
                  अंतिम तिथि से पहले फाइनल सबमिट होना लाभार्थी/फॉर्म भरने वाले की खुद की जिम्मेदारी
                  होगी.
                </p>

                <Table responsive="lg">
                  <thead className="nd-born-thead">
                    <tr>
                      <th>S.No</th>
                      <th>Name</th>
                      <th>Phone</th>
                      <th>Aadhar</th>
                      <th>District</th>
                      <th>Block</th>
                      <th>Description</th>
                      <th>Status</th>
                      <th>Response</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests.length === 0 ? (
                      <tr>
                        <td colSpan={9} className="text-center">
                          No requests submitted yet.
                        </td>
                      </tr>
                    ) : (
                      requests.map((req, index) => (
                        <tr key={req.id}>
                          <td>{index + 1}</td>
                          <td>{req.name}</td>
                          <td>{req.phone}</td>
                          <td>{req.aadhaar}</td>
                          <td>{req.district}</td>
                          <td>{req.block}</td>
                          <td>{req.description}</td>
                          <td className="nd-red">{renderStatus(req.status)}</td>
                          <td>{req.response}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
              </div>
            </Row>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default SubmitRequest;
