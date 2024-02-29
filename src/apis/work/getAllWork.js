import axios from 'axios';
import dayjs from 'dayjs';

  function createRow(id, customerName, type, workName, paperId, paperSubmitDate, gcnId, gcnDate, status) {
    var formattedDate
    var formattedGcnDate

    if (paperId == undefined || paperId.length<4){
      paperId = ""
    }

    if (paperSubmitDate == undefined){
      formattedDate = ""
    }
    else{
      formattedDate = dayjs(paperSubmitDate).format("DD/MM/YYYY")
    }

    if (gcnId == undefined){
      gcnId = ""
    }

    if (gcnDate == undefined){
      formattedGcnDate = ""
    }
    else{
      formattedGcnDate = dayjs(paperSubmitDate).format("DD/MM/YYYY")
    }

    return {
      id, customerName, type, workName, paperId, formattedDate, gcnId, formattedGcnDate, status
    };
  } 

const getAllWork = async (search=null) => {
  try {
    const response = await axios.get(process.env.REACT_APP_API_URL + "/work",{
      params: { search },
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem("accessToken")
      }
    });
    const data = response.data.list;
    const rows = data.map((dataRow) => 
      createRow(dataRow['_id'],dataRow['customerName'],dataRow['type'], 
                                dataRow['name'], dataRow['paperId'], dataRow['paperSubmitDate'],dataRow['gcnId'],dataRow['gcnDate'],
                                dataRow['status']
                )
      );
    return rows

  } catch (error) {
    console.error('Error fetching customers:', error);
    return []; 
  }
}

export default getAllWork;
