import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RiDashboard3Line } from "react-icons/ri";
import {
  MdOutlinePublishedWithChanges,
  MdOutlineFormatAlignRight,
  MdLibraryBooks,
} from "react-icons/md";
import { GrDatabase } from "react-icons/gr";
import { FaChevronDown, FaChevronRight } from "react-icons/fa"; // Add Chevron icons
import { LuLogOut } from "react-icons/lu";
import { ImFilePdf } from "react-icons/im";
import { BsDatabaseCheck } from "react-icons/bs";
import { FaRegFileAlt, FaChalkboardTeacher, FaAlignLeft } from "react-icons/fa";
import UKLogon from "../../../assets/images/UKLogo.png";
import MenuIcon from "../../../assets/images/menu_icon.png";
import "../../techassets/techcss/TechLeft.css";
import { FaBuildingUser } from "react-icons/fa6";
import { MdSupervisorAccount,MdPendingActions,MdOutlineDone } from "react-icons/md";
import { TbActivityHeartbeat } from "react-icons/tb";
import { PiUsersFourFill } from "react-icons/pi";


function TechLeftnav() {
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
    { icon: <RiDashboard3Line />, label: "Dashboard", path: "/TechnicaldashBoard" },
    {
      icon: <MdOutlinePublishedWithChanges />,
      label: "Check Form Status",
      path: "/CheckFormstatus",
    },
    {
      icon: <FaRegFileAlt />,
      label: "Our Staff",
      path: "/SubmitRequest",
      subRoutes: [
        {
          icon: <FaBuildingUser />,
          label: "Our CDPO",
          path: "/OurCDPO",
        },
        {
          icon: <MdSupervisorAccount />,
          label: "Our Supervisore",
          path: "/OurSuper",
        },
       
      ],
    },
    {
      icon: <MdOutlineFormatAlignRight />,
      label: "Logs",
      path: "/FormStatus",
      subRoutes: [
        {
          icon: <TbActivityHeartbeat />,
          label: "Activity Log",
          path: "/ActivityLog",
        },
        {
          icon: <MdPendingActions />,
          label: "Request Log (Pending)",
          path: "/RequestPending",
        },
        {
          icon: <MdOutlineDone />,
          label: "Request Log (Done)",
          path: "/RequestDone",
        },
        {
          icon: <PiUsersFourFill />,
          label: "Request Log (All)",
          path: "/RequestAll",
        },
       
      ],
    },
    {
      icon: <ImFilePdf />,
      label: "Repparing step2",
      path:"/ReparingstepTwo",
      
    },
    {
      icon: <MdLibraryBooks />,
      label: "Nanda Registration",
      path:"/NandaRegistration",
    },
    {
      icon: <FaChalkboardTeacher />,
      label: "Final submit List",
      path:"/FinalSubmit",

      subRoutes: [
        {
          icon: <BsDatabaseCheck />,
          label: "New Born Final",
          path: "/FinalBorn",
        },
        {
          icon: <GrDatabase />,
          label: "12th Final",
          path: "/Final",
        },
       
       
      ],
    },
   
  ];

  return (
    <>
      <header className="tech-header">
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
            <span>Department:</span> Technical Login
          </div>
          <div className="tech-dp" alt="logout" title="Click to logout">
            <div className="nd-log-icon">
              <LuLogOut />
            </div>
          </div>
        </div>
      </header>

      <div>
        <div>
          <div className={`navcontainer ${isNavClosed ? "navclose" : ""}`}>
            <nav className="nav-tech">
              <div className="nav-upper-options nav-upper-options1 tech-options ">
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
                  <div className="tech-log-icon-mob">
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
                        <div className="nav-item tech-nav-item">
                          <div className="d-flex">
                            <span className="nav-icon">{option.icon}</span>
                            <span className="nav-label">{option.label}</span>
                          </div>
                        </div>
                      </div>
                    ) : option.subRoutes ? (
                      <>
                        <div
                          className={`tech-left-item  option${index + 1}`}
                          onClick={() => toggleDropdown(index)}
                          style={{ cursor: "pointer" }}
                        >
                          <div className="nav-item tech-drop-menu">
                            
                            <div className="d-flex">
                              
                              <span className="nav-icon">{option.icon}</span>
                              <span className="nav-label">{option.label}</span>
                             
                             
                            </div>
                            <span className="nav-arrow nav-direc-arrow">
            {expandedItems[index] ? <FaChevronDown /> : <FaChevronRight />}
          </span>
                           
                          </div>
                          
                        </div>

                        {expandedItems[index] && (
                          <div className=" tech-suboption">
                            {option.subRoutes.map((subRoute, subIndex) => (
                              <Link
                                to={subRoute.path}
                                key={subIndex}
                                className="nav-suboption"
                              >
                                <div className=" nav-direc-subitem">
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
                        className={`nav-option nav-direc-option  option${index + 1}`}
                      >
                        <div className="nav-item">
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

export default TechLeftnav;
