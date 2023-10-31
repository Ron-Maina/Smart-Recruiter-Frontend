import React from "react";

function Mainpage(){

    return(
        <div>
            <div className="relative rounded-3xs w-full h-[665px] overflow-hidden bg-[url('/public/home-page@3x.png')] bg-cover bg-no-repeat bg-[top] text-left text-5xl text-deepskyblue font-inter">
      <div className="absolute top-[47px] left-[58px] font-medium text-2xl">
        <span className="text-[#b9b79a]">{`SMART `}</span>
        <span className="text-[#0cc2fa]">RECRUITER</span>
      </div>
      </div>
      <div className="absolute top-[47px] left-[900px] font-extrabold text-lightgoldenrodyellow inline-block w-[106px] h-[21px] text-[#b9b79a]">
        HOME
      </div>
      
      <div className="absolute top-[47px] left-[1000px] font-extrabold text-lightgoldenrodyellow inline-block w-[106px] h-[21px] text-[#b9b79a]">
        ABOUT
      </div>
      <div className="absolute top-[47px] left-[1100px] font-extrabold text-lightgoldenrodyellow inline-block w-[106px] h-[21px] text-[#b9b79a]">
        <p className="m-0">PROFILE</p>
      </div>
      <div className="absolute top-[155px] left-[320px] rounded-3xs bg-darkslategray box-border w-[941px] h-[480px] border-[2px] border-solid border-lightgoldenrodyellow bg-[#324c59] bg-opacity-60" />
      <b className="absolute top-[430px] left-[460px] text-[96px] font-quicksand text-[#0cc2fa]">
        SmartRecruiter
      </b>
      <div className="absolute top-[350px] left-[624px] text-[48px] font-semibold font-josefin-sans text-tan text-[#b9b79a]">
        Automate with
      </div>
      <div className="absolute top-[280px] left-[598px] font-semibold text-[#0cc2fa]">
        Tired of Hours and Hours of Face to Face Interviews?
      </div>
      
    </div>
    

    )

}

export default Mainpage;