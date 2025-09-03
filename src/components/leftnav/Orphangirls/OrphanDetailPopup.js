import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function OrphanDetailPopup() {
 const navigate = useNavigate();

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

      // Step 3
      let step3Completed = false;
      try {
        const [step3aRes, step3bRes, vehicleRes, billsRes] = await Promise.all([
          axios.get(`https://brjobsedu.com/Nandagora/api4/step3a/${userId}/`),
          axios.get(`https://brjobsedu.com/Nandagora/api4/step3b/${userId}/`),
          axios.get(`https://brjobsedu.com/Nandagora/api4/stepthreevahanupadte/${userId}`),
          axios.get(`https://brjobsedu.com/Nandagora/api4/Bills_update/${userId}`)
        ]);

        const step3a = step3aRes.data;
        const step3b = step3bRes.data;
        const vehicles = vehicleRes.data;
        const bills = billsRes.data;

        // Step 3 completed if all sections have data
        step3Completed =
          step3a && Object.keys(step3a).length > 0 &&
          step3b?.length > 0 &&
          vehicles?.length > 0 &&
          bills?.length > 0;
      } catch (err) {
        if (!(err.response && err.response.status === 404)) throw err;
      }

      // Navigation logic
      if (!step1Data.form_id || !step1Data.user) {
        navigate("/OrphanStepOne");
      } else if (!step2Completed) {
        navigate("/OrphanStepTwo");
      } else if (!step3Completed) {
        navigate("/OrphanStepThree");
      } else {
        navigate("/OrphanStepFour");
      }
    } catch (err) {
      console.error("Navigation check failed:", err);
      navigate("/OrphanStepOne");
    }
  };

  return (
    <div>
      <Button variant="primary" onClick={handleProceed}>
        आवेदन जारी रखें
      </Button>
    </div>
  );
}


export default OrphanDetailPopup;
