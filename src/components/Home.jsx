import React from "react";
import { Link } from "react-router-dom";
import SideBar from "./SideBar";
const Home = () => {
  return (
    <div className="home">
      <div className="side">
        <SideBar />
      </div>
      <div className="history">
        <div className="title">
          <Link to="/newassessment">New Assessment</Link>
          <h1>History</h1>
        </div>
        <button>Assessment name: Name</button>{" "}
        <button>Assessment name: Name</button>{" "}
        <button>Assessment name: Name</button>{" "}
        <button>Assessment name: Name</button>{" "}
        <button>Assessment name: Name</button>{" "}
        <button>Assessment name: Name</button>
      </div>
    </div>
  );
};

export default Home;
