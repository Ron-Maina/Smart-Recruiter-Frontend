import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 
import RecruiterSidebar from "./RecruiterSidebar";

function RecruiterAssessments({onrender}) {
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
    <div className="page">
      <div id="intervieweehomepage-bg"></div>
      <div className="display">
        <RecruiterSidebar />
        <div className="content">
        <h1 className="text-3xl font-bold text-white p-4 text-center">My Assessments</h1>

        <div className="mx-4">
          {assessments.map((assessment) => (
            <Link to="/recruiterinterviewees" className= 'link_to'> 
              <div key={assessment.id} className="p-4 bg-white rounded-lg mb-4" onClick={() => handleClick(assessment.id)}>
                <h2 className="text-xl font-bold">{assessment.title}</h2>
                <h5 style={{fontSize: 'medium'}}>{assessment.link} </h5>
              </div>
            </Link>
          ))}
        </div>
        </div>
      </div>
    </div>
  );
}
export default RecruiterAssessments;