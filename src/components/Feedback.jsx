import React, { useEffect, useState } from "react";

const Feedback = () => {
  const url = "http://localhost:3000/transactions";
  const [transactions, setTransaction] = useState([]);
  useEffect(() => {
    fetch(`${url}`)
      .then((response) => response.json())
      .then((data) => setTransaction(data));
  }, [transactions]);
  console.log(transactions);
  return (
    <div>
      {" "}
      <table className="table table-bordered border-primary">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">Date</th>
            <th scope="col">Description</th>
            <th scope="col">Mentor</th>
            <th scope="col">Grade</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>10th October</td>
            <td>Gibberish</td>
            <td>J MAGU</td>
            <td>90</td>
          </tr>
          <tr>
            <td>2</td>
            <td>10th October</td>
            <td>Gibberish</td>
            <td>J MAGU</td>
            <td>100</td>
          </tr>

          <tr>
            <td>3</td>
            <td>10th October</td>
            <td>Gibberish</td>
            <td>J MAGU</td>
            <td>80</td>
          </tr>
          <tr>
            <td>4</td>
            <td>19th October</td>
            <td>Gibberish</td>
            <td>Julius Gichane</td>
            <td>70</td>
            <tr>
              <td>5</td>
              <td>10th November</td>
              <td>Gibberish</td>
              <td>J MAGU</td>
              <td>90</td>
            </tr>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Feedback;
