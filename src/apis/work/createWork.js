import axios from 'axios';
import {toast} from "react-toastify";
import dayjs from 'dayjs';

const createWork = async (id, type, customerId, workName, group, paperId, paperSubmitDate, formHistory, gcnID, gcnDate,gcnHistory) => {

  if (formHistory){
    formHistory = formHistory.filter(item => item.action !== "");
  }

  if (gcnHistory){
    gcnHistory = gcnHistory.filter(item => item.action !== "");
  }

  if (paperSubmitDate === 'undefined//undefined'){
    paperSubmitDate = null
  }

  if (gcnDate === 'undefined//undefined'){
    gcnDate = null
  }
  
    const response = await axios.post(process.env.REACT_APP_API_URL + 'create-work', {
      customerId: customerId,
      name: workName,
      type: type,
      group: group,
      paperId: paperId,
      paperSubmitDate: paperSubmitDate,
      formHistory: formHistory,
      gcnId: gcnID,
      gcnDate: gcnDate,
      gcnHistory: gcnHistory,
    });

    const message = response.data.message;
    const statusText = response.data.statusText;

    if (statusText === "OK") {
      toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      return true
    } else {
      toast.error(message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      return false
    }
  }

  export default createWork;