import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
      console.log(response);
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
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-auto"
          onClick={handleRefresh}
        >
          Refresh
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
                        onChange={(event) => handleTitleChange(event, meme._id)}
                      />
                      <button onClick={() => handleTitleSubmit(meme._id)}>Save</button>
                    </>
                  ) : (
                    <>
                      <span>{meme.title}</span>
                    </>
                  )}
                </h3>
                <img src={meme.url} alt="Meme" className="w-full p-4" />
                <button
                  className="ml-2"
                  onClick={() => handleEditClick(meme._id)}
                >
                  Editar
                </button>
                <button className="mt-2 hover:bg-red-700 text-white font-bold py-2 px-4"
                  onClick={() => handleDelete(meme._id)}>Borrar</button>
              </div>
            </div>
          ))
        ) : null}
      </div>
    </div>
  );
};

export default MemeList;