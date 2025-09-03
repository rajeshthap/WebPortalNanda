import React, { useEffect, useState } from "react";
import "../../../Sector_Login/sector_assets/CSS/SectorDashboard.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Row, Col, Pagination, Table, Button } from "react-bootstrap";
import TechFooter from "../../../technicalcomponents/footer/TechFooter";
import SectorNandaGaura from "../SectorNandaGaura";
import { SiGoogleforms } from "react-icons/si";
import { FaCheckCircle } from "react-icons/fa";
import SectorLeftNav from "../../sectorleftnav/SectorLeftNav";
import { useNavigate } from "react-router-dom";
import PagingNation from "./PagingNation";

const SectorAllApplication = () => {
  const navigate = useNavigate();
  const [phaseData, setPhaseData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const sector = localStorage.getItem("sector")?.trim() || "";
  const district = localStorage.getItem("district")?.trim() || "";

  const handleView = (id) => {
    const selectedData = phaseData.find(item => item.user_id === id);
    if (selectedData) {
      localStorage.setItem("view_user_id", id); // ✅ Set only ID
      navigate("/FormView"); // ✅ Navigate without ID in URL
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopy = () => {
    const rows = filteredData.map((item, index) => {
      return `${index + 1}. ${item.kanya_name}, ${item.user_id}, ${item.adhar_no}`;
    }).join("\n");

    navigator.clipboard.writeText(rows)
      .then(() => alert("Copied to clipboard!"))
      .catch((err) => alert("Failed to copy: " + err));
  };

  useEffect(() => {
    if (!district) {
      setError("District not found in localStorage.");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://brjobsedu.com/Nandagora/api2/completephase/");
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        const newData = await response.json();

        let dataArray = [];

        if (Array.isArray(newData)) {
          dataArray = newData;
        } else if (newData.results && Array.isArray(newData.results)) {
          dataArray = newData.results;
        } else if (newData && typeof newData === "object") {
          dataArray = Object.values(newData)
            .flat()
            .filter((item) => item && typeof item === "object");
        } else {
          throw new Error("Invalid API response format.");
        }

        const mapped = dataArray.map((item) => ({
          user_id: item.user_id || item.id || "N/A",
          kanya_name: item.phase1_data?.kanya_name || "N/A",
          adhar_no: item.phase1_data?.aadhar_no || item.phase1_data?.adhar_no || "N/A",
          moth_name: item.phase1_data?.mother_name || item.phase1_data?.moth_name || "N/A",
          fath_name: item.phase1_data?.father_name || item.phase1_data?.fath_name || "N/A",
          entry_time: item.phase1_data?.entry_time || item.phase1_data?.dob || "N/A",
          project: item.phase1_data?.project || item.phase1_data?.sector || "N/A",
          awc: item.phase1_data?.awc_name || item.phase1_data?.awc || "N/A",
          awc_code: item.phase1_data?.awc_code || "N/A",
          final_submit: item.phase1_data?.final_submit || item.phase1_data?.entry_time || "N/A",
        }));

        setPhaseData(mapped);
        setFilteredData(mapped);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [district]);

  useEffect(() => {
    const results = phaseData.filter((item) =>
      item.kanya_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.user_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.adhar_no.includes(searchTerm)
    );
    setFilteredData(results);
  }, [searchTerm, phaseData]);

  return (
    <div className="main-container">
      <SectorLeftNav />
      <div className="main">
        <SectorNandaGaura />

        <div className="box-container">
          <div className="nd-sector-heading">
            <h1>Praroop 1 All Applications</h1>
          </div>

          <div className="pro-list-data">
            <h2>Nanda Gaura Real-time Application Report</h2>
          </div>

          <Row>
            <div className="nd-staff-mobresp">
              <Col lg={6} md={6} sm={6} className="nd-staff-print11">
                <div className="search-container">
                  <form>
                    <input
                      className="search"
                      id="searchleft"
                      type="search"
                      name="q"
                      placeholder="Search"
                      aria-label="Search"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <label className="button search-btn-sector" htmlFor="searchleft">
                      <span className="mglass">⚲</span>
                    </label>
                  </form>
                </div>
              </Col>
              <Col lg={6} md={6} sm={6} className="nd-staff-print">
                <Button variant="secondary" className="nd-btn-prt" onClick={handlePrint}>
                  Print
                </Button>
                <Button variant="warning" className="mx-2 nd-btn-copy" onClick={handleCopy}>
                  Copy
                </Button>
              </Col>
            </div>
          </Row>

          <div className="table-responsive-lg table-container">
            <Table className="table-striped table-bordered table-hover">
              <thead className="sector-thead">
                <tr>
                  <th>S.No</th>
                  <th>Form ID</th>
                  <th>Girl Name</th>
                  <th>Aadhar Name</th>
                  <th>Mother Name</th>
                  <th>Father Name</th>
                  <th>DOB</th>
                  <th>Sector</th>
                  <th>AWC (Code)</th>
                  <th>Final Submit</th>
                  <th colSpan="3" className="merged-column text-center">Supervisor Recommendation</th>
                  <th colSpan="3" className="text-center merged-cdpo">CDPO Recommendation</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="17" align="center">Loading data...</td></tr>
                ) : error ? (
                  <tr><td colSpan="17" align="center">Error: {error}</td></tr>
                ) : filteredData.length === 0 ? (
                  <tr><td colSpan="17" align="center">No matching data found.</td></tr>
                ) : (
                  filteredData.map((item, index) => (
                    <tr key={item.user_id || index}>
                      <td>{index + 1}</td>
                      <td>{item.user_id}</td>
                      <td>{item.kanya_name}</td>
                      <td className="t-d-p">{item.adhar_no}</td>
                      <td className="t-d-p">{item.moth_name}</td>
                      <td>{item.fath_name}</td>
                      <td>{item.entry_time !== "N/A" ? new Date(item.entry_time).toLocaleDateString() : "N/A"}</td>
                      <td>{item.project}</td>
                      <td>{item.awc !== "N/A" ? `${item.awc} (${item.awc_code})` : "N/A"}</td>
                      <td>{item.final_submit !== "N/A" ? new Date(item.final_submit).toLocaleString() : "N/A"}</td>
                      <td><span className="badge rounded-pill d-inline-block nd-feedback-submit">Feedback Submitted <FaCheckCircle className="pro-feed-view" /></span></td>
                      <td>Recommendation to Accept</td>
                      <td><span className="badge rounded-pill d-inline-block nd-feedback-complete">Accept <FaCheckCircle className="pro-feed-view" /></span></td>
                      <td><span className="badge rounded-pill d-inline-block nd-feedback-submit">Feedback Submitted <FaCheckCircle className="pro-feed-view" /></span></td>
                      <td>Recommendation to Accept</td>
                      <td><span className="badge rounded-pill d-inline-block nd-feedback-complete">Accept <FaCheckCircle className="pro-feed-view" /></span></td>
                      <td className="pr-p">
                        <div className="pro-rest-btn">
                          <Button className="reset-btn" onClick={() => handleView(item.user_id)}>
                            View Form <SiGoogleforms className="pro-feed-view" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </div>

          <PagingNation />
        </div>
        <TechFooter />
      </div>
    </div>
  );
};

export default SectorAllApplication;
