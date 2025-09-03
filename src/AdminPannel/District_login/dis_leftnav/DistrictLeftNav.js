import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RiDashboard3Line } from "react-icons/ri";
import { FaChevronDown, FaChevronRight } from "react-icons/fa"; // Add Chevron icons
import { LuLogOut } from "react-icons/lu";
import { FaAlignLeft } from "react-icons/fa";
import UKLogon from "../../../assets/images/UKLogo.png";
import MenuIcon from "../../../assets/images/menu_icon.png";
import "../../Directorate_login/direc_assets/css/DirecCDPO.css";
import "../../District_login/dis_assets/CSS/DistrictLeftNav.css";
import { LiaFilePdf } from "react-icons/lia";
import { FaStreetView } from "react-icons/fa";
import { FiFileText, FiWifiOff } from "react-icons/fi";
import { RiFileExcel2Line } from "react-icons/ri";
import { GoListUnordered } from "react-icons/go";
import { MdOutlineClose } from "react-icons/md";
import { PiListChecks } from "react-icons/pi";
import { RiUpload2Fill } from "react-icons/ri";
import { LuList } from "react-icons/lu";
import { IoKeySharp } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";

function DistrictLeftNav() {
  const [isNavClosed, setIsNavClosed] = useState(false);
  const [expandedItems, setExpandedItems] = useState({}); // Track which dropdowns are expanded

  const toggleNav = () => {
    setIsNavClosed(!isNavClosed);
  };

    const toggleDropdown = (index) => {
      setExpandedItems((prev) => ({
        [index]: !prev[index],
      }));
  };

  const handleDownload = (fileUrl, fileName) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const navigationOptions = [
    {
      icon: <RiDashboard3Line />,
      label: "Dashboard",
      path: "/DistrictDashboard",
    },
    {
      icon: <IoKeySharp />,
      label: "Change Password",
      path: "/DistrictChangePass",
    },

    {
      icon: <FaStreetView />,
      label: "Project Wise View",
      path: "/ProjectPraroop1",
      subRoutes: [
        {
          icon: <FiFileText />,
          label: "Praroop 1",
          path: "/ProjectPraroop1",
        },
        {
          icon: <FiFileText />,
          label: "Praroop 2 2024",
          path: "/ProjectPraroopTwo2024",
        },
        {
            icon: <FiFileText />,
            label: "Praroop 2 2023",
            path: "/ProjectPraroopTwo2023",
          },
          
      ],
    },
    {
      icon: <FiWifiOff />,
      label: "Praroop 1 Offline",
      path: "/ExcelPraroop",

      subRoutes: [
        {
          icon: <RiFileExcel2Line />,
          label: "Excel Praroop",
          path: "/ExcelPraroop",
        },
        {
          icon: <RiFileExcel2Line />,
          label: "Project Excel",
          path: "/ProjectExcel",
        },
      ],
    },
    {
      
      icon: <GoListUnordered />,
      label: "Praroop 2 List 2024",
      path: "/GirlChildSectorView",

      subRoutes: [
        {
          icon: <MdOutlineClose />,
          label: "Rejected by CDPO",
          path: "/RejectedCDPO",
        },
        {
          icon: <FaCheck />,
          label: "Approved by CDPO",
          path: "/ApprovedCDPO",
        },
        {
          icon: <RiFileExcel2Line />,
          label: "Excel Praroop",
          path: "/PraroopExcel",
        },
        
      ],
    },
    {
      
      icon: <GoListUnordered />,
      label: "Praroop 3 List 2024",
      path: "/GirlChildSectorView",

      subRoutes: [
        {
          icon: <RiFileExcel2Line />,
          label: "Excel Praroop",
          path: "/ExcelPraroopListThree",
        },
        
      ],
    },
    {
      icon: <PiListChecks />,
      label: "Praroop 1 List Approval",
      path: "/ApprovalRejectedCDPO",
      subRoutes: [
        {
          icon: <MdOutlineClose />,
          label: "Rejected by CDPO",
          path: "/ApprovalRejectedCDPO",
        },
        {
          icon: <FaCheck />,
          label: "Approved by CDPO",
          path: "/ApprovalApprovedCDPO",
        },

        {
          icon: <RiFileExcel2Line />,
          label: "Excel Praroop Part 1",
          path: "/ExcelPraroopOne",
        },
        {
            icon: <RiFileExcel2Line />,
            label: "Excel Praroop Part 2",
            path: "/ExcelPraroopTwo",
          },
          {
            icon: <RiFileExcel2Line />,
            label: "Excel Praroop Part 3",
            path: "/ExcelPraroopthree",
          },
          {
            icon: <RiFileExcel2Line />,
            label: "Excel Praroop Part 4",
            path: "/ExcelPraroopFourth",
          },
          {
            icon: <RiFileExcel2Line />,
            label: "Excel Praroop Part 5",
            path: "/ExcelPraroopFifth",
          },
          {
            icon: <RiFileExcel2Line />,
            label: "Excel Praroop Part 6",
            path: "/ExcelPraroopSixth",
          },
          {
            icon: <RiFileExcel2Line />,
            label: "Excel Praroop Part 7",
            path: "/ExcelPraroopSeventh",
          },
          {
            icon: <RiUpload2Fill />,
            label: "Upload Final List",
            path: "/UploadFinalList",
          },
      ],
    },
    {
        icon: <LuList />,
        label: "Praroop 2 List 2023",
        path: "/ApprovedCDPO2023",
        subRoutes: [
          {
            icon: <MdOutlineClose />,
            label: "Rejected by CDPO",
            path: "/RejectedCDPO2023",
          },
          {
            icon: <FaCheck />,
            label: "Approved by CDPO",
            path: "/ApprovedCDPO2023",
          },
  
          {
            icon: <RiFileExcel2Line />,
            label: "Excel Praroop Part I",
            path: "/ExcelPraroopPartOne",
          },
          {
              icon: <RiFileExcel2Line />,
              label: "Excel Praroop Part II",
              path: "/ExcelPraroopPartTwo",
            },
            {
              icon: <RiFileExcel2Line />,
              label: "Excel Praroop Part III",
              path: "/ExcelPraroopPartThree",
            },
        
            {
              icon: <RiUpload2Fill />,
              label: "Upload Final List",
              path: "/UploadFinalList2023",
            },
        ],
      },
      {
        icon: <LiaFilePdf />,
        label: "DPO Pannel Tutorial",
        path: "dpo_tutorial_pdf.pdf",
        external: true,
     
      },
     
   
  ];
  

  return (
    <>
      <header className="district-header">
        <div className="logosec">
          <img
            src={MenuIcon}
            className="icn menuicn"
            id="menuicn"
            alt="menu-icon"
            onClick={toggleNav}
          />

          <Link to="#" className="logo-page">
            <img src={UKLogon} alt="logo" className="logo" />
          </Link>
          <div className="nd-title">
            <span className="nd-subtitle">
              उत्तराखंड सरकार | Gov.t of Uttarakhand{" "}
            </span>
            <span className="subtitle">
              महिला सशक्तिकरण एवं बाल विकास विभाग उत्तराखंड
            </span>
          </div>
        </div>

        <div className="message">
          <div className="nd-msg">
            <span>Department:</span> District Login
          </div>
          <div className="district-dp" alt="logout" title="Click to logout">
            <div className="nd-log-icon">
              <LuLogOut />
            </div>
          </div>
        </div>
      </header>

      <div>
        <div>
          <div className={`navcontainer ${isNavClosed ? "navclose" : ""}`}>
            <nav className="nav-district">
              <div className="nav-upper-options district-options ">
                <div className="nd-menu">
                  <div>
                    <FaAlignLeft
                      className="icn menuicn"
                      id="menuicn"
                      alt="menu-icon"
                      onClick={toggleNav}
                    />
                  </div>
                  <div className="nd-user">Department: District Login</div>
                  <div className="district-log-icon-mob">
                    <LuLogOut
                      className=" "
                      alt="logout"
                      title="Click to logout"
                    />
                  </div>
                </div>

                {navigationOptions.map((option, index) => (
                  <React.Fragment key={index}>
                    {option.external ? (
                      <a
                        href={option.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`district-option option${index + 1}`}
                      >
                        <div className="direc-item">
                          <div className="d-flex">
                            <span className="nav-icon">{option.icon}</span>
                            <span className="nav-label">{option.label}</span>
                          </div>
                        </div>
                      </a>
                    ) : option.download ? (
                      <div
                        className={`tech-nav-option option${index + 1}`}
                        onClick={() =>
                          handleDownload(option.fileUrl, option.fileName)
                        }
                        style={{ cursor: "pointer" }}
                      >
                        <div className="direc-item">
                          <div className="d-flex">
                            <span className="nav-icon">{option.icon}</span>
                            <span className="nav-label">{option.label}</span>
                          </div>
                        </div>
                      </div>
                    ) : option.subRoutes ? (
                      <>
                        <div
                          className={`district-option option${index + 1}`}
                          onClick={() => toggleDropdown(index)}
                          style={{ cursor: "pointer" }}
                        >
                          <div className="nav-item tech-drop-menu direc-nav-item">
                            <div className="d-flex">
                              <span className="nav-icon">{option.icon}</span>
                              <span className="nav-label">{option.label}</span>
                            </div>
                            <span className="nav-arrow nav-direc-arrow ">
                              {expandedItems[index] ? (
                                <FaChevronDown />
                              ) : (
                                <FaChevronRight />
                              )}
                            </span>
                          </div>
                        </div>
                        {expandedItems[index] && (
                          <div className="district-suboption">
                            {option.subRoutes.map((subRoute, subIndex) => (
                              <Link
                                to={subRoute.path}
                                key={subIndex}
                                className="district-suboption"
                              >
                                <div className="nav-subitem-district">
                                  <div className="d-flex">
                                    <span className="nav-icon">
                                      {subRoute.icon}
                                    </span>
                                    <span className="nav-label">
                                      {subRoute.label}
                                    </span>
                                  </div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <Link
                        to={option.path}
                        className={`district-option option${index + 1}`}
                      >
                        <div className="direc-item">
                          <div className="d-flex">
                            <span className="nav-icon">{option.icon}</span>
                            <span className="nav-label">{option.label}</span>
                          </div>
                        </div>
                      </Link>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

export default DistrictLeftNav;
