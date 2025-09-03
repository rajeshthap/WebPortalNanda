import React from "react";
import "../../techassets/techcss/TechLeft.css";
import "../../techassets/techcss/TechDashboard.css";
import "../../techassets/techcss/CheckFormstatus.css";
import "@fortawesome/fontawesome-free"; // Font Awesome library
import TechLeftnav from "../leftnavbar/TechLeftnav";
import NandaTech from "./NandaTech";
import TechFooter from "../footer/TechFooter";
const FinalSubmit = () => {
  return (
    <>
      <div>
        {/* Main Container */}
        <div className="main-container">
          {/* Navigation */}
          <TechLeftnav />
          {/* Main Content */}
          <div className="main">
            <NandaTech />
            <div className="box-container">
              Final SuBmit
            </div>
            <div>
              <TechFooter />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FinalSubmit;
