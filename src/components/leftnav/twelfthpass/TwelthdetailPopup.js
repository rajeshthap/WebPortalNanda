import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function TwelthdetailPopup() {
  const navigate = useNavigate();

  // List all required Step 4 fields
  const requiredFilesStep4 = [
    "pp_photo",
    "stu_sign",
    "par_sign",
    "mark10",
    "mark12",
    "stu_adhar",
    "stu_pan",
    "stu_dom",
    "hou_tax",
    "inc_cer",
    "fam_reg",
    "cas_cer",
    "unm_cer",
    "old_ben",
    "gir_pas",
    "fam_pas",
    "fur_edu",
    "sch_doc",
    "aww_doc",
  ];

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
          axios.get(
            `https://brjobsedu.com/Nandagora/api4/stepthreevahanupadte/${userId}`
          ),
          axios.get(
            `https://brjobsedu.com/Nandagora/api4/Bills_update/${userId}`
          ),
        ]);

        const step3a = step3aRes.data;
        const step3b = step3bRes.data;
        const vehicles = vehicleRes.data;
        const bills = billsRes.data;

        step3Completed =
          step3a &&
          Object.keys(step3a).length > 0 &&
          step3b?.length > 0 &&
          vehicles?.length > 0 &&
          bills?.length > 0;
      } catch (err) {
        if (!(err.response && err.response.status === 404)) throw err;
      }

      // Step 4
      let step4Completed = false;
      try {
        const step4Res = await axios.get(
          `https://brjobsedu.com/Nandagora/api4/step4update/${userId}/`
        );
        const step4Data = step4Res.data;

        // Step 4 complete only if all required files exist
        step4Completed = requiredFilesStep4.every(
          (field) => step4Data[field] && step4Data[field] !== ""
        );
      } catch (err) {
        if (!(err.response && err.response.status === 404)) throw err;
      }

      // Navigation logic
      if (!step1Data.form_id || !step1Data.user) {
        navigate("/TwelthStepOne");
      } else if (!step2Completed) {
        navigate("/TwelthStepTwo");
      } else if (!step3Completed) {
        navigate("/TwelthStepThree");
      } else if (!step4Completed) {
        alert("कृपया Step 4 में सभी आवश्यक फ़ाइलें अपलोड करें।");
        navigate("/TwelfthStepFour");
      } else {
        alert("सभी चरण पूरे किए गए हैं। डैशबोर्ड पर जा रहे हैं।");
        navigate("/UserDashboard");
        window.location.reload();
      }
    } catch (err) {
      console.error("Navigation check failed:", err);
      navigate("/TwelthStepOne");
    }
  };

  return (
    <div>
      <Button variant="" className="nd-chek-box mb-3" onClick={handleProceed}>
        आवेदन जारी रखें
      </Button>
    </div>
  );
}

export default TwelthdetailPopup;
