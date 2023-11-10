import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RecruiterSidebar from "./RecruiterSidebar";

import Navigationbar from "./Navbar";


function RecruiterIntervieweelist({ assessment_id, onRenderQuestions}) {
  const navigate = useNavigate()
  const [interviewees, setInterviewees] = useState([]);
  const [viewMode, setViewMode] = useState("pending"); // Default to pending view

  useEffect(() => {
    // Define the API endpoint URL based on the current view mode
    const apiUrl =
      viewMode === "pending"
        ? `https://smart-recruiter-api.onrender.com/pendinginterviewees/${assessment_id}`
        : `https://smart-recruiter-api.onrender.com/reviewedinterviewees/${assessment_id}`; 

    // Fetch interviewee data for the given assessment ID
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setInterviewees(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [assessment_id, viewMode]);

  function handleClick(interviewee_id, assessment_id, username){
    onRenderQuestions(interviewee_id, assessment_id, username)
    if (viewMode === 'pending'){
      navigate("/recruiterfeedback", {replace: true});
    } 
  }

  return (
    <div className="page">
      <div id="intervieweehomepage-bg"></div>

      <Navigationbar />

      <div className='display'>
        <RecruiterSidebar />
        <div className="content">
        {/* Title (moved outside the dark background div) */}
        <h1 className="text-3xl font-bold text-[#f3f0ca] p-4 text-center">Interviewees</h1>

        {/* Toggle button to switch between pending and reviewed view */}
        <div className="text-left p-4" style={{textAlign: 'center'}}>
          <button
            className="bg-[#f3f0ca] rounded-md px-4 py-2"
            onClick={() => setViewMode("pending")}
          >
            Pending Review
          </button>
          <button
            className="bg-[#f3f0ca] rounded-md px-4 py-2 ml-2"
            onClick={() => setViewMode("reviewed")}
          >
            Show Reviewed
          </button>
        </div>

        {/* Display interviewees for the assessment based on the view mode */}
        <div className="mx-4">
          {interviewees.map((interviewee, index) => (
     
            <div key={index} className="p-4 bg-white rounded-lg mb-4" onClick={() => handleClick(interviewee.id, interviewee.assessment_id, interviewee.username)}>
              <h2 className="text-xl font-bold">{interviewee.username}</h2>
              <p>Email: {interviewee.email}</p>
              <div className="flex-shrink-0">
                <p>Grade: {interviewee.score}</p>
              </div>
            </div>
      
          ))}
        </div>
        </div>
      </div>

   
    </div>
  );
}

export default RecruiterIntervieweelist;
