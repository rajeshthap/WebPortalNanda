import { Routes, Route } from "react-router-dom";
import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-icons-kit";
import "font-awesome/css/font-awesome.min.css";
import { useLocation } from "react-router-dom";
import "../src/custom/style.css";

//-----------User dashboard-----------//
// To use the provider in your App.js or Dashboard component:
import { useAuth } from "../src/components/AuthContext";

// Or, if inside a component to consume the context:
// import { useFormContext } from "../context/FormContext";

import FormView from "./AdminPannel/Sector_Login/sector_dashboard/sectorpraroop2024/FormView";
import UserDashboard from "./components/leftnav/UserDashboard";
import NandaYojana from "./components/leftnav/NandaYojana";
import NavBar from "../src/components/topnav/NavBar";
import Home from "../src/components/pages/Home";
import HomePage from "../src/components/pages/HomePage";
import UserLogin from "./components/pages/UserLogin";
import OfficialWebsite from "../src/components/pages/OfficialWebsite";
import ModalOne from "./components/modal/ModalOne";
import TwelthdetailPopup from "./components/leftnav/twelfthpass/TwelthdetailPopup";
import AdminBanner from "./components/pages/AdminBanner";
import ContactUs from "./components/pages/ContactUs";
import UserOtp from "./components/pages/UserOtp";
import CreatePasswordRegis from "./components/pages/CreatePasswordRegis";
import DashBoard from "./components/leftnav/DashBoard";
import Change from "../src/components/leftnav/NandaGoraForms/RegistrationForms/Change";
import NandaStepOne from "../src/components/leftnav/NandaGoraForms/RegistrationForms/NandaStepOne";
import NandaStepTwo from "../src/components/leftnav/NandaGoraForms/RegistrationForms/NandaStepTwo";
import NandaStepThree from "../src/components/leftnav/NandaGoraForms/RegistrationForms/NandaStepThree";
import NandaStep4th from "../src/components/leftnav/NandaGoraForms/RegistrationForms/NandaStep4th";
import DepartmentContact from "../src/components/leftnav/NandaGoraForms/RegistrationForms/DepartmentContact";
import SubmitRequest from "../src/components/leftnav/NandaGoraForms/RegistrationForms/SubmitRequest";
import FormStatuspending from "./components/leftnav/FormStatuspending";
import SteponeView from "./components/modal/SteponeView";
import TwelfthStepOneVeiw from "./components/leftnav/twelfthpass/TwelfthStepOneView";
import TwelfthFinalView from "./components/leftnav/twelfthpass/TwelfthFinalView";
import SteptwoView from "./components/modal/SteptwoView";
import StepthreeView from "./components/modal/StepthreeView";
import TwelthStepOne from "./components/leftnav/twelfthpass/TwelthStepOne";
import TwelthStepTwo from "./components/leftnav/twelfthpass/TwelthStepTwo";
import TwelthStepThree from "./components/leftnav/twelfthpass/TwelthStepThree";
import TwelthPass from "./components/leftnav/twelfthpass/TwelthPass";
import CreateNewPassword from "./components/pages/CreateNewPassword";
import FinalView from "./components/leftnav/NandaGoraForms/RegistrationForms/FinalView";
// import FormStatus from "../src/components/leftnav/NandaGoraForms/RegistrationForms/FormStatus";
// import Girl12thtutorial from "./components/leftnav/Girl12thtutorial";
import LoginFooter from "./components/footer/LoginFooter";
import InnerNavigation from "./components/leftnav/InnerNavigation";
import GirlsBornStep from "./components/leftnav/NandaGoraForms/RegistrationForms/GirlsBornStep";
import FormStatus from "./components/leftnav/NandaGoraForms/RegistrationForms/FormStatus";
// import Deepika from "./Deepika";
//-----------Technical dashboard-----------//
import EditStepButtonComponent from "./components/leftnav/twelfthpass/EditStepButtonComponent";
import TechLeftnav from "./AdminPannel/technicalcomponents/leftnavbar/TechLeftnav";
import TechnicaldashBoard from "./AdminPannel/technicalcomponents/dashboard/TechnicaldashBoard";
import CheckFormstatus from "./AdminPannel/technicalcomponents/dashboard/CheckFormstatus";
import NandaTech from "./AdminPannel/technicalcomponents/dashboard/NandaTech";
import OurCDPO from "./AdminPannel/technicalcomponents/dashboard/ourstaff/OurCDPO";
import OurSuper from "./AdminPannel/technicalcomponents/dashboard/ourstaff/OurSuper";
import ActivityLog from "./AdminPannel/technicalcomponents/dashboard/Logs/ActivityLog";
import RequestPending from "./AdminPannel/technicalcomponents/dashboard/Logs/RequestPending";
import RequestDone from "./AdminPannel/technicalcomponents/dashboard/Logs/RequestDone";
import RequestAll from "./AdminPannel/technicalcomponents/dashboard/Logs/RequestAll";
import ReparingstepTwo from "./AdminPannel/technicalcomponents/dashboard/ReparingstepTwo";
import FinalSubmit from "./AdminPannel/technicalcomponents/dashboard/FinalSubmit";
import NandaRegistration from "./AdminPannel/technicalcomponents/dashboard/NandaRegistration";
import Final from "./AdminPannel/technicalcomponents/dashboard/FinalsubmitList/Final";
import FinalBorn from "./AdminPannel/technicalcomponents/dashboard/FinalsubmitList/FinalBorn";
//-----------Directorate dashboard-----------//

