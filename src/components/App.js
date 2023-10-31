import './App.css';
import {useEffect, useState} from "react";
import { Route, Routes } from "react-router-dom"
import SignUp from './SignUp';
import SignIn from './SignIn';
import Landingpage from './Landingpage';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Landingpage />} />
        <Route exact path='/signup' element={<SignUp />} />
        <Route exact path='/signin' element={<SignIn />} />
      </Routes>
    </>
  );
}

export default App;
