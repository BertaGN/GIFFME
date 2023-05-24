import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { CatsGifs } from '../Pages/Cats';
import { Dashboard } from '../Pages/Dashboard';
import FunGifs from '../Pages/Fun';
import { Login } from '../Pages/Login';
import { UploadPage } from '../Pages/UploadPage';


function Router() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/cats" element={<CatsGifs/>}/>
            <Route path="/fun" element={<FunGifs/>}/>
            <Route path="/uploadpage" element={<UploadPage/>} />
        </Routes>
    )
}

export default Router;
