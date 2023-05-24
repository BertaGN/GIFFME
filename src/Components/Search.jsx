import React, { useState } from 'react';

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center">
    <input
      type="text"
      value={searchTerm}
      onChange={handleInputChange}
      placeholder="Type your search"
      className="border border-gray-300 rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <button
      type="submit"
      className="text-white font-bold py-2 px-4 rounded-r bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700"
    >
      Search
    </button>
  </form>
);
};

export default Search;
