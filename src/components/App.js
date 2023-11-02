import './App.css';
import {useEffect, useState} from "react";
import { Route, Routes } from "react-router-dom"
import SignUp from './SignUp';
import SignIn from './SignIn';
import Mainpage from './Mainpage';
import Sidebar from './Sidebar';
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
          <Route exact path='/homepage' element={<Mainpage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
