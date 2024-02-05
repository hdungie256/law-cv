import axios from "axios";
import {toast} from "react-toastify";

const updateWork = async (id, customerId, type, name, group, paperId, paperSubmitDate, history, gcnId, gcnDate, country, lastAction) => {
  if (paperSubmitDate === 'undefined//undefined'){
    paperSubmitDate = null
  }

  if (gcnDate === 'undefined//undefined'){
    gcnDate = null
  }

  if (history){
    var formattedHistory = history
    formattedHistory.map((item) => {
      item.action = item.action
      if (item.date === 'undefined//undefined'){
        item.date = null
      }
    })
    history = formattedHistory
  }

  try{
    const response = await axios.put(process.env.REACT_APP_API_URL + 'work/' + id,{
      type: type,
      customerId: customerId,
      name: name,
      group: group,
      paperId: paperId,
      paperSubmitDate: paperSubmitDate,
      history: history,
      gcnId: gcnId,
      gcnDate: gcnDate,
      country: country,
      lastAction: lastAction
    },
    { headers: { "Authorization": "Bearer " + sessionStorage.getItem("accessToken")} })

    if (response) {
      const message = (response.data.message);
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

  export default updateWork;