import axios from "axios";
import {toast} from "react-toastify";

const createCustomer = async (id, fullName, shortName, address,email,phoneNumber,fullNameError,addressError,emailError,phoneNumberError) => {
  
    if (fullNameError === ""  && addressError === "" && emailError === ""  && phoneNumberError === ""){
        const response = await axios.post(process.env.REACT_APP_API_URL + 'create-customer', {
        name: fullName,
        shortName, shortName,
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
    return false}
}} 

export default createCustomer;