import React from "react";
import Intervieweesidebar from "./Intervieweesidebar";
import Sidebar from "./RecruiterSidebar";

function IntervieweeHome(){

    return(
      <div className='page'>
        <div id="intervieweehomepage-bg"></div>
        <div style={{ display: 'flex' }}>
          <div><Intervieweesidebar /></div>
          <div style={{height: "100vh", overflow: "auto"}}>Hi</div>
          {/* <div className="rounded-xl bg-[#324c59] bg-opacity-70 box-border w-[247px] h-[540px] border-[2px] border-solid border-lightgoldenrodyellow" style={{marginTop: '170px', width: '500px'}}>You</div> */}
        </div>
        {/* // <div className="relative w-full h-[1028px] overflow-hidden bg-[url('/public/assesment-page@3x.png')] bg-cover bg-no-repeat bg-[top] text-left text-5xl text-lightgoldenrodyellow font-inter">
        //   <div className="absolute top-[400px] left-[500px] inline-block w-[1150px] text-[60px] ">
        //     <p className="text-[#b9b79a]">
        //       <b>Quiz Yourself</b>
        //     </p>
        //     <p className="mt-0 text-8xl font-quicksand text-[#b9b79a]">
        //       <b>Unlock Your Knowledge</b>
        //     </p>
        //   </div>
        //   <div className="absolute top-[47px] left-[58px] font-medium text-2xl inline-block w-[360px] h-[29px]">
        //     <span className="text-[#b9b79a]">{`SMART `}</span>
        //     <span className="text-[#0cc2fa]">RECRUITOR</span>
        //   </div>
        //   <div className="absolute top-[47px] left-[1000px] font-semibold text-2xl text-[#0cc2fa] inline-block w-[106px] h-[21px]">
        //     HOME
        //   </div>
        //   <div className="absolute top-[47px] left-[1300px] font-medium text-2xl inline-block w-[106px] h-[21px] text-[#b9b79a]">
        //     ABOUT
        //   </div>
        //   <div className="absolute top-[47px] left-[1600px] font-medium text-2xl inline-block w-[106px] h-[21px] text-[#b9b79a]">
        //     <p className="m-0">PROFILE</p>
        //   </div>
        // </div> */}
      </div>
    );
};

export default IntervieweeHome;
