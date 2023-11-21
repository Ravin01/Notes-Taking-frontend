import {  Route, Routes, useNavigate } from "react-router-dom";

import SideNav from "../../components/SideNav";
import "../../styles/HomeLayout.css";
import Home from "../../components/Home";
import DailyTask from "../../components/DailyTask";
import StickyNotes from "../../components/StickyNotes";
import ImportantNotes from "../../components/ImportantNotes";
import CreateNote from "../../components/CreateNote";
import Preloader from '../../preloader/Preloader'
import ViewNote from "../../components/ViewNote";
import UpdateNote from "../../components/UpdateNote";
import { useEffect, useState } from "react";
import { ThemeContext } from "../../stateManagment/Context";

const HomeLayout = () => {
  const [bars, setBars] = useState('bars')
  const [sideNavClass, setSideNavClass] = useState('sideNav-container')
  const [isStickAdded, setStickAdded] = useState(false)

  const [loading, setLoading] = useState(true);

  const [themeIcon, setThemeIcon] = useState('sun')
  const [themeBlack, setThemeBlack] = useState('#242424')
  const [themeWhite, setThemeWhite] = useState('#d0d3d4')

  const navigate = useNavigate(); 

  const [viewFont, setViewFont] = useState(false)
const [font, setFont] = useState('cursive')
  const handleOpenFont = () =>{
    setViewFont(!viewFont)
  }
const handleSetFont1 = ()=>{
  setFont('Verdana, Geneva, Tahoma, sans-serif')
  setViewFont(!viewFont)
}
const handleSetFont2 = ()=>{
  setFont('cursive')
  setViewFont(!viewFont)
}
const handleSetFont3 = ()=>{
  setFont('Arial, Helvetica, sans-serif')
  setViewFont(!viewFont)
}


  const handleChangeTheme = ()=>{
    if(themeIcon === 'sun'){
      setThemeIcon('moon')
      setThemeBlack('#d0d3d4')
      setThemeWhite('#242424')
    }else{
      setThemeIcon('sun')
      setThemeBlack('#242424')
      setThemeWhite('#d0d3d4')
    }
  }
  const handleOpenSideNav = () => {
    if(bars === 'bars'){
      setBars('x')
      setSideNavClass('sideNav-container-open')
    }else{
      setBars('bars')
      setSideNavClass('sideNav-container')
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2500); 
  }, []);

  return (
    <>
    {loading ? <Preloader /> :
    <div className="homeLayout-container" style={{
      backgroundColor : themeWhite,
      color : themeBlack,
      fontFamily : font
    }}>
      
      <div className="homeLay-main">
        <div className="homeLay-topNav">
          <div className="homeLay-search">
            <input type="text" placeholder="Search here..." />
          </div>
          <div className="homeLay-userPreference">
          <i className={`fa-solid fa-${themeIcon}`} onClick={handleChangeTheme} ></i>
          <p onClick={handleOpenFont} style={{
            cursor : 'pointer'
          }} >font</p>
            <div className="homeLay-bars" >
              <i className={`fa-solid fa-${bars}`} onClick={handleOpenSideNav}></i>
            </div>
          </div>
        </div>
        <div className="homeLay-body" style={{
          backgroundColor : themeWhite
        }}>
          <ThemeContext.Provider value={{themeBlack, themeWhite}}  >
          <Routes>
            <Route exact path="/home" element={<Home />} />
            <Route path="/DailyTask" element={<DailyTask />} />
            <Route path="/StickyNotes" element={<StickyNotes isStickAdded={isStickAdded} setStickAdded={setStickAdded} />} />
            <Route path="/StickyNotes/create" element={<CreateNote isStickAdded={isStickAdded} setStickAdded={setStickAdded} />} />
            <Route path="/StickyNotes/view" element={<ViewNote  />} />
            <Route path="/StickyNotes/edit" element={<UpdateNote />} />
            <Route path="/ImportantNotes" element={<ImportantNotes />} />
            <Route path="/*" element={navigate('/page404')} />
          </Routes>
          </ThemeContext.Provider>
          
        </div>
        {
            viewFont && <div className="homeLay-selectFont" style={{
              backgroundColor : themeBlack,
              color : themeWhite
            }}>
              <p onClick={handleSetFont1} >Verdana</p>
              <p onClick={handleSetFont2} >cursive</p>
              <p onClick={handleSetFont3} >Arial</p>
            </div>
          }
      </div>
      <SideNav sideNavClass={sideNavClass} setSideNavClass={setSideNavClass} setBars={setBars} />
    </div>
  }
    </>
  );
};

export default HomeLayout;
