import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from '../src/components/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom"

// function getRandomColor() {
//   const colors = ['#ff5733', '#00ff00', '#3366ff', '#ffff00', '#ff33cc'];
//   const randomIndex = Math.floor(Math.random() * colors.length);
//   return colors[randomIndex];
// }

// function ColoredApp() {
//   const backgroundColor = getRandomColor();
//   return <App backgroundColor={backgroundColor} />;
// }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div className='bodt'>
  <React.StrictMode>
    <BrowserRouter>
    
      <App />
 
    </BrowserRouter>
  </React.StrictMode>
  </div>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
