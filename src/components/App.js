import './App.css';
import {useEffect, useState} from "react";
import { Route, Routes } from "react-router-dom"
import SignUp from './SignUp';
import SignIn from './SignIn';
import RecruiterHome from './RecruiterHome';
import IntervieweeHome from './IntervieweeHome';
import Sidebar from './RecruiterSidebar';
import Landingpage from './Landingpage';


function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path='/' element={<Landingpage />} />
          <Route exact path='/signup' element={<SignUp />} />
          <Route exact path='/signin' element={<SignIn />} />
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
