/* eslint-disable react/prop-types */
import "../styles/TaskMode.css";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../stateManagment/Context.jsx";
import { useSearchParams } from "react-router-dom";
import { backEndUrl } from "../../config.js";



const TaskMode = ({
  width,
  taskModeBackgroundColor,
  headerName,
  mode,
  isAdded,
  setIsAdded,
}) => {
  const { themeBlack, themeWhite } = useContext(ThemeContext);

  const [modeTask, setModeTask] = useState([]);

  const [workingMode, setWorkingMode] = useState(false);

  const { accessToken, userEmail } = JSON.parse(sessionStorage.getItem("user"));

  const [taskList, setTaskList] = useState([]);



  const [params] = useSearchParams()
  const id = params.get('id')

  const getDailyTask = async()=>{
    try{
        const response = await fetch(`${backEndUrl}/daily/${userEmail}/${id}`,{
            headers : {
                'auth-token' : accessToken
            }
        })
        const dailyTaskData = await response.json()
        if(response.status === 409){
            alert('create')
        }else{
            setTaskList(dailyTaskData)
        }
    }catch(err){
        console.log(err)
    }
  }


  const handleClickModeDone = async(d)=>{
    const swiftDone = await fetch(`${backEndUrl}/daily/${userEmail}/${id}/${d}/done`,{
        method : 'PUT',
        body : JSON.stringify(),
        headers : {
            'content-type' : 'application/json',
            'auth-token' : accessToken
        }
    })
    if(swiftDone){
        setIsAdded(!isAdded)
    }
  }
  const handleClickModeStuck = async(d)=>{
    const swiftDone = await fetch(`${backEndUrl}/daily/${userEmail}/${id}/${d}/stuck`,{
        method : 'PUT',
        body : JSON.stringify(),
        headers : {
            'content-type' : 'application/json',
            'auth-token' : accessToken
        }
    })
    if(swiftDone){
        setIsAdded(!isAdded)
    }
  }


  const filterMode = () => {
    const filter = taskList.task.filter((item) => item.mode === mode);
      setModeTask(filter);
    if (mode === "working") {
        setWorkingMode(true);
      }
  };
  

  const containerStyle = {
    backgroundColor: themeWhite,
        color: themeBlack,
        width: width,
        border: `3px solid ${taskModeBackgroundColor}`,
  }

 

  useEffect(() => {
    getDailyTask()
  }, [isAdded]);

  useEffect(() => {
    setTimeout(()=>{
        filterMode();
    },100)
  }, [taskList, isAdded]);
  return (
    <div
      className="taskMode-container"
      style={containerStyle}
    >
      <div
        className="taskMode-header"
        style={{
          backgroundColor: taskModeBackgroundColor,
        }}
      >
        <h3>{headerName}</h3>
        {modeTask.length}
      </div>
      <div className="taskMode-body">
        {modeTask.map((d, i) => (
          <div
            className="taskMode-item"
            key={i}
            style={{
              backgroundColor: themeWhite,
              color: themeBlack,
            }}
          >
            <h4>{d.name}</h4>
              {workingMode && (
            <div className="taskMode-buttons">
                  <button type="button" className="taskMode-btn-green" onClick={()=>handleClickModeDone(d.taskId)}>
                    done
                  </button>
                  <button type="button" className="taskMode-btn-red" onClick={()=>handleClickModeStuck(d.taskId)} >
                    stuck
                  </button>
            </div>
              )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskMode;
