import axios from "axios";
import {  useState } from 'react';

const useGetUser = (url)=>{
    const [getData, setGetData] = useState([]);
    const [getLoading, setGetLoading] = useState(false);
    const [getError, setGetError] = useState(null);
    const loginUser = async()=>{
        try{
            setGetLoading(true);
        const response =  await axios.get(url);
        setGetData(response.data);
        return response.data        
        }
        catch(err){
            setGetError(err)

        }
        finally{
            setGetLoading(false)
        }
    }
    return {getData , getLoading , getError , loginUser}
}
export default useGetUser;