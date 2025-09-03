import React from "react";
import "../../../../assets/css/DepartmentContact.css";
import { RiAlertLine } from "react-icons/ri";
import "@fortawesome/fontawesome-free"; // Font Awesome library
import DashHeader from "../../DashHeader";
import "../../../../assets/css/NandaStepOne.css";
import "../../../../assets/css/HomePage.css";

import Footer from "../../../footer/Footer";
import InnerNavigation from "../../InnerNavigation";
import { Row, Col } from "react-bootstrap";
import NandaYojana from "../../NandaYojana";
const DepartmentContact = () => {

  return (
    <>
      <div>
        {/* Header */}
        <DashHeader />
        <div className="main-container">
          <InnerNavigation />

          {/* Main Container */}
          <div className="main">
            <NandaYojana />
            <div className="box-container">

            <div class="nd-step1"><h3>Department Contact Information</h3></div>

            <Row className="nd-dep-main">
            <Col lg={4} md={4} sm={12} className="contact-card md-3">
            <div className="">
            <div id="div2">
       
        <div id="msgErreur">
        Department
        </div>
       <div className="nd-Dep-details">
       <div className=""><span className="nd-Dep-txt">Technical Helpline:</span> 76681 51041</div></div>
    </div>
            </div>
            </Col>
            <Col lg={4} md={4} sm={12} className="contact-card md-3">
            <div className="">
            <div id="div2">
       
        <div id="msgErreur">
        District Nodal Officer
        </div>
       <div className="nd-Dep-details">
       <div className=""><span className="nd-Dep-txt">Trilok Rawat:</span> 9557502806</div></div>
    </div>
            </div>
            </Col>
            <Col lg={4} md={4} sm={12} className="contact-card md-3">
            <div className="">
            <div id="div2">
       
        <div id="msgErreur">
        District Nodal Officer
        </div>
       <div className="nd-Dep-details">
       <div className=""><span className="nd-Dep-txt">Dhannanjai Nautiyal:</span> 7417793586</div></div>
    </div>
            </div>
            </Col>
            <Col lg={4} md={4} sm={12} className="contact-card md-3">
            <div className="">
            <div id="div2">
       
        <div id="msgErreur">
        Supervisor Incharge
        </div>
       <div className="nd-Dep-details">
       <div className=""><span className="nd-Dep-txt">Usha Shriyal:</span> 8218685356</div></div>
    </div>
            </div>
            </Col>
            <Col lg={4} md={4} sm={12} className="contact-card md-3">
            <div className="">
            <div id="div2">
       
        <div id="msgErreur">
        Supervisor Incharge
        </div>
       <div className="nd-Dep-details">
       <div className=""><span className="nd-Dep-txt">Vimla Devi:</span> 9410556680</div></div>
    </div>
            </div>
            </Col>
            <div>
            <div className="text-center nd-return-txt">To Return Form for Updation contact Supervisor Incharge</div>
            </div>
             <div className="text-center mt-3 nd-notic"><RiAlertLine />विभागीय कर्मियों से कॉल के दौरान अनुशासनहीनता किये जाने पर वैधानिक कार्यवाही की जाएगी |
                 Legal action will be taken if there is indiscipline during the call.</div>
            </Row>
         
            </div>
            <div>
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DepartmentContact;
