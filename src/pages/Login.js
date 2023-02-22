import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'

const Login = () => {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const navigate=useNavigate()


    const handleLogin=async (e)=>{
        e.preventDefault()
        const req=await fetch("http//localhost:4000/api/login",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:await JSON.stringify({
                email,
                password,
            })
        })
        const data=await req.json;

        if(data.status === "ok"){
            localStorage.setItem("token",data.token);
            navigate("/dashboard")
        }else{
            alert("Wrong Password");


        }

    }
  return (
    <div>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
            <input type="email" value={email} placeholder="email" onChange={(e)=>setEmail(e.target.value)}/>
            <br/>
            <inpuyt type="password" value={password} placeholder="password" onChange={(e)=>setPassword(e.target.value)}/>

            <br/>
            <input type="submit"/>
        </form>
    </div>
  )
}

export default Login