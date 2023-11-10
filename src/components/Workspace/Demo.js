import React, { useState, useEffect } from "react";
// import Editor from "@monaco-editor/react";
// import Navigationbar from "./Navbar";


function Demo() {
    const [demo, setDemo] = useState('')
    const [userCode, setUserCode] = useState('');
    const [testCode, setTestCode] = useState('');
    const [result, setResult] = useState(null);

    

    useEffect(() => {
        fetch('https://www.codewars.com/api/v1/code-challenges/valid-braces')
        .then(res => res.json())
        .then(data => setDemo(data))
    }, [])

    // const kata = {
    //     "code": usercode,
    //     "test": demo
    // }
    // console.log(usercode)

    function handleSubmit(e){
        e.preventDefault()
        fetch('http://127.0.0.1:5000/runcode', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userCode, testCode }),
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error('Error:', error);
        });
    }

  return (
    <div className='page'>
        <div id="intervieweehomepage-bg"></div>
        {/* <Navigationbar /> */}
        <div className="display">
            <div className="kata">
                <p className="break-point" style={{color: 'white'}}>{demo.description}</p>
            </div> 
        
            <div className="kata" style={{display: 'flex',flexDirection: 'row', gap: '50px', marginLeft: '250px'}}>
                <form onSubmit={handleSubmit}> 
                <div>
                <div>
                <textarea
                    placeholder="Enter your Python code here"
                    value={userCode}
                    onChange={(e) => setUserCode(e.target.value)}
                />
                </div>
                <div>
                <textarea
                    placeholder="Define your pytest tests here"
                    value={testCode}
                    onChange={(e) => setTestCode(e.target.value)}
                />
                </div>
                <button onClick={handleSubmit}>Run Tests</button>
                {result && (
                    <div>
                    <p>Passed Tests: {result.passed}</p>
                    <p>Total Tests: {result.total}</p>
                    </div>
                )}
                </div>
                </form>
            </div>
        </div>    
    </div>   
  );
}

export default Demo