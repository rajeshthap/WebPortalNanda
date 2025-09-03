import { Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // For redirection
import { toast, ToastContainer } from "react-toastify"; // For success message
import React, { useState } from "react";
// import "react-toastify/dist/ReactToastify.css"; // Toastify styles
import DashHeader from "../../DashHeader";
import InnerNavigation from "../../InnerNavigation";
import GirlsBornStep from "./GirlsBornStep";
import Footer from "../../../footer/Footer";
import FinalOne from "./FinalOne";
import FinalTwo from "./FinalTwo";
import FinalThree from "./FinalThree";
import ForthView from "./ForthView";
import "../../../../assets/css/LeftNav.css";
import "../../../../assets/css/NandaStepOne.css";
import "../../../../assets/css/HomePage.css";

const FinalView = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

 
 
  const handleSubmit = () => {
    // Simulate form submission (e.g., API call)
    // Replace this with your actual submission logic
    setTimeout(() => {
      // Show success toast
      toast.success("Form submitted successfully!", {
        position: "top-center",
        autoClose: 2000, // Close after 2 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Redirect to form status page after 2 seconds
      setTimeout(() => {
        navigate("/FormStatus"); // Replace with your actual status page route
      }, 2000);
    }, 500); // Simulate a short delay for submission
  };

  return (
    <div>
      <DashHeader />
      <div className="main-container">
        <InnerNavigation />
        <div className="main">
          <GirlsBornStep />
          <div className="box-container">
            <Row>
              <FinalOne />
              <FinalTwo />
              <FinalThree />
              <div className="nd-step1">
                <h3>Step 4 : दस्तावेज़ अपलोड</h3>
              </div>
              <ForthView />
              <span className="nd-step3-note">
                आवेदन पत्र के साथ सलग्न किए गए प्रमाणित अभिलेखों की प्रतिलिपि का विवरण।
              </span>
              <span className="nd-step-note">
                यदि अपलोड के बाद दस्तावेज़ नहीं दिख रहे हैं, कृपया हटाएं और पुनः अपलोड करें।
              </span>
            </Row>
            <div className="p-2"></div>
            {/* <div className="nd-btnn text-center">
              <Button className="mt-3 nd-primary-btn" onClick={handleSubmit}>
                सबमिट करे
              </Button>
            </div> */}

             <div className="text-center">
      <div className="form-check d-flex justify-content-center mt-3">
        <input
          className="form-check-input"
          type="checkbox"
          id="confirmationCheck"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <label className="form-check-label ms-2" htmlFor="confirmationCheck">
          क्या आप सुनिश्चित हैं कि आप सबमिट करना चाहते हैं?
        </label>
      </div>

      <div className="nd-btnn text-center">
        <Button className="mt-3 nd-primary-btn" onClick={handleSubmit}>
          सबमिट करे
        </Button>
      </div>
    </div>
          </div>
          <Footer />
        </div>
      </div>
      <ToastContainer /> {/* Add ToastContainer for toast notifications */}
    </div>
  );
};

export default FinalView;