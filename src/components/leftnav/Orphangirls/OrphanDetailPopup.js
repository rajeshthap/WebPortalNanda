import React, { useState } from "react";
import { Button,Form } from "react-bootstrap";
import {  useNavigate } from "react-router-dom";
import axios from "axios";

function OrphanDetailPopup() {
 const navigate = useNavigate();
const [isChecked, setIsChecked] = useState(false);

 const handleSubmit = () => {
   if (!isChecked) {
      alert("Please check the box before continuing.");
      return;
    }
    navigate("/OrphanStepOne");
    
  };

    const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };
  
  const handleProceed = async () => {
    const userId = localStorage.getItem("user_id");
    if (!userId) return;

    try {
      // Step 1
      const step1Res = await axios.get(
        `https://brjobsedu.com/Nandagora/api4/step_one_updata__get/${userId}/`
      );
      const step1Data = step1Res.data;

      // Step 2
      let step2Completed = false;
      try {
        const step2Res = await axios.get(
          `https://brjobsedu.com/Nandagora/api4/phase2b/${userId}/`
        );
        step2Completed = !!step2Res.data.fath_pan;
      } catch (err) {
        if (!(err.response && err.response.status === 404)) throw err;
      }

      // Navigation logic
      if (!step1Data.form_id || !step1Data.user) {
        navigate("/OrphanStepOne");
      } else if (!step2Completed) {
        navigate("/OrphanStepTwo");
      } 
    } catch (err) {
      console.error("Navigation check failed:", err);
      navigate("/OrphanStepOne");
    }
  };

  return (
    <div>
      <Button variant="primary" className="nd-chek-box"  onClick={handleProceed}>
      <Form.Check
                type="checkbox"
                id="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
              
              />  <div onClick={handleSubmit}>आवेदन जारी रखें </div>
      </Button>
    </div>
  );
}


export default OrphanDetailPopup;
