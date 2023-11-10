import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function SignIn({ onLogin }) {
  const navigate = useNavigate();
  const [email, setemail] = useState('');
  const [Password, setPass] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState(''); 

  const [error, setError] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    const userDetails = {
      email: email,
      password: Password,
    };
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDetails),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            setMessage(data.message); // Display error message in the authentication div
            setemail('');
            setPass('');
          });
        } else {
          return response.json().then((user) => {
            if (user !== null){
              setMessage('Successful log in')
              if (user.role === 'recruiter') {
                setTimeout(() => {
                  navigate('/recruiterassessments', { replace: true });
                  onLogin(user);
                }, 2000); // Redirect after 2 seconds
              } else if (user.role === 'interviewee') {
                setTimeout(() => {
                  navigate('/acceptedassessments', { replace: true });
                  onLogin(user);
                }, 2000); // Redirect after 2 seconds
              }
            }
            else{
              setMessage('SignIn Failed')
              setemail('')
              setPass('')
            }  
          });
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const handleEmail = event => {
      if (!isValidEmail(event.target.value)) {
        setError('Email is invalid');
      } else {
        setError(null);
      }

      setemail(event.target.value);
  };

  function isValidPassword(Password) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(Password);
  }

  const handlePassword = event => {
      if (!isValidPassword(event.target.value)) {
        setError('Email is invalid');
      } else {
        setError(null);
      }

      setPass(event.target.value);
  };

  return (
    <div className="page">
      <div id="signin-bg"></div>
      <div className="header">
        <h4 className="top-left">
          <span>SMART</span> <text>RECRUITOR</text>
        </h4>
        <h4 className="top-right">
          <span>SIGN IN</span>
        </h4>
      </div>

      <div className="authentication" style={{ height: '500px' }}>
        <p>
          <span>Please Sign In</span>
        </p>
        {message && (
          <div className="message" style={{ color: message.includes('Successful') ? 'green' : 'red' }}>
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="authentication-form" style={{ marginTop: '60px' }}>
          <label htmlFor="username" className="input-label">
            <text>Email:</text>
          </label>
          <br />
          <input
            className="authentication-input"
            name="username"
            required
            type="text"
            value={email}
            onChange={handleEmail}
          />
          <p>{error && <h7 style={{color: 'red'}}>{error}</h7>}</p>
          <br />
          <br />

          <label htmlFor="password" className="input-label" style={{marginTop: '-50px'}}>
            <text>Password:</text>
          </label>
          <br />
          <input
            className="authentication-input"
            autoComplete="off"
            name="password"
            required
            type={showPassword ? 'text' : 'password'}
            value={Password}
            onChange={handlePassword}
          />
          <div style={{ marginTop: '20px' }}>
            <Button variant="primary" type="submit">
              SignIn
            </Button>{' '}
            <input type="checkbox" onChange={() => setShowPassword(!showPassword)} />
            <label>
              <span>Show Password</span>
            </label>
          </div>
        </form>
        <br />
        <Link to="/signup" className="link_to">
          <h5 style={{paddingTop: '20px', fontFamily: 'fantasy'}}><span>Create new Account?</span></h5>
        </Link>
      </div>
    </div>
  );
}
export default SignIn;
