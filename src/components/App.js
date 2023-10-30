import './App.css';
import {useEffect, useState} from "react";
import { Route, Routes } from "react-router-dom"
import SignUp from './SignUp';
import SignIn from './SignIn';

function App({ backgroundColor }) {
  return (
    <div style={{ backgroundColor }}>
    <Routes>
      <Route exact path='/signup' element={<SignUp />} />
      <Route exact path='/signin' element={<SignIn />} />
    </Routes>
    </div>
  );
}

export default App;