import DirectorateDashboard from "./AdminPannel/Directorate_login/dashboard/DirectorateDashboard";
import DirecCDPO from "./AdminPannel/Directorate_login/dashboard/direct_ourstaff/DirecCDPO";
import DirecSupervisore from "./AdminPannel/Directorate_login/dashboard/direct_ourstaff/DirecSupervisore";
import TwelthAppli from "./AdminPannel/Directorate_login/dashboard/TwelthAppli";
import DirecNewBorn from "./AdminPannel/Directorate_login/dashboard/DirecNewBorn";
import ProjectWiseAppli from "./AdminPannel/Directorate_login/dashboard/ProjectWiseAppli";
import DistrictWiseAppli from "./AdminPannel/Directorate_login/dashboard/DistrictWiseAppli";
import PraroopFinal2022 from "./AdminPannel/Directorate_login/dashboard/praroopfinal/PraroopFinal2022";
import PraroopFinal2023 from "./AdminPannel/Directorate_login/dashboard/praroopfinal/PraroopFinal2023";
import PraroopFinal2024 from "./AdminPannel/Directorate_login/dashboard/praroopfinal/PraroopFinal2024";
//-----------Directorate Data Table Start-----------//
import DirecTwelthDataTable from "./AdminPannel/Directorate_login/dashboard/direct_data_table/DirecTwelthDataTable";
//-----------Directorate Data Table End-----------//

//-----------Project dashboard-----------//
import ProjectNandaGaura from "./AdminPannel/Project_login/dashboard/ProjectNandaGaura";
import ProjectDashboard from "./AdminPannel/Project_login/dashboard/ProjectDashboard";
import ChangePassword from "./AdminPannel/Project_login/dashboard/ChangePassword";
import ResetSectorpassword from "./AdminPannel/Project_login/dashboard/sector_information/ResetSectorpassword";
import AWCinformation from "./AdminPannel/Project_login/dashboard/sector_information/AWCinformation";
import SectorWiseView from "./AdminPannel/Project_login/dashboard/Praroop2024/SectorWiseView";
import ExcelFormetPFMS from "./AdminPannel/Project_login/dashboard/Praroop2024/ExcelFormetPFMS";
import PraroopAllApp from "./AdminPannel/Project_login/dashboard/Praroop2024/PraroopAllApp";
import ReturnedFeedback from "./AdminPannel/Project_login/dashboard/Praroop2024/ReturnedFeedback";
import GirlChildSectorView from "./AdminPannel/Project_login/dashboard/girlchildapplications/GirlChildSectorView";
import GirlChildAllApp from "./AdminPannel/Project_login/dashboard/girlchildapplications/GirlChildAllApp";
import GirlExcelFormetView from "./AdminPannel/Project_login/dashboard/girlchildapplications/GirlExcelFormetView";
import OfflineApplication from "./AdminPannel/Project_login/dashboard/girlchildapplications/OfflineApplication";
import ChildReturnedFeedback from "./AdminPannel/Project_login/dashboard/girlchildapplications/ChildReturnedFeedback";
import IncomeCertificateview from "./AdminPannel/Project_login/dashboard/IncomeCertificateview";
import TwelthSectorWiseView from "./AdminPannel/Project_login/dashboard/twelthapplication/TwelthSectorWiseView";
import TwelthAllAppl from "./AdminPannel/Project_login/dashboard/twelthapplication/TwelthAllAppl";
import TwelthExcelPFMS from "./AdminPannel/Project_login/dashboard/twelthapplication/TwelthExcelPFMS";
import TwelthReturnFeedBack from "./AdminPannel/Project_login/dashboard/twelthapplication/TwelthReturnFeedBack";
import TwelfthStepThreeView from "./components/leftnav/twelfthpass/TwelfthStepThreeView";

