import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RiDashboard3Line } from "react-icons/ri";
import { MdOutlineFormatAlignRight, MdLibraryBooks } from "react-icons/md";
import { FaChevronDown, FaChevronRight } from "react-icons/fa"; // Add Chevron icons
import { LuLogOut } from "react-icons/lu";
import { FaHandsHoldingChild } from "react-icons/fa6";
import { FaChalkboardTeacher, FaAlignLeft } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import UKLogon from "../../../assets/images/UKLogo.png";
import MenuIcon from "../../../assets/images/menu_icon.png";
import "../../Directorate_login/direc_assets/css/DirecCDPO.css";
// import "../../techassets/techcss/TechLeft.css";
import "../../Directorate_login/direc_assets/css/DirectorateLeftNav.css";
import { FaBuildingUser } from "react-icons/fa6";
import { MdSupervisorAccount } from "react-icons/md";
import { LuCalendarClock } from "react-icons/lu";

function DirectorateLeftnav() {
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
      path: "/DirectorateDashboard",
    },

    {
      icon: <FaUsers />,
      label: "Our Staff",
      path: "/DirectorateDashboard",
      subRoutes: [
        {
          icon: <FaBuildingUser />,
          label: "Our CDPO",
          path: "/DirecCDPO",
        },
        {
          icon: <MdSupervisorAccount />,
          label: "Our Supervisore",
          path: "/DirecSupervisore",
        },
      ],
    },
    {
      icon: <MdOutlineFormatAlignRight />,
      label: "12th Pass Application 2024",
      path: "/TwelthAppli",
    },
    {
      icon: <FaHandsHoldingChild />,
      label: "New Born  2024",
      path: "/DirecNewBorn",
    },
    {
      icon: <MdLibraryBooks />,
      label: "Project Wise Application view",
      path: "/ProjectWiseAppli",
    },
    {
      icon: <FaChalkboardTeacher />,
      label: "District Wise Application view",
      path: "/DistrictWiseAppli",
    },
    {
      icon: <FaChalkboardTeacher />,
      label: "Praroop 3 final",
      path: "/DistrictWiseAppli",
      subRoutes: [
        {
          icon: <LuCalendarClock />,
          label: "Praroop final 2022",
          path: "/PraroopFinal2022",
        },
        {
          icon: <LuCalendarClock />,
          label: "Praroop final 2023",
          path: "/PraroopFinal2023",
        },
        {
          icon: <LuCalendarClock />,
          label: "Praroop final 2024",
          path: "/PraroopFinal2024",
        },
      ],
    },
  ];

  return (
    <>
      <header className="direc-header">
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
            <span>Department:</span> Directorate Login
          </div>
          <div className="direc-dp" alt="logout" title="Click to logout">
            <div className="nd-log-icon">
              <LuLogOut />
            </div>
          </div>
        </div>
      </header>

      <div>
        <div>
          <div
            className={`navcontainer ${
              isNavClosed ? "navclose" : ""
            }`}
          >
            <nav className="nav-direc">
              <div className="nav-upper-options direc-options ">
                <div className="nd-menu">
                  <div>
                    <FaAlignLeft
                      className="icn menuicn"
                      id="menuicn"
                      alt="menu-icon"
                      onClick={toggleNav}
                    />
                  </div>
                  <div className="nd-user">User: Deepika Chauhan</div>
                  <div className="direc-log-icon-mob">
                    <LuLogOut
                      className=" "
                      alt="logout"
                      title="Click to logout"
                    />
                  </div>
                </div>

                {navigationOptions.map((option, index) => (
                  <React.Fragment key={index}>
                    {option.download ? (
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
                          className={`direc-option option${index + 1}`}
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
                          <div className="direc-suboption">
                            {option.subRoutes.map((subRoute, subIndex) => (
                              <Link
                                to={subRoute.path}
                                key={subIndex}
                                className="direc-suboption"
                              >
                                <div className="nav-subitem-direc ">
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
                        className={`direc-option option${index + 1}`}
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

export default DirectorateLeftnav;
