import React from 'react'
import { useState} from 'react'
import {useNavigate, Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';



function SignIn({onLogin}) {
    const navigate = useNavigate() 

    const [Username, setusername] = useState("")
    const [Password, setPass] = useState("")

    function handleSubmit(e){
        e.preventDefault()
        const userDetails = {
            "username": Username,
            "password": Password,
        }
        fetch('/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userDetails),
        })
        .then((response) => {
            if (!response.ok) {
                alert("Invalid Email or Password");
                setusername('')
                setPass('')
            }else{
                navigate("/homepage", {replace: true})
                return response.json();
            }   
        })
        .then(user => onLogin(user))
        .catch((error) => {
            console.error("Error:", error);
        });
        
    }

    return (
        <div className='page'>
            <div id="signin-bg"></div>
            <div className= 'header'>
                <h4 className='top-left'><span>SMART</span> <text>RECRUITOR</text></h4>
                <h4 className='top-right'><span>SIGN IN</span></h4>
            </div>

            <div className='authentication'>
                 <h4 style={{textAlign: 'left', marginTop: '0px'}}><span>Please Sign In</span></h4>
                <form onSubmit={handleSubmit} className='authentication-form'>
                    <label htmlFor='username' className='input-label'><text>Username:</text></label>
                    <br/>
                    <input
                    className='authentication-input'
                    name='username'
                    required
                    type='text'
                    value={Username}
                    onChange={(e) => setusername(e.target.value)}
                    />
                    <br/>
                    <br/>
                    <br/>
                    
                    <label htmlFor='password' className='input-label'><text>Password:</text></label>
                    <br/>
                    <input
                    className='authentication-input'
                    autoComplete="off"
                    name='password'
                    required
                    type='text'
                    value={Password}
                    onChange={(e) => setPass(e.target.value)}
                    />

                    <div style={{marginTop: '20px'}}>
                        <Button variant="info" type='submit'>SignIn</Button>{' '}   
                    </div>
                    <br/>
                    <p>
                        <Link to = "/signup" style={{color: "white"}}><span>New Account?</span></Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default SignIn