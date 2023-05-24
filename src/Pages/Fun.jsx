import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SlRefresh } from "react-icons/sl";
import { Navbar } from '../Components/Navbar';

const BASE_URL = "http://localhost:4000/fungifs";

export const FunGifs = () => {
  const [Fun, setFun] = useState([]);
  const [refreshIndex, setRefreshIndex] = useState(0);

  useEffect(() => {
    fetchFunMemes();
  }, [refreshIndex]);

  const fetchFunMemes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}`);
      const data = response.data;
      if (data && data.fun) {
        setFun(data.fun.slice(refreshIndex, refreshIndex + 20));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRefresh = () => {
    setRefreshIndex(refreshIndex + 20);
  };

  return (
    <div className="flex flex-col justify-items-center items-center gap-7 py-4 bg-gradient-to-t from-gray-400 to-gray-600 h-full">
      <Navbar/>
    <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold text-white">Fun</h2>
        <button
          className="text-white font-bold py-3 px-6 ml-auto hover:-rotate-90 hover:scale-110 transition-all duration-300"
          onClick={handleRefresh}
        >
          <SlRefresh />
        </button>
      </div>
    
    <div className="flex flex-wrap">
      {Fun.length ? Fun.map((fun) => (
        <div key={fun._id} className="w-1/4 p-4">
          <div className="border-4 border-white hover:scale-105 transition-all duration-300">
          <h3 className="text-xl font-bold mb-2">{fun.title}</h3>
            <img
              src={fun.url}
              alt="fun"
              className="w-full p-4"
            />
          </div>
        </div> 
      )) : null }
    </div>
  </div>
);
};


export default FunGifs;