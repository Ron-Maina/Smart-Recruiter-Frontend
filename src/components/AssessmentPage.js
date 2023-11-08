import React, { useEffect, useState } from 'react';
import Navigationbar from './Navbar';
import { Link } from "react-router-dom";
import { Button, Modal, Form, InputGroup, FormControl, FormCheck} from 'react-bootstrap';
import useLocalStorage from './useLocalStorage';

function AssessmentPage({ assessment, client}) {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [remainingTime, setRemainingTime] = useLocalStorage('remainingTime', 0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('')

  const time = assessment.duration

  useEffect(() => {
    // Check if the assessment data is already in local storage
    const storedAssessment = localStorage.getItem('assessment');
    if (storedAssessment) {
      setQuestions(JSON.parse(storedAssessment));
    } else {
      fetch(`/questions/${assessment.id}`)
        .then((response) => {
          if (!response.ok) {
            throw Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          setQuestions(data);
          // Store the assessment data in local storage
          localStorage.setItem('assessment', JSON.stringify(data));
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
    }, [])

    useEffect(() => {
        // Countdown timer
        const countdownInterval = setInterval(() => {
          if (remainingTime > 0) {
            setRemainingTime(remainingTime - 1);
          } else if (remainingTime === 0){
            handleModalSubmit()
          }
        }, 1000);
    
        // Clear the interval when the component unmounts
        return () => {
          clearInterval(countdownInterval);
        };
    }, [remainingTime, setRemainingTime]);

    function postAnswers() {
        const data = {
        intervieweeId: client.id,
        answers: [],
        };

        questions.forEach((question) => {
            if (question.type === 'mcq' || question.type === 'ft'){
                const questionId = `question_${question.id}`;
                const answer = answers[questionId];
                const grade = answer === question.solution ? 100 : 0;

                data.answers.push({
                    questionId: question.id,
                    grade,
                    answer,
                });
            }

            
            if (question.type === 'mcq' || question.type === 'ft'){
                fetch('/answers', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                })
                .then((response) => {
                    response.json()
                })
                .then(data => console.log(data))
                .catch((error) => {
                console.error("Error posting answers:", error);
                });
            }
            else if (question.type === 'kata') {
                const kataData = {
                    "interviewee_id": client.id,
                    "question_id": question.id,
                    "pseudocode": answers[`pseudocode_${question.id}`],
                    "code": answers[`code_${question.id}`],
                    "grade": answers[`code_${question.id}`] === question.solution ? 100 : 0
                };
        
                fetch('/whiteboard', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(kataData),
                })
                .then((response) => {
                    response.json();
                })
                .then((data) => console.log(data))
                .catch((error) => {
                console.error("Error posting kata answers:", error);
                });
            }
        });
        
    }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAnswers({ ...answers, [name]: value });
  };

  const handleModalSubmit = () => {

    for (const question of questions) {
        const answer = answers[`question_${question.id}`];
  
        if (!answer) {
            setErrorMessage('Please answer all questions before submitting.')

            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
            return;

        } else {
            postAnswers();
            setIsSubmitting(true);
            
            setTimeout(() => {
            let total = 0;
            questions.forEach((question) => {
                const answer = answers[`question_${question.id}`];

                if (question.type === 'kata') {
                    const userCode = answers[`code_${question.id}`];
                    if (userCode === question.solution) {
                    total += 1;
                    }
                } else {
                    if (answer === question.solution) {
                    total += 1;
                    }
                }
                });
                

            // Calculate the total score
            const averageScore = (total / questions.length) * 100;
            setTotalScore(Math.round(averageScore));

            // Hide loading spinner and show results
            setIsSubmitting(false);
            setShowModal(true);
            }, 2000); // Simulated 2-second delay
        }
    }

    
  };

  const resetCountdown = () => {
    // Reset the countdown to its initial value
    setRemainingTime(time*60);
    setShowModal(false); // Close the modal
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
                        required
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
                        required
                        type="text"
                        name={`question_${question.id}`}
                        onChange={handleInputChange}
                    />
                  </InputGroup>
                ) : question.type === 'kata' ? (
                <>
                  <Form.Group>
                    <Form.Control
                        required
                        as="textarea"
                        name={`pseudocode_${question.id}`}
                        onChange={handleInputChange}
                    />
                  </Form.Group>
                  <br></br>
                  <Form.Group>
                    <Form.Control
                        required
                        as="textarea"
                        name={`code_${question.id}`}
                        onChange={handleInputChange}
                    />
                  </Form.Group>
                </>
                ) : null}
                <br></br>
              </div>
            ))}
            <Button variant="primary" onClick={handleModalSubmit}>
              Submit
            </Button>

            {errorMessage && (
                <div className="message" style={{ color:'red' }}>
                    {errorMessage}
                </div>
            )}

            {isSubmitting && (
                <div className="text-center spinner-container">
                <div className="spinner-border" role="status" style={{color: 'lightgoldenrodyellow'}}>
                    <span className="sr-only">Loading...</span>
                </div>
                </div>
            )}

            <Modal show={showModal} centered backdrop="static">
                <Modal.Header>
                    <Modal.Title>Assessment Results</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        {questions.map((question, index) => (
                        <div key={question.id}>
                            <p>Q{index + 1}: {question.question}</p>
                            {question.type === 'kata' ? (
                            <>
                                <p>Pseudocode: {answers[`pseudocode_${question.id}`]}</p>
                                <p>Code: {answers[`code_${question.id}`]}</p>
                                {answers[`code_${question.id}`] === question.solution ? (
                                <>
                                    <p>Your code: {answers[`code_${question.id}`]}</p>
                                    <p>Score: 100%</p>
                                </>
                                ) : (
                                <>
                                    <p>Your code: {answers[`code_${question.id}`]}</p>
                                    <p>Score: 0%</p>
                                </>
                                )}
                            </>
                            ) : (
                            <>
                                <p>Your answer: {answers[`question_${question.id}`]}</p>
                                {answers[`question_${question.id}`] === question.solution ? (
                                <>
                                    <p>Score: 100%</p>
                                </>
                                ) : (
                                <>
                                    <p>Score: 0%</p>
                                </>
                                )}
                            </>
                            )}
                        </div>
                        ))}
                        <p>Total Score: {totalScore}%</p>
                    </div>
                  
                </Modal.Body>
                <Modal.Footer>
                    <Link to="/acceptedassessments">
                    <Button onClick={resetCountdown}>Close</Button>
                    </Link>
                </Modal.Footer>
            </Modal>

          </div>
        </div>
      </div>
    </div>
  );
}

export default AssessmentPage;
