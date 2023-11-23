/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import "../styles/ViewNote.css";
import { backEndUrl } from "../../config.js";
import { Navigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeContext } from "../stateManagment/Context.jsx";

const CreateNote = ({isStickAdded, setStickAdded}) => {
  const [note, setNote] = useState({
    title: "",
    note: "",
  });
  const [created, setCreated] = useState(false)

  const { themeBlack, themeWhite } = useContext(ThemeContext);
  const applyStyle = {
    backgroundColor : themeBlack,
    color : themeWhite
  }


    // Accessing the current URL
    const location = useLocation();
    const currentURL = location.pathname;


  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote({ ...note, [name]: value });
  };
  const handleSubmit = async (e) => {
    const { userEmail, accessToken } = JSON.parse(sessionStorage.getItem("user"));
    const dataSet = {
      userEmail: userEmail,
      notes: [{...note, folder : `${currentURL}`}],
    };
    console.log(dataSet)
    e.preventDefault();
    try {
      const newNote = await fetch(`${backEndUrl}/notes`, {
        method: "POST",
        body: JSON.stringify(dataSet),
        headers: {
          "Content-Type": "application/json",
          "auth-token" : accessToken
        },
      });
      if (newNote) {
        toast.success(`Note created successfully`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
  
        setCreated(true)
        setStickAdded(!isStickAdded)
      }
    } catch (err) {
      console.log(err);
    }
    setNote({
      title: "",
      note: "",
    });

  };
  if(created === true){
return <Navigate to={'/stickyNotes'} />
  }
  return (
    <div className="viewNote-container">
      <div className="viewNote-con2">
        <input
          type="text"
          placeholder="Enter title"
          name="title"
          id="title"
          value={note.title}
          onChange={handleChange}
          required
          style={applyStyle}
        />
        <textarea
          type="text"
          placeholder="Enter Body"
          name="note"
          id="note"
          value={note.note}
          onChange={handleChange}
          className="viewNote-input2"
          required
          style={applyStyle}
        />
        <button type="button" onClick={handleSubmit} style={applyStyle} >
          Create Note
        </button>
      </div>
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
    </div>
  );
};

export default CreateNote;
