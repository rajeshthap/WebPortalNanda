import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "../../assets/css/LeftNav.css";
import UKLogon from "../../assets/images/UKLogo.png";
import "@fortawesome/fontawesome-free"; // Font Awesome library
import { RiDashboard3Line } from "react-icons/ri";
import { MdOutlinePublishedWithChanges,MdOutlineFormatAlignRight } from "react-icons/md";
import { ImFilePdf } from "react-icons/im";
import { HiOutlineUser } from "react-icons/hi";
import {
  FaAdjust,
  FaRegFileAlt,
  FaChalkboardTeacher ,
  FaBuilding,
  FaUser,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa"; // React Icons

const Change = () => {
  const [isNavClosed, setIsNavClosed] = useState(false);

  const toggleNav = () => {
    setIsNavClosed(!isNavClosed);
  };

  return (
    <div>
      {/* Header */}
      <header>
        <div className="logosec">
          <img
            src="https://media.geeksforgeeks.org/wp-content/uploads/20221210182541/Untitled-design-(30).png"
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
          <div className="circle"></div>
          <div className="dp"></div>
        </div>
      </header>

      {/* Main Container */}
      <div className="main-container">
        {/* Navigation */}
        <div className={`navcontainer ${isNavClosed ? "navclose" : ""}`}>
          <nav className="nav">
            <div className="nav-upper-options">
              {[
                {
                  icon: <RiDashboard3Line />,
                  label: "Dashboard",
                  path: "DashBoard",
                },
                {
                  icon: <MdOutlinePublishedWithChanges />,
                  label: "Change",
                  path: "#",
                },
                {
                  icon: <FaRegFileAlt />,
                  label: "request Query",
                  path: "/report",
                },
                {
                  icon: <MdOutlineFormatAlignRight />,
                  label: "Form Statuse",
                  path: "/institution",
                },
                {
                  icon: <ImFilePdf />,
                  label: "नंदा गौरा योजना विषयक शासनादेश",
                  path: "/profile",
                },
                {
                  icon: <FaCog />,
                  label: "Girl Child Form Tutorial",
                  path: "/settings",
                },
                {
                  icon: <FaChalkboardTeacher  />,
                  label: "12th Form Tutorial",
                  path: "/login", // Path to UserLogin
                },
                {
                  icon: <HiOutlineUser />,
                  label: "Contact Us",
                  path: "/login", // Path to UserLogin
                },
              ].map((option, index) => (
                <Link
                  to={option.path}
                  className={`nav-option option${index + 1}`}
                  key={index}
                >
                  <div className="nav-item">
                    <div className="d-flex">
                    <span className="nav-icon">{option.icon}</span>
                    <span className="nav-label">{option.label}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="main">
          <div className="box-container">
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Change;
