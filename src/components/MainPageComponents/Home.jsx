import React from 'react'
import SelectTemplate from './SelectTemplate';
import { useNavigate } from 'react-router-dom';
const Home = () => {
    const navigate = useNavigate();
    const changeLayoutFunction = (path) => {
        navigate(path)
    }
    return (
            <div>
                <SelectTemplate layoutId={changeLayoutFunction} />
            </div>
    )
}

export default Home;
