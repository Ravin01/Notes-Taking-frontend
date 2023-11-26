/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import "../styles/StickyNotes.css";
import { useContext, useEffect, useState } from "react";
import { backEndUrl } from "../../config.js";
import { ThemeContext } from "../stateManagment/Context.jsx";

const NewNotes = ({ isStickAdded, setStickAdded, newFolder, setSearchName, setSearchInput, searchInput, setNewFolder }) => {
  const [data, setData] = useState([]);
  const { userEmail, accessToken } = JSON.parse(sessionStorage.getItem("user"));

  const { themeBlack, themeWhite } = useContext(ThemeContext);


const [noteResult, setNoteResult] = useState([])

  const getData = async () => {
    try {
      const response = await fetch(`${backEndUrl}/notes/${userEmail}/${newFolder}`, {
        headers: {
          "auth-token": accessToken,
        },
      });
      const allData = await response.json();
      setNoteResult(allData)
      setData(allData);
      setNewFolder
    } catch (err) {
      console.log(err);
    }
  };

  const deleteNote = async (id) => {
    try {
      await fetch(`${backEndUrl}/notes/${userEmail}/${id}`, {
        method: "DELETE",
        headers: {
          "auth-token": accessToken,
        },
      });
      setStickAdded(!isStickAdded);
    } catch (err) {
      console.log(err);
    }
  };

  const filteringFolders = ()=>{
    if(!searchInput){
      setData(noteResult)
    }else{
      const filteredData = noteResult.filter(item =>
        item.title.toLowerCase().includes(searchInput.toLowerCase())
      );
      setData(filteredData)
    }
   
  }

  useEffect(()=>{
    filteringFolders()
  },[searchInput])

  useEffect(()=>{
    setSearchName('note title')
    setSearchInput('')
  },[])

  useEffect(() => {
    getData();
  }, [isStickAdded, newFolder]);
  return (
    <>

        <div
          className="sticky-container"
          style={{
            backgroundColor: themeWhite,
            color: themeBlack,
          }}
        
        >
          <div className="sticky-header">
            <h3
              style={{
                color: themeBlack,
              }}
            >
              {newFolder}
            </h3>
            <div className="sticky-create">
              <div className="sticky-create-btn">
                <button
                  style={{
                    backgroundColor: themeBlack,
                    color: themeWhite,
                  }}
                >
                  <i className="fa-solid fa-plus"></i>
                  <Link
                    to={`/${newFolder}/create`}
                    className="sticky-create-link"
                    style={{
                      color: themeWhite,
                    }}
                  >
                    Create New Note
                  </Link>
                </button>
              </div>
            </div>
          </div>
          <div className="sticky-body">
            {data.map((d, i) => (
              <div
                key={i}
                className="sticky-note-div"
                style={{
                  backgroundColor: themeBlack,
                  color: themeWhite,
                }}
              >
                <Link
                  className="sticky-note"
                  to={`/${newFolder}/view?id=${d.id}`}
                  key={i}
                  style={{
                    color: themeWhite,
                  }}
                >
                  <h4>{d.title}</h4>
                  <p className="sticky-note-p">{d.note}</p>
                </Link>
                <div className="sticky-note-bottom">
                  <p>
                    {`${new Date(d.date).getFullYear()}/${
                      new Date(d.date).getMonth() + 1
                    }/${new Date(d.date).getDate()},${new Date(
                      d.date
                    ).getHours()}:${new Date(d.date).getMinutes()}`}
                  </p>
                  <Link
                    to={`/${newFolder}/edit?id=${d.id}`}
                    className="sticky-edit-link"
                    style={{
                      color: themeWhite,
                    }}
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </Link>
                  <button
                    onClick={() => deleteNote(d.id)}
                    style={{
                      color: themeWhite,
                    }}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      
    </>
  );
};

export default NewNotes;
