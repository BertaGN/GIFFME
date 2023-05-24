import React, { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../Context/UserContext/UserContext';
import { useNavigate } from 'react-router-dom';
import { TiTickOutline } from "react-icons/ti";
import { AiOutlineClose} from "react-icons/ai";


const BASE_URL = "http://localhost:4000/meme";

export const UploadPage = () => {
    const [file, setFile] = useState(null);
    const [url, setUrl] = useState('');
    const { user } = useContext(UserContext);
    const token = user ? user.token : '';
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    const handleUrlChange = (e) => {
        setUrl(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (file) {
                const formData = new FormData();
                formData.append('image', file);
                await axios.post(`${BASE_URL}/addlocal`, formData, {
                    headers: {
                        Authorization: `${token}`,
                    },
                });
            }
            if (url) {
                await axios.post(
                    `${BASE_URL}/addfromurl`,
                    { url: url },
                    {
                        headers: {
                            Authorization: `${token}`,
                        },
                    }
                );
            }
            setFile(null);
            setUrl('');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 to-gray-900"
        >
            <div className="w-3/4 bg-gradient-to-br from-gray-700 to-gray-800 p-8 rounded-lg shadow-lg">
                <div className="grid grid-cols-2 gap-8">
                    <div className="border border-gray-600 rounded-lg p-6">
                        <label className="relative inline-flex items-center justify-center w-full h-full bg-gray-800 text-gray-300 rounded-md px-6 py-3 cursor-pointer">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                />
                            </svg>
                            Select File
                            <input
                                type="file"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </label>
                    </div>
                    <div className="border border-gray-600 rounded-lg p-6">
                        <input
                            type="text"
                            value={url}
                            onChange={handleUrlChange}
                            name="url"
                            placeholder="Enter URL"
                            className="mb-4 p-3 border border-gray-500 rounded-md w-full bg-gray-800 text-gray-300"
                        />
                    </div>
                </div>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-md shadow-lg mt-4"
                    >
                       <TiTickOutline/>
                    </button>
                    <button
                        type="button"
                        className="px-6 py-3 bg-red-500 text-white rounded-md shadow-lg mt-4 ml-4"
                        onClick={() => navigate('/dashboard')}
                    >
                        <AiOutlineClose/>
                    </button>
                </div>
            </div>
        </form>
    );
};