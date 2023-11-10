import React , {useEffect, useState} from 'react'
import Intervieweesidebar from './IntervieweeSidebar'

function ViewFeedback({assessmentFeedback}) {

    const [feedback, setFeedback] = useState([])

    useEffect(() => {
        fetch(`https://smart-recruiter-api.onrender.com/intfeedback/${assessmentFeedback}`)
        .then(res => res.json())
        .then(data => setFeedback(data))
    }, [])
    

  return (
    <div className='page'>
      <div id="intervieweehomepage-bg"></div>
      <div className="display">
        <Intervieweesidebar />
        
        <div className="content">
          <h1 className="text-3xl font-bold text-white p-4 text-center">Feedback</h1>

          <div className="mx-4" style={{textAlign: 'left'}}>
            <h2 key={feedback.assessment_id} style={{color: "white"}} className="text-xl font-bold"><span>Feedback: </span>{feedback.feedback}</h2>
            <br></br>
            <h2 key={feedback.assessment_id} style={{color: "white"}} className="text-xl font-bold"><span>Your Grade: </span>{feedback.score}</h2>
            
            {feedback.questions?.map(response => (
              <div key={response.question_id}>
                <h5><span>Question: {response.question_text}</span></h5>
                {response.question_type === "mcq" || response.question_type === "ft" ? (
                  <div>
                    {response.answers.map(answer => (
                      <div style={{color: 'white'}}>
                        <p key={answer.answer_id}>
                          Answer: {answer.answer_text}
                        </p>
                        <p>Grade: {answer.grade}</p>
                      </div>
                    ))}
                  </div>
                ) : response.question_type === "kata" ? (
                  <div>
                    {response.whiteboard_submissions.map((submission) => (
                      <div key={submission.submission_id} style={{color: 'white'}}>
                        <p>Pseudocode: {submission.pseudocode}</p>
                        <p>Code: {submission.code}</p>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>  
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}

export default ViewFeedback