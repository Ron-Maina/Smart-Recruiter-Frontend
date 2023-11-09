import './App.css';

import {useEffect, useState} from "react";
import { Route, Routes } from "react-router-dom"
import SignUp from './SignUp';
import SignIn from './SignIn';
import Landingpage from './Landingpage';
import Recruiterfeedback from './Recruiterfeedback';
import RecruiterAssessments from './RecruiterAssessments';
import RecruiterIntervieweelist from './RecruiterIntervieweelist';
import AcceptedAssessments from './AcceptedAssessments';
import ViewFeedback from './ViewFeedback';
import AssessmentPage from './AssessmentPage';
import Demo from './Workspace/Demo.js';

import MyReviews from './MyReviews.js';
import CreateAssessment from './CreateAssessment';


function App() {
  const [recruiter, setRecruiter] = useState("")
  const [interviewee, setInterviewee] = useState("") 
  const [assessment, setAssessment] = useState("") 

  
  const [assessmentFeedback, setAssessmentFeedback] = useState('')
 
  const [assessment_id, setAssessment_id] = useState("")
  const [reviewing_id, setReviewing_id] = useState([])
  const [username, setUsername] = useState('')
  const [role, setRole] = useState('')
  const [client, setUser] = useState('')
  const [loggedUser, setLoggedUser] = useState('')



  function userRole(user){
    setRole(user)
  }


  useEffect(() => {
    fetch("/recruitersession")
    .then((response) => {
      if (response.ok) {
        response.json()
        .then((user) => setUser(user));
      } else{
        console.log('Session not found')
      }
    });
  }, [role, loggedUser]);

  useEffect(() => {
    fetch("/intervieweesession")
    .then((response) => {
      if (response.ok) {
        response.json()
        .then((user) => setUser(user));
      } else{
        console.log('Session not found')
      }
    });
  }, [role, loggedUser]);

  function LoggedUser(user){
    console.log(user)
    setLoggedUser(user)
  }

  function handleRender(assessment){
    setAssessment_id(assessment.id)
  }

  function renderAssessment(assessment){
    setAssessment(assessment)
  }

  function renderQuestions(interviewee_id, assessment_id, username){
    setReviewing_id([assessment_id, interviewee_id])
    setUsername(username)
  }

  function renderFeedback(id){
    setAssessmentFeedback(id)

  }

  return (
    <>
      <div>
        <Routes>
          <Route path='/' element={<Landingpage />} />
          <Route exact path='/signup' element={<SignUp onSignUp={userRole}/>} />
          <Route exact path='/signin' element={<SignIn client={client} onLogin={LoggedUser}/>} />
          <Route exact path='/acceptedassessments' element={<AcceptedAssessments onrenderAssessment={renderAssessment}/>} />
          <Route exact path='/assessmentpage' element={<AssessmentPage assessment={assessment} client={client}/>} />


          <Route exact path='/myreviews' element={<MyReviews renderFeedback={renderFeedback}/>} />
          <Route exact path='/viewfeedback' element={<ViewFeedback assessmentFeedback={assessmentFeedback}/>} />



          <Route exact path='/demo' element={<Demo />} />
          <Route exact path='/newassessment' element={<CreateAssessment recruiter={recruiter}/>} />

          {/* <Route exact path='/feedback' element={<IntervieweeReviewed />} /> */}


          <Route exact path='/recruiterfeedback' element={<Recruiterfeedback reviewing_id={reviewing_id} username={username}/>} />
          <Route exact path='/recruiterassessments' element={<RecruiterAssessments onrender={handleRender} />} />
          <Route exact path='/recruiterinterviewees' element={<RecruiterIntervieweelist assessment_id={assessment_id} onRenderQuestions={renderQuestions}/>} />

        </Routes>
      </div>
    </>
  );
}


export default App;
