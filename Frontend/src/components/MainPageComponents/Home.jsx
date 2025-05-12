import { useEffect } from 'react';
import SelectTemplate from './SelectTemplate';
import { useNavigate } from 'react-router-dom';
import SuccessAlert from '../../CustomComponent/CustomAlerts/SuccessAlert/SuccessAlert';
import { useSelector, useDispatch } from 'react-redux';
import { setSuccessMode } from '../../redux/features/mainstore/storeSlice';
const Home = () => {
    const dispatch = useDispatch();
    const { showSuccessAlert, msgTyp } = useSelector((state) => state?.mainStore);
    const loggedInMsg = "Successfully logged in";
    const navigate = useNavigate();
    const changeLayoutFunction = (path) => {
        navigate(path)
    }
    useEffect(() => {
        if (showSuccessAlert) {
            const timer = setTimeout(() => {
                dispatch(setSuccessMode({ show: false, type: '' }));
            }, 2000);
            return () => clearTimeout(timer)
        }
    }, [showSuccessAlert, dispatch])
    return (
        <div>
            {showSuccessAlert && <SuccessAlert successMsg={msgTyp === "login" && loggedInMsg} />}
            <SelectTemplate layoutId={changeLayoutFunction} />
        </div>
    )
}

export default Home;
