import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RiDashboard3Line } from "react-icons/ri";
import { MdOutlineFormatAlignRight } from "react-icons/md";
import { FaChevronDown, FaChevronRight } from "react-icons/fa"; // Add Chevron icons
import { LuLogOut } from "react-icons/lu";
import { FaHandsHoldingChild } from "react-icons/fa6";
import { FaChalkboardTeacher, FaAlignLeft } from "react-icons/fa";
import { MdOutlineLockReset } from "react-icons/md";
import { IoIosInformationCircleOutline } from "react-icons/io";
import UKLogon from "../../../assets/images/UKLogo.png";
import MenuIcon from "../../../assets/images/menu_icon.png";
import { LuFileLock } from "react-icons/lu";
import { PiMicrosoftExcelLogo } from "react-icons/pi";
import { AiFillFileExclamation } from "react-icons/ai";
import { VscFeedback } from "react-icons/vsc";
import { TbAlertSquareRoundedOff } from "react-icons/tb";
import "../../Directorate_login/direc_assets/css/DirecCDPO.css";
import "../../Project_login/pro_assests/ProjectLeftnav.css";
import { FaBuildingUser } from "react-icons/fa6";
import { MdSupervisorAccount } from "react-icons/md";
import { GrCertificate } from "react-icons/gr";

function ProjectLeftNav() {
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
      path: "/ProjectDashboard",
    },
    {
      icon: <LuFileLock />,
      label: "Change Password",
      path: "/ChangePassword",
    },

    {
      icon: <AiFillFileExclamation />,
      label: "Sector Information",
      path: "/ResetSectorpassword",
      subRoutes: [
        {
          icon: <MdOutlineLockReset />,
          label: "Reset Sector Password",
          path: "/ResetSectorpassword",
        },
        {
          icon: <IoIosInformationCircleOutline />,
          label: "AWC Information",
          path: "/AWCinformation",
        },
      ],
    },
    {
      icon: <MdOutlineFormatAlignRight />,
      label: "Praroop 2 2024",
      path: "/TwelthAppli",

      subRoutes: [
        {
          icon: <FaBuildingUser />,
          label: "Sector Wise view",
          path: "/SectorWiseView",
        },
        {
          icon: <MdSupervisorAccount />,
          label: "All applications",
          path: "/PraroopAllApp",
        },
        {
          icon: <PiMicrosoftExcelLogo />,
          label: "Excel Formet PFMS",
          path: "/ExcelFormetPFMS",
        },
        {
          icon: <VscFeedback />,
          label: "Return Feedbacks",
          path: "/ReturnedFeedback",
        },
      ],
    },
    {
      icon: <FaHandsHoldingChild />,
      label: "Girl Child Applications",
      path: "/GirlChildSectorView",

      subRoutes: [
        {
          icon: <FaBuildingUser />,
          label: "Sector Wise view",
          path: "/GirlChildSectorView",
        },
        {
          icon: <MdSupervisorAccount />,
          label: "All applications",
          path: "/GirlChildAllApp",
        },
        {
          icon: <TbAlertSquareRoundedOff />,
          label: "Offline Application",
          path: "/OfflineApplication",
        },
        {
          icon: <PiMicrosoftExcelLogo />,
          label: "Excel Formets PFMS",
          path: "/GirlExcelFormetView",
        },
        {
          icon: <VscFeedback />,
          label: "Returnd Feedbacks",
          path: "/ChildReturnedFeedback",
        },
      ],
    },
    {
      icon: <GrCertificate />,
      label: "Income Certificate view",
      path: "https://eservices.uk.gov.in/officer/public/application/verify/certificate/",
      external: true,
    },
    {
      icon: <FaChalkboardTeacher />,
      label: "12th Application View",
      path: "/TwelthSectorWiseView",
      subRoutes: [
        {
          icon: <FaBuildingUser />,
          label: "Sector Wise view",
          path: "/TwelthSectorWiseView",
        },
        {
          icon: <MdSupervisorAccount />,
          label: "All applications",
          path: "/TwelthAllAppl",
        },

        {
          icon: <PiMicrosoftExcelLogo />,
          label: "Excel Formets PFMS",
          path: "/TwelthExcelPFMS",
        },
        {
          icon: <VscFeedback />,
          label: "Returnd Feedbacks",
          path: "/TwelthReturnFeedBack",
        },
      ],
    },
  ];

  return (
    <>
      <header className="project-header">
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
            <span>Department:</span> Project Login
          </div>
          <div className="project-dp" alt="logout" title="Click to logout">
            <div className="nd-log-icon">
              <LuLogOut />
            </div>
          </div>
        </div>
      </header>

      <div>
        <div>
          <div className={`navcontainer ${isNavClosed ? "navclose" : ""}`}>
            <nav className="nav-project">
              <div className="nav-upper-options project-options ">
                <div className="nd-menu">
                  <div>
                    <FaAlignLeft
                      className="icn menuicn"
                      id="menuicn"
                      alt="menu-icon"
                      onClick={toggleNav}
                    />
                  </div>
                  <div className="nd-user">Department: Project Login</div>
                  <div className="project-log-icon-mob">
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
                        className={`project-option option${index + 1}`}
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
                          className={`project-option option${index + 1}`}
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
                          <div className="project-suboption">
                            {option.subRoutes.map((subRoute, subIndex) => (
                              <Link
                                to={subRoute.path}
                                key={subIndex}
                                className="project-suboption"
                              >
                                <div className="nav-subitem-project">
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
                        className={`project-option option${index + 1}`}
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

export default ProjectLeftNav;
