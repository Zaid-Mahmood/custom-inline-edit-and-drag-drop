import React from 'react'
import SelectTemplate from './SelectTemplate';
import { useNavigate } from 'react-router-dom';
import WaveAnimation from '../NaturalCalmComponents/WaveAnimation/WaveAnimation';
const Home = () => {
    const navigate = useNavigate();
    const changeLayoutFunction = (path) => {
        navigate(path)
    }
    return (
            <div>
                <SelectTemplate layoutId={changeLayoutFunction} />
                <WaveAnimation/>
            </div>
    )
}

export default Home;
