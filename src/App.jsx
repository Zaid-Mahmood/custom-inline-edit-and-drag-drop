import './App.css'
import React from 'react';
import Home from './components/MainPageComponents/Home';
import NaturalCalm from './components/NaturalCalmComponents/NaturalCalm';
import SowaTools from './components/SowaToolsComponents/SowaTools';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LayoutWithNavbar from './components/CommonComponents/LayoutWithNavbar';
function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route element={<LayoutWithNavbar />}>
          <Route path='/natural-calm' element={<NaturalCalm />} />
          <Route path='/sowa-tools' element={<SowaTools />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
