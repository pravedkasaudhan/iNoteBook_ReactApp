import React,{useState} from 'react'
import {useHistory} from 'react-router-dom'


const Login = () => {
    const [credentials, setCredentials] = useState({email:"",password:""})
    const history=useHistory();

    const handleSubmit=async (e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body:JSON.stringify({email:credentials.email,password:credentials.password})
           
          });
          const json = await response.json();
          console.log(json);
          if(json.success){
              history.push('/');
              localStorage.setItem('token',json.authToken);
          }
          else{
              alert("login with correct credentials")
          }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div className="container">
            <h2>Login to access the Notes</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email </label>
                    <input type="email" className="form-control" name="email" id="email"  value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />                 
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" value={credentials.password}  onChange={onChange} id="password" />
                </div>
            
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
