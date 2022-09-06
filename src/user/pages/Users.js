import React from "react";
import UsersList from "../components/UsersList";

const Users = () => {
    const USERS = [
        {id:'u1',name:'Abin',image:'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_960_720.png',places:3}
    ]
    return <UsersList items={USERS}/>
}

export default Users;