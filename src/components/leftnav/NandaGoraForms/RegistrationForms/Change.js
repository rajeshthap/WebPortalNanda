import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { Row, Col, Button } from "react-bootstrap";
import DashHeader from "../../DashHeader";
import InnerNavigation from "../../InnerNavigation";
import NandaYojana from "../../NandaYojana";
import Footer from "../../../footer/Footer";

const Change = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    aadhaar: "",
    district: "",
    block: "",
    project_type: "",
    old_password: "",
    new_password: "",
    confirm_password: "",
  });

  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      navigate("/UserLogin");
      return;
    }

    setLoading(true);
    fetch("https://brjobsedu.com/Nandagora/api/userprofile/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (res.status === 401 || res.status === 403) {
          alert("Session expired. Please login again."); // <-- ALERT BOX
          localStorage.removeItem("access_token");
          navigate("/UserLogin");
          return;
        }
        if (!res.ok) {
          throw new Error("Failed to fetch profile data");
        }
        const data = await res.json();
        return data;
      })
      .then((data) => {
        if (!data) return;
        setFormData({
          phone: data.phone || "",
          name: data.name || "",
          aadhaar: data.aadhaar || "",
          district: data.district || "",
          block: data.block || "",
          project_type: data.project_type || "",
          old_password: "",
          new_password: "",
          confirm_password: "",
        });
        setLoading(false);
      })
      .catch((err) => {
        setErrorMsg(err.message);
        setLoading(false);
      });
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (formData.new_password !== formData.confirm_password) {
      setErrorMsg("New password and Confirm password do not match.");
      return;
    }

    const payload = {
      district: formData.district,
      block: formData.block,
      project_type: formData.project_type,
      old_password: formData.old_password,
      new_password: formData.new_password,
      confirm_password: formData.confirm_password,
    };

    fetch("https://brjobsedu.com/Nandagora/api/userprofile/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: JSON.stringify(payload),
    })
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.message || "Failed to update profile");
        }
        return res.json();
      })
      .then(() => {
        setSuccessMsg("Profile updated Successfully.");
        setFormData((prev) => ({
          ...prev,
          old_password: "",
          new_password: "",
          confirm_password: "",
        }));
      })
      .catch((err) => {
        setErrorMsg(err.message);
      });
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <DashHeader />
      <div className="main-container">
        <InnerNavigation />
        <div className="main">
          <NandaYojana />
          <div className="box-container">
            <Row className="nd-step1">
              <h3>Change Password</h3>
            </Row>

            <Form onSubmit={handleSubmit}>
              <Row className="nd-stepform-box">
                <Col lg={4} md={4} sm={12}>
                  <Form.Group className="mb-3 nd-req-text">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      disabled
                      className="shadow1 nd-required"
                    />
                  </Form.Group>
                </Col>

                <Col lg={4} md={4} sm={12}>
                  <Form.Group className="mb-3 nd-req-text">
                    <Form.Label>Mobile No.</Form.Label>
                    <Form.Control
                      type="text"
                      name="phone"
                      value={formData.phone}
                      disabled
                      className="shadow1"
                    />
                  </Form.Group>
                </Col>

                <Col lg={4} md={4} sm={12}>
                  <Form.Group className="mb-3 nd-req-text">
                    <Form.Label>Aadhar No.</Form.Label>
                    <Form.Control
                      type="text"
                      name="aadhaar"
                      value={formData.aadhaar}
                      disabled
                      className="shadow1"
                    />
                  </Form.Group>
                </Col>

                <Col lg={4} md={4} sm={12}>
                  <Form.Group className="mb-3 nd-req-text">
                    <Form.Label>District</Form.Label>
                    <Form.Control
                      type="text"
                      name="district"
                      value={formData.district}
                      onChange={handleChange}
                      className="shadow1"
                      required
                      disabled
                    />
                  </Form.Group>
                </Col>

                <Col lg={4} md={4} sm={12}>
                  <Form.Group className="mb-3 nd-req-text">
                    <Form.Label>Block</Form.Label>
                    <Form.Control
                      type="text"
                      name="block"
                      value={formData.block}
                      onChange={handleChange}
                      className="shadow1"
                      required
                      disabled
                    />
                  </Form.Group>
                </Col>

                <Col lg={4} md={4} sm={12}>
                  <Form.Group className="mb-3 nd-req-text">
                    <Form.Label>Project type</Form.Label>
                    <Form.Control
                      type="text"
                      name="project_type"
                      value={formData.project_type}
                      onChange={handleChange}
                      className="shadow1"
                      placeholder="Project type"
                      required
                      disabled
                    />
                    <span>Project will be updated on step 1 also</span>
                  </Form.Group>
                </Col>

                <Col lg={4} md={4} sm={12}>
                  <Form.Group className="mb-3 nd-req-text">
                    <Form.Label>Old Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="old_password"
                      value={formData.old_password}
                      onChange={handleChange}
                      className="shadow1"
                      placeholder="Enter old password"
                      required
                    />
                  </Form.Group>
                </Col>

                <Col lg={4} md={4} sm={12}>
                  <Form.Group className="mb-3 nd-req-text">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="new_password"
                      value={formData.new_password}
                      onChange={handleChange}
                      className="shadow1"
                      placeholder="Enter new password"
                      required
                    />
                  </Form.Group>
                </Col>

                <Col lg={4} md={4} sm={12}>
                  <Form.Group className="mb-3 nd-req-text">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="confirm_password"
                      value={formData.confirm_password}
                      onChange={handleChange}
                      className="shadow1"
                      placeholder="Confirm new password"
                      required
                    />
                  </Form.Group>
                </Col>

                {errorMsg && (
                  <p style={{ color: "red", textAlign: "center" }}>{errorMsg}</p>
                )}
                {successMsg && (
                  <p style={{ color: "green", textAlign: "center" }}>{successMsg}</p>
                )}

                <div className="nd-btnn text-center">
                  <Button type="submit" className="mt-3 nd-primary-btn mb-3">
                    Update Details
                  </Button>
                </div>
              </Row>
            </Form>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Change;
