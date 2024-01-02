import axios from "axios";
import {toast} from "react-toastify";

const updateWork = async (id, type, customerId, name, group, paperId, paperSubmitDate, history, gcnID, gcnDate) => {
    const response = await axios.put(process.env.REACT_APP_API_URL + 'work/' + id,{
      type: type,
      customerId: customerId,
      name: name,
      group: group,
      paperId: paperId,
      paperSubmitDate: paperSubmitDate,
      history: history,
      gcnID: gcnID,
      gcnDate: gcnDate
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