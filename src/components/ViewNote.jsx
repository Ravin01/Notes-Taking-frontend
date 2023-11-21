/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { useEffect } from "react";
import "../styles/ViewNote.css";
import { backEndUrl } from "../../config.js";
import { Link, useSearchParams } from "react-router-dom";
import { ThemeContext } from "../stateManagment/Context.jsx";

const ViewNote = () => {
  const [params] = useSearchParams()
  const id = params.get('id')
  const [note, setNote] = useState({})

  const { themeBlack, themeWhite } = useContext(ThemeContext);
const applyStyle = {
  backgroundColor : themeBlack,
  color : themeWhite
}

const {userEmail, accessToken} = JSON.parse(sessionStorage.getItem('user'))
const getSingleNote = async()=>{
    const response = await fetch(`${backEndUrl}/notes/${userEmail}/${id}`,{
      headers : {
        'auth-token' : accessToken
      }
    })
    const view = await response.json()
    console.log(view)
    setNote(view)
}
useEffect(()=>{
    getSingleNote()
},{})
  return (
    <div className="viewNote-container" style={{
      backgroundColor : themeWhite,
      color : themeBlack
    }}>
        <button type="button" style={applyStyle} >
          <Link to='/stickyNotes' style={{
            color : themeWhite,
            textDecoration : 'none'
          }}>Go Back</Link>
        </button>
      <div className="viewNote-con2">
        <input
          type="text"
          placeholder="Enter title"
          name="title"
          id="title"
          value={note.title}
          required
          style={applyStyle}
        />
        <textarea
          type="text"
          placeholder="Enter Body"
          name="note"
          id="note"
          value={note.note}
          className="viewNote-input2"
          required
          style={applyStyle}
        />
        
      </div>
    </div>
  );
};

export default ViewNote;
