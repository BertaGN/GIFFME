import { useContext, useEffect, useReducer, useState } from "react";
import { createContext } from "react";
import { types } from "../GifContext/Types"
import {
    addGifFromUrl,
    deleteGif,
    getAllGifs,
    getById,
  } from "../../API/gif";
import gifsReducer from "./ReducerGif";

export const GifContext = createContext();
export const useGifs = () => {
    const state = useContext(GifContext)
    return state;
}

const initialState = {
  gifs: [],
  currentGif: null,
};
  export const GifProvider = ({ children }) => {
    const [gifsState, dispatch] = useReducer(gifsReducer, initialState);
    const [isLoading, setIsLoading] = useState(true);
  
    const fetchAndDispatchAllGifs = async () => {
      setIsLoading(true);
      const res = await getAllGifs();
      if (res) {
        dispatch({ type: types.getAll, payload: res });
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };
  
    useEffect(() => {
      fetchAndDispatchAllGifs();
    }, []);
  



    const GifById = async (id) => {
      setIsLoading(true);
  
      const res = await getGifById(id);
      if (res) {
        dispatch({ type: types.getById, payload: res });
      }
  
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };
  
    const addGifFromUrl = async (gifData) => {
      const res = await addGifFromUrl(gifData);
      if (res) {
        const updatedGifs = [res, ...gifsState.gifs];
        dispatch({ type: types.addGif, payload: updatedGifs });
        return res;
      } else {
        console.log("Something went wrong... Try again...");
      }
    };
  
  
    const deleteGifById = async (id) => {
      setIsLoading(true);
  
      const res = await deleteGif(id);
      const filteredGifs = gifsState.gifs.filter((gif) => gif._id !== id);
  
      if (res) {
        dispatch({ type: types.deleteById, payload: filteredGifs });
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return res;
    };
  
  
  
    return (
      <GifContext.Provider
        value={{
          ...gifsState,
          isLoading,
          deleteGifById,
          addGifFromUrl,
          GifById,
          fetchAndDispatchAllGifs,
        }}
      >
        {children}
      </GifContext.Provider>
    );
  };
  
  export default GifProvider;