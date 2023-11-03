import React from "react";

const FeedBack = () => {
  return (
    <div
      className="d-flex p-2 justify-content-evenly flex-wrap"
      style={{
        marginTop: "250px",
        marginLeft: "15%",
        height: "300px",
        width: "75%",
      }}
    >
      <div className="card" style={{ width: "40rem", height: "20rem",paddingTop:"60px", margin: "20px" }}>
        <div className="card-body">
          <h5 className="card-title">Assessment Name: </h5>
          <h6 className="card-subtitle mb-2 text-body-secondary">DATE: </h6>
          <p className="card-text">GRADE:</p>
          <a href="frontcode" className="btn btn-primary">
            View Assessment details
          </a>
        </div>
      </div>

      <div className="card" style={{ width: "40rem", height: "20rem",paddingTop:"60px", margin: "20px" }}>
        <div className="card-body">
          <h5 className="card-title">Assessment Name: </h5>
          <h6 className="card-subtitle mb-2 text-body-secondary">DATE: </h6>
          <p className="card-text">GRADE:</p>
          <a href="frontcode" className="btn btn-primary">
            View Assessment details
          </a>
        </div>
      </div>
    </div>
  );
};

export default FeedBack;
