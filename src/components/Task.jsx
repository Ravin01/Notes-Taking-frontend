import { useContext, useEffect, useState } from "react";
import "../styles/Task.css";
import TaskMode from "./TaskMode";
import { ThemeContext } from "../stateManagment/Context.jsx";
import {  useSearchParams } from "react-router-dom";
import { backEndUrl } from "../../config.js";

const Task = () => {
  const { themeBlack, themeWhite } = useContext(ThemeContext);

  const { accessToken, userEmail } = JSON.parse(sessionStorage.getItem("user"));

  const [taskList, setTaskList] = useState([]);

  const [params] = useSearchParams()
  const id = params.get('id')

  const [addTask, setAddTask] = useState({
    name: "",
    mode : "working"
  });

  const [isAdded, setIsAdded] = useState(false)

  

  const handleInputAddTask = (e) => {
    const { name, value } = e.target;
    setAddTask({ ...addTask, [name]: value });
  };
  const handleSubmitAddTask = async (e) => {
    e.preventDefault();
    await fetch(`${backEndUrl}/daily/${userEmail}/${id}`,{
        method : 'POST',
        body : JSON.stringify(addTask),
        headers : {
            'content-type' : 'application/json',
            'auth-token' : accessToken
        }
    })
    setAddTask({
        name : '',
        mode : 'working'
    })
    setIsAdded(!isAdded)
  };




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

  const [innerWidth, setInnerWidth] = useState(window.innerWidth)


  

  useEffect(()=>{
    getDailyTask()
    
  },[isAdded])
  useEffect(()=>{
    window.addEventListener("resize", ()=>{
      setInnerWidth(window.innerWidth)
    })
  })
  return (
    <div
      className="task-container"
      style={{
        backgroundColor: themeWhite,
        color: themeBlack,
      }}
    >
      <div className="task-header">
        <div className="task-header-title">
            <h3>{taskList.taskName}</h3>
          <h5>
          {
            `${new Date(taskList.date).getDate()} ${new Date(taskList.date).toLocaleDateString('en-US', { month: 'short' })} ${new Date(taskList.date).getFullYear()}`}
          </h5>
        </div>
        <div className="task-header-input">
          <input
            type="text"
            name="name"
            id="name"
            value={addTask.name}
            onChange={handleInputAddTask}
            placeholder="Enter a new task.."
            required
          />
          <button
            type="submit"
            onClick={handleSubmitAddTask}
            style={{
              backgroundColor: themeBlack,
              color: themeWhite,
            }}
          >
            Add
          </button>
        </div>
      </div>
      <div className="task-body">
        <TaskMode
          width={
            innerWidth < 768
             ? "90vw" 
             : innerWidth < 1050
             ? "30vw"
             : "20vw"
          }
          taskModeBackgroundColor="#1E8449"
          headerName="Done"
          mode = 'done'
          isAdded={isAdded}
          setIsAdded={setIsAdded}

        />
        <TaskMode
           width={
            innerWidth < 768
             ? "90vw" 
             : innerWidth < 1050
             ? "30vw"
             : "28vw"
          }
          taskModeBackgroundColor="#D68910"
          headerName="Working"
          mode = 'working'
          isAdded={isAdded}
          setIsAdded={setIsAdded}
          className='taskMode-second'
        />
        <TaskMode
           width={
            innerWidth < 768
             ? "90vw" 
             : innerWidth < 1050
             ? "30vw"
             : "20vw"
          }
          taskModeBackgroundColor="#CB4335"
          headerName="Stuck"
          mode = 'stuck'
          isAdded={isAdded}
          setIsAdded={setIsAdded}
        />
      </div>
    </div>
  );
};

export default Task;
