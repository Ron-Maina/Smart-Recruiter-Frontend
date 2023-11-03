import React from "react";

const NewAssess = () => {
  return (
    <div style={{width: "750px", marginTop:"10%", marginLeft:"25%"}}>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label" style={{color:"wheat"}}>
          Assessment Name
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="Assessment Name"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlTextarea1" className="form-label" style={{color:"wheat"}}>
        Assessment QUIZ
        </label>
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
        ></textarea>
        <button type="button" className="btn btn-primary" style={{marginTop: "20px"}}>Create Assessment</button>
      </div>
    </div>
  );
};

export default NewAssess;
