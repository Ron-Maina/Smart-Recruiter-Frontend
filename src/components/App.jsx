import "./App.css";
import { Navbar } from "./Navbar";
import NewAssess from "./NewAssess";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import FeedBack from "./Feedback";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/feedback' element={<FeedBack/>}/>
          <Route path='/' element={<Home/>}/>
          <Route path='/newassessment' element={<NewAssess/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
