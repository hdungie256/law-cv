import axios from "axios";
import {toast} from "react-toastify";

const updateCustomer = async (id, customerName, customerShortName, customerAddress, customerPhoneNumber, 
  customerEmail,curatorName, curatorTitle, curatorPhoneNumber, curatorEmail) => {
    try{
    const response = await axios.put(process.env.REACT_APP_API_URL + 'customers/' + id,{
      customerName, 
      customerShortName, 
      customerAddress, 
      customerPhoneNumber, 
      customerEmail,
      curatorName, 
      curatorTitle, 
      curatorPhoneNumber, 
      curatorEmail
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

  export default updateCustomer;