import axios from "axios";
import {  useState } from 'react';

const useGetUser = (url)=>{
    const [getData, setGetData] = useState([]);
    const [getLoading, setGetLoading] = useState(false);
    const [getError, setGetError] = useState(null);
    const loginUser = ()=>{
        try{
            setGetLoading(true);
            axios.get(url)
            .then((response)=>{
                setGetData(response.data)
            })
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