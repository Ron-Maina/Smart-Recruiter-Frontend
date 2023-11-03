import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Intervieweelist({ assessment_id, onRenderQuestions}) {
  const [interviewees, setInterviewees] = useState([]);
  const [viewMode, setViewMode] = useState("pending"); // Default to pending view

  useEffect(() => {
    // Define the API endpoint URL based on the current view mode
    const apiUrl =
      viewMode === "pending"
        ? `/pendinginterviewees/${assessment_id}`
        : `/reviewedinterviewees/${assessment_id}`; 

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
  }

  return (
    <div>
      {/* Your background and box styling here */}
      <div
        className="relative rounded-3xs w-full h-[665px] overflow-hidden bg-[url('/public/home-page@3x.png')] bg-cover bg-no-repeat bg-[top] text-left text-5xl text-deepskyblue font-inter"
      >
        {/* Your background image here */}
      </div>

      <div className="absolute top-[155px] left-[320px] rounded-3xs bg-darkslategray box-border w-[941px] h-[480px] border-[2px] border-solid border-lightgoldenrodyellow bg-[#324c59] bg-opacity-60" style={{ overflow: "auto" }}>
        {/* Title (moved outside the dark background div) */}
        <h1 className="text-3xl font-bold text-[#f3f0ca] p-4 text-center">Interviewee List</h1>

        {/* Toggle button to switch between pending and reviewed view */}
        <div className="text-left p-4">
          <button
            className="bg-[#f3f0ca] rounded-md px-4 py-2"
            onClick={() => setViewMode("pending")}
          >
            Show Pending
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
            <Link to = '/assessmentfeedback' className="link_to">
              <div key={index} className="p-4 bg-white rounded-lg mb-4" onClick={() => handleClick(interviewee.id, interviewee.assessment_id, interviewee.username)}>
                <h2 className="text-xl font-bold">{interviewee.username}</h2>
                <p>Email: {interviewee.email}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Intervieweelist;
