/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import "../styles/ViewNote.css";
import { backEndUrl } from "../../config.js";
import { Navigate, useSearchParams } from "react-router-dom";
import { ThemeContext } from "../stateManagment/Context.jsx";

const NewUpdateNote = ({newFolder, setSearchName, setSearchInput}) => {
  const [note, setNote] = useState({});
  const [created, setCreated] = useState(false)
  const [params] = useSearchParams()
  const id = params.get('id')

  const {userEmail, accessToken} = JSON.parse(sessionStorage.getItem('user'))

  const { themeBlack, themeWhite } = useContext(ThemeContext);
  const applyStyle = {
    backgroundColor : themeBlack,
    color : themeWhite
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote({ ...note, [name]: value });
  };

  const getSingleNote = async()=>{
    const response = await fetch(`${backEndUrl}/notes/${userEmail}/${newFolder}/${id}`,{
      headers : {
        'auth-token' : accessToken
      }
    })
    const view = await response.json()
    setNote(view)
}

  const handleSubmit = async (e) => {
    const { userEmail, accessToken } = JSON.parse(sessionStorage.getItem("user"));
    const dataSet = {
      userEmail: userEmail,
      notes: [note],
    };
    e.preventDefault();
    try {
      const response = await fetch(`${backEndUrl}/notes/${userEmail}/${id}`, {
        method: "PUT",
        body: JSON.stringify(dataSet),
        headers: {
          "Content-Type": "application/json",
          "auth-token" : accessToken
        },
      });
      const editNote = response.json()
      if (editNote) {
        setNote(editNote)
        setCreated(true)
      }
    } catch (err) {
      console.log(err);
    }

  };

  useEffect(()=>{
    setSearchName('not available')
    setSearchInput('')
  },[])

  useEffect(()=>{
    getSingleNote()
},[])
  if(created === true){
return <Navigate to={`/${newFolder}`} />
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
          Update
        </button>
      </div>
    </div>
  );
};

export default NewUpdateNote;
