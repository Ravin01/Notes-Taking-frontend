/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link, useLocation } from "react-router-dom";
import "../styles/Home.css";
import { useContext, useEffect, useState } from "react";
import { backEndUrl } from "../../config.js";
import { ThemeContext } from "../stateManagment/Context.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = ({ setNewFolder, searchInput, setSearchInput, setSearchName, setSideNavFolder, sideNavFolder, setFoldersRoute }) => {
  const [folders, setFolders] = useState([]);

  const { accessToken, userEmail } = JSON.parse(sessionStorage.getItem("user"));

  const { themeBlack, themeWhite } = useContext(ThemeContext);

  const [isCreated, setCreated] = useState(false);

const [foldersResult, setFoldersResult] = useState([])

  const getFolders = async () => {
    let response = await fetch(`${backEndUrl}/folders/${userEmail}`, {
      headers: {
        "auth-token": accessToken,
      },
    });

    const folder = await response.json();
    
setFoldersResult(folder.folders)
    setFolders(folder.folders);
    setFoldersRoute(folder.folders)

  };

  const filteringFolders = ()=>{
    if(!searchInput){
      setFolders(foldersResult)
    }else{
      const filteredData = foldersResult.filter(item =>
        item.toLowerCase().includes(searchInput.toLowerCase())
      );
      setFolders(filteredData)
    }
    setSearchName('folders')
  }


  


  const [folderName, setFolderName] = useState({
    folder: "",
    userEmail: userEmail,
  });
  const [showCreateFolder, setShowCreateFolder] = useState(false);

  // const handleFolderName = (e) => {
  //   const { name, value } = e.target;
  //   if (!/\s/.test(value)) {
  //   setFolderName({ ...folderName, [name]: value });
  //   }
  //   else{
  //     alert('space not allowed')
  //   }
  // };

  const handleFolderName = (e) => {
    const { name, value } = e.target;
   let valueMod = value.replace(/\s/g, '_');
    setFolderName({ ...folderName, [name]: valueMod });
    
  };

  const handleCreateFolder = async (e) => {
    e.preventDefault();
    try {
      let createNewFolder = await fetch(`${backEndUrl}/folders/${userEmail}`, {
        method: "POST",
        body: JSON.stringify(folderName),
        headers: {
          "content-type": "application/json",
          "auth-token": accessToken,
        },
      });
      if(createNewFolder.status === 401){
        toast.error("Folder already exists, try other name", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }else{
        setFolderName({
          folder: "",
        });
        setCreated(!isCreated);
setSideNavFolder(!sideNavFolder)
      setShowCreateFolder(false);
      }
      
      
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

  const location = useLocation();
  const currentURL = location.pathname;

  const handleNavigate = (d) => {
    setNewFolder(d);
    setSearchInput('')
  };




  useEffect(()=>{
    filteringFolders()
  },[searchInput])

  useEffect(()=>{
    setSearchInput('')
  },[])

  useEffect(() => {
    getFolders();
  }, [isCreated, sideNavFolder]);

  return (
    <div
      className="home-container"
      style={{
        backgroundColor: themeWhite,
        color: themeBlack,
      }}
    >
    <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="home-header">
        <h3>Folders</h3>
        <div className="home-create">
          <div className="home-create-btn">
            <button
              onClick={handleOpenFolderName}
              style={{
                backgroundColor: themeBlack,
                color: themeWhite,
              }}
            >
              <i className="fa-solid fa-plus"></i>New Folder
            </button>
            {showCreateFolder && (
              <div
                className="home-create-folder"
                style={{
                  backgroundColor: themeBlack,
                  color: themeWhite,
                }}
              >
                <i className="fa-solid fa-folder"></i>
                <input
                  type="text"
                  placeholder="FolderName"
                  required
                  value={folderName.folder}
                  onChange={handleFolderName}
                  name="folder"
                  style={{
                    backgroundColor: themeWhite,
                    color: themeBlack,
                  }}
                />
                <button
                  onClick={handleCreateFolder}
                  style={{
                    backgroundColor: themeWhite,
                    color: themeBlack,
                  }}
                >
                  Create
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="home-body">
        {folders.map((d, i) => (
          <Link
            className="home-folder"
            to={`/${d}`}
            key={i}
            style={{
              color: themeBlack,
            }}
            onClick={() => handleNavigate(d)}
          >
            <i className="fa-solid fa-folder"></i>
            <p>{d}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
