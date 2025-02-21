import axiosInstance from "../api/axiosConfig";


export const getUserDetails = async () => {
  try {
    const response = await axiosInstance.get("/user-details", { withCredentials: true });
    console.log(response)
    return {
      success: true,
      data: response.data,
    }
  }
  catch (err) {
    return err;
  }
}

