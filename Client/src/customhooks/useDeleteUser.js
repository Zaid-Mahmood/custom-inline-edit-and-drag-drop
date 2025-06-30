import axios from "axios";

const useDeleteUser = async (url) => {
    console.log(url ,"url")
    try {
        await axios.delete(url);
        console.log("User logout succefully")
    }
    catch (error) {
        console.log("Error in logout", error)
    }

}

export default useDeleteUser;