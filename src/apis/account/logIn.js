import axios from 'axios';
import {toast} from "react-toastify";

const logIn = async (username, password) => {

if (username !== "" && password !== ""){
    try{
    let response = await axios.post(process.env.REACT_APP_API_URL + 'login', {
        username: username,
        password: password
      })

    const message = (response.data.message);

    const accessToken = response.data.accessToken; 
    sessionStorage.setItem('accessToken', accessToken);

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
}}

export default logIn;