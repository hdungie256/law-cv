import axios from "axios";
import {toast} from "react-toastify";

const createCustomer = async (customerName, customerShortName, customerAddress, customerPhoneNumber, customerEmail,
    curatorName, curatorTitle, curatorPhoneNumber, curatorEmail) => {
        const response = await axios.post(process.env.REACT_APP_API_URL + 'customers', {
            customerName,
            customerShortName,
            customerAddress,
            customerPhoneNumber,
            customerEmail,
            curatorName,
            curatorTitle,
            curatorPhoneNumber,
            curatorEmail
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
}

export default createCustomer;