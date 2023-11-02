import React from "react";

function Sidebar(){

    return(
        <div>
          <div className="absolute top-[155px] left-[30px] rounded-xl bg-[#324c59] bg-opacity-70 box-border w-[247px] h-[480px] border-[2px] border-solid border-lightgoldenrodyellow" />
              <div
          className="absolute top-[270px] left-[105px] text-xl font-semibold inline-block w-[234px] h-[29px] cursor-pointer text-[#0cc2fa]">
          Assessments
        </div>
        <div className="absolute top-[370px] left-[105px] text-xl font-semibold inline-block w-[234px] h-[29px] text-[#0cc2fa]">
          Reviews
        </div>
        <div className="absolute top-[461px] left-[105px] text-xl font-semibold inline-block w-[234px] h-[29px] text-[#0cc2fa]">
          Interviewees
        </div>

        </div>
    )

}

export default Sidebar;