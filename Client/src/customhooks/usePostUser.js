import axios from 'axios';
import {  useState } from 'react';
const usePostUser = (url) => {
    console.log(url , "posturl")
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const registerUser = (registerValues) => {
      
        try {
            setLoading(true)
            axios.post(url, registerValues)
                .then((response) => {
                    setData(response.data)
                })
        }
        catch (err) {
            setError(err)
        }
        finally {
            setLoading(false)
        }
    }
    return { data, loading, error, registerUser }

};
export default usePostUser;