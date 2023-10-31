import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { adminAddUser } from '../../../../../context/actions/adminAddUserAction';

const AddUserButton = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleClick = () => {
    dispatch(adminAddUser(email, password, username));
  };

  return (
    <div>
      <input type="text" placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)} />
      <button onClick={handleClick}>Add User</button>
    </div>
  );
};

export default AddUserButton;
