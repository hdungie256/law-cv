import axios from "axios";
import {toast} from "react-toastify";

const updateWork = async (id, type, customerId, name, group, paperId, paperSubmitDate, formHistory, gcnId, gcnDate, gcnHistory) => {
  if (paperSubmitDate === 'undefined//undefined'){
    paperSubmitDate = null
  }

  if (gcnDate === 'undefined//undefined'){
    gcnDate = null
  }

    const response = await axios.put(process.env.REACT_APP_API_URL + 'work/' + id,{
      type: type,
      customerId: customerId,
      name: name,
      group: group,
      paperId: paperId,
      paperSubmitDate: paperSubmitDate,
      formHistory: formHistory,
      gcnId: gcnId,
      gcnDate: gcnDate,
      gcnHistory: gcnHistory,
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
      return false
    }
  }

  export default updateWork;