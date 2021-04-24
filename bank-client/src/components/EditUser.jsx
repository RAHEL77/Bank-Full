import React, {useState} from 'react';

const serverUrl = `${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}/users`;
const EditUser = (props) => {
    const{user} = props;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const formSubmit = async (event) => {
        event.preventDefault();
        const rawResponse = await fetch(serverUrl, {
           method: 'post',
           headers:{'content-type': 'application/json'},
           body: JSON.stringify({name, email})
        });
        const response = await rawResponse.json();
        console.log(response);

    }
    return(
        <div>
            <form onSubmit={formSubmit}>
            <label>Name:<input type="text" value={name} onChange={event => setName(event.target.value)}/></label>
            <label>Email:<input type="text" value={email} onChange={event => setEmail(event.target.value)}/></label>
            <button>Save User</button>
            </form>
        </div>
    )
}

export default EditUser;