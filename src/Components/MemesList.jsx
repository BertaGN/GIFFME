import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SlRefresh } from "react-icons/sl";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { TiTickOutline } from "react-icons/ti";

const BASE_URL = "http://localhost:4000/meme";

const MemeList = () => {
  const [memes, setMemes] = useState([]);
  const [refreshIndex, setRefreshIndex] = useState(0);
  const [editableMemeId, setEditableMemeId] = useState('');

  useEffect(() => {
    fetchMemes();
  }, [refreshIndex]);

  const fetchMemes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}`);
      setMemes(response.data.memes.slice(refreshIndex, refreshIndex + 20));
    } catch (error) {
      console.error(error);
    }
  };

  const handleRefresh = () => {
    setRefreshIndex(refreshIndex + 20);
  };

  const handleEditClick = (memeId) => {
    setEditableMemeId(memeId);
  };

  const handleTitleChange = (event, memeId) => {
    const updatedMemes = memes.map((meme) => {
      if (meme._id === memeId) {
        return { ...meme, title: event.target.value };
      }
      return meme;
    });
    setMemes(updatedMemes);
  };

  const handleTitleSubmit = async (memeId) => {
    try {
      const memeToUpdate = memes.find((meme) => meme._id === memeId);
      await axios.put(`${BASE_URL}/${memeId}`, { title: memeToUpdate.title });
      setEditableMemeId('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (memeId) => {
    try {
      await axios.delete(`${BASE_URL}/${memeId}`);
      const updatedMemes = memes.filter((meme) => meme._id !== memeId);
      setMemes(updatedMemes);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white">Random Gifs</h2>
        <button
          className="text-white font-bold py-3 px-6 ml-auto hover:-rotate-90 hover:scale-110 transition-all duration-300"
          onClick={handleRefresh}
        >
          <SlRefresh />
        </button>
      </div>

      <div className="flex flex-wrap">
        {memes.length ? (
          memes.map((meme) => (
            <div key={meme._id} className="w-1/4 p-4">
              <div className="border-4 border-white hover:scale-105 transition-all duration-300">
                <h3 className="text-xl font-bold mb-2">
                  {editableMemeId === meme._id ? (
                    <>
                      <input
                        type="text"
                        value={meme.title}
                        onChange={(event) =>
                          handleTitleChange(event, meme._id)
                        }
                      />
                      <button onClick={() => handleTitleSubmit(meme._id)}>
                        <TiTickOutline />
                      </button>
                    </>
                  ) : (
                    <>
                      <span>{meme.title}</span>
                    </>
                  )}
                </h3>
                <img src={meme.url} alt="Meme" className="w-full p-4" />
                <div className="flex justify-center">
                  <button
                    className="font-bold hover:text-white"
                    onClick={() => handleEditClick(meme._id)}
                  >
                    <AiOutlineEdit />
                  </button>
                  <button
                    className="font-bold hover:text-white py-2 px-4"
                    onClick={() => handleDelete(meme._id)}
                  >
                    <AiOutlineDelete />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : null}
      </div>
    </div>
  );
};

export default MemeList;
