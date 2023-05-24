import { types } from "./Types";

export const gifsReducer = (state = {}, action) => {
  switch (action.type) {
    case types.getAll:
      return { ...state, gifs: action.payload };
    case types.getById:
      return { ...state, currentGif: action.payload };
    case types.deleteById:
      return { ...state, currentGif: null, gifs: action.payload };
    case types.addGif:
      return { ...state, currentGif: null, gifs: action.payload };
    default:
      return state; 
  }
};

export default gifsReducer;