//-----------District dashboard-----------//
import DistrictDashboard from "./AdminPannel/District_login/dis_dashboard/DistrictDashboard";
import DistrictLeftNav from "./AdminPannel/District_login/dis_leftnav/DistrictLeftNav";
import DistrictChangePass from "./AdminPannel/District_login/dis_dashboard/DistrictChangePass";
import ProjectPraroopTwo2023 from "./AdminPannel/District_login/dis_dashboard/project_wise_view/ProjectPraroopTwo2023";
import ProjectPraroopTwo2024 from "./AdminPannel/District_login/dis_dashboard/project_wise_view/ProjectPraroopTwo2024";
import ProjectPraroop1 from "./AdminPannel/District_login/dis_dashboard/project_wise_view/ProjectPraroop1";
import ExcelPraroop from "./AdminPannel/District_login/dis_dashboard/praroop_one_offline/ExcelPraroop";
import ApprovedCDPO from "./AdminPannel/District_login/dis_dashboard/praroop_two_List2024/ApprovedCDPO";
import PraroopExcel from "./AdminPannel/District_login/dis_dashboard/praroop_two_List2024/PraroopExcel";
import RejectedCDPO from "./AdminPannel/District_login/dis_dashboard/praroop_two_List2024/RejectedCDPO";
import ApprovalApprovedCDPO from "./AdminPannel/District_login/dis_dashboard/PraroopOneList_Approval/ApprovalApprovedCDPO";
import ApprovalRejectedCDPO from "./AdminPannel/District_login/dis_dashboard/PraroopOneList_Approval/ApprovalRejectedCDPO";
import ExcelPraroopOne from "./AdminPannel/District_login/dis_dashboard/PraroopOneList_Approval/ExcelPraroopOne";
import ExcelPraroopTwo from "./AdminPannel/District_login/dis_dashboard/PraroopOneList_Approval/ExcelPraroopTwo";
import ExcelPraroopthree from "./AdminPannel/District_login/dis_dashboard/PraroopOneList_Approval/ExcelPraroopthree";
import ExcelPraroopFourth from "./AdminPannel/District_login/dis_dashboard/PraroopOneList_Approval/ExcelPraroopFourth";
import ExcelPraroopFifth from "./AdminPannel/District_login/dis_dashboard/PraroopOneList_Approval/ExcelPraroopFifth";
import ExcelPraroopSixth from "./AdminPannel/District_login/dis_dashboard/PraroopOneList_Approval/ExcelPraroopSixth";
import ExcelPraroopSeventh from "./AdminPannel/District_login/dis_dashboard/PraroopOneList_Approval/ExcelPraroopSeventh";
import UploadFinalList from "./AdminPannel/District_login/dis_dashboard/PraroopOneList_Approval/UploadFinalList";
import ProjectExcel from "./AdminPannel/District_login/dis_dashboard/praroop_one_offline/ProjectExcel";
import ApprovedCDPO2023 from "./AdminPannel/District_login/dis_dashboard/praroop_two_list2023/ApprovedCDPO2023";
import ExcelPraroopPartTwo from "./AdminPannel/District_login/dis_dashboard/praroop_two_list2023/ExcelPraroopPartTwo";
import ExcelPraroopPartOne from "./AdminPannel/District_login/dis_dashboard/praroop_two_list2023/ExcelPraroopPartOne";
import ExcelPraroopPartThree from "./AdminPannel/District_login/dis_dashboard/praroop_two_list2023/ExcelPraroopPartThree";
import RejectedCDPO2023 from "./AdminPannel/District_login/dis_dashboard/praroop_two_list2023/RejectedCDPO2023";
import UploadFinalList2023 from "./AdminPannel/District_login/dis_dashboard/praroop_two_list2023/UploadFinalList2023";
import ExcelPraroopListThree from "./AdminPannel/District_login/dis_dashboard/Praroop_threeList2024/ExcelPraroopListThree";

