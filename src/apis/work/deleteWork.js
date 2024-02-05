import axios from "axios";
import {toast} from "react-toastify";

const deleteWork = async (id) => {
    const response = await axios.delete(process.env.REACT_APP_API_URL + 'work/' + id,
    { headers: { "Authorization": "Bearer " + sessionStorage.getItem("accessToken")} })
      const message = (response.data.message);
      const statusText = (response.data.statusText)

      if (statusText === "OK"){
        toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
        })
      return true
      }
      else{
        toast.error(message, {
        position: toast.POSITION.TOP_RIGHT,
      })
      return false
    }
  }

  export default deleteWork;