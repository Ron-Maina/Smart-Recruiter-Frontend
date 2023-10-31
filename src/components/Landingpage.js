import React, { useState } from "react";

function Landingpage() {
  const [signInOpen, setSignInOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [signInOption, setSignInOption] = useState("Sign In");
  const [signUpOption, setSignUpOption] = useState("Sign Up");

  const signInOptions = ["Recruiter", "Interviewee"];
  const signUpOptions = ["Recruiter", "Interviewee"];

  const handleSignInOptionChange = (option) => {
    setSignInOption(option);
    setSignInOpen(false);
  };

  const handleSignUpOptionChange = (option) => {
    setSignUpOption(option);
    setSignUpOpen(false);
  };

  return (
    <div className="relative rounded-3xs w-full h-[700px] overflow-hidden bg-[url('/public/our-background.jpg')] bg-cover bg-no-repeat bg-[top]">
      <div className="absolute top-[93px] left-[54px] font-extrabold inline-block w-[401px] h-[29px] shadow-lg text-xl">
        <span className="text-yellow-300">SMART</span>
        <span className="text-blue-300">RECRUITER</span>
      </div>
      <div className="absolute top-[200px] left-[140px] inline-block w-[1150px] text-[64px]">
        <p className="text-white">
          <b>Welcome to</b>
        </p>
        <p className="mt-0 text-[128px] font-quicksand text-white">
          <b>SmartRecruiter</b>
        </p>
      </div>
      <div className="absolute top-[99px] left-[1100px] font-medium inline-block w-[106px] h-[21px] cursor-pointer text-white">
        <div className="relative group" onClick={() => setSignInOpen(!signInOpen)}>
          <button className="dropdown-toggle">SIGN IN</button>
          {signInOpen && (
            <div className="dropdown-menu absolute top-10 left-0 z-10">
              {signInOptions.map((option) => (
                <div
                  key={option}
                  onClick={() => handleSignInOptionChange(option)}
                  className="dropdown-item cursor-pointer bg-gray-200 rounded p-2 mb-1 text-black"
                >
                  {`${option}`}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="absolute top-[99px] left-[1000px] font-medium inline-block w-[106px] h-[21px] cursor-pointer text-white">
        <div className="relative group" onClick={() => setSignUpOpen(!signUpOpen)}>
          <button className="dropdown-toggle">SIGN UP</button>
          {signUpOpen && (
            <div className="dropdown-menu absolute top-10 left-0 z-10">
              {signUpOptions.map((option) => (
                <div
                  key={option}
                  onClick={() => handleSignUpOptionChange(option)}
                  className="dropdown-item cursor-pointer bg-gray-200 rounded p-2 mb-1 text-black"
                >
                  {`${option}`}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="absolute top-[450px] left-[300px] text-[32px] font-medium text-deepskyblue">
        <p className="m-0">
          <span className="text-white">AUTOMATE</span>
          <span className="text-white">{` `}</span>
          <span className="text-yellow-300">YOUR RECRUITMENT PROCESS!</span>
        </p>
      </div>
    </div>
  );
}

export default Landingpage;
