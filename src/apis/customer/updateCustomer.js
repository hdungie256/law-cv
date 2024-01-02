import axios from "axios";
import {toast} from "react-toastify";

const updateCustomer = async (id, name, address, email, phoneNumber) => {
    const response = await axios.put(process.env.REACT_APP_API_URL + 'customers/' + id,{
      name: name,
      address: address,
      email: email,
      phoneNumber: phoneNumber
    })
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

  export default updateCustomer;