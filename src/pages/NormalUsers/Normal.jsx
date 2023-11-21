import { Link } from "react-router-dom";
import "../../styles/Normal.css";
import notes from "../../assets/notes.png";

const Normal = () => {
  return (
    <div className="normal-container">
      <nav className="normal-nav">
        <h2>Notes</h2>
        <div className="normal-nav-div">
          <button>
            <Link to="/auth/login" className="normal-link">
              sign in
            </Link>
          </button>
          <button>
            <Link to="/auth/register" className="normal-link">
              sign up
            </Link>
          </button>
        </div>
      </nav>
      <body className="normal-body">
        <img src={notes} alt="loading" className="normal-notes-img" />
        <div className="normal-body-div">
          <h3>Write your thoughts down</h3>
          <h3>as they come to you.</h3>
          <button>
            <Link to="/auth/login" className="normal-link-login">
              Login{" "}
            </Link>
          </button>
        </div>
      </body>
    </div>
  );
};

export default Normal;
