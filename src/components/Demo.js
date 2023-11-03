import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
function Demo() {
    const [demo, setDemo] = useState({})
    

    useEffect(() => {
        fetch('https://www.codewars.com/api/v1/code-challenges/valid-braces')
        .then(res => res.json())
        .then(data => setDemo(data))
    })

  return (
    <div className='page'>
        <div id="intervieweehomepage-bg"></div>
        <div className="display">
            <div className="kata">
                <p className="break-point" style={{color: 'white'}}>{demo.description}</p>
            </div> 
        
            <div className="kata" style={{display: 'flex',flexDirection: 'column', gap: '50px', marginLeft: '250px'}}>
                {/* <textarea
                    rows={10}
                    style={{backgroundColor: 'black', color: 'white', borderRadius: '10px'}}
                    placeholder="Enter your Python code here"
                    value={userCode}
                    onChange={(e) => setUserCode(e.target.value)}
                ></textarea> */}
                
            </div>
        </div>    
    </div>   
  );
}

export default Demo