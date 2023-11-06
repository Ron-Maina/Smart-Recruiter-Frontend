import './App.css';

import {useEffect, useState} from "react";
import { Route, Routes } from "react-router-dom"
import SignUp from './SignUp';
import SignIn from './SignIn';
import RecruiterHome from './RecruiterHome';
import IntervieweeHome from './IntervieweeHome';
import Landingpage from './Landingpage';
import Recruiterfeedback from './Recruiterfeedback';
import RecruiterAssessments from './RecruiterAssessments';
import RecruiterIntervieweelist from './RecruiterIntervieweelist';
import AcceptedAssessments from './AcceptedAssessments';
import ViewFeedback from './ViewFeedback';

import MyReviews from './MyReviews.js';
import CreateAssessment from './CreateAssessment';


function App() {
  const [recruiter, setRecruiter] = useState("")
  const [interviewee, setInterviewee] = useState("") 
  // const [auth, setAuth] = useState("")
 
  

  const [assessment_id, setAssessment_id] = useState("")
  const [reviewing_id, setReviewing_id] = useState([])
  const [username, setUsername] = useState('')

  const [assessmentFeedback, setAssessmentFeedback] = useState('')


  // useEffect(() => {
  //   fetch("/recruitersession")
  //   .then((response) => {
  //     if (response.ok) {
  //       response.json()
  //       .then((user) => setRecruiter(user));
  //     } else{
  //       console.log('Recruiter Session not found')
  //     }
  //   });
  // }, []);

  // useEffect(() => {
  //   fetch("/intervieweesession")
  //   .then((response) => {
  //     if (response.ok) {
  //       response.json()
  //       .then((user) => setInterviewee(user));
  //     } else{
  //       console.log('Interviewee Session not found')
  //     }
  //   });
  // }, []);


  function hanleLogin(user){
     if (user.role === 'recruiter'){
      setRecruiter(user)
     }
     else if (user.role === 'interviewee'){
      setInterviewee(user)
     }
  }

  function handleRender(id){
    setAssessment_id(id)
  }

  function renderQuestions(interviewee_id, assessment_id, username){
    setReviewing_id([assessment_id, interviewee_id])
    setUsername(username)
  }

  function RenderFeedback(id){
    setAssessmentFeedback(id)
  }

  return (
    <>
      <div>
        <Routes>
          <Route path='/' element={<Landingpage />} />
          <Route exact path='/signup' element={<SignUp />} />
          <Route exact path='/signin' element={<SignIn onLogin={hanleLogin}/>} />
          <Route exact path='/intervieweehomepage' element={<IntervieweeHome />} />
          <Route exact path='/acceptedassessments' element={<AcceptedAssessments />} />
          <Route exact path='/myreviews' element={<MyReviews renderFeedback={RenderFeedback}/>} />
          <Route exact path='/viewfeedback' element={<ViewFeedback assessmentFeedback={assessmentFeedback}/>} />


          {/* <Route exact path='/demo' element={<Demo />} /> */}
          <Route exact path='/newassessment' element={<CreateAssessment recruiter={recruiter}/>} />

          {/* <Route exact path='/feedback' element={<IntervieweeReviewed />} /> */}


          <Route exact path='/recruiterhomepage' element={<RecruiterHome />} />
          <Route exact path='/recruiterfeedback' element={<Recruiterfeedback reviewing_id={reviewing_id} username={username}/>} />
          <Route exact path='/recruiterassessments' element={<RecruiterAssessments onrender={handleRender} />} />
          <Route exact path='/recruiterinterviewees' element={<RecruiterIntervieweelist assessment_id={assessment_id} onRenderQuestions={renderQuestions}/>} />

        </Routes>
      </div>
    </>
  );
}


export default App;
