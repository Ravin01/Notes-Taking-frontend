/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import "../styles/Home.css";
import { useContext, useEffect, useState } from "react";
import { backEndUrl } from "../../config.js";
import { ThemeContext } from "../stateManagment/Context.jsx";


const Home = () => {
  const [folders, setFolders] = useState([]);
  const { accessToken, userEmail } = JSON.parse(sessionStorage.getItem("user"));

  const { themeBlack, themeWhite } = useContext(ThemeContext);

const [isCreated, setCreated] = useState(false)

  const getFolders = async () => {
    let response = await fetch(`${backEndUrl}/notes/${userEmail}`, {
      headers: {
        "auth-token": accessToken,
      },
    });
    const folder = await response.json();
    setFolders(folder.folders);
  };
  const [folderName, setFolderName] = useState({
    folder: "",
    userEmail: userEmail,
  });
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const handleFolderName = (e) => {
    const { name, value } = e.target;
    setFolderName({ ...folderName, [name]: value });
  };
  const handleCreateFolder = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${backEndUrl}/folders`, {
        method: "POST",
        body: JSON.stringify(folderName),
        headers: {
          "content-type": "application/json",
          "auth-token": accessToken,
        },
      });
      setFolderName({
        folder: "",
      });
      alert('new folders are not working, will working on it')
      setCreated(!isCreated)
      setShowCreateFolder(false);
    } catch (err) {
      console.log(err);
    }
  };
  const handleOpenFolderName = () => {
    if (showCreateFolder === true) {
      setShowCreateFolder(false);
    } else {
      setShowCreateFolder(true);
    }
  };
  useEffect(() => {
    getFolders();
  }, [isCreated]);
  return (
    <div
      className="home-container"
      style={{
        backgroundColor : themeWhite,
        color: themeBlack,
      }}
    >
      <div className="home-header">
        <h3>Folders</h3>
        <div className="home-create">
          <div className="home-create-btn">
            <button onClick={handleOpenFolderName} style={{
              backgroundColor : themeBlack,
              color : themeWhite
            }}>
              <i className="fa-solid fa-plus"></i>New Folder
            </button>
            {showCreateFolder && (
              <div className="home-create-folder" style={{
                backgroundColor : themeBlack,
                color : themeWhite
              }}>
                <i className="fa-solid fa-folder"></i>
                <input
                  type="text"
                  placeholder="Folder Name"
                  required
                  value={folderName.folder}
                  onChange={handleFolderName}
                  name="folder"
                  style={{
                    backgroundColor : themeWhite,
                    color : themeBlack
                  }}
                />
                <button onClick={handleCreateFolder} style={{
                  backgroundColor : themeWhite,
                  color : themeBlack
                }}>Create</button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="home-body">
        {folders.map((d, i) => (
          <Link className="home-folder" to={`/${d}`} key={i} style={{
            color : themeBlack
          }}>
            <i className="fa-solid fa-folder"></i>
            <p>{d}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
