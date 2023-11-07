import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 
import { FaShareAlt } from "react-icons/fa";
import RecruiterSidebar from "./RecruiterSidebar";
import Navigationbar from "./Navbar";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function RecruiterAssessments({onrender}) {
  const [assessments, setAssessments] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [displayed, setDisplayed] = useState([]);

  const [email, setEmail] = useState("");
  const [emails, setEmails] = useState([]);
  

  function handleEmail(e){
    e.preventDefault()
  }
  const addEmail = () => {
    if (email) {
      setEmails([...emails, email]);
      setEmail("");
    }
  };


  function handleModal(link){
    setModalShow(true)
    setDisplayed(link)
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
              Send To:
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div>
              {/* <input
                type="text"
                name="email"
                value={email}
                onChange={(e) => handleEmail()}
                placeholder="Enter email"
              /> */}
              <button onClick={addEmail}>Add Email</button>
            </div>
            <div>
              <ul>
                {emails.map((e, index) => (
                  <li key={index}>{e}</li>
                ))}
              </ul>
            </div>
            {/* <button onClick={sendEmails}>Send Emails</button> */}
          </div>
          <Button variant="outline-success">Start Assessment</Button>{' '}
          
        </Modal.Body>
      </Modal>
    );
  }

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

      <Navigationbar />

      <div className="display">
        <RecruiterSidebar />
        <div className="content">
        <h1 className="text-3xl font-bold text-white p-4 text-center">My Assessments</h1>

        <div className="mx-4">
          {assessments.map((assessment) => (
              <div key={assessment.id} className="p-4 bg-white rounded-lg mb-4" onClick={() => handleClick(assessment.id)}>
                <Link to="/recruiterinterviewees" className= 'link_to'>                
                  <h2 className="text-xl font-bold">{assessment.title}</h2>
                </Link>
                <div onClick={() => handleModal(assessment.link)}>
                  <h5 style={{fontSize: 'medium'}}>{assessment.link} </h5>   
                </div> 

                <MyVerticallyCenteredModal
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                />
              </div>

          ))}
        </div>
        </div>
      </div>
    </div>
  );
}
export default RecruiterAssessments;