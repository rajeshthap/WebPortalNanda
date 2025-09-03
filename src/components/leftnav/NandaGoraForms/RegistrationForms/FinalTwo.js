import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const FinalTwo = () => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    const form_id = localStorage.getItem("form_id");

    // if (!user_id || !form_id) {
    //   alert("User ID या Form ID नहीं मिला। कृपया लॉगिन करें।");
    //   navigate("/UserLogin");
    //   return;
    // }

    axios
      .get(`https://brjobsedu.com/Nandagora/api2/phase2b/update/${user_id}/`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        alert("डेटा लोड करने में त्रुटि हुई");
      });
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    const user_id = localStorage.getItem("user_id");

    axios
      .put(`https://brjobsedu.com/Nandagora/api2/phase2b/update/${user_id}/`, data)
      .then((res) => {
        alert("डेटा सफलतापूर्वक अपडेट हो गया।");
        handleClose();
      })
      .catch((err) => {
        console.error("Update Error:", err);
        alert("डेटा अपडेट करने में त्रुटि हुई।");
      });
  };

  return (
    <>
      <div onClick={handleShow} className="nd-step1">
        <h3>
          <FaCheck /> Step 2: सदस्यों / दस्तावेज़ों की जानकारी (click to view)
        </h3>
      </div>

     
          <Form>
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead className="nd-born-thead">
                  <tr>
                    <th>क्रम संख्या</th>
                    <th>दस्तावेज</th>
                    <th>दर्ज विवरण</th>
                    <th>सुधारें</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                   
                    { id: 2, label: "पिता का मनरेगा जॉब कार्ड नंबर", name: "mnrega_fath" },
                    { id: 3, label: "पिता के मनरेगा कार्य दिवस", name: "mnrega_fath_days" },
                    {
                      id: 4,
                      label: "पिता का व्यवसाय",
                      name: "occu_fath",
                      type: "select",
                      options: [
                        "निजी क्षेत्र में सेवा",
                        "सरकारी सेवा",
                        "कृषि",
                        "घरेलू उद्योग",
                        "अस्वरोजगार",
                        "अन्य",
                      ],
                    },
                   
                    { id: 6, label: "माता का मनरेगा जॉब कार्ड नंबर", name: "mnrega_moth" },
                    { id: 7, label: "माता के मनरेगा कार्य दिवस", name: "mnrega_moth_days" },
                    {
                      id: 8,
                      label: "माता का व्यवसाय",
                      name: "occu_moth",
                      type: "select",
                      options: [
                        "निजी क्षेत्र में सेवा",
                        "सरकारी सेवा",
                        "कृषि",
                        "घरेलू उद्योग",
                        "अस्वरोजगार",
                        "अन्य",
                      ],
                    },
                    { id: 9, label: "कुल वार्षिक आय", name: "annual_income" },
                    { id: 10, label: "आय प्रमाण पत्र क्रमांक", name: "income_cert" },
                    {
                      id: 11,
                      label: "आय प्रमाण पत्र दिनांक",
                      name: "inc_cert_date",
                      type: "date",
                    },
                  ].map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.label}</td>
                      <td>{data[item.name]}</td>
                      <td>
                        {item.type === "select" ? (
                          <Form.Select
                            name={item.name}
                            value={data[item.name] || ""}
                            onChange={handleChange}
                          >
                            <option value="">व्यवसाय चुनें</option>
                            {item.options.map((opt, idx) => (
                              <option key={idx} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </Form.Select>
                        ) : (
                          <Form.Control
                            type={item.type || "text"}
                            name={item.name}
                            value={data[item.name] || ""}
                            onChange={handleChange}
                          />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Form>
        
      
    </>
  );
};

export default FinalTwo;
