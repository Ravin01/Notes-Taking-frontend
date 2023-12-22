import '../styles/preloader.css'
import icon from '../assets/pencil-folder.png'

const Preloader = () => {
  return (
    <div className='preloader-container'>
      <img src={icon} alt="" className='preloader-icon' />
      <div className="loader"></div>
      <h1 className='preloader-mail'>Notes Application</h1>
    </div>
  )
}

export default Preloader  