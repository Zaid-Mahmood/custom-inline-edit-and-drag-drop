import React from 'react'
import SelectTemplate from './SelectTemplate';
import { useNavigate } from 'react-router-dom';
import ResizeableWrapper from '../ResizeableWrapper/ResizeableWrapper';
const Home = () => {
    const navigate = useNavigate();
    const changeLayoutFunction = (path) => {
        navigate(path)
    }
    return (
            <div>
                <SelectTemplate layoutId={changeLayoutFunction} />
                <ResizeableWrapper/>
            </div>
    )
}

export default Home;
