import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../Context/UserContext/UserContext';


export const Login = () => {
  const { login } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password ) {
      login(email);
      console.log('Login successful');
      navigate('/dashboard');
    } else {
      console.log('Invalid email or password');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-pink-500 to-pink-600">
      <div className="bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Sign In</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Write your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Write Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};