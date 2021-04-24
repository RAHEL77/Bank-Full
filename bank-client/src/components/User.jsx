import React from 'react';


const User = (props) => {
    const{user} = props;
    return(
        <div style={{display: 'flex', justifyContent:'space-around'}}>
            <div>Name: {user.name}</div>
            <div>Email: {user.email}</div>
        </div>
    )
}

export default User;