//-----------Sector dashboard-----------//
import SectorDashBoard from "./AdminPannel/Sector_Login/sector_dashboard/SectorDashBoard";
import SectorLeftNav from "./AdminPannel/Sector_Login/sectorleftnav/SectorLeftNav";
import SectorChangePass from "./AdminPannel/Sector_Login/sector_dashboard/SectorChangePass";
import SectorWiseView1 from "./AdminPannel/Sector_Login/sector_dashboard/sectorpraroop2024/SectorWiseView1";
import SectorAllApp from "./AdminPannel/Sector_Login/sector_dashboard/sectorpraroop2024/SectorAllApplication";
import SectorReturnLog from "./AdminPannel/Sector_Login/sector_dashboard/sectorpraroop2024/SectorReturnLogOne";
import ReturnFeedBack from "./AdminPannel/Sector_Login/sector_dashboard/prarooponeapp/ReturnFeedBack";
import OneSectorWiseView from "./AdminPannel/Sector_Login/sector_dashboard/prarooponeapp/OneSectorWiseView";
import SectorAllApplication from "./AdminPannel/Sector_Login/sector_dashboard/sectorpraroop2024/SectorAllApplication";
import SectorReturnLogOne from "./AdminPannel/Sector_Login/sector_dashboard/sectorpraroop2024/SectorReturnLogOne";
import ReturnFeedBackOne from "./AdminPannel/Sector_Login/sector_dashboard/sectorpraroop2024/ReturnFeedBackOne";
import SectorWiseView2023 from "./AdminPannel/Sector_Login/sector_dashboard/prarooptwo2024/SectorWiseView2023";
import PraroopReturnLog from "./AdminPannel/Sector_Login/sector_dashboard/prarooptwo2024/PraroopReturnLog";
import PraroopReturnFeedBack from "./AdminPannel/Sector_Login/sector_dashboard/prarooptwo2024/PraroopReturnFeedBack";
import PraroopTwoAllApp from "./AdminPannel/Sector_Login/sector_dashboard/prarooptwo2024/PraroopTwoAllApp";
import ReturnLog from "./AdminPannel/Sector_Login/sector_dashboard/prarooponeapp/ReturnLog";
import TwelfthFormStatus from "./components/leftnav/NandaGoraForms/RegistrationForms/TwelfthFormStatus";
import TwelfthStepFour from "./components/leftnav/twelfthpass/TwelfthStepFour";
import TwelfthStepFourView from "./components/leftnav/twelfthpass/TwelfthStepFourView";
import OrphanStepOne from "./components/leftnav/Orphangirls/OrphanStepOne";
import OrphanStepTwo from "./components/leftnav/Orphangirls/OrphanStepTwo";
import OrphanStepThree from "./components/leftnav/Orphangirls/OrphanStepThree";
import OrphanStepFour from "./components/leftnav/Orphangirls/OrphanStepFour";
import OrphanStepOneView from "./components/leftnav/Orphangirls/OrphanStepOneView";
import OrphanStepTwoView from "./components/leftnav/Orphangirls/OrphanStepTwoView";
import OrphanStepThreeView from "./components/leftnav/Orphangirls/OrphanStepThreeView";
import OrphanStepFourView from "./components/leftnav/Orphangirls/OrphanStepFourView";

