import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from "react-router-dom";
import Intervieweesidebar from "./IntervieweeSidebar";

function AcceptedAssessments() {
  const [assessments, setAssessments] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);

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
          {assessments.map(assessment => (
            <Modal.Title id="contained-modal-title-vcenter">
              {assessment.title}
            </Modal.Title>
          ))}
          
        </Modal.Header>
        <Modal.Body>
          <p>Assessment will begin immediately you click one of the buttons below</p>
          <div style={{display: 'flex', justifyContent: 'center', gap: '20px'}}>
          <Button variant="outline-success">Take Demo</Button>{' '}
          <Button variant="outline-success">Start Assessment</Button>{' '}
          </div>
        </Modal.Body>
      </Modal>
    );
  }

  useEffect(() => {
    // Fetch interviewee data for the given assessment ID
    fetch('/pendingassessments')
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

      <div id="AcceptedAssessments-bg"></div>
      <div className="display">
        <Intervieweesidebar />
        <div className="content" style={{ overflow: "auto" }}>
        {/* Title (moved outside the dark background div) */}
        <h1 className="text-3xl font-bold text-[#f3f0ca] p-4 text-center">My Assessments</h1>

        {/* Display assessments for the assessment based on the view mode */}
        <div className="mx-4">
          {assessments?.map((assessment, index) => (
            <>
              <div variant="primary" onClick={() => setModalShow(true)}>
                <div key={index} className="p-4 bg-white rounded-lg mb-4">
                  <h2 className="text-xl font-bold">Assessment: {assessment.title}</h2>
                  <p>Duration: {assessment.duration} minutes</p>
                  <p>Link: <Link to = '/' className="link_to">{assessment.link}</Link></p>
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
