import React, { useState, useEffect } from 'react';
import RecruiterSidebar from './RecruiterSidebar';
import { Spinner } from "react-bootstrap";
import Navigationbar from './Navbar';
import { useNavigate } from 'react-router-dom';


function Recruiterfeedback({reviewing_id, username}) {
  const [feedback, setFeedback] = useState('');
  const [mcqFtdata, setMcqFtData] = useState([]);
  const [kataData, setKataData] = useState([]);
  const [finalgrade, setFinalGrade] = useState('');


  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  useEffect(() => {
    // Fetch data from your endpoint
    fetch(`/ftmcqanswers/${reviewing_id[0]}/${reviewing_id[1]}`)
      .then((response) => response.json())
      .then((responseData) => {
        setMcqFtData(responseData);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    // Fetch data from your endpoint
    fetch(`/katanswers/${reviewing_id[0]}/${reviewing_id[1]}`)
      .then((response) => response.json())
      .then((responseData) => {
        setKataData(responseData);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

 
  const feedback_dict = {
    'feedback': feedback,
    'score': finalgrade,
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)
    fetch(`/update_interviewee_assessment/${reviewing_id[0]}/${reviewing_id[1]}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(feedback_dict),
    })
    .then(res => {
      if (res.status === 200){
        setSuccessMessage("Feedback posted successfully")
        clearMessages();
        setLoading(false)
        navigate('/recruiterassessments')
      } else {
        setErrorMessage("Failed! Try Again")
        clearMessages();
        setLoading(false)
      }
    })

    fetch('/')
  };

  const clearMessages = () => {
    setTimeout(() => {
      setSuccessMessage('')
      setErrorMessage('');
    }, 2000); // Clear messages after 2 seconds
  };

  return (
    <div className='page'>
      <div id="intervieweehomepage-bg"></div>

      <Navigationbar />

      <div className="display">
        <RecruiterSidebar />
        <div className="absolute top-[155px] left-[500px] rounded-3xs bg-darkslategray box-border w-[941px] h-[600px] border-[2px] border-solid border-lightgoldenrodyellow bg-[#324c59] bg-opacity-60 relative" 
        style={{borderRadius: '20px', overflowY: "auto", overflowX: 'hidden'}}>
        

          <h1 className="text-2xl font-semibold text-white p-4">{username}'s Assessment</h1>
          {mcqFtdata?.map((item, index) => (
            <div key={index} className="p-4 m-4 bg-white rounded-lg shadow-md flex">
              <div className="flex-1">
                <h3 className="text-xl font-semibold">Question: {item.question}</h3>
                <p>Answer: {item.answer}</p>
              </div>
              <div className="flex-shrink-0">
                <p>Grade: {item.grade}</p>
              </div>
            </div>
          ))}

          {kataData?.map((item, index) => (
            <div key={index} className="p-4 m-4 bg-white rounded-lg shadow-md flex">
              <div className="flex-1">
                <h3 className="text-xl font-semibold">Question: {item.question}</h3>
                <h3 className="text-xl font-semibold">Pseudocode: {item.pseudocode}</h3>

                <p>Code: {item.code}</p>
              </div>
              <div className="flex-shrink-0">
                <p>Grade: {item.grade}</p>
              </div>
            </div>
          ))}
          
          <div className="bg-black p-4 rounded-lg m-4 text-white absolute bottom-0 w-[95%]" style={{ position: 'sticky', bottom: 0 }}>
            <form onSubmit={handleSubmit}>
              <textarea
                value={feedback}

                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Provide your feedback here"
                rows="5"
                className="w-full p-2 rounded-md bg-gray-800 text-[#f3f0ca]"
                style={{ maxHeight: '100px' }}
              />
              <label htmlFor="username" className="input-label">
                <text>Grade:</text>
              </label>
              <br />
              <input
                className="authentication-input"
                name="username"
                required
                type="text"
                value={finalgrade}
                onChange={(e) => setFinalGrade(e.target.value)}
              />
              <br></br>
              <button
                type="submit"
                className="bg-blue-500 hover-bg-blue-700 text-white font-bold py-2 px-4 rounded-md mt-2"
              >
                Submit
              </button>
              
            </form>
            {loading && 
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            }
            {successMessage && <p style={{color: 'green', textAlign: 'center', fontFamily: 'fantasy'}} className="success-message">{successMessage}</p>}
            {errorMessage && <p style={{color: 'red', textAlign: 'center', fontFamily: 'fantasy'}} className="error-message">{errorMessage}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recruiterfeedback;
