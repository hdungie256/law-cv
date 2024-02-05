import axios from 'axios';
import {toast} from "react-toastify";
import dayjs from 'dayjs';

const createWork = async (customerId, type, name, group, paperId, paperSubmitDate, history, gcnId, gcnDate, country, lastAction) => {

  if (history){
    history = history.filter(item => item.action !== "");
  }

  if (paperSubmitDate === 'undefined//undefined'){
    paperSubmitDate = null
  }

  if (gcnDate === 'undefined//undefined'){
    gcnDate = null
  }

  try{
  
    const response = await axios.post(process.env.REACT_APP_API_URL + 'create-work', {
      customerId: customerId,
      name: name,
      type: type,
      group: group,
      paperId: paperId,
      paperSubmitDate: paperSubmitDate,
      history: history,
      gcnId: gcnId,
      gcnDate: gcnDate,
      country: country,
      lastAction: lastAction
    },
    { headers: { "Authorization": "Bearer " + sessionStorage.getItem("accessToken")} });

    const message = response.data.message;

    if (response) {
      toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      return true
    }}
    catch (error) {
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      return false
    }
  }

  export default createWork;