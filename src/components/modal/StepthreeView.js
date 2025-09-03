import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button, Form, Table } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const StepthreeView = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);
  const [bills, setBills] = useState([]);

  const [bankData, setBankData] = useState([]);
  const [data, setData] = useState({
    socio_eco: "",
    bhoomi_type: "",
    bhoomi_typer: "",
    bhoomi_shetr: "",
    curr_amt: "",
    res_type: "",
    rooms: "",
    area: "",
    curr_pri: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    fetchBankData(); // Fetch when modal opens
    fetchBillData();
    fetchVahnData(); // Fetch when modal opens
  };

  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    const form_id = localStorage.getItem("form_id");

    // if (!user_id || !form_id) {
    //   alert("User ID या Form ID नहीं मिला। कृपया लॉगिन करें।");
    //   navigate("/UserLogin");
    //   return;
    // }

    axios
      .get(`https://brjobsedu.com/Nandagora/api2/phase3b/update/${user_id}/`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error("डेटा लोड करने में त्रुटि हुई:", err);
        alert("डेटा लोड करने में त्रुटि हुई");
      });
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user_id = localStorage.getItem("user_id");

    if (!user_id) {
      alert("User ID नहीं मिला। कृपया लॉगिन करें।");
      navigate("/UserLogin");
      return;
    }

    axios
      .put(`https://brjobsedu.com/Nandagora/api2/phase3b/update/${user_id}/`, data)
      .then((res) => {
        alert("डेटा सफलतापूर्वक अपडेट हो गया।");
        setData(res.data);
      })
      .catch((err) => {
        console.error("Error updating data:", err);
        alert("डेटा अपडेट करने में त्रुटि हुई");
      });
  };

  const fetchBankData = async () => {
    const user_id = localStorage.getItem("user_id");

    try {
      const response = await axios.get(
        `https://brjobsedu.com/Nandagora/api2/phase3A/update/${user_id}`
      );
      const filtered = response.data.filter(
        (item) => item.type === "bank_details"
      );
      setBankData(filtered);
    } catch (error) {
      console.error("Error fetching bank data:", error);
    }
  };

  const handleBankChange = (e, index) => {
    const { name, value } = e.target;
    const updated = [...bankData];
    updated[index][name] = value;
    setBankData(updated);
  };

  const handleBankUpdateAll = async () => {
    const user_id = localStorage.getItem("user_id");

    if (!user_id || !Array.isArray(bankData) || bankData.length === 0) {
      alert("उपयोगकर्ता ID या बैंक डेटा उपलब्ध नहीं है।");
      return;
    }

    try {
      const updateRequests = bankData
        .map((item) => {
          // Optional: Validate required fields before making request
          if (!item.det1 || !item.det2 || !item.det3 || !item.det4) {
            console.warn("Missing required details in item:", item);
            return null;
          }

          const det1 = item.det1;
          const det2 = item.det2;
          const det3 = item.det3;
          const det4 = item.det4;

          return axios.put(
            `https://brjobsedu.com/Nandagora/api2/phase3A/update/${user_id}/`,
            {
              user: localStorage.getItem("user_id"),
              adhar_no: "3675673464",
              kanya_name: "deepsss",
              district: "dehradun",
              project: "chakarata",
              det1: det1,
              det2: det2,
              det3: det3,
              // det4: parseFloat(item.det4),
              det4: det4,

              type: "bank_type",
            }
          );
        })
        .filter(Boolean); // remove any nulls due to invalid data

      // await Promise.all(updateRequests);
      console.log("data return", updateRequests);
      alert("सभी बैंक विवरण सफलतापूर्वक अपडेट हो गए।");
    } catch (err) {
      if (err.response) {
        // Server responded with a status outside 2xx
        console.error("बैंक विवरण अपडेट त्रुटि:", err.response.data);
      } else if (err.request) {
        // Request was made but no response received
        console.error("सर्वर से कोई उत्तर नहीं मिला:", err.request);
      } else {
        // Something else (like setting up the request)
        console.error("अनपेक्षित त्रुटि:", err.message);
      }
    }
  };

  const fetchVahnData = async () => {
    const user_id = localStorage.getItem("user_id");

    try {
      const response = await axios.get(
        `https://brjobsedu.com/Nandagora/api2/Nandavahanupdateview/${user_id}`
      );
      setVehicles(response.data); // remove any type filter unless required
    } catch (error) {
      console.error("Error fetching vehicle data:", error);
    }
  };

  const handlevahnChange = (e, index) => {
    const { name, value } = e.target;
    const updated = [...vehicles];
    updated[index][name] = value;
    setVehicles(updated);
  };

  const handleVahnUpdateAll = async () => {
    const user_id = localStorage.getItem("user_id");

    if (!user_id || !Array.isArray(vehicles) || vehicles.length === 0) {
      alert("उपयोगकर्ता ID या बैंक डेटा उपलब्ध नहीं है।");
      return;
    }

    try {
      const updateRequests = vehicles
        .map((item) => {
          // Optional: Validate required fields before making request
          if (
            !item.vec_model ||
            !item.vec_number ||
            !item.vec_amt ||
            !item.vec_other
          ) {
            console.warn("Missing required details in item:", item);
            return null;
          }

          const vec_model = item.vec_model;
          const vec_number = item.vec_number;
          const vec_amt = item.vec_amt;
          const vec_other = item.vec_other;

          return axios.put(
            `https://brjobsedu.com/Nandagora/api2/Nandavahanupdateview/${user_id}/`,
            {
              user: localStorage.getItem("user_id"),
              adhar_no: "3675673464",
              kanya_name: "deepsss",
              district: "dehradun",
              project: "chakarata",
              vec_model: vec_model,
              vec_number: vec_number,
              vec_amt: vec_amt,
              vec_other: vec_other,
            }
          );
        })
        .filter(Boolean); // remove any nulls due to invalid data

      // await Promise.all(updateRequests);
      console.log("data return", updateRequests);
      alert("सभी vahan विवरण सफलतापूर्वक अपडेट हो गए।");
    } catch (err) {
      if (err.response) {
        // Server responded with a status outside 2xx
        console.error("बैंक विवरण अपडेट त्रुटि:", err.response.data);
      } else if (err.request) {
        // Request was made but no response received
        console.error("सर्वर से कोई उत्तर नहीं मिला:", err.request);
      } else {
        // Something else (like setting up the request)
        console.error("अनपेक्षित त्रुटि:", err.message);
      }
    }
  };

  const fetchBillData = async () => {
    const user_id = localStorage.getItem("user_id");

    try {
      const response = await axios.get(
        `https://brjobsedu.com/Nandagora/api2/Nandabillsupdate/${user_id}`
      );
      console.log("bill data", response.data);
      setBills(response.data);
    } catch (error) {
      console.error("बिजली बिल डेटा लाने में त्रुटि:", error);
    }
  };
  const handleBillChange = (e, index) => {
    const { name, value } = e.target;
    const updated = [...bills];
    updated[index][name] = value;
    setBills(updated);
  };

  const handleUpdateBill = async () => {
    const user_id = localStorage.getItem("user_id");

    if (!user_id || !Array.isArray(bills) || bills.length === 0) {
      alert("उपयोगकर्ता ID या bills डेटा उपलब्ध नहीं है।");
      return;
    }

    try {
      for (const bill of bills) {
        await axios.put(
          `https://brjobsedu.com/Nandagora/api2/Nandabillsupdate/${user_id}/`,
          {
            user: localStorage.getItem("user_id"),
            adhar_no: "3675673464",
            kanya_name: "deepsss",
            district: "dehradun",
            project: "chakarata",
            type: bill.type,
            acno: bill.acno,
            date: bill.date,
            amount: bill.amount,
          }
        );
      }

      alert("सभी बिल सफलतापूर्वक अपडेट हुए।");
    } catch (error) {
      console.error("बिल अपडेट करने में त्रुटि:", error.response || error);
      alert("कुछ बिल अपडेट नहीं हुए।");
    }
  };

  // Call it when modal opens

  return (
    <>
      <div onClick={handleShow} style={{ cursor: "pointer" }}>
        <h3>
          <FaCheck /> Step 3: सदस्यों / दस्तावेज़ों की जानकारी (click to view)
        </h3>
      </div>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>

        </Modal.Header>
        <Modal.Body className="nd-step1">
          <h3 className="mt-4">Step 3 : चल / अचल सम्पत्ति का विवरण</h3>

          <Form onSubmit={handleSubmit}>
            <Table bordered responsive>
              <tbody className="nd-born-thead">
                <tr>
                  <td>सामाजिक आर्थिक जाति जनगणना में परिवार की स्थिति:</td>
                  <td>{data.socio_eco}</td>
                  <td>
                    <Form.Select
                      name="socio_eco"
                      value={data.socio_eco}
                      onChange={handleChange}
                      required
                    >
                      <option value="">प्रकार चुने</option>
                      <option value="स्वतः सम्मिलित">स्वतः सम्मिलित</option>
                      <option value="सम्मिलित नही">सम्मिलित नही</option>
                    </Form.Select>
                  </td>
                </tr>
                <tr>
                  <td>परिवार के पास भूमि का प्रकार:</td>
                  <td>{data.bhoomi_type}</td>
                  <td>
                    <Form.Select
                      name="bhoomi_type"
                      value={data.bhoomi_type}
                      onChange={handleChange}
                      required
                    >
                      <option value="">भूमि प्रकार चुने</option>
                      <option value="पैतृक भूमि">पैतृक भूमि</option>
                      <option value="क्रय भूमि">क्रय भूमि</option>
                      <option value="पट्टा/Lease">पट्टा/Lease</option>
                      <option value="भूमिहीन">भूमिहीन</option>
                    </Form.Select>
                  </td>
                </tr>
                <tr>
                  <td>आवासीय भूमि का प्रकार:</td>
                  <td>{data.bhoomi_typer}</td>
                  <td>
                    <Form.Select
                      name="bhoomi_typer"
                      value={data.bhoomi_typer}
                      onChange={handleChange}
                      required
                    >
                      <option value="">आवासीय भूमि प्रकार चुने</option>
                      <option value="रजिस्ट्री">रजिस्ट्री</option>
                      <option value="पट्टे की भूमि">पट्टे की भूमि</option>
                      <option value="किराया">किराया</option>
                    </Form.Select>
                  </td>
                </tr>
                <tr>
                  <td>भूमि का क्षेत्रफल:</td>
                  <td>
                    {data.bhoomi_shetr} <small>(हेक्टेयर में)</small>
                  </td>
                  <td>
                    <Form.Control
                      name="bhoomi_shetr"
                      value={data.bhoomi_shetr}
                      onChange={handleChange}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>वर्तमान मूल्य:</td>
                  <td>{data.curr_amt}</td>
                  <td>
                    <Form.Control
                      name="curr_amt"
                      value={data.curr_amt}
                      onChange={handleChange}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>आवास का प्रकार:</td>
                  <td>{data.res_type}</td>
                  <td>
                    <Form.Select
                      name="res_type"
                      value={data.res_type}
                      onChange={handleChange}
                      required
                    >
                      <option value="">आवास प्रकार चुने</option>
                      <option value="पक्का">पक्का</option>
                      <option value="कच्चा">कच्चा</option>
                      <option value="मिश्रित">मिश्रित</option>
                    </Form.Select>
                  </td>
                </tr>
                <tr>
                  <td>कमरों की संख्या:</td>
                  <td>{data.rooms}</td>
                  <td>
                    <Form.Control
                      type="number"
                      name="rooms"
                      min="0"
                      value={data.rooms}
                      onChange={handleChange}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>क्षेत्रफल:</td>
                  <td>
                    {data.area || "0"} <small>(वर्ग मीटर में)</small>
                  </td>
                  <td>
                    <Form.Control
                      name="area"
                      value={data.area}
                      onChange={handleChange}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>वर्तमान कीमत:</td>
                  <td>{data.curr_pri || "0"}</td>
                  <td>
                    <Form.Control
                      name="curr_pri"
                      value={data.curr_pri}
                      onChange={handleChange}
                      required
                    />
                  </td>
                </tr>
              </tbody>
            </Table>

             <div className=" nd-update-detials">
              <Button type="submit" className="nd-primary-dawnload">
                Update Details
              </Button>
            </div>
          </Form>
<div className="nd-step1">
          <h3 className="mt-4">परिवार के सदस्यों के बैंक खातों का विवरण:</h3>
          </div>
          <Table bordered responsive>
            <thead className="nd-born-thead">
              <tr>
                <th>क्र.सं.</th>
                <th>सदस्य का नाम</th>
                <th>बैंक का नाम</th>
                <th>खाता संख्या</th>
                <th>कुल जमा राशि</th>
              </tr>
            </thead>
            <tbody>
              {bankData.length === 0 ? (
                <tr>
                  <td colSpan="5">कोई डेटा उपलब्ध नहीं है</td>
                </tr>
              ) : (
                bankData.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>
                      <Form.Control
                        name="det1"
                        value={item.det1}
                        onChange={(e) => handleBankChange(e, index)}
                      />
                    </td>
                    <td>
                      <Form.Control
                        name="det2"
                        value={item.det2}
                        onChange={(e) => handleBankChange(e, index)}
                      />
                    </td>
                    <td>
                      <Form.Control
                        name="det3"
                        value={item.det3}
                        onChange={(e) => handleBankChange(e, index)}
                      />
                    </td>
                    <td>
                      <Form.Control
                        name="det4"
                        value={item.det4}
                        onChange={(e) => handleBankChange(e, index)}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
          {vehicles.length > 0 && (
            <div className=" nd-update-detials">
              <Button className="nd-primary-dawnload" onClick={handleBankUpdateAll}>
                Update Bank Records
              </Button>
            </div>
          
          )}
          <div className="nd-step1">
          <h3 className="mt-4">Vahan का विवरण:</h3>
          </div>
          <Table bordered responsive>
            <thead className="nd-born-thead">
              <tr>
                <th>क्र.सं.</th>
                <th>vahn modal</th>
                <th>numver vahan</th>
                <th>amount</th>
                <th>other vivarn</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.length === 0 ? (
                <tr>
                  <td colSpan="5">कोई डेटा उपलब्ध नहीं है</td>
                </tr>
              ) : (
                vehicles.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>
                      <Form.Control
                        name="vec_model"
                        value={item.vec_model}
                        onChange={(e) => handlevahnChange(e, index)}
                      />
                    </td>
                    <td>
                      <Form.Control
                        name="vec_number"
                        value={item.vec_number}
                        onChange={(e) => handlevahnChange(e, index)}
                      />
                    </td>
                    <td>
                      <Form.Control
                        name="vec_amt"
                        value={item.vec_amt}
                        onChange={(e) => handlevahnChange(e, index)}
                      />
                    </td>
                    <td>
                      <Form.Control
                        name="vec_other"
                        value={item.vec_other}
                        onChange={(e) => handlevahnChange(e, index)}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
          {vehicles.length > 0 && (
              <div className=" nd-update-detials">
              <Button type="submit" className="nd-primary-dawnload" onClick={handleVahnUpdateAll}>
                Update  vahn Records
              </Button>
            </div>
            
          )}
<div className="nd-step1">
          <h3 className="mt-4">
            परिवार के विगत 03 बार के बिजली के बिलों का विवरण :-
          </h3>
</div>
          <Table bordered responsive>
            <thead className="nd-born-thead">
              <tr>
                <th>क्र0सं0</th>
                <th>बिल का प्रकार</th>
                <th>खाता संख्या</th>
                <th>जमा तिथि</th>
                <th>धनराशि</th>
                <th>कार्य</th>
              </tr>
            </thead>
            <tbody>
              {bills.length === 0 ? (
                <tr>
                  <td colSpan="6">कोई बिल डेटा उपलब्ध नहीं है</td>
                </tr>
              ) : (
                bills.map((bill, index) => (
                  <tr key={bill.id}>
                    <td>{index + 1}</td>
                    <td>
                      <Form.Control
                        name="type"
                        value={bill.type}
                        onChange={(e) => handleBillChange(e, index)}
                      />
                    </td>
                    <td>
                      <Form.Control
                        name="acno"
                        value={bill.acno}
                        onChange={(e) => handleBillChange(e, index)}
                      />
                    </td>
                    <td>
                      <Form.Control
                        name="date"
                        value={bill.date}
                        onChange={(e) => handleBillChange(e, index)}
                        type="date"
                      />
                    </td>
                    <td>
                      <Form.Control
                        name="amount"
                        value={bill.amount}
                        onChange={(e) => handleBillChange(e, index)}
                      />
                    </td>
                    <td></td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
          {bills.length > 0 && (
            <div className=" nd-update-detials mt-3">
            <Button className="nd-primary-dawnload" onClick={handleUpdateBill}>
              अपडेट करें
            </Button>
            </div>
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

export default StepthreeView;
