import axios from 'axios';
import dayjs from 'dayjs';

  function createRow(id, customerName, type, workName, paperId, paperSubmitDate, gcnId, gcnDate) {
    const truncateString = (str, maxLength) => {
      if (str.length > maxLength) {
        return str.substring(0, maxLength) + "...";
      }
      return str;
    };
  
    workName = truncateString(workName, 30);
    customerName  = truncateString(customerName, 20);
    paperId = paperId.length > 4 ? paperId : 'Không có'
    const formattedDate = paperSubmitDate ? dayjs(paperSubmitDate).format('DD/MM/YYYY') : 'Không có'
    const formattedGcnDate = gcnDate ? dayjs(gcnDate).format('DD/MM/YYYY') : 'Không có'
    return {
        id, customerName, type, workName, paperId, formattedDate, gcnId, formattedGcnDate
    };
  } 

const getAllWork = async (search=null) => {
  try {
    const response = await axios.get(process.env.REACT_APP_API_URL + "/work",{
      params: { search }
    });
    const data = response.data.list;
    const rows = data.map((dataRow) => 
      createRow(dataRow['_id'],dataRow['customerName'],dataRow['type'], 
                                dataRow['name'], dataRow['paperId'], dataRow['paperSubmitDate'],dataRow['gcnId'],dataRow['gcnDate']
                )
      );
    return rows

  } catch (error) {
    console.error('Error fetching customers:', error);
    return []; 
  }
}

export default getAllWork;
