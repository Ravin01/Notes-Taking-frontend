/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "../styles/SideNav.css";
import { Link, Navigate } from "react-router-dom";
import { backEndUrl } from "../../config.js";

const SideNav = ({sideNavClass, setSideNavClass, setBars}) => {
  const [name, setName] = useState("");

  const [isCreated, setCreated] = useState(false)

const handleClickLink = ()=>{
  setSideNavClass('sideNav-container')
  setBars('bars')
}

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
  const [folders, setFolders] = useState([])
  const {accessToken, userEmail} = JSON.parse(sessionStorage.getItem('user'))
  const getFolders = async()=>{
    let response = await fetch(`${backEndUrl}/notes/${userEmail}`,{
      headers : {
        'auth-token' : accessToken
      }
    })
    const folder = await response.json()
    let trimFolder = folder.folders.slice(3)
    setFolders(trimFolder)
    setCreated(!isCreated)
  }



  useEffect(() => {
    user();
    getFolders()
  }, [isCreated]);

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
      <Link to='/home' className="sideNav-folders-link" onClick={handleClickLink} >
          <p>Home</p>
            <i className="fa-solid fa-house"></i>
          </Link>
        <h3>Folders</h3>
        
        <ul>
          <Link to='/StickyNotes'className="sideNav-folders-link" onClick={handleClickLink} >
            <p>Sticky Notes</p>
            <i className="fa-regular fa-note-sticky"></i>
          </Link>
          <Link to='DailyTask'  className="sideNav-folders-link" onClick={handleClickLink} >
            <p>Daily Task</p>
            <i className="fa-solid fa-list-check"></i>
          </Link>
          <Link to='ImportantNotes' className="sideNav-folders-link" onClick={handleClickLink} >
            <p>Important Notes</p>
            <i className="fa-solid fa-star"></i>
          </Link>
          {folders.map((d,i)=>(
            <Link to='ImportantNotes' className="sideNav-folders-link" key={i} onClick={handleClickLink} >
            <p>{d}</p>
            <i className="fa-solid fa-folder"></i>
          </Link>
          ))}
        </ul>
      </div>
      </div>
      <Link className="sideNav-logout" onClick={handleLogout} to={'/normalUser'} >
        <p className="logout-btn">Logout</p>
        <i className="fa-solid fa-right-from-bracket"></i>
      </Link>
    </div>
  );
};

export default SideNav;
