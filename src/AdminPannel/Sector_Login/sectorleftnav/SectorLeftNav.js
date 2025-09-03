import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RiDashboard3Line } from "react-icons/ri";
import { FaChalkboardTeacher, FaChevronDown, FaChevronRight } from "react-icons/fa"; // Add Chevron icons
import { LuLogOut } from "react-icons/lu";
import { FaAlignLeft } from "react-icons/fa";
import UKLogon from "../../../assets/images/UKLogo.png";
import MenuIcon from "../../../assets/images/menu_icon.png";
import "../../Directorate_login/direc_assets/css/DirecCDPO.css";
import "../../District_login/dis_assets/CSS/DistrictLeftNav.css";
import { FaStreetView } from "react-icons/fa";
import { GoListUnordered } from "react-icons/go";
import { IoKeySharp } from "react-icons/io5";
import { GrCertificate } from "react-icons/gr";
import { FaBuildingUser } from "react-icons/fa6";
import { VscFeedback } from "react-icons/vsc";
import { MdTimelapse } from "react-icons/md";

function SectorLeftNav() {
  const [isNavClosed, setIsNavClosed] = useState(false);
  const [expandedItems, setExpandedItems] = useState({}); // Track which dropdowns are expanded

  const toggleNav = () => {
    setIsNavClosed(!isNavClosed);
  };

  const toggleDropdown = (index) => {
    setExpandedItems((prev) => ({
      [index]: !prev[index],
    }));
  }

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
      path: "/SectorDashBoard",
    },
    {
      icon: <IoKeySharp />,
      label: "Change Password",
      path: "/SectorChangePass",
    },
    {
      icon: <FaStreetView />,
      label: "Praroop 2 2024 ",
      path: "/ProjectPraroop1",
      subRoutes: [
        {
          icon: <FaBuildingUser />,
          label: "Sector Wise View",
          path: "/SectorWiseView1",
        },
        {
          icon: <FaChalkboardTeacher />,
          label: "All Application",
          path: "/SectorAllApp",
        },
        {
            icon: <MdTimelapse />,
            label: "Return Log",
            path: "/ReturnLog",
          },
          {
            icon: <VscFeedback />,
            label: "Return Feedback",
            path: "/ReturnFeedBack",
          },
          
      ],
    },
    {
      icon: <FaBuildingUser />,
      label: "Praroop 1 Application",
      path: "/OneSectorWiseView",

      subRoutes: [
        {
          icon: <FaBuildingUser />,
          label: "Sector Wise View",
          path: "/OneSectorWiseView ",
        },
        {
          icon: <FaChalkboardTeacher />,
          label: "All Application",
          path: "/SectorAllApplication",
        },
        {
            icon: <MdTimelapse />,
            label: "Return Log",
            path: "/SectorReturnLogOne",
          },
          {
            icon: <VscFeedback />,
            label: "Return Feedback",
            path: "/ReturnFeedBackOne",
          },
      ],
    },
    {
         icon: <GrCertificate />,
         label: "Income Certificate Check",
         path: "https://eservices.uk.gov.in/officer/public/application/verify/certificate/",
         external: true,
       },
    {
      
      icon: <GoListUnordered />,
      label: "Praroop 2 2023",
      path: "/SectorWiseView2023",

      subRoutes: [
        {
          icon: <FaBuildingUser />,
          label: "Sector Wise View",
          path: "/SectorWiseView2023",
        },
        {
            icon: <FaChalkboardTeacher />,
            label: "All Application",
            path: "/PraroopTwoAllApp",
          },
          {
            icon: <MdTimelapse />,
            label: "Return Log",
            path: "/PraroopReturnLog",
          },
          {
            icon: <VscFeedback />,
            label: "Return FeedBack",
            path: "/PraroopReturnFeedBack",
          },
        
      ],
    },
  ];
  
  return (
    <>
      <header className="sector-header">
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
            <span>Department:</span> Sector Login
          </div>
          <div className="sector-dp" alt="logout" title="Click to logout">
            <div className="nd-log-icon">
              <LuLogOut />
            </div>
          </div>
        </div>
      </header>

      <div>
        <div>
          <div className={`navcontainer ${isNavClosed ? "navclose" : ""}`}>
            <nav className="nav-sector">
              <div className="nav-upper-options sector-options ">
                <div className="nd-menu">
                  <div>
                    <FaAlignLeft
                      className="icn menuicn"
                      id="menuicn"
                      alt="menu-icon"
                      onClick={toggleNav}
                    />
                  </div>
                  <div className="nd-user">Department: Sector Login</div>
                  <div className="sector-log-icon-mob">
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
                        className={`sector-option option${index + 1}`}
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
                          className={`sector-option option${index + 1}`}
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
                          <div className="sector-suboption">
                            {option.subRoutes.map((subRoute, subIndex) => (
                              <Link
                                to={subRoute.path}
                                key={subIndex}
                                className="sector-suboption"
                              >
                                <div className="nav-subitem-sector">
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
                        className={`sector-option option${index + 1}`}
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

export default SectorLeftNav;
