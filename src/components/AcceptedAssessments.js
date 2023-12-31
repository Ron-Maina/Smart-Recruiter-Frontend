import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from "react-router-dom";
import Intervieweesidebar from "./IntervieweeSidebar";
import Navigationbar from "./Navbar";

function AcceptedAssessments({onrenderAssessment}) {
  const [assessments, setAssessments] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [displayed, setDisplayed] = useState([]);


  function handleClick(assessment){
    setModalShow(true)
    setDisplayed(assessment)
  }

  function viewAssessment(assessment){
    onrenderAssessment(assessment)
  }

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        className="my-modal"
        {...props}
        size="sl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {displayed.title}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Assessment will begin immediately you click one of the buttons below</p>
          <div style={{display: 'flex', justifyContent: 'center', gap: '20px'}}>
          <Link to= '/assessmentpage'><Button variant="outline-success" onClick={() => viewAssessment(displayed)}>Start Assessment</Button>{' '}</Link>
          </div>
        </Modal.Body>
      </Modal>
    );
  }

  useEffect(() => {
    // Fetch interviewee data for the given assessment ID
    fetch('https://smart-recruiter-api.onrender.com/pendingassessments')
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
  }, []);

  return (
    <div className="page">

      <div id="intervieweeassessments-bg"></div>
      <Navigationbar />
      <div className="display">
        <Intervieweesidebar />
        <div className="content" style={{ overflow: "auto" }}>
        {/* Title (moved outside the dark background div) */}
        <h1 className="text-3xl font-bold text-[#f3f0ca] p-4 text-center">My Assessments</h1>

        {/* Display assessments for the assessment based on the view mode */}
        <div className="mx-4">
          {assessments?.map((assessment, index) => (
            <>
              <div variant="primary" onClick={() => handleClick(assessment)}>
                <div key={index} className="p-4 bg-white rounded-lg mb-4">
                  <h2 className="text-xl font-bold">Assessment: {assessment.title}</h2>
                  <p>Duration: {assessment.duration} minutes</p>
                  <p>Date: {assessment.time}</p>
                  <p>Link:{assessment.link}</p>
                </div>
                </div>

                <MyVerticallyCenteredModal
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                />
      
            </>
          ))}
        </div>
      </div>
      </div> 
    </div>
  );
}

export default AcceptedAssessments;