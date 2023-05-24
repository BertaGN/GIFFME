import { useState } from 'react';

const useMemesGifs = () => {
  const [memes, setMemes] = useState([]);
  const [gifs, setGifs] = useState([]);

  const addMemeOrGif = (file, url) => {
    // guardar el contenido en la base de datos
    const newMemeOrGif = {
      id: Date.now(),
      url: file ? URL.createObjectURL(file) : url,
      title: 'Meme or GIF title',
    };

    if (file) {
      setMemes((prevMemes) => [...prevMemes, newMemeOrGif]);
    } else {
      setGifs((prevGifs) => [...prevGifs, newMemeOrGif]);
    }
  };

  return { memes, gifs, addMemeOrGif };
};

export default useMemesGifs;