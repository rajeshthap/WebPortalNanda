import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import "../../assets/css/MainHome.css";
import "../../assets/css/AdminBanner.css";
import Login from "../../assets/images/login.png";
import { Link, useNavigate } from "react-router-dom";

function AdminBanner() {
  const [isRadio, setIsRadio] = useState(6); // Default radio value
  const [districts, setDistricts] = useState([]); // State for districts
  const [sectors, setSectors] = useState([]); // State for sectors
  const [selectedDistrict, setSelectedDistrict] = useState(""); // State for selected district
  const [selectedProject, setSelectedProject] = useState(""); // State for selected district
  const [selectedSector, setSelectedSector] = useState(""); // State for selected sector
  const [password, setPassword] = useState(""); // State for password
  const [error, setError] = useState(""); // State for error messages
  const navigate = useNavigate(); // For navigation after login

  // Fetch districts from API on component mount
  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const response = await fetch("https://brjobsedu.com/Nandagora/api3/Allsectorveiw/");
        const data = await response.json();
        // Extract unique districts
        const uniqueDistricts = [...new Set(data.map(item => item.district))];
        setDistricts(uniqueDistricts);
      } catch (error) {
        console.error("Error fetching districts:", error);
        setError("Failed to load districts");
      }
    };
    fetchDistricts();
  }, []);

  // Filter sectors based on selected district
  useEffect(() => {
    if (selectedDistrict) {
      const fetchSectors = async () => {
        try {
          const response = await fetch("https://brjobsedu.com/Nandagora/api3/Allsectorveiw/");
          const data = await response.json();
          // Filter sectors for the selected district
          const filteredSectors = data
            .filter(item => item.district === selectedDistrict)
            .map(item => item.sector);
          setSectors([...new Set(filteredSectors)]); // Unique sectors
        } catch (error) {
          console.error("Error fetching sectors:", error);
          setError("Failed to load sectors");
        }
      };
      fetchSectors();
    } else {
      setSectors([]);
      setSelectedSector("");
    }
  }, [selectedDistrict]);

  const handleChange = (e) => {
    setIsRadio(+e.currentTarget.value); // Convert to number and set state
    setError(""); // Clear error on radio change
    setPassword(""); // Reset password
    setSelectedDistrict(""); // Reset district
    setSelectedSector(""); // Reset sector
  };

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
    setSelectedSector(""); // Reset sector when district changes
    setError("");
  };

  const handleSectorChange = (e) => {
    setSelectedSector(e.target.value);
    setError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation for all login types
    if (!password) {
      setError("Please enter a password");
      return;
    }

    if ([3, 4, 6].includes(isRadio) && !selectedDistrict) {
      setError("Please select a district");
      return;
    }

    if (isRadio === 6 && !selectedSector) {
      setError("Please select a sector");
      return;
    }

    try {
      let response;
      let apiUrl;
      let payload = { password };

      switch (isRadio) {
        case 1: // Directorate Login
          apiUrl = "https://brjobsedu.com/Nandagora/api3/DirectorateLogin/";
          break;
        case 2: // Technical Login
          apiUrl = "https://brjobsedu.com/Nandagora/api3/TechnicalLogin/";
          break;
        case 3: // District Probation Login
        case 4: // District Login (DPO)
          apiUrl = "https://brjobsedu.com/Nandagora/api3/DistrictLogin/";
          payload.district = selectedDistrict;
          break;
        case 5: // Project Login
          apiUrl = "https://brjobsedu.com/Nandagora/api3/ProjectLogin/";
          break;
        case 6: // Sector Login
          apiUrl = "https://brjobsedu.com/Nandagora/api3/Sectorlogin/";
          payload = {
            district: selectedDistrict,
            sector: selectedSector,
            password: password,
          };
          break;
        default:
          setError("Invalid login type");
          return;
      }

      response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      
      // Show success alert with appropriate message
      let successMessage = "Login successful!";
      if (isRadio === 6) {
        successMessage = `Login successful for ${selectedDistrict} district and ${selectedSector} sector!`;
         localStorage.setItem('district', selectedDistrict);
        localStorage.setItem('sector', selectedSector);
      } else if ([3, 4].includes(isRadio)) {
        successMessage = `Login successful for ${selectedDistrict} district!`;
      }
      
      alert(successMessage);
     
      // Navigate to appropriate dashboard
      const dashboardRoutes = {
        1: "/DirectorateDashboard",
        2: "/TechnicaldashBoard",
        3: "/DistrictProbationDashboard",
        4: "/DistrictDashboard",
        5: "/ProjectDashboard",
        6: "/SectorDashBoard",
      };
      
      navigate(dashboardRoutes[isRadio]);
      
    } catch (error) {
      console.error("Error during login:", error);
      setError("Invalid credentials or server error");
    }
  };

  const renderForm = () => {
    switch (isRadio) {
      case 1: // Directorate Login
        return (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3 mt-3" controlId="loginType">
              <Form.Label className="nd-form-label">Login Type</Form.Label>
              <Form.Control
                type="text"
                className="nd-form-control"
                value="Directorate Login"
                readOnly
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label className="nd-form-label">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                className="nd-form-control"
                onChange={handlePasswordChange}
                value={password}
              />
            </Form.Group>
            {error && <p className="text-danger">{error}</p>}
            <div className="nd-admin-btn">
              <Button className="nd-primary" type="submit">
                Login
              </Button>
            </div>
          </Form>
        );

      case 2: // Technical Login
        return (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3 mt-3" controlId="loginType">
              <Form.Label className="nd-form-label">Login Type</Form.Label>
              <Form.Control
                type="text"
                value="Technical Login"
                className="nd-form-control"
                readOnly
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label className="nd-form-label">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                className="nd-form-control"
                onChange={handlePasswordChange}
                value={password}
              />
            </Form.Group>
            {error && <p className="text-danger">{error}</p>}
            <div className="nd-admin-btn">
              <Button className="nd-primary" type="submit">
                Login
              </Button>
            </div>
          </Form>
        );

      case 3: // District Probation Login
      case 4: // District Login (DPO)
        return (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3 mt-3" controlId="loginType">
              <Form.Label className="nd-form-label">Login Type</Form.Label>
              <Form.Control
                type="text"
                value={isRadio === 3 ? "District Probation Login" : "District Login (DPO)"}
                className="nd-form-control"
                readOnly
              />
            </Form.Group>
            <Form.Group className="mb-3 mt-3" controlId="district">
              <Form.Label className="nd-form-label">Choose District for Login:</Form.Label>
              <Form.Select
                aria-label="Choose district"
                className="nd-steps-drop"
                onChange={handleDistrictChange}
                value={selectedDistrict}
              >
                <option value="">Choose District</option>
                {districts.map((district, index) => (
                  <option key={index} value={district}>
                    {district}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label className="nd-form-label">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                className="nd-form-control"
                onChange={handlePasswordChange}
                value={password}
              />
            </Form.Group>
            {error && <p className="text-danger">{error}</p>}
            <div className="nd-admin-btn">
              <Button className="nd-primary" type="submit">
                Login
              </Button>
            </div>
          </Form>
        );

      case 5: // Project Login
        return (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3 mt-3" controlId="loginType">
              <Form.Label className="nd-form-label">Login Type</Form.Label>
              <Form.Control
                type="text"
                value="Project Login"
                className="nd-form-control"
                readOnly
              />
            </Form.Group>
            <Form.Group className="mb-3 mt-3" controlId="block">
              <Form.Label className="nd-form-label">Choose Block Login:</Form.Label>
              <Form.Select 
                aria-label="Choose block" 
                className="nd-steps-drop"
                onChange={(e) => setSelectedSector(e.target.value)}
                value={selectedSector}
              >
                <option value="">Choose Block</option>
                <option value="Chakrata">Chakrata</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label className="nd-form-label">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                className="nd-form-control"
                onChange={handlePasswordChange}
                value={password}
              />
            </Form.Group>
            {error && <p className="text-danger">{error}</p>}
            <div className="nd-admin-btn">
              <Button className="nd-primary" type="submit">
                Login
              </Button>
            </div>
          </Form>
        );

      case 6: // Sector Login
      default:
        return (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3 mt-3" controlId="loginType">
              <Form.Label className="nd-form-label">Login Type</Form.Label>
              <Form.Control
                type="text"
                value="Sector Login"
                className="nd-form-control"
                readOnly
              />
            </Form.Group>
            <Form.Group className="mb-3 mt-3" controlId="district">
              <Form.Label className="nd-form-label">Choose District Login:</Form.Label>
              <Form.Select
                aria-label="Choose district"
                className="nd-steps-drop"
                onChange={handleDistrictChange}
                value={selectedDistrict}
              >
                <option value="">Choose District</option>
                {districts.map((district, index) => (
                  <option key={index} value={district}>
                    {district}
                  </option>
                ))}
              </Form.Select>

              <Form.Label className="nd-form-label mt-3">Choose Sector Login:</Form.Label>
              <Form.Select
                aria-label="Choose sector"
                className="nd-steps-drop"
                onChange={handleSectorChange}
                value={selectedSector}
              >
                <option value="">Choose Sector</option>
                {sectors.map((sector, index) => (
                  <option key={index} value={sector}>
                    {sector}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label className="nd-form-label">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                className="nd-form-control"
                onChange={handlePasswordChange}
                value={password}
              />
            </Form.Group>
            {error && <p className="text-danger">{error}</p>}
            <div className="nd-admin-btn">
              <Button className="nd-primary" type="submit" onClick={handleSubmit}>
                Login
              </Button>
            </div>
          </Form>
        );
    }
  };

  return (
    <div className="container-fluid nd-login-banner">
      <Container>
        <Row className="nd-admin-login">
          <Col lg={6} md={6} sm={12} className="mt-5 nd-main-col nd-main-data">
            <div>
              <p className="nd-subdata mt-4">नंदा गौरा योजना</p>
            </div>
          </Col>
          <Col lg={6} md={6} sm={12} className="mt-5 nd-main-login">
            <Card className="mt-4 nd-admin-form">
              <Form className="nd-form">
                <h1 className="nd-login-title">
                  <img src={Login} alt="sign" className="p-2" />
                  Login Panel
                </h1>

                <Row className="nd-p-18">
                  <Col lg={4} md={6} sm={3}>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="radio1"
                        value={1}
                        onChange={handleChange}
                        checked={isRadio === 1}
                      />
                      <label className="form-check-label" htmlFor="radio1">
                        Directorate Login
                      </label>
                    </div>
                  </Col>
                  <Col lg={4} md={6} sm={3}>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="radio2"
                        value={2}
                        onChange={handleChange}
                        checked={isRadio === 2}
                      />
                      <label className="form-check-label" htmlFor="radio2">
                        Technical Login
                      </label>
                    </div>
                  </Col>
                  <Col lg={4} md={6} sm={3}>
                    <div className="form-check form-check1">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="radio3"
                        value={3}
                        onChange={handleChange}
                        checked={isRadio === 3}
                      />
                      <label className="form-check-label" htmlFor="radio3">
                        District Probation Login
                      </label>
                    </div>
                  </Col>
                  <Col lg={4} md={6} sm={3} className="nd-admin-top m-t-0">
                    <div className="form-check form-check1">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="radio4"
                        value={4}
                        onChange={handleChange}
                        checked={isRadio === 4}
                      />
                      <label className="form-check-label" htmlFor="radio4">
                        District Login (DPO)
                      </label>
                    </div>
                  </Col>
                  <Col lg={4} md={6} sm={3} className="mt-3 m-t-0">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="radio5"
                        value={5}
                        onChange={handleChange}
                        checked={isRadio === 5}
                      />
                      <label className="form-check-label" htmlFor="radio5">
                        Project Login
                      </label>
                    </div>
                  </Col>
                  <Col lg={4} md={6} sm={3} className="mt-3 m-t-0">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="radio6"
                        value={6}
                        onChange={handleChange}
                        checked={isRadio === 6}
                      />
                      <label className="form-check-label" htmlFor="radio6">
                        Sector Login
                      </label>
                    </div>
                  </Col>
                </Row>

                <div className="nd-login-title">
                  <h1>
                    {isRadio === 1
                      ? "Directorate Login"
                      : isRadio === 2
                      ? "Technical Login"
                      : isRadio === 3
                      ? "District Probation Login"
                      : isRadio === 4
                      ? "District Login (DPO)"
                      : isRadio === 5
                      ? "Project Login"
                      : "Sector Login"}
                  </h1>
                </div>

                {renderForm()}
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AdminBanner;