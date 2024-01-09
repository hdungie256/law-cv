import axios from 'axios';
import {toast} from "react-toastify";
import dayjs from 'dayjs';

const createWork = async (id, type, customerId, workName, group, paperId, paperSubmitDate, history, gcnID, gcnDate) => {
  
  let paperSubmitDateF = null;
  if (paperSubmitDate) {
      paperSubmitDateF = paperSubmitDate.format('MM/DD/YYYY')
  }

  let gcnDateF = null;
  if (gcnDate){
    gcnDateF = gcnDate.format('MM/DD/YYYY')
  }

  if (history){
    history = history.filter(item => item.action !== "");
  }
  
    const response = await axios.post(process.env.REACT_APP_API_URL + 'create-work', {
      customerId: customerId,
      name: workName,
      type: type,
      group: group,
      paperId: paperId,
      paperSubmitDate: paperSubmitDateF,
      history: history,
      gcnID: gcnID,
      gcnDate: gcnDateF
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