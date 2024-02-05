import axios from "axios";
import {toast} from "react-toastify";

const deleteCustomer = async (id) => {
  try{
    const response = await axios.delete(process.env.REACT_APP_API_URL + 'customers/' + id,
    { headers: { "Authorization": "Bearer " + sessionStorage.getItem("accessToken")} })
      const message = (response.data.message);
      if (response){
        toast.success(message, {
            position: toast.POSITION.TOP_RIGHT,
          });
          return true
    }}
    catch (error){
        toast.error(error.response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
          return false
    }
  }

  export default deleteCustomer;