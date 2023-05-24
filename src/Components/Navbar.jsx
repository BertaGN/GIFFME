import React from 'react'
import Search from './Search';

export const Navbar = () => {
    return (
        <nav className="bg-gray-800 w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <span className="text-white font-bold">GIFFME</span>
                        </div>
                        <div className="flex items-center justify-center h-screen w-screen">
                        <Search/>
                            <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Entertainment</a>
                            <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Cats</a>
                            <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Memes</a>
                            <a href="/uploadpage" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Upload</a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

