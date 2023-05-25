import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SlRefresh } from "react-icons/sl";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { TiTickOutline } from "react-icons/ti";
import { Navbar } from '../Components/Navbar';

const BASE_URL = "http://localhost:4000/fungifs";

export const FunGifs = () => {
  const [Fun, setFun] = useState([]);
  const [refreshIndex, setRefreshIndex] = useState(0);
  const [editableFunId, setEditableFunId] = useState('');

  useEffect(() => {
    fetchFunMemes();
  }, [refreshIndex]);

  const fetchFunMemes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}`);
      const data = response.data;
      if (data && data.fun) {
        setFun(data.fun.slice(refreshIndex, refreshIndex + 40));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRefresh = () => {
    setRefreshIndex(refreshIndex + 40);
  };

  const handleEditClick = (funId) => {
    setEditableFunId(funId);
  };

  const handleTitleChange = (event, funId) => {
    const updatedFunGifs = Fun.map((fun) => {
      if (fun._id === funId) {
        return { ...fun, title: event.target.value };
      }
      return fun;
    });
    setFun(updatedFunGifs);
  };

  const handleTitleSubmit = async (funId) => {
    try {
      const funGifToUpdate = Fun.find((fun) => fun._id === funId);
      await axios.put(`${BASE_URL}/${funId}`, { title: funGifToUpdate.title });
      setEditableFunId('');
    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = async (funId) => {
    try {
      await axios.delete(`${BASE_URL}/${funId}`);
      const updatedFunGifs = memes.filter((fun) => fun._id !== funId);
      setCats(updatedFunGifs);
    } catch (error) {
      console.error(error);
    }
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
          <div className="border-4 border-white hover:border-gradient-pink hover:scale-105 transition-all duration-300">
          <h3 className="text-xl font-bold mb-2">
                {editableFunId === fun._id ? (
                  <>
                    <input
                      type="text"
                      value={fun.title}
                      onChange={(event) =>
                        handleTitleChange(event, fun._id)
                      }
                    />
                    <button onClick={() => handleTitleSubmit(fun._id)}>
                      <TiTickOutline />
                    </button>
                  </>
                ) : (
                  <>
                    <span>{fun.title}</span>
                  </>
                )}
              </h3>
              <img
                src={fun.url}
                alt="fun"
                className="w-full p-4"
              />
              <div className="flex justify-center">
                <button
                  className="font-bold hover:text-gray-500"
                  onClick={() => handleEditClick(fun._id)}
                >
                  <AiOutlineEdit />
                </button>
                <button
                  className="font-bold hover:text-gray-500 py-2 px-4"
                  onClick={() => handleDelete(fun._id)}
                >
                  <AiOutlineDelete />
                </button>
              </div>
            </div>
          </div>
        )) : null}
      </div>
    </div>
  );
};


export default FunGifs;