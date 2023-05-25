import React, { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../Context/UserContext/UserContext';
import { useNavigate } from 'react-router-dom';
import { TiTickOutline } from "react-icons/ti";
import { AiOutlineClose } from "react-icons/ai";


const BASE_URL = "http://localhost:4000/meme";

export const UploadPage = () => {
    const [uploadFormData, setUploadFormData] = useState({
        title: "",
        url: "",
        tag: ""
    })
    const { user } = useContext(UserContext);
    const token = user ? user.token : '';
    const navigate = useNavigate();


    const handleFormChange = (e) => {
        setUploadFormData({ ...uploadFormData, [e.target.name]: e.target.value })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(uploadFormData)
            await axios.post(
                `${BASE_URL}/addfromurl`,
                { ...uploadFormData },
                {
                    headers: {
                        Authorization: `${token}`,
                    },
                }
            );

            setUploadFormData({
                title: "",
                url: "",
                tag: ""
            })

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 to-gray-900">
            <div className="w-3/4 bg-gradient-to-br from-gray-700 to-gray-800 p-8 rounded-lg shadow-lg">
                <div className="flex flex-col items-center">
                    <h2 className="text-2xl font-bold text-white mb-8">Upload from URL</h2>
                    <div className="border border-gray-600 rounded-lg p-6">
                        <input
                            type="text"
                            value={uploadFormData.url}
                            onChange={handleFormChange}
                            name="url"
                            placeholder="Enter URL"
                            className="mb-4 p-3 border border-gray-500 rounded-md w-full lg:w-96 bg-gray-800 text-gray-300"
                        />
                        <input
                            type="text"
                            value={uploadFormData.title}
                            onChange={handleFormChange}
                            name="title"
                            placeholder="Enter Title"
                            className="mb-4 p-3 border border-gray-500 rounded-md w-full lg:w-96 bg-gray-800 text-gray-300"
                        />
                        <input
                            type="text"
                            value={uploadFormData.tag}
                            onChange={handleFormChange}
                            name="tag"
                            placeholder="Enter tag"
                            className="mb-4 p-3 border border-gray-500 rounded-md w-full lg:w-96 bg-gray-800 text-gray-300"
                        />
                    </div>
                </div>
                <div className="flex justify-end mt-4">
                    <button
                        type="submit"
                        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-md shadow-lg"
                    >
                        <TiTickOutline />
                    </button>
                    <button
                        type="button"
                        className="px-6 py-3 bg-red-500 text-white rounded-md shadow-lg ml-4"
                        onClick={() => navigate('/dashboard')}
                    >
                        <AiOutlineClose />
                    </button>
                </div>
            </div>
        </form>
    );
};