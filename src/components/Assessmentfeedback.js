import React, { useState, useEffect } from 'react';

function AssessmentFeedback() {
  const [feedback, setFeedback] = useState('');
  const [data, setData] = useState([]);
  const [personName, setPersonName] = useState(''); // State to store the person's name

  useEffect(() => {
    // Fetch data from your endpoint
    fetch('http://127.0.0.1:5000/ftmcqanswers/1/1')
      .then((response) => response.json())
      .then((responseData) => {
        setData(responseData);
        setPersonName(responseData[0].personName); // Assuming personName is part of the data
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted feedback:', feedback);
  };

  return (
    <div>
      <div className="absolute top-[155px] left-[320px] rounded-3xs bg-darkslategray box-border w-[941px] h-[580px] border-[2px] border-solid border-lightgoldenrodyellow bg-[#324c59] bg-opacity-60 relative">
        <div className="card-container overflow-y-auto h-[340px]">
          <h1 className="text-2xl font-semibold text-white p-4">{personName}'s Grades</h1>
          {data.map((item, index) => (
            <div key={index} className="p-4 m-4 bg-white rounded-lg shadow-md flex">
              <div className="flex-1">
                <h3 className="text-xl font-semibold">{item.question}</h3>
                <p>{item.answer}</p>
              </div>
              <div className="flex-shrink-0">
                <p>Grade: {item.grade}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-black p-4 rounded-lg m-4 text-white absolute bottom-0 w-[95%]">
          <form onSubmit={handleSubmit}>
            <textarea
              value={feedback}
              onChange={handleFeedbackChange}
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
  );
}

export default AssessmentFeedback;
