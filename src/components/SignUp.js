import React, {useState} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useFormik } from "formik";
import * as yup from 'yup'
import {Button} from 'react-bootstrap';


function SignUp() {
    const navigate = useNavigate()
    const [refreshPage, setRefreshPage] = useState(false);
    
    function loginPage(){
        navigate("/login")
    }

    const formSchema = yup.object().shape({
        email: yup.string().email("Invalid email").required("Must enter email"),
        username: yup.string().required("Must enter a username"),
        password: yup.string().required("Must Enter Password"),
        number: yup.string().required("Must Enter Phone Number")
    });

    const formik = useFormik({
        initialValues: {
        username: "",
        email: "",
        number: "",
        password: "",
        },

        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch("/signup", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(values, null, 2),
            }).then((res) => {
                if (res.status === 200) {
                    setRefreshPage(!refreshPage);
                    alert('Successful signup')
                    loginPage()
                } else {
                    alert('Email or Number already exists')
                }
            });
        },
    });

    return (
        <div className='page'>
            <div id="signup-bg"></div>
            <div className= 'header'>
                <h4 className='top-left'><span>SMART</span> <text>RECRUITOR</text></h4>
                <h4 className='top-right'><span>SIGN UP</span></h4>
            </div>
            <div className='authentication'>
                <h4 style={{textAlign: 'left', marginTop: '0px'}}><span>Please Sign Up</span></h4>
                <form onSubmit={formik.handleSubmit} className='authentication-form'>
                <label htmlFor="username" className='input-label'><text>Username:</text></label>
                    <br />
                    <input
                    className='authentication-input'
                    autoComplete="off"
                    id="username"
                    name="username"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    />
                    <p style={{ color: "red" }}> {formik.errors.name}</p>

                    <label htmlFor="email" className='input-label'><text>Email Address:</text></label>
                    <br />
                    <input
                    className='authentication-input'
                    autoComplete="off"
                    type='email'
                    id="email"
                    name="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    />
                    <p style={{ color: "red" }}> {formik.errors.email}</p>
                    
                    
                    <label htmlFor="number" className='input-label'><text>Phone Number:</text></label>
                    <br />
                    <input
                    className='authentication-input'
                    autoComplete="off"
                    id="number"
                    name="number"
                    onChange={formik.handleChange}
                    value={formik.values.number}
                    />
                    <p style={{ color: "red" }}> {formik.errors.number}</p>

                    <label htmlFor="password" className='input-label'> <text>Password:</text></label>
                    <br />
                    <input
                    style={{width: '300px', height: '30px'}}
                    className='authentication-input'
                    autoComplete="off"
                    id="password"
                    name="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    />
                    <p style={{ color: "red" }}> {formik.errors.password}</p>
                    <div><Button variant="secondary" type='submit'>Submit</Button>{' '}</div>
                </form>
                <div style={{textAlign: 'center'}}>
                    <p>
                        <Link to = "/signin" style={{color: "white"}}><span>Already have an account? Login</span></Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignUp