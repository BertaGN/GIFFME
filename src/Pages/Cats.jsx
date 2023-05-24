import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = "http://localhost:4000/catsgifs";

export const CatsGifs = () => {
  const [cats, setCats] = useState([]);
  const [refreshIndex, setRefreshIndex] = useState(0);

  useEffect(() => {
    const fetchCatsMemes = async () => {
      try {
        const response = await axios.get(`${BASE_URL}`);
        console.log(response);
        // setCats(response.data.cats.slice(refreshIndex, refreshIndex + 20));
      } catch (error) {
        console.error(error);
      }
    };

    fetchCatsMemes();
  }, [refreshIndex]);

  const handleRefresh = () => {
    setRefreshIndex(refreshIndex + 20);
  };

  return (
    <div>
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-2xl font-bold text-white">Cats</h2>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-auto"
        onClick={handleRefresh}
      >
        Refresh
      </button>
    </div>
    
    <div className="flex flex-wrap">
      {cats.length ? cats.map((cat) => (
        <div key={cat._id} className="w-1/4 p-4">
          <div className="border-4 border-white hover:scale-105 transition-all duration-300">
          <h3 className="text-xl font-bold mb-2">{cat.title}</h3>
            <img
              src={cat.url}
              alt="cat"
              className="w-full p-4"
            />
          </div>
        </div> 
      )) : null }
    </div>
  </div>
);
};


export default CatsGifs;

//no tinc errors pero no s'em mostren a la pantalla