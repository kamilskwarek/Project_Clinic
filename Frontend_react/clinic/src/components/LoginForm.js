import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://localhost:7137/api/employee/login', {
        email: email,
        password: password
      });
      
      console.log(response)
      if (response.status === 200) {
        const token = response.data; 
        localStorage.setItem('token', token); 
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        console.log(response)
  
       
        const userResponse = await axios.get('https://localhost:7137/api/employee/me');
        const user = userResponse.data;
        console.log(user)
        onLogin(user); 

        
        console.log(user);
      } else {
        setError('Nie udało się zalogować');
      }
    } catch (error) {
      setError('Wystąpił błąd podczas logowania');
      console.error('Wystąpił błąd podczas logowania', error.response.data);
    }
  };
  
  return (
    <div className="loginForm">
      <label>Email: </label>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br/>
      <br/>
      <label>Hasło: </label>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br/>
      <button onClick={handleLogin}>Zaloguj</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default LoginForm;
