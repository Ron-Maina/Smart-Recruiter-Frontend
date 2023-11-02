import './App.css';
import {useEffect, useState} from "react";
import { Route, Routes } from "react-router-dom"
import SignUp from './SignUp';
import SignIn from './SignIn';
import Mainpage from './Mainpage';
import Sidebar from './Sidebar';
import Landingpage from './Landingpage';
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
          <Route exact path='/signup' element={<SignUp />} />
          <Route exact path='/signin' element={<SignIn />} />
          <Route exact path='/Assessmentreviews' element={<Assessmentreviews onrender={handleRender}/>} />
          <Route exact path='/Intervieweelist' element={<Intervieweelist assessment_id={assessment_id}/>} />

        </Routes>
      </div>
      <div>
        {/* <Sidebar /> */}
        <Routes>
          <Route exact path='/homepage' element={<Mainpage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
