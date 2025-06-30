import axios from "axios";

const useDeleteUser = async (url) => {
    try {
        await axios.delete(url);
    }
    catch (error) {
        console.log("Error in logout", error)
    }

}

export default useDeleteUser;