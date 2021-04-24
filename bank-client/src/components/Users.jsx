import React, {useState, useEffect} from 'react';
import User from './User'

const serverUrl = `${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}/users`;
const Users = () => {
    const [users, setUsers] = useState([]);

    const getUsers = async() => {
        const rawResponse = await fetch(serverUrl);
        const response = await rawResponse.json();
        console.log(response);
        setUsers(response.users)
    }
    
    useEffect( () => {
        getUsers();
    }, [])

    return(
        <div>
            
            {
                users.map( u => <User key={u._id} user={u}/>)
            }
        </div>
    )
}

export default Users;