/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import "../styles/StickyNotes.css";
import { useContext, useEffect, useState } from "react";
import { backEndUrl } from "../../config.js";
import { ThemeContext } from "../stateManagment/Context.jsx";

const StickyNotes = ({isStickAdded, setStickAdded, setSearchName, setSearchInput, searchInput}) => {
  const [data, setData] = useState([]);
  const { userEmail, accessToken } = JSON.parse(sessionStorage.getItem("user"));

  const { themeBlack, themeWhite } = useContext(ThemeContext);

  const colors = [ '#3648E3', '#DC7633', '#00FF00', '#F1C40F', '#D62F2F', '#7D3C98'];

  // Accessing the current URL
  // const location = useLocation();
  // const currentURL = location.pathname;

  const [stickyResult, setStickyResult] = useState([])

  const getData = async () => {
    try {
      const response = await fetch(`${backEndUrl}/notes/${userEmail}/stickyNotes`, {
        headers: {
          "auth-token": accessToken,
        },
      });
      const allData = await response.json();
      setStickyResult(allData)
      setData(allData)
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
      setStickAdded(!isStickAdded)
    } catch (err) {
      console.log(err);
    }
  };


  const filteringFolders = ()=>{
    if(!searchInput){
      setData(stickyResult)
    }else{
      const filteredData = stickyResult.filter(item =>
        item.title.toLowerCase().includes(searchInput.toLowerCase())
      );
      setData(filteredData)
    }
   
  }

  useEffect(()=>{
    filteringFolders()
  },[searchInput])

  useEffect(()=>{
    setSearchName('sticky title')
    setSearchInput('')
  },[])

  useEffect(() => {
    getData();
  }, [isStickAdded]);

  return (
    <div className="sticky-container" style={{
      backgroundColor : themeWhite,
      color : themeBlack
    }}>
      <div className="sticky-header">
        <h3 style={{
          color : themeBlack
        }}>Sticky Notes</h3>
        <div className="sticky-create">
          <div className="sticky-create-btn">
            <button style={{
              backgroundColor : themeBlack,
              color : themeWhite
            }}>
              <i className="fa-solid fa-plus"></i>
              <Link to="/stickyNotes/create" className="sticky-create-link" style={{
                color : themeWhite
              }}>
                Create New Sticky
              </Link>
            </button>
          </div>
        </div>
      </div>
      <div className="sticky-body">
        {data.map((d, i) => (
          <div key={i} className="sticky-note-div" style={{
            backgroundColor : colors[i % colors.length],
            color : '#040404'
          }} >
            <Link
              className="sticky-note"
              to={`/StickyNotes/view?id=${d.id}`}
              key={i}
              style={{
                color : '#040404'
              }}
            >
              <h4>{d.title}</h4>
              <p className="sticky-note-p">{d.note}</p>
            </Link>
            <div className="sticky-note-bottom">
              <p style={{
                color : '#040404'
              }}>
              {`${new Date(d.date).getFullYear()}/${new Date(d.date).getMonth()+1}/${new Date(d.date).getDate()},${new Date(d.date).getHours()}:${new Date(d.date).getMinutes()}`}
              </p>
              <Link  to={`/StickyNotes/edit?id=${d.id}`} className="sticky-edit-link"  style={{
                color : '#040404'
              }} >
              <i className="fa-solid fa-pen-to-square"></i>
              </Link>
              <button onClick={() => deleteNote(d.id)} style={{
                color : '#040404'
              }}>
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StickyNotes;
