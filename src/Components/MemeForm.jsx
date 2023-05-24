import React, { useState } from 'react';
import axios from 'axios';

const MemeForm = () => {
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/',
       { 
        title, imageUrl 
    });
      console.log(response.data);
      setTitle('');
      setImageUrl('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Upload Meme</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded px-2 py-1 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="imageUrl" className="block font-bold mb-2">
            Image URL
          </label>
          <input
            type="text"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="border rounded px-2 py-1 w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default MemeForm;
