import React from 'react'
import Search from './Search';
import { Link } from 'react-router-dom';
import { BsUpload } from "react-icons/bs";


export const Navbar = () => {
    return (
        <nav className="bg-gray-800 w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div>
                            <Link to="/dashboard" className="text-white font-bold hover:underline">
                                GIFFME
                            </Link>
                        </div>
                    </div>
                    <div className="flex-grow">
                        <div className="flex justify-center">
                            <Search />
                        </div>
                    </div>
                    <div className="flex items-center">
                        <a
                            href="/fun"
                            className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        >
                            Fun
                        </a>
                        <a
                            href="/cats"
                            className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        >
                            Cats
                        </a>
                    </div>
                    <div className="ml-20">
                        <a
                            href="/uploadpage"
                            className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        >
                            <BsUpload />
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

