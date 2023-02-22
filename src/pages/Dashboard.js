import React,{useState,useEffect} from 'react'
import {decodeToken} from 'react-jwt'

const Dashboard = () => {
    const [tempgoal,setTempgoal]=useState("")
    const [goal,setGoal]=useState('')
    const populateDashboard=async ()=>{
        const token=localStorage.getItem("token")

        const req=await fetch("http://localhost:4000/api/dashboard",{
            headers:{"x-access-token":token}
        })

        const data= await req.json()
        if(data.status==="ok"){
            setGoal(data.goal)
        }else{
            alert("invalid Token")
        }

    };

    const addGoal=async (e)=>{
        e.preventDefault();
        const token=localStorage.getItem("token");

        const req=await fetch("http://loaclhost:4000/api/dashboard",{
            method:"POST",
            headers:{"Content-Type":"application/json","x-access-token":token},
            body:await JSON.stringify({
                tempgoal,
            })
        })

        const data= await req.json();

        if(data.status==="ok"){
            setGoal(tempgoal);
            setTempgoal('')
        }else{
            alert("Token Invalid")
        }

    };
    useEffect(()=>{
        const token=localStorage.getItem("token");
        const isTokenValid=decodeToken(token);
        if(isTokenValid){
            populateDashboard();
        }else{
            alert("Invalid Token");
        }

            
    });
    // const addGoal=async (e)=>{
    //     e.preventDefault();

    //     const token=localStorage.getItem("token")
    // }

  return (
    <div>
        <h1>Dashboard</h1>
        <h1>{goal || "No goal found"}</h1>
        <form onSubmit={addGoal}>
            <imnput type="text" value={tempgoal} placeholder="Add A Goal" onChange={(e)=>setTempgoal(e.target.value)} />

            <br/>
            <input type="text"/>
        </form>
    </div>
  )
}

export default Dashboard