import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SlRefresh } from "react-icons/sl";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { TiTickOutline } from "react-icons/ti";
import { Navbar } from '../Components/Navbar';

const BASE_URL = "http://localhost:4000/catsgifs";

export const CatsGifs = () => {
  const [cats, setCats] = useState([]);
  const [refreshIndex, setRefreshIndex] = useState(0);
  const [editableCatId, setEditableCatId] = useState('');

  useEffect(() => {
    fetchCatsMemes();
  }, [refreshIndex]);

  const fetchCatsMemes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}`);
      const data = response.data;
      if (data && data.catGif) {
        setCats(data.catGif.slice(refreshIndex, refreshIndex + 20));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRefresh = () => {
    setRefreshIndex(refreshIndex + 20);
  };

  const handleEditClick = (catId) => {
    setEditableCatId(catId);
  };

  const handleTitleChange = (event, catId) => {
    const updatedCats = cats.map((cat) => {
      if (cat._id === catId) {
        return { ...cat, title: event.target.value };
      }
      return cat;
    });
    setCats(updatedCats);
  };

  const handleTitleSubmit = async (catId) => {
    try {
      const catGifToUpdate = cats.find((cat) => cat._id === catId);
      await axios.put(`${BASE_URL}/${catId}`, { title: catGifToUpdate.title });
      setEditableCatId('');
    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = async (catId) => {
    try {
      await axios.delete(`${BASE_URL}/${catId}`);
      const updatedCats = memes.filter((cat) => cat._id !== catId);
      setCats(updatedCats);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col justify-items-center items-center gap-7 py-4 bg-gradient-to-t from-gray-400 to-gray-600 h-full">
      <Navbar />
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold text-white">Cats</h2>
        <button
          className="text-white font-bold py-3 px-6 ml-auto hover:-rotate-90 hover:scale-110 transition-all duration-300"
          onClick={handleRefresh}
        >
          <SlRefresh />
        </button>
      </div>

      <div className="flex flex-wrap">
        {cats.length ? cats.map((cat) => (
          <div key={cat._id} className="w-1/4 p-4">
            <div className="border-4 border-white hover:border-gradient-pink hover:scale-105 transition-all duration-300">
              <h3 className="text-xl font-bold mb-2">
                {editableCatId === cat._id ? (
                  <>
                    <input
                      type="text"
                      value={cat.title}
                      onChange={(event) =>
                        handleTitleChange(event, cat._id)
                      }
                    />
                    <button onClick={() => handleTitleSubmit(cat._id)}>
                      <TiTickOutline />
                    </button>
                  </>
                ) : (
                  <>
                    <span>{cat.title}</span>
                  </>
                )}
              </h3>
              <img
                src={cat.url}
                alt="cat"
                className="w-full p-4"
              />
              <div className="flex justify-center">
                <button
                  className="font-bold hover:text-gray-500"
                  onClick={() => handleEditClick(cat._id)}
                >
                  <AiOutlineEdit />
                </button>
                <button
                  className="font-bold hover:text-gray-500 py-2 px-4"
                  onClick={() => handleDelete(cat._id)}
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


export default CatsGifs;
