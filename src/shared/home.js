import React, { useEffect,useContext } from "react";
import { useHttpClient } from "./hooks/http-hook";
import { NavLink } from "react-router-dom";
import { AuthContext } from "./context/auth-context";

    
const Home = () =>{
    const auth = useContext(AuthContext)
    const { sendRequest} = useHttpClient();
    useEffect(()=>{
        const fetchUsers = async () =>{
            try{
                const response = await sendRequest(process.env.REACT_APP_BACKEND_URL+'/api/users')
                console.log(response)
                
            }catch(err){

            }
        }
        fetchUsers();
    },[])

    return(<div style={{textAlign:'center',padding:'5% 10%',fontSize:'1.5em',textJustify:"inter-word"}}>
       
      <h1 style={{fontWeight:'bolder'}}>Capture life's moments. Share the journey. Connect through memories.</h1>
      <p style={{textAlign:'center'}}><span style={{color:auth.token?'':'darkblue',cursor:auth.token?'default':'pointer'}}>{auth.token?'Sign in':<NavLink exact to='/auth'>Sign in</NavLink>}</span> to share your spark and <span style={{cursor:'pointer',color:'darkblue'}}><NavLink exact to='/users'>dive into</NavLink></span> the gallery of shared stories.</p>
      </div>)
}


export default Home