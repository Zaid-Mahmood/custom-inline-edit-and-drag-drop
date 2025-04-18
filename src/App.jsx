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
function App() {

  return (
    <Router>
      <img className='w-44 h-36 ml-25 fixed' src={logo} alt="calm-logo" />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/home' element={<Home />} />
        <Route element={<LayoutWithNavbar />}>
          <Route path='/natural-calm' element={<NaturalCalm />} />
          <Route path='/sowa-tools' element={<SowaTools />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
