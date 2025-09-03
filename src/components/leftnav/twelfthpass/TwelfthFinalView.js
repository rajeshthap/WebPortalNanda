import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const BASE_URL = "https://brjobsedu.com/Nandagora";
const MEDIA_URL = `${BASE_URL}/media`;
const resolveFileUrl = (filePath) => {
  if (!filePath) return null;
  if (filePath.startsWith("http")) return filePath;
  if (filePath.startsWith("media/")) return `${BASE_URL}/${filePath}`;
  if (filePath.startsWith("/media/")) return `${BASE_URL}${filePath}`;
  return `${MEDIA_URL}/${filePath}`;
};
const uploadItems = [
  { id: "pp_photo", label: "छात्रा की नवीनतम पासपोर्ट साइज फोटो" },
  { id: "stu_sign", label: "छात्रा के हस्ताक्षर" },
  { id: "par_sign", label: " माता / पिता/अभिभावक के हस्ताक्षर जमा करें " },
  { id: "mark10", label: "हाईस्कूल का प्रमाण-पत्र। " },
  { id: "mark12", label: "कक्षा 12वीं उत्तीर्ण का अंक पत्र एवं प्रमाण पत्र।" },
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

const TwelfthFinalView = () => {
  const [step1Data, setStep1Data] = useState({});
  const [step2FormData, setStep2FormData] = useState({});
  const [memberData, setMemberData] = useState([]);
  const [girlData, setGirlData] = useState([]);
  const [step3Data, setStep3Data] = useState({});
  const [bankRows, setBankRows] = useState([]);
  const [vehicleRows, setVehicleRows] = useState([]);
  const [electricityRows, setElectricityRows] = useState([]);
  const [waterBillRow, setWaterBillRow] = useState({});
  const [uploadedDocs, setUploadedDocs] = useState({});
  const [error2a, setError2a] = useState(null);
  const [error2b, setError2b] = useState(null);
  const [error2c, setError2c] = useState(null);
  const navigate = useNavigate();

  const userId = localStorage.getItem("user_id");
  useEffect(() => {
    if (!userId) return;

    // Step 1
    axios
      .get(
        `https://brjobsedu.com/Nandagora/api4/step_one_updata__get/${userId}/`
      )
      .then((res) => setStep1Data(res.data || {}))
      .catch(console.error);

    // Step 2
    axios
      .get(`https://brjobsedu.com/Nandagora/api4/phase2b/${userId}/`)
      .then((res) => setStep2FormData(res.data || {}))
      .catch(() => setError2b("अन्य जानकारी लोड करने में त्रुटि"));

    axios
      .get(`https://brjobsedu.com/Nandagora/api4/phase2a/update/${userId}/`)
      .then((res) => setMemberData(Array.isArray(res.data) ? res.data : []))
      .catch(() => setError2a("सदस्य डेटा लोड करने में त्रुटि"));

    axios
      .get(`https://brjobsedu.com/Nandagora/api4/phase2c/update/${userId}/`)
      .then((res) => setGirlData(Array.isArray(res.data) ? res.data : []))
      .catch(() => setError2c("कन्या डेटा लोड करने में त्रुटि"));

    // Step 3
    const fetchStep3 = async () => {
      try {
        const [resStep3, resBank, resVehicle, resBills] = await Promise.all([
          axios.get(`https://brjobsedu.com/Nandagora/api4/step3a/${userId}/`),
          axios.get(`https://brjobsedu.com/Nandagora/api4/step3b/${userId}/`),
          axios.get(
            `https://brjobsedu.com/Nandagora/api4/stepthreevahanupadte/${userId}`
          ),
          axios.get(
            `https://brjobsedu.com/Nandagora/api4/Bills_update/${userId}`
          ),
        ]);
        if (resStep3.data) setStep3Data(resStep3.data);
        if (resBank.data?.length) setBankRows(resBank.data);
        if (resVehicle.data?.length) setVehicleRows(resVehicle.data);
        if (resBills.data?.length) {
          const electricityData = resBills.data.filter(
            (i) => i.type === "electric"
          );
          const waterData = resBills.data.find((i) => i.type === "water");
          if (electricityData.length) setElectricityRows(electricityData);
          if (waterData) setWaterBillRow(waterData);
        }
      } catch (err) {
        console.error(err.response?.data || err.message);
      }
    };
    fetchStep3();

    // Step 4 - read-only
    axios
      .get(`https://brjobsedu.com/Nandagora/api4/step4update/${userId}/`)
      .then((res) => setUploadedDocs(res.data || {}))
      .catch(console.error);
  }, [userId]);

  const handleSubmit = () => {
    alert("Final View confirmed!");
    localStorage.setItem(
      "finalconfirm",
      JSON.stringify({ confirmed: true, date: new Date().toISOString() })
    );
    navigate("/UserDashboard");
  };

  // --- Step 1 Fields ---
  const step1Fields = [
    { key: "girl_name", label: "कन्या शिशु का नाम" },
    { key: "moth_name", label: "माता का नाम" },
    { key: "fath_name", label: "पिता का नाम" },
    { key: "pan_card", label: "स्थायी खाता संख्या कार्ड (PAN CARD)" },
    { key: "dob", label: "कन्या की जन्म तिथि" },
    { key: "caste_category", label: "जाति श्रेणी" },
    { key: "mobile_no", label: "मोबाइल नंबर" },
    { key: "district", label: "जिला" },
    { key: "project", label: "परियोजना / ब्लॉक" },
    { key: "sector", label: "क्षेत्र / सेक्टर" },
    { key: "awc", label: "आंगनवाड़ी केंद्र का नाम" },
    { key: "awc_code", label: "AWC कोड" },
    { key: "awc_type", label: "AWC टाइप" },
    { key: "email_id", label: "ईमेल आईडी" },
    { key: "adhar_no", label: "माता/कन्या का आधार नंबर" },
    { key: "fam_mem", label: "परिवार के सदस्य" },
    { key: "fam_sis", label: "भाई बहन की संख्या" },
    { key: "acno", label: "संयुक्त खाता संख्या" },
    { key: "ifsc_code", label: "बैंक खाते का IFSC कोड" },
    { key: "bank_name", label: "बैंक का नाम" },
    { key: "branch_name", label: "शाखा का नाम" },
  ];

  const memberFields = [
    { key: "mem_name", label: "सदस्य का नाम" },
    { key: "mem_dob", label: "सदस्य की जन्मतिथि" },
    { key: "ten_sch", label: "10वीं विद्यालय का नाम" },
    { key: "twel_sch", label: "12वीं विद्यालय का नाम" },
    { key: "grad_col", label: "स्नातक कॉलेज का नाम" },
    { key: "pgrad_col", label: "स्नातकोत्तर कॉलेज का नाम" },
    { key: "work_det", label: "कार्य विवरण" },
  ];

  const girlFields = [
    { key: "girl_name", label: "लाभार्थी कन्या का नाम" },
    { key: "dob", label: "लाभार्थी कन्या की जन्मतिथि" },
    { key: "aadhaar_no", label: "लाभार्थी कन्या का आधार नंबर" },
    { key: "benefit_year", label: "लाभ का वर्ष" },
  ];

  const otherGroups = [
    {
      heading: "इण्टर मिडिएट उत्तीर्ण करने का विवरण",
      fields: [
        { key: "sch_pass", label: "12वीं उत्तीर्ण वर्ष" },
        { key: "sch_name", label: "विद्यालय का नाम" },
        { key: "sch_board", label: "विद्यालय बोर्ड" },
        { key: "fur_edu", label: "आगे की शिक्षा" },
      ],
    },
    {
      heading: "पैन कार्ड का विवरण",
      fields: [
        { key: "moth_pan", label: "माता का पैन" },
        { key: "fath_pan", label: "पिता का पैन" },
        { key: "abhi_pan", label: "अभिभावक का पैन" },
      ],
    },
    {
      heading: "आय का विवरण",
      fields: [
        { key: "annual_income", label: "वार्षिक आय" },
        { key: "income_cert", label: "आय प्रमाणपत्र नंबर" },
        { key: "inc_cert_date", label: "आय प्रमाणपत्र तिथि" },
      ],
    },
    {
      heading: "बिजली/पानी का कनेक्शन उपलब्ध है",
      fields: [
        { key: "elec_conn", label: "बिजली कनेक्शन" },
        { key: "wate_conn", label: "पानी कनेक्शन" },
        { key: "elec_reso", label: "बिजली स्रोत" },
        { key: "wate_reso", label: "पानी स्रोत" },
      ],
    },
  ];

  const occupationPersons = ["fath", "moth", "abhi"];

  return (
    <div className="container mt-4">
      {/* Step 1 */}
      <h2 className="mb-4">Step 1: व्यक्तिगत जानकारी</h2>
      <Table bordered responsive className="nd-born-thead">
        <thead>
          <tr>
            <th>क्रमांक</th>
            <th>शीर्षक</th>
            <th>जानकारी</th>
          </tr>
        </thead>
        <tbody>
          {step1Fields.map((field, index) => (
            <tr key={field.key}>
              <td>{index + 1}</td>
              <td>{field.label}</td>
              <td>{step1Data[field.key] || "-"}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Step 2 */}
      <h2 className="mb-4 mt-5">Step 2: अतिरिक्त जानकारी</h2>

      {/* Phase2a Members */}
      <div className="mb-4">
        <h5 className="text-center">सदस्य की जानकारी</h5>
        <Table bordered responsive className="nd-born-table">
          <thead className="nd-born-thead">
            <tr>
              <th>क्रमांक</th>
              {memberFields.map((f) => (
                <th key={f.key}>{f.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {error2a ? (
              <tr>
                <td
                  colSpan={memberFields.length + 1}
                  className="text-danger text-center"
                >
                  {error2a}
                </td>
              </tr>
            ) : memberData.length > 0 ? (
              memberData.map((row, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  {memberFields.map((f) => (
                    <td key={f.key}>{row[f.key] || "-"}</td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={memberFields.length + 1} className="text-center">
                  कोई डेटा उपलब्ध नहीं
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      {/* Phase2c Girl Data */}
      <div className="mb-4">
        <h5 className="text-center">लाभार्थी कन्या की जानकारी</h5>
        <Table bordered responsive className="nd-born-table">
          <thead className="nd-born-thead">
            <tr>
              <th>क्रमांक</th>
              {girlFields.map((f) => (
                <th key={f.key}>{f.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {error2c ? (
              <tr>
                <td
                  colSpan={girlFields.length + 1}
                  className="text-danger text-center"
                >
                  {error2c}
                </td>
              </tr>
            ) : girlData.length > 0 ? (
              girlData.map((row, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  {girlFields.map((f) => (
                    <td key={f.key}>{row[f.key] || "-"}</td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={girlFields.length + 1} className="text-center">
                  कोई डेटा उपलब्ध नहीं
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      {/* Other Groups */}
      {error2b ? (
        <p className="text-danger text-center">{error2b}</p>
      ) : (
        otherGroups.map((group, gIndex) => (
          <div key={gIndex} className="mb-4">
            <h5 className="text-center">{group.heading}</h5>
            <Table bordered responsive className="nd-born-table">
              <thead className="nd-born-thead">
                <tr>
                  <th>क्रमांक</th>
                  <th>शीर्षक</th>
                  <th>जानकारी</th>
                </tr>
              </thead>
              <tbody>
                {group.fields.map((field, index) => (
                  <tr key={field.key}>
                    <td>{index + 1}</td>
                    <td>{field.label}</td>
                    <td>{step2FormData[field.key] || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        ))
      )}

      {/* Occupation */}
      <div className="mb-4">
        <h5 className="text-center">व्यवसाय का विवरण</h5>
        <Table bordered responsive className="nd-born-table">
          <thead className="nd-born-thead">
            <tr>
              <th>व्यक्ति</th>
              <th>व्यवसाय (हाँ / ना)</th>
              <th>मनरेगा कार्ड संख्या</th>
              <th>मनरेगा दिवस</th>
            </tr>
          </thead>
          <tbody>
            {occupationPersons.map((person) => (
              <tr key={person}>
                <td>
                  {person === "fath"
                    ? "पिता"
                    : person === "moth"
                    ? "माता"
                    : "अभिभावक"}
                </td>
                <td>{step2FormData[`occu_${person}`] || "-"}</td>
                <td>{step2FormData[`mnrega_${person}`] || "-"}</td>
                <td>{step2FormData[`mnrega_${person}_days`] || "-"}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Step 3 */}
      <h2 className="mb-4 mt-5">Step 3: अतिरिक्त संपत्ति और बिल विवरण</h2>

      <h5 className="text-center">सामाजिक और भूमि विवरण</h5>
      <Table bordered responsive className="nd-born-table">
        <tbody>
          <tr>
            <td>सामाजिक आर्थिक स्थिति</td>
            <td>{step3Data.socio_eco || "-"}</td>
          </tr>
          <tr>
            <td>भूमि का प्रकार</td>
            <td>{step3Data.bhoomi_type || "-"}</td>
          </tr>
          <tr>
            <td>आवासीय भूमि का प्रकार</td>
            <td>{step3Data.bhoomi_typer || "-"}</td>
          </tr>
          <tr>
            <td>भूमि क्षेत्रफल (हेक्टेयर)</td>
            <td>{step3Data.bhoomi_shetr || "-"}</td>
          </tr>
          <tr>
            <td>भूमि का वर्तमान मूल्य (₹)</td>
            <td>{step3Data.curr_amt || "-"}</td>
          </tr>
          <tr>
            <td>आवासीय भूमि प्रकार</td>
            <td>{step3Data.res_type || "-"}</td>
          </tr>
          <tr>
            <td>कक्षों की संख्या</td>
            <td>{step3Data.rooms || "-"}</td>
          </tr>
          <tr>
            <td>क्षेत्रफल (हेक्टेयर)</td>
            <td>{step3Data.area || "-"}</td>
          </tr>
          <tr>
            <td>वर्तमान मूल्य (₹)</td>
            <td>{step3Data.curr_pri || "-"}</td>
          </tr>
        </tbody>
      </Table>

      <h5 className="text-center mt-3">बैंक विवरण</h5>
      <Table bordered responsive className="nd-born-table">
        <thead className="nd-born-thead">
          <tr>
            <th>क्रमांक</th>
            <th>सदस्य का नाम</th>
            <th>बैंक का नाम</th>
            <th>खाता संख्या</th>
            <th>कुल जमा (₹)</th>
          </tr>
        </thead>
        <tbody>
          {bankRows.length ? (
            bankRows.map((b, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{b.det1 || "-"}</td>
                <td>{b.det2 || "-"}</td>
                <td>{b.det3 || "-"}</td>
                <td>{b.det4 || "-"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                कोई डेटा उपलब्ध नहीं
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <h5 className="text-center mt-3">वाहन विवरण</h5>
      <Table bordered responsive className="nd-born-table">
        <thead className="nd-born-thead">
          <tr>
            <th>क्रमांक</th>
            <th>मॉडल</th>
            <th>संख्या</th>
            <th>मूल्य</th>
            <th>अन्य विवरण</th>
          </tr>
        </thead>
        <tbody>
          {vehicleRows.length ? (
            vehicleRows.map((v, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{v.vec_model || "-"}</td>
                <td>{v.vec_number || "-"}</td>
                <td>{v.vec_amt || "-"}</td>
                <td>{v.vec_other || "-"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                कोई डेटा उपलब्ध नहीं
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <h5 className="text-center mt-3">बिजली / पानी बिल विवरण</h5>
      <Table bordered responsive className="nd-born-table">
        <thead className="nd-born-thead">
          <tr>
            <th>क्रमांक</th>
            <th>बिल प्रकार</th>
            <th>खाता संख्या</th>
            <th>तिथि</th>
            <th>धनराशि (₹)</th>
          </tr>
        </thead>
        <tbody>
          {electricityRows.length
            ? electricityRows.map((e, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>बिजली</td>
                  <td>{e.acno || "-"}</td>
                  <td>{e.date || "-"}</td>
                  <td>{e.amount || "-"}</td>
                </tr>
              ))
            : null}
          {waterBillRow.acno && (
            <tr>
              <td>1</td>
              <td>पानी</td>
              <td>{waterBillRow.acno || "-"}</td>
              <td>{waterBillRow.date || "-"}</td>
              <td>{waterBillRow.amount || "-"}</td>
            </tr>
          )}
        </tbody>
      </Table>
      {/* Step 4: Read-only documents */}
      <h2 className="mb-4 mt-5">Step 4: दस्तावेज़ (Read-only)</h2>
      <Table bordered responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Document Type</th>
            <th>Status</th>
            <th>Preview</th>
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
              </tr>
            );
          })}
        </tbody>
      </Table>
      <div className="text-center mt-3">
        <Button variant="primary" onClick={handleSubmit} className="me-2">
          Confirm Final View
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            alert("Cancelled!");
            navigate("/TwelfthStepFour");
          }}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default TwelfthFinalView;
