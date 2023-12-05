/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { backEndUrl } from "../../config.js";
import { ThemeContext } from "../stateManagment/Context.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import '../styles/DailyTask.css'

const DailyTask = ({ setNewFolder, searchInput, setSearchInput, setSearchName, setSideNavFolder, sideNavFolder, setFoldersRoute }) => {

  const [dailyTask, setDailyTask] = useState([]);

  const { accessToken, userEmail } = JSON.parse(sessionStorage.getItem("user"));

  const { themeBlack, themeWhite } = useContext(ThemeContext);

  const [isCreated, setCreated] = useState(false);

const [dailyTasksResult, setDailyTasksResult] = useState([])

  const getDailyTasks = async () => {
    let response = await fetch(`${backEndUrl}/daily/${userEmail}`, {
      headers: {
        "auth-token": accessToken,
      },
    });

    const resultDailyTasks = await response.json();
    
    setDailyTasksResult(resultDailyTasks.dailyTask)
    setDailyTask(resultDailyTasks.dailyTask.reverse())

  };

  const filteringFolders = ()=>{
    if(!searchInput){
      setDailyTask(dailyTasksResult)
    }else{
      const filteredData = dailyTasksResult.filter(item =>
        item.taskName.toLowerCase().includes(searchInput.toLowerCase())
      );
      setDailyTask(filteredData)
    }
    setSearchName('daily tasks')
  }


  


  const [dailyTaskName, setDailyTaskName] = useState({
    taskName : "",
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

  const handleDailyTaskName = (e) => {
    const { name, value } = e.target;
   let valueMod = value.replace(/\s/g, '_');
    setDailyTaskName({ ...dailyTaskName, [name]: valueMod });
    
  };

  const handleCreateDailyTask = async (e) => {
    e.preventDefault();
    try {
      console.log(dailyTaskName)
      let createNewTask = await fetch(`${backEndUrl}/daily/${userEmail}`, {
        method: "POST",
        body: JSON.stringify(dailyTaskName),
        headers: {
          "content-type": "application/json",
          "auth-token": accessToken,
        },
      });
      if(createNewTask.status === 403){
        toast.error("Error while creating new task", {
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
        setDailyTaskName({
          taskName: "",
        });
        setCreated(!isCreated);
// setSideNavFolder(!sideNavFolder)
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

  // const location = useLocation();
  // const currentURL = location.pathname;

  const handleNavigate = (d) => {
    // setNewFolder(d);
    setSearchInput('')
    console.log(d)
  };




  useEffect(()=>{
    filteringFolders()
  },[searchInput])

  // useEffect(()=>{
  //   setSearchInput('')
  // },[])

  useEffect(() => {
    getDailyTasks()
  }, [isCreated]);

  return (
    <div
      className="daily-container"
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
      <div className="daily-header">
        <h3>Daily Tasks</h3>
        <div className="daily-create">
          <div className="daily-create-btn">
            <button
              onClick={handleOpenFolderName}
              style={{
                backgroundColor: themeBlack,
                color: themeWhite,
              }}
            >
              <i className="fa-solid fa-plus"></i>Today Task
            </button>
            {showCreateFolder && (
              <div
                className="daily-create-folder"
                style={{
                  backgroundColor: themeBlack,
                  color: themeWhite,
                }}
              >
                <i className="fa-solid fa-folder"></i>
                <input
                  type="text"
                  placeholder="TaskName"
                  required
                  value={dailyTaskName.taskName}
                  onChange={handleDailyTaskName}
                  name="taskName"
                  style={{
                    backgroundColor: themeWhite,
                    color: themeBlack,
                  }}
                />
                <button
                  onClick={handleCreateDailyTask}
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
      <div className="daily-body">
        {dailyTask.map((d, i) => (
          <Link
            className="daily-folder"
            to={`/DailyTask/task?id=${d.id}`}
            key={i}
            style={{
              color: themeWhite,
              backgroundColor : themeBlack
            }}
            onClick={() => handleNavigate(d.id)}
          >
            <div>
            <p className="daily-taskName">{d.taskName}</p>
            </div>
            <div className="daily-name-div">
            <p className="daily-time" >
            {new Date(d.date).getDate() === new Date().getDate() ? `Today` :
            `${new Date(d.date).getDate()} ${new Date(d.date).toLocaleDateString('en-US', { month: 'short' })} ${new Date(d.date).getFullYear()}`}
            </p>
            <i className="fa-solid fa-angle-right"></i>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DailyTask;
