import axios from "axios";

const useDeleteUser = async (id) => {
    try {
        await axios.delete(`https://custom-inline-edit-and-drag-drop.vercel.app/${id}`);
        console.log("User logout succefully")
    }
    catch (error) {
        console.log("Error in logout", error)
    }

}

export default useDeleteUser;