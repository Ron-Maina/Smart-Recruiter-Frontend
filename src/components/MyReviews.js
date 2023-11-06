import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import Intervieweesidebar from "./IntervieweeSidebar";
import Navigationbar from "./Navbar";

function MyReviews({ renderFeedback }) {
  const [assessments, setAssessments] = useState([]);
  const [apiUrl, setApiUrl] = useState("/reviewedassessments");
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [showModal, setShowModal] = useState(false);


  const navigate = useNavigate()

  function handleToggle(viewMode) {
    if (viewMode === "reviewed") {
      setApiUrl("/reviewedassessments");
    } else {
      setApiUrl("/notreviewedassessments");
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

  function handleClick(assessment) {
    if (assessment.recruiter_status === 'reviewed') {
      renderFeedback(assessment.id)
      navigate("/viewfeedback", {replace: true});
    } else {
      setSelectedAssessment(assessment);
      setShowModal(true);
    }
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  return (
    <div className="page">
      <div id="myreviews-bg"></div>
      <Navigationbar />
      <div className="display">
        <Intervieweesidebar />
        <div className="content" style={{ overflow: "auto" }}>
          <h1 className="text-3xl font-bold text-[#f3f0ca] p-4 text-center">
            My Assessments
          </h1>
          <div className="text-left p-4" style={{ textAlign: "center" }}>
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
          <div className="mx-4">
            {assessments?.map((assessment, index) => (
              <div
                key={index}
                className="p-4 bg-white rounded-lg mb-4"
                onClick={() => handleClick(assessment)}
              >
                <h2 className="text-xl font-bold">
                  Assessment: {assessment.title}
                </h2>
                <p>Duration: {assessment.duration} minutes</p>
              </div>
            ))}
          </div>
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Pending Review</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>{selectedAssessment?.title} is pending review.</p>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </div>
  );
}


export default MyReviews;

