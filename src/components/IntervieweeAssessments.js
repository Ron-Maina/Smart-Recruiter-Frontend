import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Intervieweesidebar from "./IntervieweeSidebar";

function IntervieweeAssessments() {
  const [assessments, setAssessments] = useState([]);
  const [apiUrl, setApiUrl] = useState('/pendingassessments')
  // const [viewMode, setViewMode] = useState("pending"); // Default to pending view

  function handleToggle(viewMode){
    if (viewMode === "pending"){
      setApiUrl('/pendingassessments')
      
    }
    else{
      setApiUrl('/reviewedassessments')
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

  function handleClick(){
    // onRenderQuestions(interviewee_id, assessment_id, username)
  }

  return (
    <div className="page">

      <div id="intervieweeassessments-bg"></div>
      <div className="display">
        <Intervieweesidebar />
        <div className="content" style={{ overflow: "auto" }}>
        {/* Title (moved outside the dark background div) */}
        <h1 className="text-3xl font-bold text-[#f3f0ca] p-4 text-center">My Assessments</h1>

        {/* Toggle button to switch between pending and reviewed view */}
        <div className="text-left p-4" style={{textAlign: 'center'}}>
          <button
            className="bg-[#f3f0ca] rounded-md px-4 py-2"
            onClick={() => handleToggle("pending")}
          >
            Pending
          </button>
          <button
            className="bg-[#f3f0ca] rounded-md px-4 py-2 ml-2"
            onClick={() => handleToggle("reviewed")}
          >
            Reviewed
          </button>
        </div>

        {/* Display assessments for the assessment based on the view mode */}
        <div className="mx-4">
          {assessments?.map((assessment, index) => (
              <div key={index} className="p-4 bg-white rounded-lg mb-4" onClick={() => handleClick()}>
                <h2 className="text-xl font-bold">Assessment: {assessment.title}</h2>
                <p>Duration: {assessment.duration} minutes</p>
                <p>Link: <Link to = '/'>{assessment.link}</Link></p>
              </div>
          ))}
        </div>
      </div>
      </div>

      
    </div>
  );
}

export default IntervieweeAssessments;
