import axios from "axios";
import {toast} from "react-toastify";

const changeWorkStatus = async (id, status) => {
    try{
    const response = await axios.put(process.env.REACT_APP_API_URL + 'work/status/' + id,{
        status
    },
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

  export default changeWorkStatus;