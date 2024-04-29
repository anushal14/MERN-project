import React ,{useEffect, useState} from "react";
import UsersList from "../components/UsersList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import UserSkeleton from "../components/UserSkelton";

const Users = () => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [ loadedUsers,setLoadedUsers ] = useState()
        useEffect(()=>{
            const fetchUsers = async () =>{
                try{
                    const response = await sendRequest(process.env.REACT_APP_BACKEND_URL+'/api/users')
                    
                    setLoadedUsers(response.users);
                    console.log(response)
                    
                }catch(err){

                }
            }
            fetchUsers();
        },[sendRequest])



    return(
    <React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
            {isLoading && (
            <ul className="users-list">
                {[...Array(19)].map((_,index)=>(
                    <UserSkeleton/>
                ))}
             
            </ul>
         )}
        {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
  </React.Fragment>
)
}

export default Users;