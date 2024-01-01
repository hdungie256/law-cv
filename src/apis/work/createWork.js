import axios from 'axios';
import {toast} from "react-toastify";

const createWork = async (type, customerId, workName, group, paperId, paperSubmitDate, history, gcnID, gcnDate) => {
  
  let paperSubmitDateF = null;
  if (paperSubmitDate) {
      paperSubmitDateF = paperSubmitDate.toLocaleString('vi-VN', { year: 'numeric', month: '2-digit', day: '2-digit' });
  }

  let gcnDateF = null;
  if (gcnDate){
    gcnDateF = gcnDate.toLocaleString('vi-VN', { year: 'numeric', month: '2-digit', day: '2-digit' });
  }

    const historyF = history.filter(item => item.action !== "");
  
    const response = await axios.post(process.env.REACT_APP_API_URL + 'create-work', {
      customerId: customerId,
      name: workName,
      type: type,
      group: group,
      paperId: paperId,
      paperSubmitDate: paperSubmitDateF,
      history: historyF,
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