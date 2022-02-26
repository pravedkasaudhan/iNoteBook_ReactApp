import React,{useState} from 'react'
import {useHistory} from 'react-router-dom'


const SignUp = () => {
    const [credentials, setCredentials] = useState({name:"",email:"",password:"",cpassword:""})
    const history=useHistory();

    const handleSubmit=async (e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/createUser`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body:JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password})
           
          });
          const json = await response.json();
          console.log(json);
          if(json.success){
            history.push('/Login');
            // localStorage.setItem('token',json.authToken);
        }
        else{
            alert("luser created suuccessfully")
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div className="container my-4">
            <h2>Create an account to use iNoteBook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name </label>
                    <input type="text" className="form-control" name="name" id="name"  value={credentials.name} onChange={onChange} aria-describedby="emailHelp" />                 
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email </label>
                    <input type="email" className="form-control" name="email" id="email"  value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />                 
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" value={credentials.password}  onChange={onChange} id="password" />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label" >Confirm Password</label>
                    <input type="password" className="form-control" name="cpassword" value={credentials.cpassword}  onChange={onChange} id="cpassword" />
                </div>
            
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default SignUp
