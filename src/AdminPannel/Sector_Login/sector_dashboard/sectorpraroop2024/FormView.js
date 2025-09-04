import React, { useState, useEffect } from "react";
import SectorLeftNav from "../../sectorleftnav/SectorLeftNav";
import SectorNandaGaura from "../SectorNandaGaura";
// import TechFooter from "../../../technicalcomponents/footer/TechFooter";
import { useNavigate } from "react-router-dom";
function FormView() {
  const [phaseData, setPhaseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

const navigate = useNavigate();
  
 const [enableRemarks, setEnableRemarks] = useState(false);
  const [supervisorRemarks, setSupervisorRemarks] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");
  useEffect(() => {
    const user_id = localStorage.getItem("view_user_id");

    if (!user_id) {
      setError("No user selected.");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(`https://brjobsedu.com/Nandagora/api2/allphasedata/${user_id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data.");
        }
        const data = await response.json();
       
        setPhaseData(data);
      } catch (err) {
        setError("Error fetching form data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSupervisorSubmit = async (status) => {
    const user_id = localStorage.getItem("view_user_id");
    if (!user_id || !phaseData?.phase1) {
      setSubmitMessage("Phase 1 data not available.");
      return;
    }

    const payload = {
      user_id: localStorage.getItem("user_id"),
      supervisor_status: status,
      Supervisor_Remarks: supervisorRemarks,
      // kanya_name: phaseData.phase1.kanya_name,
      // moth_name: phaseData.phase1.moth_name,
      // fath_name: phaseData.phase1.fath_name,
      // project: phaseData.phase1.project,
      // adhar_no: phaseData.phase1.adhar_no,
      // awc: phaseData.phase1.awc,
      // awc_type: phaseData.phase1.awc_type,
      // awc_code: phaseData.phase1.awc_code,
    };

    try {
      const response = await fetch("https://brjobsedu.com/Nandagora/api2/Supervisorview/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        
        body: JSON.stringify(payload),
        
      });
 
      if (!response.ok) {
        throw new Error("Failed to submit supervisor review.");
      }

      const data = await response.json();
      setSubmitMessage("Supervisor review submitted Successfully.");
    } catch (err) {
      setSubmitMessage("Error submitting review.");
    }
  };

  const renderFormSection = (title, data, fields) => (
  <div className="mb-8 bg-white p-4  overflow-x-auto">
    <h2 className="text-xl font-semibold mb-4 border-b pb-2">{title}</h2>
    <table className="">
      <thead className="bg-gray-100">
        <tr>
          <th className="border px-4 py-2 text-left">Field</th>
          <th className="border px-4 py-2 text-left">Value</th>
        </tr>
      </thead>
      <tbody>
        {fields.map((field) => (
          <tr key={field.key} className="hover:bg-gray-50">
            <td className="border px-4 py-2 font-medium text-gray-700">{field.label}</td>
            <td className="border px-4 py-2">{data?.[field.key] || "-"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);


  const renderPhase4Images = () => {
    const baseUrl = "https://brjobsedu.com/Nandagora";
    return (
      <div className="nd-step1">
        <h3>Step 4 : दस्तावेज़ अपलोड</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {phaseFields.phase4.map(({ key, label }) => {
            const filePath = phaseData?.phase4?.[key];
            const imageUrl = filePath ? `${baseUrl}${filePath}` : null;

            return (
              <div key={key}>
                <label className="block font-medium text-gray-700">{label}</label>
                <div className=" text-cenetr-1 ">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={label}
                      className="w-full h-48 object-contain border"
                    />
                  ) : (
                    <p className="text-gray-400">No Image</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const phaseFields = {
    phase1: [
      { key: "moth_name", label: "Mother Name" },
      { key: "fath_name", label: "Father Name" },
      { key: "abhi_name", label: "Abhi Name" },
      { key: "dob", label: "Date of Birth" },
      { key: "mem_name", label: "Member Name" },
      { key: "prasav_name", label: "Prasav Name" },
      { key: "awc", label: "AWC" },
      { key: "awc_type", label: "AWC Type" },
      { key: "awc_code", label: "AWC Code" },
      { key: "mobile_no", label: "Mobile No" },
      { key: "email_id", label: "Email ID" },
      { key: "adhar_no", label: "Aadhar No" },
      { key: "fam_mem", label: "Family Members" },
      { key: "acno", label: "Account No" },
      { key: "ifsc_code", label: "IFSC Code" },
      { key: "bank_name", label: "Bank Name" },
      { key: "branch_name", label: "Branch Name" },
    ],
    phase2a: [
      { key: "mem_nam", label: "Member Name" },
      { key: "mem_rel", label: "Member Relation" },
      { key: "mem_edu", label: "Member Education" },
      { key: "mem_adh", label: "Member Aadhar" },
      { key: "mem_mob", label: "Member Mobile" },
    ],
    phase2b: [
      { key: "moth_pan", label: "Mother PAN" },
      { key: "fath_pan", label: "Father PAN" },
      { key: "abhi_pan", label: "Abhi PAN" },
      { key: "annual_income", label: "Annual Income" },
      { key: "income_cert", label: "Income Certificate" },
      { key: "inc_cert_date", label: "Income Certificate Date" },
      { key: "elec_conn", label: "Electricity Connection" },
      { key: "wate_conn", label: "Water Connection" },
      { key: "elec_reso", label: "Electricity Resource" },
      { key: "wate_reso", label: "Water Resource" },
      { key: "occu_fath", label: "Father Occupation" },
      { key: "occu_moth", label: "Mother Occupation" },
      { key: "occu_abhi", label: "Abhi Occupation" },
      { key: "mnrega_fath", label: "Father MNREGA" },
      { key: "mnrega_moth", label: "Mother MNREGA" },
      { key: "mnrega_abhi", label: "Abhi MNREGA" },
      { key: "mnrega_fath_days", label: "Father MNREGA Days" },
      { key: "mnrega_moth_days", label: "Mother MNREGA Days" },
      { key: "mnrega_abhi_days", label: "Abhi MNREGA Days" },
    ],
    phase3a: [
      { key: "socio_eco", label: "Socio-Economic" },
      { key: "bhoomi_type", label: "Bhoomi Type" },
      { key: "bhoomi_typer", label: "Bhoomi Typer" },
      { key: "bhoomi_shetr", label: "Bhoomi Shetr" },
      { key: "curr_amt", label: "Current Amount" },
      { key: "res_type", label: "Residence Type" },
      { key: "rooms", label: "Rooms" },
      { key: "area", label: "Area" },
      { key: "curr_pri", label: "Current Price" },
    ],
    phase3b: [
      { key: "type", label: "Type" },
      { key: "det1", label: "Detail 1" },
      { key: "det2", label: "Detail 2" },
      { key: "det3", label: "Detail 3" },
      { key: "det4", label: "Detail 4" },
    ],
    phase3vehicle: [
      { key: "vec_model", label: "Vehicle Model" },
      { key: "vec_number", label: "Vehicle Number" },
      { key: "vec_amt", label: "Vehicle Amount" },
      { key: "vec_other", label: "Vehicle Other" },
    ],
    phase3bills: [
      { key: "type", label: "Type" },
      { key: "acno", label: "Account No" },
      { key: "date", label: "Date" },
      { key: "amount", label: "Amount" },
    ],
    phase4: [
      { key: "pp_photo", label: "PP Photo" },
      { key: "par_sign", label: "Parent Signature" },
      { key: "stu_dom", label: "Student Domicile" },
      { key: "fam_reg", label: "Family Register" },
      { key: "rat_car", label: "Ration Card" },
      { key: "san_pra", label: "Sanitation Proof" },
      { key: "bir_pra", label: "Birth Proof" },
      { key: "inc_cer", label: "Income Certificate" },
      { key: "stu_adhar", label: "Student Aadhar" },
      { key: "hou_tax", label: "House Tax" },
      { key: "stu_pan", label: "Student PAN" },
      { key: "aww_doc", label: "AWW Document" },
      { key: "tik_cer", label: "Ticket Certificate" },
      { key: "fam_pas", label: "Family Passport" },
      { key: "cas_cer", label: "Caste Certificate" },
      { key: "old_ben", label: "Old Benefit" },
      { key: "fur_edu", label: "Further Education" },
    ],
  };

  const commonFields = [
    { key: "kanya_name", label: "Kanya Name" },
    { key: "district", label: "District" },
    { key: "project", label: "Project" },
  ];

  const commonData = {
    kanya_name: phaseData?.phase1?.kanya_name || "-",
    district: phaseData?.phase1?.district || "-",
    project: phaseData?.phase1?.project || "-",
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;
  if (!phaseData) return null;

  return (
    <div className="main-container">
      <SectorLeftNav />
      <div className="main">
        <SectorNandaGaura />
        <div className="box-container">
          <div className="nd-sector-heading">
            <h1>Praroop 1 - Complete Form View</h1>
          </div>
          <div className="pro-list-data">
            <h2>Nanda Gaura Application Full Data</h2>
          </div>
          <div className="container mx-auto p-4 nd-step1">
           
            {renderFormSection("Basic Info", commonData, commonFields)}

            {renderFormSection("Step 1 : व्यक्तिगत जानकारी", phaseData.phase1, phaseFields.phase1)}
            {renderFormSection("Step 2: सदस्यों / दस्तावेज़ों की जानकारी", phaseData.phase2a, phaseFields.phase2a)}
            {renderFormSection("", phaseData.phase2b, phaseFields.phase2b)}
            {renderFormSection("Phase 3A", phaseData.phase3a, phaseFields.phase3a)}
            {renderFormSection("Phase 3B", phaseData.phase3b, phaseFields.phase3b)}
            {renderFormSection("Phase 3 Vehicle", phaseData.phase3vehicle, phaseFields.phase3vehicle)}
            {renderFormSection("Phase 3 Bills", phaseData.phase3bills, phaseFields.phase3bills)}
            {renderPhase4Images()}

            {/* Supervisor Action Section */}
           <div className="">
  <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-size-heading">Supervisor Review</h2>

  {/* Checkbox to enable remarks */}
  <div className="mb-4 flex items-center">
    <input
      type="checkbox"
      id="enableRemarks"
      className="mr-2"
      checked={enableRemarks}
      onChange={() => setEnableRemarks(!enableRemarks)}
    />
    <label htmlFor="enableRemarks" className="font-medium">Add Supervisor Remarks</label>
  </div>

  {/* Remarks textarea, shown only if checkbox is checked */}
  {enableRemarks && (
    <div className="mb-4">
      <label className="block font-medium">Supervisor Remarks <span className="text-red-500">*</span></label>
      <textarea
        className="border p-2 rounded w-full"
        rows={3}
        value={supervisorRemarks}
        onChange={(e) => setSupervisorRemarks(e.target.value)}
        placeholder="Enter your remarks here..."
        required
      />
    </div>
  )}

  <div className="flex flex-wrap gap-4">
    <button
      className="bg-green-600  px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
      onClick={() => handleSupervisorSubmit("Accepted")}
      disabled={enableRemarks && !supervisorRemarks.trim()}
    >
      Accept
    </button>

    <button
      className="bg-red-600  px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
      onClick={() => handleSupervisorSubmit("Rejected")}
      disabled={enableRemarks && !supervisorRemarks.trim()}
    >
      Reject
    </button>

    <button
      className="bg-yellow-500  px-4 py-2 rounded hover:bg-yellow-600 disabled:opacity-50"
      onClick={() => handleSupervisorSubmit("Remarked")}
      disabled={!supervisorRemarks.trim()}
    >
      Remark Only
    </button>

    <button
      className="bg-gray-400  px-4 py-2 rounded hover:bg-gray-500"
      onClick={() => navigate(-1)} // or use navigate('/previous-page') as needed
    >
      Back
    </button>
  </div>

  {submitMessage && (
    <div className="mt-4 text-blue-600 font-medium">{submitMessage}</div>
  )}
</div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default FormView;
