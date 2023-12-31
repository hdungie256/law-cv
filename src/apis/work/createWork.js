import axios from 'axios';
import {toast} from "react-toastify";

const createWork = (type, customerId, workName, group, paperId, paperSubmitDate, history, gcnID, gcnDate) => {
  
  let paperSubmitDateF = null;
  if (paperSubmitDate) {
      paperSubmitDateF = paperSubmitDate.toLocaleString('vi-VN', { year: 'numeric', month: '2-digit', day: '2-digit' });
  }

  let gcnDateF = null;
  if (gcnDate){
    gcnDateF = gcnDate.toLocaleString('vi-VN', { year: 'numeric', month: '2-digit', day: '2-digit' });
  }

    const historyF = history.filter(item => item.action !== "");
  
    axios.post(process.env.REACT_APP_API_URL + 'create-work', {
      customerId: customerId,
      name: workName,
      type: type,
      group: group,
      paperId: paperId,
      paperSubmitDate: paperSubmitDateF,
      history: historyF,
      gcnID: gcnID,
      gcnDate: gcnDateF
    })
    .then(async response => {
      const message = (response.data.message);
      const statusText = (response.data.statusText)
  
      if (statusText === "OK"){
      await toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
      })
      }
  
      else{
        toast.error(message, {
        position: toast.POSITION.TOP_RIGHT,
      })}
    })
  }

  export default createWork;