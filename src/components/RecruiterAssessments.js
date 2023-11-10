import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Modal, Form, Spinner } from "react-bootstrap";
import { FiShare2 } from "react-icons/fi";
import RecruiterSidebar from "./RecruiterSidebar";
import Navigationbar from "./Navbar";

function RecruiterAssessments({ onrender }) {
  const [assessments, setAssessments] = useState([]);
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [isEmailModalOpen, setEmailModalOpen] = useState(false);
  const [recipientEmails, setRecipientEmails] = useState("");
  const [questions, setQuestions] = useState([])
  const [isQuestionModalOpen, setQuestionModalOpen] = useState(false);
  const [displaQuestions, setdisplaQuestions] = useState(null);

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch assessment data from the provided endpoint
    const fetchData = async () => {
      try {
        const response = await fetch("https://smart-recruiter-api.onrender.com/recruiterassessments"); // Replace with the actual endpoint
        if (!response.ok) {
          throw Error("Network response was not ok");
        }

        const data = await response.json();
        setAssessments(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const emailsArray = recipientEmails.split(/,|\n/).map((email) => email.trim());

  const data = {
    "recipient_emails": emailsArray,
    "title": selectedAssessment?.title,
    "assessment_id": selectedAssessment?.id,

  }
  function handleRender(assessment){
    onrender(assessment)
  }

  function handleShareClick(assessment) {
    setSelectedAssessment(assessment);
    setEmailModalOpen(true);
  }

  function handleQuestionDisplay(assessment) {
    setdisplaQuestions(assessment);
    fetch(`https://smart-recruiter-api.onrender.com/questions/${assessment.id}`)
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
        setQuestionModalOpen(true);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

  function handleSendEmail() {
    setLoading(true)
    fetch('https://smart-recruiter-api.onrender.com/sendinvite', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      setSuccessMessage('Invites Sent');
      clearMessages();
      setLoading(false);
      ; 
    })
    .catch((error) => {
      console.error('Error:', error);
      setErrorMessage('Invites not sent, try again');
      clearMessages();
     
    });
   
   
  }

  const clearMessages = () => {
    setTimeout(() => {
      setSuccessMessage('');
      setErrorMessage('');
      setEmailModalOpen(false);
    }, 2000); // Clear messages after 5 seconds
  };

  return (
    <div className="page">
      <div id="intervieweehomepage-bg"></div>

      <Navigationbar />

      <div className="display">
        <RecruiterSidebar />
        <div className="content">
          <h1 className="text-3xl font-bold text-white p-4 text-center">My Assessments</h1>

          <div className="mx-4">
            {assessments.map((assessment) => (
              <div
                key={assessment.id}
                className="p-4 bg-white rounded-lg mb-4"
                style={{
                  display: 'flex',
                  width: '700px',
                  marginLeft: '100px'
                }}
              >
             <div style={{marginLeft: '200px', textAlign: 'left'}}>
                 <h2 className="text-xl font-bold" 
                 onClick={() => handleQuestionDisplay(assessment)} 
                 style={{cursor: "pointer" }}
                 >
                  {assessment.title}
                </h2>
               
               <div style={{ fontSize: "medium", display: 'flex'}} >
                 <p>{assessment.link}</p>
                 <FiShare2 style={{marginLeft: '300px', cursor: "pointer" }} onClick={() => handleShareClick(assessment)} />
               </div>
             </div>
           </div>
            ))}
          </div>
        </div>
      </div>

      {displaQuestions && (
        <Modal
        show={isQuestionModalOpen}
        onHide={() => setQuestionModalOpen(false)}
        centered
        >
        <Modal.Header closeButton>
          <Modal.Title>Assessment Questions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {questions.map((question, index) => (
            <div key={question.id}>
              <h5 style={{fontFamily: 'fantasy'}}>Q{index+1}: {question.question} ({question.type})</h5>
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setQuestionModalOpen(false)}>
            Close
          </Button>
          <Link to="/recruiterinterviewees" className="link_to">
            <Button variant="primary" onClick={handleRender} disabled={loading}>
              Review Assessment
            </Button>
          </Link>
        </Modal.Footer>
      </Modal>
      )}

      {selectedAssessment && (
        <Modal
        show={isEmailModalOpen}
        onHide={() => setEmailModalOpen(false)}
        centered
        >
        <Modal.Header closeButton>
          <Modal.Title>Send Assessment Link</Modal.Title>
        </Modal.Header>
        <Modal.Title style={{textAlign: 'center'}}>
          {loading && 
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          }
          {successMessage && <p style={{color: 'green', textAlign: 'center', fontFamily: 'fantasy'}} className="success-message">{successMessage}</p>}
          {errorMessage && <p style={{color: 'red', textAlign: 'center', fontFamily: 'fantasy'}} className="error-message">{errorMessage}</p>}
        </Modal.Title>
        <Modal.Body>
          <Form>
            <Form.Group controlId="recipientEmails">
              <Form.Label>Recipient's Email(s)</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter multiple email addresses separated by commas or new lines"
                value={recipientEmails}
                onChange={(e) => setRecipientEmails(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="message">
              <Form.Label>Assessment Link</Form.Label>
              <p>{selectedAssessment.link}</p>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEmailModalOpen(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSendEmail} disabled={loading}>
            Send
          </Button>
        </Modal.Footer>
      </Modal>
      )}
    </div>
  );
}

export default RecruiterAssessments;
