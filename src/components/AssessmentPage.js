import React, { useEffect, useState } from 'react';
import Navigationbar from './Navbar';
import { Link } from "react-router-dom";
import { Button, Modal, Form, InputGroup, FormControl, FormCheck, FormLabel } from 'react-bootstrap';

function AssessmentPage({ assessment, client}) {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);

  useEffect(() => {
    // Fetch questions for the given assessment ID
    fetch(`/questions/${assessment.id}`)
      .then((response) => {
        if (!response.ok) {
          throw Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setQuestions(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    // Start the countdown when the component mounts
    if (remainingTime === 0) {
      setRemainingTime(assessment.duration * 60); // 120 minutes
    }
  }, []);

  useEffect(() => {
    // Countdown timer
    const countdownInterval = setInterval(() => {
      if (remainingTime > 0) {
        setRemainingTime(remainingTime - 1);
      }
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(countdownInterval);
  }, [remainingTime]);

  function postAnswers() {
    const data = {
      intervieweeId: client.id,
      answers: [],
    };

    questions.forEach((question) => {
      const questionId = `question_${question.id}`;
      const answer = answers[questionId];
      const grade = answer === question.solution ? 100 : 0;

      data.answers.push({
        questionId: question.id,
        grade,
        answer,
      });
    });

    console.log(data)

    // Determine the endpoint based on the question type
    const endpoint = assessment.type === 'mcq' || assessment.type === 'ft' ? '/answers' : '/whiteboard';

    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then((response) => {
        response.json()
    // if (!response.ok) {
    //     return response.json().then((data) => {
    //     // Handle error
    //     });
    // }
    })
    .then(data => console.log(data))
    .catch((error) => {
    console.error("Error posting answers:", error);
    });
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAnswers({ ...answers, [name]: value });
  };

  const handleModalSubmit = () => {
    postAnswers();

    // Display loading spinner
    setIsLoading(true);

    // Simulate API call for scoring (replace with actual API call)
    setTimeout(() => {
      let total = 0;
      questions.forEach((question) => {
        const answer = answers[`question_${question.id}`];
        if (answer === question.solution) {
          total += 1;
        }
      });

      // Calculate the total score
      const averageScore = (total / questions.length) * 100;
      setTotalScore(Math.round(averageScore));

      // Hide loading spinner and show results
      setIsLoading(false);
      setShowModal(true);
    }, 2000); // Simulated 2-second delay
  };

  // Helper function to format time as hours and minutes
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours} hours ${minutes} minutes`;
  };

  return (
    <div className="page">
      <div id="intervieweehomepage-bg"></div>
      <Navigationbar />
      <div className="assessmentpage">
        <div style={{ textAlign: 'left' }}>
          <div>
            <p style={{ color: 'white', textAlign: 'center' }}>Time Remaining: {formatTime(remainingTime)}</p>
            {questions.map((question, index) => (
              <div key={question.id}>
                <div style={{ color: 'lightgoldenrodyellow' }}>
                  <p style={{ color: 'lightgoldenrodyellow' }}>Q{index + 1}: {question.question}</p>
                </div>
                {question.type === 'mcq' ? (
                  question.choices.split(',').map((choice, choiceIndex) => (
                    <div key={choiceIndex}>
                      <FormCheck
                        style={{ color: 'white' }}
                        type="radio"
                        name={`question_${question.id}`}
                        id={`choice_${choiceIndex}`}
                        label={choice}
                        value={choice}
                        onChange={handleInputChange}
                      />
                    </div>
                  ))
                ) : question.type === 'ft' ? (
                  <InputGroup className="mb-3">
                    <FormControl
                      type="text"
                      name={`question_${question.id}`}
                      onChange={handleInputChange}
                    />
                  </InputGroup>
                ) : question.type === 'kata' ? (
                  <Form.Group>
                    <Form.Control
                      as="textarea"
                      name={`question_${question.id}`}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                ) : null}
                <br></br>
              </div>
            ))}
            <Button variant="primary" onClick={handleModalSubmit}>
              Submit
            </Button>

            <Modal show={showModal} centered backdrop="static">
              <Modal.Header>
                <Modal.Title>Assessment Results</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {isLoading ? (
                  <div className="text-center">
                    <div className="spinner-border" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <div>
                    {questions.map((question, index) => (
                      <div key={question.id}>
                        <p>Q{index + 1}: {question.question}</p>
                        {answers[`question_${question.id}`] === question.solution ? (
                          <>
                            <p>Your answer: {answers[`question_${question.id}`]}</p>
                            <p>Score: 100%</p>
                          </>
                        ) : (
                          <>
                            <p>Your answer: {answers[`question_${question.id}`]}</p>
                            <p>Score: 0%</p>
                          </>
                        )}
                      </div>
                    ))}
                    <p>Total Score: {totalScore}%</p>
                  </div>
                )}
              </Modal.Body>
              <Modal.Footer closeButton>
                <Link to='/acceptedassessments'><Button>Close</Button></Link>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssessmentPage;
