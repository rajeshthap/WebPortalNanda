import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { RiDashboard3Line } from "react-icons/ri";
import {
  MdOutlinePublishedWithChanges,
  MdOutlineFormatAlignRight,
  MdLibraryBooks,
} from "react-icons/md";
import { LuLogOut } from "react-icons/lu";
import { HiOutlineUser } from "react-icons/hi";
import { ImFilePdf } from "react-icons/im";
import {
  FaRegFileAlt,
  FaChalkboardTeacher,
  FaAlignLeft,
} from "react-icons/fa";

import UKLogon from "../../assets/images/UKLogo.png";
import MenuIcon from "../../assets/images/menu_icon.png";
import "../../assets/css/LeftNav.css";

function InnerNavigation() {
  const [isNavClosed, setIsNavClosed] = useState(false);
  const [userName, setUserName] = useState("Loading...");
  const [activePath, setActivePath] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

useEffect(() => {
    // Set initial name from stored user data on component mount (e.g., after login)
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.name) {
      setUserName(storedUser.name); // Set name from login data
    }

    // Set initial path
    setActivePath(location.pathname);

    // Interval to check for updates to user name
    const interval = setInterval(() => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const updatedUser = JSON.parse(localStorage.getItem("updatedPhase1Data"));
      const newName =
        updatedUser?.kanya_name || storedUser?.name || "Unknown User";

      setUserName((prevName) => {
        if (prevName !== newName) {
          return newName; // Update name only if it has changed
        }
        return prevName; // Keep previous name if no change
      });

      // Update path if route changes
      setActivePath(location.pathname);
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [location.pathname]); // Re // Check every 1 second

  

  const toggleNav = () => {
    setIsNavClosed(!isNavClosed);
  };

  const handleDownload = (fileUrl, fileName) => {
    const a = document.createElement("a");
    a.href = fileUrl;
    a.setAttribute("download", fileName);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

   
  const logout = () => {
    const token = localStorage.getItem("access_token");
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.clear();
      alert(`Logout successful!`);
      navigate("/UserLogin", { replace: true });
    }
  };

  const navigationOptions = [
    { icon: <RiDashboard3Line />, label: "Dashboard", path: "/UserDashboard" },
    { icon: <MdOutlinePublishedWithChanges />, label: "Change Password", path: "/Change" },
    { icon: <FaRegFileAlt />, label: "Request Query", path: "/SubmitRequest" },
    { icon: <MdOutlineFormatAlignRight />, label: "Form Status", path: "/FormStatus" },
    {
      icon: <ImFilePdf />,
      label: "नंदा गौरा योजना विषयक शासनादेश",
      download: true,
      fileUrl: "/praroop1_tutorial.pdf",
      fileName: "praroop1_tutorial.pdf",
    },
    {
      icon: <MdLibraryBooks />,
      label: "Girl Child Form Tutorial",
      download: true,
      fileUrl: "/shashandesh_new.pdf",
      fileName: "shashandesh_new.pdf",
    },
    {
      icon: <FaChalkboardTeacher />,
      label: "12th Form Tutorial",
      download: true,
      fileUrl: "/praroop2_tutorial.pdf",
      fileName: "praroop2_tutorial.pdf",
    },
    { icon: <HiOutlineUser />, label: "Contact Us", path: "/DepartmentContact" },
  ];

  return (
    <>
      <header className="user-nd-header">
        <div className="logosec">
          <img
            src={MenuIcon}
            className="icn menuicn"
            alt="menu-icon"
            onClick={toggleNav}
          />
          <Link to="#" className="logo-page">
            <img src={UKLogon} alt="logo" className="logo" />
          </Link>
          <div className="nd-title">
            <span className="nd-subtitle">उत्तराखंड सरकार | Gov.t of Uttarakhand</span>
            <span className="subtitle">
              महिला सशक्तिकरण एवं बाल विकास विभाग उत्तराखंड
            </span>
          </div>
        </div>

        <div className="message">
          <div className="nd-msg">
            <div>User: {userName}

             
            </div>
          </div>
          <div className="dp" title="Click to logout">
            <div className="nd-log-icon" onClick={logout}>
              <LuLogOut />
            </div>
          </div>
        </div>
      </header>

      <div className={`navcontainer ${isNavClosed ? "navclose" : ""}`}>
        <nav className="nav">
          <div className="nav-upper-options">
            <div className="nd-menu">
              <FaAlignLeft
                className="icn menuicn"
                alt="menu-icon"
                onClick={toggleNav}
              />
              <div className="nd-user">User: {userName}</div>
              <div
                className="nd-log-icon-mob"
                title="Click to logout"
                onClick={logout}
              >
                <LuLogOut />
              </div>
            </div>

            {navigationOptions.map((option, index) => (
              <React.Fragment key={index}>
                {option.download ? (
                  <div
                    className={`nav-option option${index + 1} ${
                      activePath === option.fileUrl ? "active-nav" : ""
                    }`}
                    onClick={() => {
                      setActivePath(option.fileUrl);
                      handleDownload(option.fileUrl, option.fileName);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="nav-item d-flex">
                      <span className="nav-icon">{option.icon}</span>
                      <span className="nav-label">{option.label}</span>
                    </div>
                  </div>
                ) : (
                  <Link
                    to={option.path}
                    className={`nav-option option${index + 1} ${
                      activePath === option.path ? "active-nav" : ""
                    }`}
                    onClick={() => setActivePath(option.path)}
                  >
                    <div className="nav-item d-flex">
                      <span className="nav-icon">{option.icon}</span>
                      <span className="nav-label">{option.label}</span>
                    </div>
                  </Link>
                )}
              </React.Fragment>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
}

export default InnerNavigation;
