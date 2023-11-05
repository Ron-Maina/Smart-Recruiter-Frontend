import React, { useState, useEffect } from 'react';
import RecruiterSidebar from './RecruiterSidebar';

function Recruiterfeedback({reviewing_id, username}) {
  const [feedback, setFeedback] = useState('');
  const [mcqFtdata, setMcqFtData] = useState([]);
  const [kataData, setKataData] = useState([]);

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
    'feedback': feedback
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/update_feedback/${reviewing_id[0]}/${reviewing_id[1]}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(feedback_dict),
    })
    .then(res => res.json())
  };

  return (
    <div className='page'>
      <div id="intervieweehomepage-bg"></div>
      <div className="display">
        <RecruiterSidebar />
        <div className="absolute top-[155px] left-[500px] rounded-3xs bg-darkslategray box-border w-[941px] h-[600px] border-[2px] border-solid border-lightgoldenrodyellow bg-[#324c59] bg-opacity-60 relative" style={{borderRadius: '20px'}}>
        
          <h1 className="text-2xl font-semibold text-white p-4">{username}'s Assessment</h1>
          {mcqFtdata.map((item, index) => (
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

          {kataData.map((item, index) => (
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
          
          <div className="bg-black p-4 rounded-lg m-4 text-white absolute bottom-0 w-[95%]">
            <form onSubmit={handleSubmit}>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Provide your feedback here"
                rows="5"
                className="w-full p-2 rounded-md bg-gray-800 text-[#f3f0ca]"
                style={{ maxHeight: '100px' }}
              />
              <button
                type="submit"
                className="bg-blue-500 hover-bg-blue-700 text-white font-bold py-2 px-4 rounded-md mt-2"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recruiterfeedback;
