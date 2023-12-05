/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "../styles/SideNav.css";
import { Link, Navigate } from "react-router-dom";
import { backEndUrl } from "../../config.js";

const SideNav = ({
  sideNavClass,
  setSideNavClass,
  setBars,
  setNewFolder,
  setSearchInput,
  sideNavFolder,
  setSideNavFolder,
}) => {
  const [name, setName] = useState("");

  const handleClickLink = (d) => {
    setSideNavClass("sideNav-container");
    setBars("bars");
    setNewFolder(d);
    setSearchInput("");
  };

  const user = () => {
    const userName = JSON.parse(sessionStorage.getItem("user"));
    setName(userName.userName);
  };

  // logout
  const [logout, setLogout] = useState(false);
  const handleLogout = () => {
    sessionStorage.removeItem("user");
    setLogout(true);
  };

  // to get folders
  const [folders, setFolders] = useState([]);
  const { accessToken, userEmail } = JSON.parse(sessionStorage.getItem("user"));
  const getFolders = async () => {
    let response = await fetch(`${backEndUrl}/folders/${userEmail}`, {
      headers: {
        "auth-token": accessToken,
      },
    });
    const folder = await response.json();
    let trimFolder = folder.folders.slice(2);
    setFolders(trimFolder);
  };

  const handleDeleteFolder = async (d) => {
    try {
      const deleteFolder = await fetch(
        `${backEndUrl}/folders/${userEmail}/${d}`,
        {
          method: "DELETE",
          headers: {
            "auth-token": accessToken,
          },
        }
      );
      if (deleteFolder) {
        setSideNavFolder(!sideNavFolder);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    user();
    getFolders();
  }, [sideNavFolder]);

  if (logout === true) {
    return <Navigate to={"/normalUser"} />;
  }
  return (
    <div className={`${sideNavClass}`}>
      <div className="sideNav-con2">
        <div className="sideNav-profile">
          <img
            src="https://www.pngkey.com/png/full/72-729716_user-avatar-png-graphic-free-download-icon.png"
            alt="User profile"
            className="sideNav-img"
          />
          <h4>{name}</h4>
        </div>
        <div className="sideNav-folders">
          <div className="sideNav-folders-linkDiv">
            <Link
              to="/home"
              className="sideNav-folders-link"
              onClick={handleClickLink}
            >
              <p>Home</p>
            </Link>
            <i className="fa-solid fa-house"></i>
          </div>

          <h3>Folders</h3>

          <ul>
            <div className="sideNav-folders-linkDiv">
              <Link
                to="/StickyNotes"
                className="sideNav-folders-link"
                onClick={handleClickLink}
              >
                <p>Sticky Notes</p>
              </Link>
              <i className="fa-regular fa-note-sticky"></i>
            </div>
            <div className="sideNav-folders-linkDiv">
              <Link
                to="/DailyTask"
                className="sideNav-folders-link"
                onClick={handleClickLink}
              >
                <p>Daily task</p>
              </Link>
              <i className="fa-solid fa-list-check"></i>
            </div>
            

            {folders.map((d, i) => (
              <div key={i} className="sideNav-folders-linkDiv">
                <Link
                  to={`/${d}`}
                  className="sideNav-folders-link"
                  onClick={() => handleClickLink(d)}
                >
                  <p>{d}</p>
                </Link>
                <i
                  className="fa-regular fa-trash-can"
                  onClick={() => handleDeleteFolder(d)}
                  style={{
                    cursor: "pointer",
                  }}
                ></i>
              </div>
            ))}
          </ul>
        </div>
      </div>
      <Link
        className="sideNav-logout"
        onClick={handleLogout}
        to={"/normalUser"}
      >
        <p className="logout-btn">Logout</p>
        <i className="fa-solid fa-right-from-bracket"></i>
      </Link>
    </div>
  );
};

export default SideNav;
