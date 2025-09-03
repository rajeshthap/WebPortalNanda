import React, { useState, useEffect } from "react";
import { Table, Form, Button, Modal } from "react-bootstrap";
import { FaCheck } from "react-icons/fa6";
import axios from "axios";

const TwelfthStepThreeView = () => {
  const [show, setShow] = useState(false);

  const [bankOptions, setBankOptions] = useState([]);

  useEffect(() => {
    const fetchBankList = async () => {
      try {
        const res = await axios.get(
          "https://brjobsedu.com/Nandagora/api2/Bankdetails/"
        );
        if (res.data?.length) setBankOptions(res.data); // store array of objects
      } catch (err) {
        console.error(
          "Error fetching bank list:",
          err.response?.data || err.message
        );
      }
    };

    fetchBankList();
  }, []);

  // Static fields
  const [staticData, setStaticData] = useState({
    socio_eco: "",
    bhoomi_type: "",
    bhoomi_typer: "",
    bhoomi_shetr: "",
    curr_amt: "",
    res_type: "",
    rooms: "",
    area: "",
    curr_pri: "",
    adhar_no: "",
    girl_name: "",
    district: "",
    project: "",
  });

  // Rows
  const [bankRows, setBankRows] = useState([
    { det1: "", det2: "", det3: "", det4: "" },
  ]);
  const [vehicleRows, setVehicleRows] = useState([
    {
      vec_model: "",
      vec_number: "",
      vec_amt: "",
      vec_other: "",
      adhar_no: "",
      girl_name: "",
      district: "",
      project: "",
    },
  ]);
  const [electricityRows, setElectricityRows] = useState([
    { acno: "", date: "", amount: "" },
  ]);
  const [waterBillRow, setWaterBillRow] = useState({
    acno: "",
    date: "",
    amount: "",
  });

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  // handle changes
  const handleStaticChange = (field, value) =>
    setStaticData((prev) => ({ ...prev, [field]: value }));
  const handleBankChange = (index, field, value) =>
    setBankRows((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  const handleVehicleChange = (index, field, value) =>
    setVehicleRows((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  const handleElectricityChange = (index, field, value) =>
    setElectricityRows((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  const handleWaterBillChange = (field, value) =>
    setWaterBillRow((prev) => ({ ...prev, [field]: value }));

  //  add/delete
  const addBankRow = () =>
    setBankRows([...bankRows, { det1: "", det2: "", det3: "", det4: "" }]);
  const deleteBankRow = (index) =>
    setBankRows(bankRows.filter((_, i) => i !== index));

  const addVehicleRow = () =>
    setVehicleRows([
      ...vehicleRows,
      {
        vec_model: "",
        vec_number: "",
        vec_amt: "",
        vec_other: "",
        adhar_no: "",
        girl_name: "",
        district: "",
        project: "",
      },
    ]);
  const deleteVehicleRow = (index) =>
    setVehicleRows(vehicleRows.filter((_, i) => i !== index));

  // fetch existing data
  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    if (!user_id) return;

    const fetchStep3a = async () => {
      try {
        const res = await axios.get(
          `https://brjobsedu.com/Nandagora/api4/step3a/${user_id}/`
        );
        if (res.data) setStaticData(res.data);
      } catch (err) {
        console.error(
          "Error fetching Step3a:",
          err.response?.data || err.message
        );
      }
    };

    const fetchStep3b = async () => {
      try {
        const res = await axios.get(
          `https://brjobsedu.com/Nandagora/api4/step3b/${user_id}/`
        );
        if (res.data?.length) setBankRows(res.data);
      } catch (err) {
        console.error(
          "Error fetching Step3b:",
          err.response?.data || err.message
        );
      }
    };

    const fetchStep3Vehicle = async () => {
      try {
        const res = await axios.get(
          `https://brjobsedu.com/Nandagora/api4/stepthreevahanupadte/${user_id}`
        );
        if (res.data?.length)
          setVehicleRows(
            res.data.map((v) => ({
              ...v,
              adhar_no: v.adhar_no || "",
              girl_name: v.girl_name || "",
              district: v.district || "",
              project: v.project || "",
            }))
          );
      } catch (err) {
        console.error(
          "Error fetching Step3 Vehicle:",
          err.response?.data || err.message
        );
      }
    };

    const fetchStep3Bills = async () => {
      try {
        const res = await axios.get(
          `https://brjobsedu.com/Nandagora/api4/Bills_update/${user_id}`
        );
        if (res.data?.length) {
          const electricityData = res.data.filter(
            (item) => item.type === "electric"
          );
          const waterData = res.data.find((item) => item.type === "water");
          if (electricityData.length) setElectricityRows(electricityData);
          if (waterData) setWaterBillRow(waterData);
        }
      } catch (err) {
        console.error(
          "Error fetching Step3 Bills:",
          err.response?.data || err.message
        );
      }
    };

    fetchStep3a();
    fetchStep3b();
    fetchStep3Vehicle();
    fetchStep3Bills();
  }, []);

  // 🔹 Update all data
  const updateAll = async () => {
    const user_id = localStorage.getItem("user_id");
    if (!user_id) return alert("User ID not found!");

    try {
      // Step3a (static fields)
      await axios.put(
        `https://brjobsedu.com/Nandagora/api4/step3aupdate/${user_id}/`,
        staticData
      );

      // Step3b (Bank) - send entire array in one PUT
      const bankPayload = bankRows.map((row) => ({
        ...row,
        user: user_id,
        type: "account",
        adhar_no: row.adhar_no || staticData.adhar_no,
        girl_name: row.girl_name || staticData.girl_name,
        district: row.district || staticData.district,
        project: row.project || staticData.project,
      }));
      await axios.put(
        `https://brjobsedu.com/Nandagora/api4/step3bupate/${user_id}`,
        bankPayload
      );

      // Vehicles - send entire array in one PUT
      const vehiclePayload = vehicleRows.map((row) => ({
        ...row,
        user: user_id,
        adhar_no: row.adhar_no || staticData.adhar_no,
        girl_name: row.girl_name || staticData.girl_name,
        district: row.district || staticData.district,
        project: row.project || staticData.project,
      }));
      await axios.put(
        `https://brjobsedu.com/Nandagora/api4/stepthreevahanupadte/${user_id}`,
        vehiclePayload
      );

      // Combine electricity rows and water row into one payload
      const billsPayload = [
        ...electricityRows.map((row) => ({
          ...row,
          user: user_id,
          type: "electric",
          adhar_no: row.adhar_no || staticData.adhar_no,
          girl_name: row.girl_name || staticData.girl_name,
          district: row.district || staticData.district,
          project: row.project || staticData.project,
        })),
        {
          ...waterBillRow,
          user: user_id,
          type: "water",
          adhar_no: waterBillRow.adhar_no || staticData.adhar_no,
          girl_name: waterBillRow.girl_name || staticData.girl_name,
          district: waterBillRow.district || staticData.district,
          project: waterBillRow.project || staticData.project,
        },
      ];

      // Single PUT for all bills
      await axios.put(
        `https://brjobsedu.com/Nandagora/api4/Bills_update/${user_id}`,
        billsPayload
      );

      alert("सभी जानकारी सफलतापूर्वक अपडेट हो गई!");
      window.location.href = "/TwelfthStepFour";
    } catch (err) {
      console.error("Update failed:", err.response?.data || err.message);
      alert("अपडेट असफल रहा, कृपया कंसोल देखें।");
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
          <FaCheck /> Step 3 : अतिरिक्त जानकारी (Click to View)
        </h3>
      </div>

      <Modal show={show} onHide={handleClose} size="lg" scrollable>
        <Modal.Header closeButton>
          <Modal.Title>Step 3 : विवरण</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Static Fields */}
            <h5 className="text-center">सामाजिक और भूमि विवरण</h5>
            <Table bordered responsive className="nd-born-table">
              <tbody>
                <tr>
                  <td>
                    {" "}
                    1. सामाजिक आर्थिक जाति जनगणना में परिवार की स्थिति का विवरण
                  </td>
                  <td>
                    <div>
                      <strong>प्रकार चुने</strong>
                      <Form.Select
                        value={staticData.socio_eco}
                        onChange={(e) =>
                          handleStaticChange("socio_eco", e.target.value)
                        }
                      >
                        <option value="स्वतः सम्मिलित">स्वतः सम्मिलित</option>
                        <option value="सम्मिलित नही">सम्मिलित नही</option>
                      </Form.Select>
                    </div>
                  </td>
                </tr>

                {/* Row 2 */}
                <tr>
                  <td>2. वालिका के परिवार के पास उपलब्ध भूमि का प्रकार</td>
                  <td>
                    <div>
                      <strong>भूमि का प्रकार:</strong>
                      <Form.Select
                        value={staticData.bhoomi_type}
                        onChange={(e) =>
                          handleStaticChange("bhoomi_type", e.target.value)
                        }
                      >
                        <option value="">भूमि प्रकार चुने</option>
                        <option value="पैतृक भूमि">पैतृक भूमि</option>
                        <option value="क्रय भूमि">क्रय भूमि</option>
                        <option value="पट्टा/Lease">पट्टा/Lease</option>
                        <option value="भूमिहीन">भूमिहीन</option>
                      </Form.Select>
                    </div>
                  </td>
                </tr>

                {/* Row 3 */}
                <tr>
                  <td>
                    3. वालिका के परिवार के पास आवासीय उपलब्ध भूमि का प्रकार
                  </td>
                  <td>
                    <div>
                      <strong>सिंचाई का साधन:</strong>
                      <Form.Select
                        value={staticData.bhoomi_typer}
                        onChange={(e) =>
                          handleStaticChange("bhoomi_typer", e.target.value)
                        }
                      >
                        <option value="">आवासीय भूमि प्रकार चुने </option>
                        <option value="पैतृक भूमि">पैतृक भूमि</option>
                        <option value="रजिस्ट्री">रजिस्ट्री</option>
                        <option value="पट्टे की भूमि">पट्टे की भूमि</option>
                        <option value="किराया">किराया</option>
                      </Form.Select>
                    </div>
                  </td>
                </tr>

                {/* Row 4 */}
                <tr>
                  <td>
                    {" "}
                    4. बालिका के परिवार के पास उपलब्ध कुल (कृषि/आवासीय) भूमि
                  </td>
                  <td>
                    <div className="mb-2">
                      <strong>i.) भूमि का क्षेत्रफल (हेक्टेयर में)</strong>
                      <Form.Control
                        type="number"
                        placeholder="भूमि क्षेत्रफल"
                        value={staticData.bhoomi_shetr}
                        onChange={(e) =>
                          handleStaticChange("bhoomi_shetr", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <strong>ii.) वर्तमान मूल्य</strong>
                      <Form.Control
                        type="number"
                        placeholder="वर्तमान मूल्य (₹)"
                        value={staticData.curr_amt}
                        onChange={(e) =>
                          handleStaticChange("curr_amt", e.target.value)
                        }
                      />
                    </div>
                  </td>
                </tr>

                {/* Row 5 */}
                <tr>
                  <td>5. आवास का विवरण</td>
                  <td>
                    <div className="mb-2">
                      <strong>आवासीय भूमि प्रकार:</strong>
                      <Form.Select
                        value={staticData.res_type}
                        onChange={(e) =>
                          handleStaticChange("res_type", e.target.value)
                        }
                      >
                        <option value="">आवासीय भूमि प्रकार चुने</option>
                        <option value="कच्चा">कच्चा</option>
                        <option value="पक्का">पक्का</option>
                      </Form.Select>
                    </div>

                    <div className="mb-2">
                      <strong>कक्षों की संख्या:</strong>
                      <Form.Control
                        type="number"
                        placeholder="कक्षों की संख्या"
                        value={staticData.rooms}
                        onChange={(e) =>
                          handleStaticChange("rooms", e.target.value)
                        }
                      />
                    </div>

                    <div className="mb-2">
                      <strong>क्षेत्रफल (हेक्टेयर में):</strong>
                      <Form.Control
                        type="number"
                        placeholder="क्षेत्रफल हेक्टेयर में"
                        value={staticData.area}
                        onChange={(e) =>
                          handleStaticChange("area", e.target.value)
                        }
                      />
                    </div>

                    <div>
                      <strong>वर्तमान मूल्य (₹):</strong>
                      <Form.Control
                        type="number"
                        placeholder="वर्तमान मूल्य (₹)"
                        value={staticData.curr_pri}
                        onChange={(e) =>
                          handleStaticChange("curr_pri", e.target.value)
                        }
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </Table>

            <h5 className="text-center mt-3">बैंक विवरण</h5>
            <Table bordered responsive className="nd-born-table">
              <thead className="nd-born-thead">
                <tr>
                  <th>क्रम सं०</th>
                  <th>सदस्य का नाम</th>
                  <th>बैंक का नाम</th>
                  <th>खाता संख्या</th>
                  <th>कुल जमा धनराशि (₹)</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {bankRows.map((row, index) => {
                  const optionsWithPrev = row.det2
                    ? bankOptions.some((b) => b.bank_name === row.det2)
                      ? bankOptions
                      : [...bankOptions, { id: "old", bank_name: row.det2 }]
                    : bankOptions;

                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <Form.Control
                          value={row.det1}
                          onChange={(e) =>
                            handleBankChange(index, "det1", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <Form.Select
                          value={row.det2 || ""}
                          onChange={(e) =>
                            handleBankChange(index, "det2", e.target.value)
                          }
                        >
                          {optionsWithPrev.map((bank) => (
                            <option key={bank.id} value={bank.bank_name}>
                              {bank.bank_name}
                            </option>
                          ))}
                        </Form.Select>
                      </td>
                      <td>
                        <Form.Control
                          value={row.det3}
                          onChange={(e) =>
                            handleBankChange(index, "det3", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <Form.Control
                          value={row.det4}
                          onChange={(e) =>
                            handleBankChange(index, "det4", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => deleteBankRow(index)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>

            {/* Add Bank Row Button */}
            <Button className="nd-born-thead" onClick={addBankRow}>
              + Add Row
            </Button>

            {/* Vehicle Table */}
            <h5 className="text-center mt-3">वाहन विवरण</h5>
            <Table bordered responsive className="nd-born-table">
              <thead className="nd-born-thead">
                <tr>
                  <th>क्रम सं०</th>
                  <th>वाहन का मेक एंड मॉडल</th>
                  <th>वाहन की संख्या</th>
                  <th>अनुमानित मूल्य</th>
                  <th>अन्य विवरण</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {vehicleRows.map((row, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <Form.Control
                        value={row.vec_model}
                        onChange={(e) =>
                          handleVehicleChange(
                            index,
                            "vec_model",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td>
                      <Form.Control
                        value={row.vec_number}
                        onChange={(e) =>
                          handleVehicleChange(
                            index,
                            "vec_number",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td>
                      <Form.Control
                        value={row.vec_amt}
                        onChange={(e) =>
                          handleVehicleChange(index, "vec_amt", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <Form.Control
                        value={row.vec_other}
                        onChange={(e) =>
                          handleVehicleChange(
                            index,
                            "vec_other",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => deleteVehicleRow(index)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Button className="nd-born-thead" onClick={addVehicleRow}>
              + Add Row
            </Button>

            {/* Electricity & Water */}
            <h5 className="text-center mt-3">बिजली/पानी बिल विवरण</h5>
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
                {electricityRows.map((row, index) => (
                  <tr key={`elec-${index}`}>
                    <td>{index + 1}</td>
                    <td>बिजली</td>
                    <td>
                      <Form.Control
                        value={row.acno}
                        onChange={(e) =>
                          handleElectricityChange(index, "acno", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="date"
                        value={row.date}
                        onChange={(e) =>
                          handleElectricityChange(index, "date", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <Form.Control
                        type={isNaN(row.amount) ? "text" : "number"}
                        value={row.amount}
                        onChange={(e) =>
                          handleElectricityChange(
                            index,
                            "amount",
                            e.target.value
                          )
                        }
                      />
                    </td>
                  </tr>
                ))}
                <tr>
                  <td>1</td>
                  <td>पानी</td>
                  <td>
                    <Form.Control
                      value={waterBillRow.acno}
                      onChange={(e) =>
                        handleWaterBillChange("acno", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="date"
                      value={waterBillRow.date}
                      onChange={(e) =>
                        handleWaterBillChange("date", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <Form.Control
                      type={isNaN(waterBillRow.amount) ? "text" : "number"}
                      value={waterBillRow.amount}
                      onChange={(e) =>
                        handleWaterBillChange("amount", e.target.value)
                      }
                    />
                  </td>
                </tr>
              </tbody>
            </Table>

            <div className="text-center mt-3">
              <Button variant="primary" onClick={updateAll}>
                सभी जानकारी अपडेट करें
              </Button>
            </div>
          </Form>
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

export default TwelfthStepThreeView;
