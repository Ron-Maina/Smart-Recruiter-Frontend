import './App.css';
import {useEffect, useState} from "react";
import { Route, Routes } from "react-router-dom"
import SignUp from './SignUp';
import SignIn from './SignIn';
import Mainpage from './Mainpage';
import Sidebar from './Sidebar';

function App({ backgroundColor }) {
  return (
    <div style={{ backgroundColor }}>
      <Mainpage />
      <Sidebar />
    <Routes>
      <Route exact path='/signup' element={<SignUp />} />
      <Route exact path='/signin' element={<SignIn />} />
    </Routes>
    </div>
  );
}

export default App;
