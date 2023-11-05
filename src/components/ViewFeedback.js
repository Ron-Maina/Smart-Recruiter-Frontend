import React , {useEffect, useState} from 'react'
import { Link } from "react-router-dom";
import Intervieweesidebar from './IntervieweeSidebar'

function ViewFeedback({intAssessmentsID}) {
    const [feedbacks, setFeedback] = useState([])

    useEffect(() => {
        fetch(`/intfeedback/3`)
        .then(res => res.json())
        .then(data => setFeedback(data))
    }, [])
    

  return (
    <div className='page'>
        <div id="intervieweehomepage-bg"></div>
        <div className="display">
          <Intervieweesidebar />
          
          <div className="content">
          <h1 className="text-3xl font-bold text-white p-4 text-center">My Assessments</h1>

        <div className="mx-4">
            {feedbacks.map((feedback) => (
            <Link to="/recruiterinterviewees" className= 'link_to'> 
            <div key={feedback.id} className="p-4 bg-white rounded-lg mb-4" >
                <h3 className="text-xl font-bold">Answer: {feedback.answer_text}</h3>
                <p style={{fontSize: 'medium'}}>{feedback.grade} </p>
                <p style={{fontSize: 'medium'}}>{feedback.feedback} </p>

            </div>
            </Link>
            ))}
        </div>
          </div>
        </div>

      </div>
  )
}

export default ViewFeedback