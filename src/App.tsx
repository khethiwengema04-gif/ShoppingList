import React from 'react'
import Log from './Components/Pages/LogIn/Log'
import { Route, Routes } from 'react-router-dom'
import { Home } from './Components/Pages/Home/Home'
import Register from './Components/Pages/Registering/Registering'
import Profile from './Components/Pages/Profile/Profile'
// import List from './Components/ItemList/ItemList'

function App() {
    return (
        <>

            <Routes>
                <Route path="/" element={<Log />} />
                <Route path="/home" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profilepage" element={<Profile />} />
                {/* <Route path="/view" element={<List />} /> */}
            </Routes>


        </>

    )
}


export default App