import axios from 'axios';
import {toast} from "react-toastify";

const logIn = async (username, password) => {

if (username !== "" && password !== ""){
    let response = await axios.post(process.env.REACT_APP_API_URL + 'login', {
        username: username,
        password: password
      })

    const message = (response.data.message);
    const statusText = (response.data.statusText)

    if (statusText === "OK"){
    await toast.success(message, {
    position: toast.POSITION.TOP_RIGHT,
    })
    return true
}
    else{
    toast.error(message, {
    position: toast.POSITION.TOP_RIGHT,
    })}
    return false
}}

export default logIn;