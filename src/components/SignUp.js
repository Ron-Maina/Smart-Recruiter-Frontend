import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button } from 'react-bootstrap';

function SignUp({ onSignUp }) {
  const navigate = useNavigate();
  const [url, setUrl] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [successfulSignup, setSuccessfulSignup] = useState(false); 
  const [signUpFailed, setSignUpFailed] = useState(false); 
  const [selectedUserType, setSelectedUserType] = useState(''); // State to manage selected user type
  const [textToggle, setTextToggle] = useState(true); // State to toggle text color

  useEffect(() => {
    if (successfulSignup) {
      // Navigate to the login page after a delay
      const timeout = setTimeout(() => {
        navigate('/signin');
      }, 3000);

      // Clear the timeout when the component unmounts to prevent navigation after leaving the page
      return () => clearTimeout(timeout);
    }
  }, [successfulSignup, navigate]);

  function handleClick(user) {
    setSignUpFailed(false); 
    
    setSelectedUserType(user);
    
    setTextToggle(!textToggle); 
    
    if (user === 'recruiter') {
      onSignUp(user);
      setUrl('https://smart-recruiter-api.onrender.com/recruitersignup');
    } else if (user === 'interviewee') {
      onSignUp(user);
      setUrl('https://smart-recruiter-api.onrender.com/intervieweesignup');
    }
  }

  const phonenumberpattern = /^(?:254|0)[17]\d{8}$/
  const passwordpattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  const formSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Must enter email'),
    username: yup.string().required('Must enter a username'),
    password: yup.string().required('Must Enter Password').matches(passwordpattern, 'Password must include alphanumeric characters and symbols'),
    number: yup.string().required('Must Enter Phone Number').matches(phonenumberpattern, 'Phone number is not valid'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      number: '',
      password: '',
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values, null, 2),
      }).then((res) => {
        if (res.status === 200) {
          setSuccessfulSignup(true); // Set the successful signup message to appear
        } else {
          setSignUpFailed(true); // Set the sign-up message to appear
        }
      });
    },
  });

  return (
    <div className="page">
      <div id="signup-bg"></div>
      <div className="header">
        <h4 className="top-left">
          <span>SMART</span> <text onClick={() => setTextToggle(!textToggle)}>RECRUITOR</text>
        </h4>
        <h4 className="top-right">
          <span onClick={() => setTextToggle(!textToggle)}>SIGN UP</span>
        </h4>
      </div>

      <div className="authentication">
        <div style={{ textAlign: 'center' }}>
          <span>Sign Up As:</span>

          <div className="user-options">
            <h5
              style={{ paddingTop: '20px' }}
              onClick={() => handleClick('recruiter')}
              className={selectedUserType === 'recruiter' ? 'selected-user' : ''}
            >
              <text
                style={{ color: selectedUserType === 'recruiter' && textToggle ? 'lightgoldenrodyellow' : 'deepskyblue' }}
              >
                Recruiter
              </text>
            </h5>
            <h5
              style={{ paddingTop: '20px' }}
              onClick={() => handleClick('interviewee')}
              className={selectedUserType === 'interviewee' ? 'selected-user' : ''}
            >
              <text
                style={{ color: selectedUserType === 'interviewee' && !textToggle ? 'lightgoldenrodyellow' : 'deepskyblue' }}
              >
                Interviewee
              </text>
            </h5>
          </div>
        </div>

        <form onSubmit={formik.handleSubmit} className="authentication-form">
          <label htmlFor="username" className="input-label">
            <text>Username:</text>
          </label>
          <br />
          <input
            className="authentication-input"
            autoComplete="off"
            id="username"
            name="username"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          <p style={{ color: 'red' }}>{formik.errors.name}</p>
          <br />

          <label htmlFor="email" className="input-label">
            <text>Email Address:</text>
          </label>
          <br />
          <input
            className="authentication-input"
            autoComplete="off"
            type="email"
            id="email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <p style={{ color: 'red' }}>{formik.errors.email}</p>
          <br />

          <label htmlFor="number" className="input-label">
            <text>Phone Number:</text>
          </label>
          <br />
          <input
            className="authentication-input"
            autoComplete="off"
            max={12}
            min={12}
            id="number"
            name="number"
            onChange={formik.handleChange}
            value={formik.values.number}
          />
          <p style={{ color: 'red' }}>{formik.errors.number}</p>
          <br />

          <label htmlFor="password" className="input-label">
            <text>Password:</text>
          </label>
          <br />
          <input
            className="authentication-input"
            autoComplete="off"
            id="password"
            name="password"
            onChange={formik.handleChange}
            type={showPassword ? 'text' : 'password'}
            value={formik.values.password}
          />
          <p style={{ color: 'red' }}>{formik.errors.password}</p>
          <br />
          <div>
            <Button variant="secondary" type="submit">
              Submit
            </Button>{' '}
            <input type="checkbox" onChange={() => setShowPassword(!showPassword)} />
            <label>
              <span>Show Password</span>
            </label>
          </div>
        </form>
        <div style={{ textAlign: 'center' }}>
          <br />
          <p>
            <Link to="/signin" style={{ color: 'white' }}>
              <span>Already have an account? Login</span>
            </Link>
          </p>
        </div>
        {successfulSignup && (
          <p style={{ color: 'green', textAlign: 'center' }}>Successful signup</p>
        )}
        {signUpFailed && (
          <p style={{ color: 'red', textAlign: 'center' }}>SignUp Failed! Email may already exist</p>
        )}
      </div>
    </div>
  );
}

export default SignUp;
