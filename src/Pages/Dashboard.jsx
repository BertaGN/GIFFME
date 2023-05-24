import React from 'react';
import MemesList from '../Components/MemesList';
import { Navbar } from '../Components/Navbar';


export const Dashboard = () => {
  return (
    <div className="flex flex-col justify-items-center items-center gap-7 py-4 bg-gradient-to-t from-gray-400 to-gray-600 h-full">
      <Navbar />
      <MemesList/>
    </div>
  );
};
