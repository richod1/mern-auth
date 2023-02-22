import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const [name,setName]=useState('')
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState('')
const navigate=useNavigate();

    const handleRegister=async(e)=>{
        e.preventDefault();
        const req=await fetch("http//localhost:4000/api/Register",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:await JSON.stringify({
                name,
                email,
                password,
            })
        })
        const data=await req.json();

        if(data.status === "ok"){
            navigate("/login")
        }else{
            alert("Duplicate Email")
        }
      

    }
  return (
    <div>
        <h1>Register</h1>
        <form onSubmit={handleRegister}>
            <input type='text' value={name} placeholder='name' onChange={(e)=>setName(e.target.value)}/>
            <br/>
            <input type='email' value={email} placeholder='email' onChange={(e)=>setEmail(e.target.value)}/>
            <br/>
            <input type='password' value={password} placeholder='password' onChange={(e)=>setPassword(e.target.value)}/>
            <br/>
            <input type='submit'/>
        </form>
    </div>
  )
}

export default Register