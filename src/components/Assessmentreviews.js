import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import the Link component from React Router

function Assessmentreviews({onrender}) {
  const [assessments, setAssessments] = useState([]);

  useEffect(() => {
    // Fetch assessment data from the provided endpoint
    const fetchData = async () => {
      try {
        const response = await fetch("/recruiterassessments"); // Replace with the actual endpoint
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setAssessments(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  function handleClick(id){
    onrender(id)
  }

  return (
    <div>
      {/* Your background and box styling here */}
      <div className="absolute top-[155px] left-[320px] rounded-3xs bg-darkslategray box-border w-[941px] h-[480px] border-[2px] border-solid border-lightgoldenrodyellow bg-[#324c59] bg-opacity-60" style={{ overflow: "auto" }}>
        {/* Title */}
        <h1 className="text-3xl font-bold text-white p-4 text-center">My Assessments</h1>

        {/* Display assessments in a list (one on top of the other) */}
        <div className="mx-4">
          {assessments.map((assessment) => (
            <Link to="/Intervieweelist"> {/* Add the Link component here */}
              <div key={assessment.id} className="p-4 bg-white rounded-lg mb-4" onClick={() => handleClick(assessment.id)}>
                <h2 className="text-xl font-bold">{assessment.title}</h2>
                <a href={assessment.link} target="_blank" rel="noopener noreferrer">
                  View Assessment
                </a>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Assessmentreviews;