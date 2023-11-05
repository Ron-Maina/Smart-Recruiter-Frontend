import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from "react-router-dom";
import Intervieweesidebar from "./IntervieweeSidebar";
import Navigationbar from "./Navbar";

function MyReviews({renderQuestions}) {
  const [assessments, setAssessments] = useState([]);
  const [apiUrl, setApiUrl] = useState('/reviewedassessments')
  // const [viewMode, setViewMode] = useState("pending"); // Default to pending view

  function handleToggle(viewMode){
    if (viewMode === "reviewed"){
      setApiUrl('/reviewedassessments')
      
    }
    else{
      setApiUrl('/notreviewedassessments')
    }
  }
  useEffect(() => {
    // Fetch interviewee data for the given assessment ID
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setAssessments(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [apiUrl]);

  function handleClick(id){
    renderQuestions(id)
  }

  return (
    <div className="page">

      <div id="intervieweeassessments-bg"></div>
      <Navigationbar />
      <div className="display">
        <Intervieweesidebar />
        <div className="content" style={{ overflow: "auto" }}>
        {/* Title (moved outside the dark background div) */}
        <h1 className="text-3xl font-bold text-[#f3f0ca] p-4 text-center">My Assessments</h1>

        {/* Toggle button to switch between pending and reviewed view */}
        <div className="text-left p-4" style={{textAlign: 'center'}}>
          <button
            className="bg-[#f3f0ca] rounded-md px-4 py-2"
            onClick={() => handleToggle("reviewed")}
          >
            Reviewed
          </button>
          <button
            className="bg-[#f3f0ca] rounded-md px-4 py-2 ml-2"
            onClick={() => handleToggle("pending")}
          >
            Pending
          </button>
        </div>

        {/* Display assessments for the assessment based on the view mode */}
        <div className="mx-4">
          {assessments?.map((assessment, index) => (
            <Link to='/viewfeedback' className="link_to">
              <div key={index} className="p-4 bg-white rounded-lg mb-4" onClick={() => handleClick(assessment.id)}>
                <h2 className="text-xl font-bold">Assessment: {assessment.title}</h2>
                <p>Duration: {assessment.duration} minutes</p>
                <p>Link: <Link to = '/' className="link_to">{assessment.link}</Link></p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      </div>

      
    </div>
  );
}

export default MyReviews;


// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import Intervieweesidebar from "./IntervieweeSidebar";

// function IntervieweeAssessments() {
  

// export default IntervieweeAssessments;
