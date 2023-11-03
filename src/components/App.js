import './App.css';
import Feedback from './Feedback';

import {useEffect, useState} from "react";
import { Route, Routes } from "react-router-dom"
import SignUp from './SignUp';
import SignIn from './SignIn';
import RecruiterHome from './RecruiterHome';
import IntervieweeHome from './IntervieweeHome';
import Sidebar from './RecruiterSidebar';
import Landingpage from './Landingpage';
import Assessmentfeedback from './Assessmentfeedback';
import Assessmentreviews from './Assessmentreviews';
import Intervieweelist from './Intervieweelist';


function App() {
  const [assessment_id, setAssessment_id] = useState("")

  function handleRender(id){
    setAssessment_id(id)
  }
  return (
    <>
      <div>
        <Routes>
          <Route path='/' element={<Landingpage />} />
          <Route path='/' element={<Feedback/>} />
          <Route exact path='/signup' element={<SignUp />} />
          <Route exact path='/signin' element={<SignIn />} />
          <Route exact path='/assessmentfeedback' element={<Assessmentfeedback />} />
          <Route exact path='/Assessmentreviews' element={<Assessmentreviews onrender={handleRender}/>} />
          <Route exact path='/Intervieweelist' element={<Intervieweelist assessment_id={assessment_id}/>} />

        </Routes>
      </div>
      <div>
        {/* <Sidebar /> */}
        <Routes>
          <Route exact path='/intervieweehomepage' element={<IntervieweeHome />} />
          
          <Route exact path='/recruiterhomepage' element={<RecruiterHome />} />
        </Routes>
      </div>
    </>
  );
}
{/* <Route exact path='/Interviewee' element={<Interviewee />} />
<Route exact path='/Intervieweesidebar' element={<Intervieweesidebar />} />
<Route exact path='/Sidebar' element={<Sidebar />} /> */}
export default App;