function App() {
  const location = useLocation();
  const hiddenPaths = new Set([
    "/UserDashboard",
    "/DashBoard",
    "/Change",
    "/NandaStepOne",
    "/NandaStepTwo",
    "/NandaStepThree",
    "/NandaStep4th",
    "/Change",
    "/DepartmentContact",
    "/FormStatus",
    "/SubmitRequest",
    "/TwelthStepOne",
    "/OrphanStepOne",
    "/OrphanStepTwo",
    "/OrphanStepThree",
    "/OrphanStepFour",
    "/TwelthdetailPopup",
    "/TwelthStepTwo",
    "/TwelthStepThree",
    "/TechLeftnav",
    "/TechnicaldashBoard",
    "/CheckFormstatus",
    "/OurCDPO",
    "/OurSuper",
    "/RequestAll",
    "/RequestPending",
    "/RequestDone",
    "/ActivityLog",
    "/NandaRegistration",
    "/ReparingstepTwo",
    "/FinalSubmit",
    "/Final",
    "/FinalBorn", // Directorate
    "/DirectorateDashboard",
    "/DirecCDPO",
    "/DirecSupervisore",
    "/TwelthAppli",
    "/DirecNewBorn",
    "/ProjectWiseAppli",
    "/DistrictWiseAppli",
    "/PraroopFinal2022",
    "/PraroopFinal2023",
    "/PraroopFinal2024",
    "/ProjectDashboard",
    "/ChangePassword",
    "/ResetSectorpassword",
    "/AWCinformation",
    "/ReturnedFeedback",
    "/PraroopAllApp",
    "/ExcelFormetPFMS",
    "/SectorWiseView",
    "/ChildReturnedFeedback",
    "/GirlChildAllApp",
    "/GirlChildSectorView",
    "/GirlExcelFormetView",
    "/OfflineApplication",
    "/IncomeCertificateview",
    "/IncomeCertificateview",
    "/TwelthSectorWiseView",
    "/TwelthExcelPFMS",
    "/TwelthSectorWiseView",
    "/TwelthAllAppl",
    "/TwelthReturnFeedBack", //-----------District-----------//
    "/DistrictDashboard",
    "/DistrictChangePass",
    "/ProjectPraroop1",
    "/ProjectPraroopTwo2023",
    "/ProjectPraroopTwo2024",
    "/ExcelPraroop",
    "/ProjectExcel",
    "/ApprovedCDPO",
    "/PraroopExcel",
    "/RejectedCDPO",
    "/ApprovalApprovedCDPO",
    "/ApprovalRejectedCDPO",
    "/ExcelPraroopFifth",
    "/ExcelPraroopFourth",
    "/ExcelPraroopOne",
    "/ExcelPraroopSeventh",
    "/ExcelPraroopSixth",
    "/ExcelPraroopthree",
    "/ExcelPraroopTwo",
    "/UploadFinalList",
    "/ApprovedCDPO2023",
    "/ExcelPraroopPartOne",
    "/ExcelPraroopPartThree",
    "/ExcelPraroopPartTwo",
    "/RejectedCDPO2023",
    "/UploadFinalList2023",
    "/ExcelPraroopListThree", //-----------District-----------//
    "/SectorLeftNav",
    "/SectorDashBoard",
    "/SectorChangePass",
    "/SectorWiseView1",
    "/SectorAllApp",
    "/SectorReturnLog",
    "/ReturnFeedBack",
    "/OneSectorWiseView",
    "/SectorAllApplication",
    "/SectorReturnLogOne",
    "/ReturnFeedBackOne",
    "/SectorWiseView2023",
    "/PraroopReturnLog",
    "/PraroopReturnFeedBack",
    "/PraroopTwoAllApp",
    "/ReturnLog",
    "/FormView",
    "/FinalView",
    "/TwelfthStepFour",
    "/TwelfthFinalView"
  ]);
  const hiddenFooter1 = new Set([
    "/UserDashboard",
    "/DashBoard",
    "/Change",
    "/NandaStepOne",
    "/NandaStepTwo",
    "/NandaStepThree",
    "/NandaStep4th",
    "/Change",
    "/DepartmentContact",
    "/FormStatus",
    "/SubmitRequest",
    "/TwelthStepOne",
    "/TwelthStepTwo",
    "/TwelthdetailPopup",
    "/TwelthStepThree",
    "/TechLeftnav",
    "/TechnicaldashBoard",
    "/CheckFormstatus",
    "/OurCDPO",
    "/OurSuper",
    "/RequestAll",
    "/RequestPending",
    "/RequestDone",
    "/ActivityLog",
    "/NandaRegistration",
    "/ReparingstepTwo",
    "/FinalSubmit",
    "/Final",
    "/FinalBorn", // Directorate
    "/DirectorateDashboard",
    "/DirecCDPO",
    "/DirecSupervisore",
    "/TwelthAppli",
    "/DirecNewBorn",
    "/ProjectWiseAppli",
    "/DistrictWiseAppli",
    "/PraroopFinal2022",
    "/PraroopFinal2023",
    "/PraroopFinal2024",
    "/ProjectDashboard", // Project
    "/ChangePassword",
    "/ResetSectorpassword",
    "/AWCinformation",
    "/ReturnedFeedback",
    "/PraroopAllApp",
    "/ExcelFormetPFMS",
    "/SectorWiseView",
    "/ChildReturnedFeedback",
    "/GirlChildAllApp",
    "/GirlChildSectorView",
    "/GirlExcelFormetView",
    "/OfflineApplication",
    "/IncomeCertificateview",
    "/TwelthSectorWiseView",
    "/TwelfthStepFour",
    "/OrphanStepOne",
    "/OrphanStepTwo",
    "/OrphanStepThree",
    "/OrphanStepFour",
    "/TwelthExcelPFMS",
    "/TwelthSectorWiseView",
    "/TwelthAllAppl",
    "/TwelthReturnFeedBack", //-----------District-----------//
    "/DistrictDashboard",
    "/DistrictChangePass",
    "/ProjectPraroop1",
    "/ProjectPraroopTwo2023",
    "/ProjectPraroopTwo2024",
    "/ExcelPraroop",
    "/ProjectExcel",
    "/ApprovedCDPO",
    "/PraroopExcel",
    "/RejectedCDPO",
    "/ApprovalApprovedCDPO",
    "/ApprovalRejectedCDPO",
    "/ExcelPraroopFifth",
    "/ExcelPraroopFourth",
    "/ExcelPraroopOne",
    "/ExcelPraroopSeventh",
    "/ExcelPraroopSixth",
    "/ExcelPraroopthree",
    "/ExcelPraroopTwo",
    "/UploadFinalList",
    "/ApprovedCDPO2023",
    "/ExcelPraroopPartOne",
    "/ExcelPraroopPartThree",
    "/ExcelPraroopPartTwo",
    "/RejectedCDPO2023",
    "/UploadFinalList2023",
    "/ExcelPraroopListThree",
    "/SectorLeftNav",
    "/SectorDashBoard",
    "/SectorChangePass",
    "SectorWiseView1",
    "/SectorAllApp",
    "/SectorReturnLog",
    "/ReturnFeedBack",
    "/OneSectorWiseView",
    "/SectorAllApplication",
    "/SectorReturnLogOne",
    "/ReturnFeedBackOne",
    "/SectorWiseView2023",
    "/PraroopReturnLog",
    "/PraroopReturnFeedBack",
    "/PraroopTwoAllApp",
    "/ReturnLog",
    "/FormView/",
    "/FinalView",
    "/TwelfthFinalView"

  ]); // Correct absolute paths
  const shouldHideNavbar = hiddenPaths.has(location.pathname);
  const shouldHideFooter1 = hiddenFooter1.has(location.pathname);
  return (
    <div>
      {/* Conditionally render NavBar */}
      {!shouldHideNavbar && <NavBar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/OfficialWebsite" element={<OfficialWebsite />} />
        <Route path="/UserLogin" element={<UserLogin />} />
        <Route path="/UserOtp" element={<UserOtp />} />
        <Route path="/CreatePasswordRegis" element={<CreatePasswordRegis />} />
        <Route path="/CreateNewPassword" element={<CreateNewPassword />} />
        <Route path="/AdminBanner" element={<AdminBanner />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/NandaStepOne" element={<NandaStepOne />} />
        <Route path="/NandaStepTwo" element={<NandaStepTwo />} />
        <Route path="/NandaYojana" element={<NandaYojana />} />
        <Route path="/FinalView" element={<FinalView />} />
        {/* <Route path="/Deepika" element={<Deepika/>} /> */}
        <Route path="/NandaStepTwo" element={<NandaStepTwo />} />
        <Route path="/NandaStepThree" element={<NandaStepThree />} />
        <Route path="/NandaStep4th" element={<NandaStep4th />} />
        <Route path="/FormStatuspending" element={<FormStatuspending />} />
        <Route path="/DepartmentContact" element={<DepartmentContact />} />
        <Route path="/SteponeView" element={<SteponeView />} />
        <Route path="/TwelfthStepOneVeiw" element={<TwelfthStepOneVeiw />} />
        <Route path="/TwelfthFinalView" element={<TwelfthFinalView />}/>
        <Route
          path="/EditStepButtonComponent"
          element={<EditStepButtonComponent />}
        />
        <Route path="/OrphanStepOneView" element={<OrphanStepOneView />} />
        <Route path="/OrphanStepTwoView" element={<OrphanStepTwoView />} />
        <Route path="/OrphanStepThreeView" element={<OrphanStepThreeView />} />
        <Route path="/OrphanStepFourView" element={<OrphanStepFourView />} /> 
        <Route path="/SteptwoView" element={<SteptwoView />} />
        <Route path="/StepthreeView" element={<StepthreeView />} />
        <Route path="/TwelfthStepThreeView" element={<TwelfthStepThreeView />} />
        <Route path="/TwelfthStepFourView" element={<TwelfthStepFourView />} />
        <Route path="/SubmitRequest" element={<SubmitRequest />} />
        <Route path="/FormStatus" element={<FormStatus />} />
        <Route path="/TwelfthFormStatus" element={<TwelfthFormStatus />} />
        <Route path="/TwelthStepOne" element={<TwelthStepOne />} />
        <Route path="/TwelthStepTwo" element={<TwelthStepTwo />} />
        <Route path="/TwelthStepThree" element={<TwelthStepThree />} />
        <Route path="/TwelfthStepFour" element={<TwelfthStepFour />} />
        <Route path="/TwelthdetailPopup" element={<TwelthdetailPopup />} />
        <Route path="/TwelthPass" element={<TwelthPass />} />
        <Route path="/OrphanStepOne" element={<OrphanStepOne />} />
        <Route path="/OrphanStepTwo" element={<OrphanStepTwo />} />
        <Route path="/OrphanStepThree" element={<OrphanStepThree />} />
        <Route path="/OrphanStepFour" element={<OrphanStepFour />} />
        <Route path="/DashBoard" element={<DashBoard />} /> {/* Correct path */}
        <Route path="/UserDashboard" element={<UserDashboard />} />{" "}
        {/* Correct path */}
        <Route path="/Change" element={<Change />} /> {/* Correct path */}
        <Route path="/InnerNavigation" element={<InnerNavigation />} />{" "}
        {/* Correct path */}
        <Route path="/GirlsBornStep" element={<GirlsBornStep />} />{" "}
        {/* Correct path */}
        <Route path="/ModalOne" element={<ModalOne />} />
        {/* Technical dashboard*/}
        <Route path="/TechLeftnav" element={<TechLeftnav />} />
        <Route path="/TechnicaldashBoard" element={<TechnicaldashBoard />} />
        <Route path="/CheckFormstatus" element={<CheckFormstatus />} />
        <Route path="/NandaTech" element={<NandaTech />} />
        <Route path="/OurCDPO" element={<OurCDPO />} />
        <Route path="/OurSuper" element={<OurSuper />} />
        <Route path="/RequestPending" element={<RequestPending />} />
        <Route path="/RequestDone" element={<RequestDone />} />
        <Route path="/ActivityLog" element={<ActivityLog />} />
        <Route path="/RequestAll" element={<RequestAll />} />
        <Route path="/ReparingstepTwo" element={<ReparingstepTwo />} />
        <Route path="/FinalSubmit" element={<FinalSubmit />} />
        <Route path="/NandaRegistration" element={<NandaRegistration />} />
        <Route path="/FinalBorn" element={<FinalBorn />} />
        <Route path="/Final" element={<Final />} />
        <Route path="/FormView" element={<FormView />} />
        {/* Directorate Data Table Start */}
        <Route
          path="/DirecTwelthDataTable"
          element={<DirecTwelthDataTable />}
        />
        <Route path="/DistrictChangePass" element={<DistrictChangePass />} />
        {/* Directorate Data Table End */}
        {/* Directorate dashboard*/}
        <Route
          path="/DirectorateDashboard"
          element={<DirectorateDashboard />}
        />
        <Route path="/DirecCDPO" element={<DirecCDPO />} />
        <Route path="/DirecSupervisore" element={<DirecSupervisore />} />
        <Route path="/TwelthAppli" element={<TwelthAppli />} />
        <Route path="/DirecNewBorn" element={<DirecNewBorn />} />
        <Route path="/ProjectWiseAppli" element={<ProjectWiseAppli />} />
        <Route path="/DistrictWiseAppli" element={<DistrictWiseAppli />} />
        <Route path="/PraroopFinal2022" element={<PraroopFinal2022 />} />
        <Route path="/PraroopFinal2023" element={<PraroopFinal2023 />} />
        {/* Project dashboard*/}
        <Route path="/PraroopFinal2024" element={<PraroopFinal2024 />} />
        <Route path="/ChangePassword" element={<ChangePassword />} />
        <Route path="/ResetSectorpassword" element={<ResetSectorpassword />} />
        <Route path="/AWCinformation" element={<AWCinformation />} />
        <Route path="/ExcelFormetPFMS" element={<ExcelFormetPFMS />} />
        <Route path="/SectorWiseView" element={<SectorWiseView />} />
        <Route path="/PraroopAllApp" element={<PraroopAllApp />} />
        <Route path="/ReturnedFeedback" element={<ReturnedFeedback />} />
        <Route
          path="/ChildReturnedFeedback"
          element={<ChildReturnedFeedback />}
        />
        <Route path="/GirlChildAllApp" element={<GirlChildAllApp />} />
        <Route path="/GirlChildSectorView" element={<GirlChildSectorView />} />
        <Route path="/GirlExcelFormetView" element={<GirlExcelFormetView />} />
        <Route path="/OfflineApplication" element={<OfflineApplication />} />
        <Route
          path="/IncomeCertificateview"
          element={<IncomeCertificateview />}
        />
        <Route path="/TwelthAllAppl" element={<TwelthAllAppl />} />
        <Route path="/TwelthExcelPFMS" element={<TwelthExcelPFMS />} />
        <Route
          path="/TwelthReturnFeedBack"
          element={<TwelthReturnFeedBack />}
        />
        <Route
          path="/TwelthSectorWiseView"
          element={<TwelthSectorWiseView />}
        />
        <Route path="/ProjectDashboard" element={<ProjectDashboard />} />
        <Route path="/ProjectNandaGaura" element={<ProjectNandaGaura />} />
        {/* District dashboard*/}
        <Route path="/DistrictDashboard" element={<DistrictDashboard />} />
        <Route path="/DistrictLeftNav" element={<DistrictLeftNav />} />
        <Route path="/ProjectPraroop1" element={<ProjectPraroop1 />} />
        <Route
          path="/ProjectPraroopTwo2023"
          element={<ProjectPraroopTwo2023 />}
        />
        <Route
          path="/ProjectPraroopTwo2024"
          element={<ProjectPraroopTwo2024 />}
        />
        <Route path="/ExcelPraroop" element={<ExcelPraroop />} />
        <Route path="/ApprovedCDPO" element={<ApprovedCDPO />} />
        <Route path="/PraroopExcel" element={<PraroopExcel />} />
        <Route path="/RejectedCDPO" element={<RejectedCDPO />} />
        <Route
          path="/ApprovalApprovedCDPO"
          element={<ApprovalApprovedCDPO />}
        />
        <Route
          path="/ApprovalRejectedCDPO"
          element={<ApprovalRejectedCDPO />}
        />
        <Route path="/ExcelPraroopFifth" element={<ExcelPraroopFifth />} />
        <Route path="/ExcelPraroopFourth" element={<ExcelPraroopFourth />} />
        <Route path="/ExcelPraroopOne" element={<ExcelPraroopOne />} />
        <Route path="/ExcelPraroopSeventh" element={<ExcelPraroopSeventh />} />
        <Route path="/ExcelPraroopSixth" element={<ExcelPraroopSixth />} />
        <Route path="/ExcelPraroopTwo" element={<ExcelPraroopTwo />} />
        <Route path="/UploadFinalList" element={<UploadFinalList />} />
        <Route path="/ExcelPraroopthree" element={<ExcelPraroopthree />} />
        <Route path="/ProjectExcel" element={<ProjectExcel />} />
        <Route path="/ApprovedCDPO2023" element={<ApprovedCDPO2023 />} />
        <Route path="/ExcelPraroopPartOne" element={<ExcelPraroopPartOne />} />
        <Route
          path="/ExcelPraroopPartThree"
          element={<ExcelPraroopPartThree />}
        />
        <Route path="/ExcelPraroopPartTwo" element={<ExcelPraroopPartTwo />} />
        <Route path="/RejectedCDPO2023" element={<RejectedCDPO2023 />} />
        <Route path="/UploadFinalList2023" element={<UploadFinalList2023 />} />
        <Route
          path="/ExcelPraroopListThree"
          element={<ExcelPraroopListThree />}
        />
        {/* District dashboard*/}
        <Route path="/SectorDashBoard" element={<SectorDashBoard />} />
        <Route path="/SectorLeftNav" element={<SectorLeftNav />} />
        <Route path="/SectorChangePass" element={<SectorChangePass />} />
        <Route path="/SectorWiseView1" element={<SectorWiseView1 />} />
        <Route path="/SectorAllApp" element={<SectorAllApp />} />
        <Route path="/SectorReturnLog" element={<SectorReturnLog />} />
        <Route path="/ReturnFeedBack" element={<ReturnFeedBack />} />
        <Route path="/OneSectorWiseView" element={<OneSectorWiseView />} />
        <Route
          path="/SectorAllApplication"
          element={<SectorAllApplication />}
        />
        <Route path="/SectorReturnLogOne" element={<SectorReturnLogOne />} />
        <Route path="/ReturnFeedBackOne" element={<ReturnFeedBackOne />} />
        <Route path="/SectorWiseView2023" element={<SectorWiseView2023 />} />
        <Route path="/PraroopReturnLog" element={<PraroopReturnLog />} />
        <Route
          path="/PraroopReturnFeedBack"
          element={<PraroopReturnFeedBack />}
        />
        <Route path="/PraroopTwoAllApp" element={<PraroopTwoAllApp />} />
        <Route path="/ReturnLog" element={<ReturnLog />} />
      </Routes>

      {!shouldHideFooter1 && <LoginFooter />}
    </div>
  );
}

export default App;
