import axiosInstance from "../api/axiosConfig";


export const getUserDetails = async () => {
  try {
    const response = await axiosInstance.get("/user-details", { withCredentials: true });
    return {
      success: true,
      data: response.data,
    }
  }
  catch (err) {
    console.log("Error when get User Details")
    return err;
  }
}

