import './App.css'
import React from 'react';
import Home from './components/MainPageComponents/Home';
import NaturalCalm from './components/NaturalCalmComponents/NaturalCalm';
import SowaTools from './components/SowaToolsComponents/SowaTools';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LayoutWithNavbar from './components/CommonComponents/LayoutWithNavbar';
import Register from './components/Auth/Register/Register';
import Login from './components/Auth/Login/Login';
import logo from '../src/assets/natural-calm/natural-calm-logo.webp';
import ProtectedRoutes from './components/Auth/ProtectedRoutes/ProtectedRoutes';

function App() {
  return (
    <Router>
      <img className='xs:w-22 xs:h-18 sm:w-44 sm:h-32 xs:left-5 md:left-12 fixed z-10' src={logo} alt="calm-logo" />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/home" element={<Home />} />
          <Route element={<LayoutWithNavbar />}>
            <Route path="/natural-calm" element={<NaturalCalm />} />
            <Route path="/sowa-tools" element={<SowaTools />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
