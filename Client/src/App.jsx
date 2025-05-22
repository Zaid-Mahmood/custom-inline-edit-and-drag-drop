import './App.css'
import Home from './components/MainPageComponents/Home';
import NaturalCalm from './components/NaturalCalmComponents/NaturalCalm';
import SowaTools from './components/SowaToolsComponents/SowaTools';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/CommonComponents/Layout/Layout';
import Register from './components/Auth/Register/Register';
import Login from './components/Auth/Login/Login';
import ProtectedRoutes from './components/Auth/ProtectedRoutes/ProtectedRoutes';
import PublicRoutes from './components/Auth/PublicRoutes/PublicRoutes';
import NotFound from './components/Auth/NotFound/NotFound';
function App() {
  return (
    <Router>
      <Routes>

        <Route element={<PublicRoutes />} >
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/home" element={<Home />} />
          <Route element={<Layout />}>
            <Route path="/natural-calm" element={<NaturalCalm />} />
            <Route path="/sowa-tools" element={<SowaTools />} />
          </Route>
        </Route>

        {/* Fallback or 404 route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
