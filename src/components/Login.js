import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';



const Login = (props) => {

    const [credentials, setCredentials] = useState({email:"", password:""});
    let navigate = useNavigate();
    //const host = 'http://localhost:5000'

   const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json = await response.json();
        console.log(json);
        if(json.success){
            //save the authtoken and redirect
            localStorage.setItem('token', json.authtoken);
            props.showAlert("Login Sucessfull","success");
            navigate('/');
        }
        else{
           //alert('Invalid Credentials')
           props.showAlert("Invalid Credentials","danger");
        }
    }

    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

  return (
    <div className="mt-5">
        <form onSubmit={handleSubmit}>
            <h1>LOGIN</h1>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" value={credentials.email} onChange={onChange} name="email" aria-describedby="emailHelp"  required/>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" value={credentials.password} onChange={onChange} id="password" name="password" required />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}

export default Login