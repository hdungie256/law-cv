import axios from 'axios';

  function createRow(id, customerName, type, workName, paperId, paperSubmitDate) {
    const truncateString = (str, maxLength) => {
      if (str.length > maxLength) {
        return str.substring(0, maxLength) + "...";
      }
      return str;
    };
  
    workName = truncateString(workName, 20);
    customerName  = truncateString(customerName, 50);
    paperId = paperId.length > 4 ? paperId : 'Không có'

    const parsedDate = new Date(paperSubmitDate);

    const day = (parsedDate.getUTCDate() + 1).toString().padStart(2, '0');
    const month = (parsedDate.getUTCMonth()+1).toString().padStart(2, '0'); // Months are zero-based
    const year = parsedDate.getUTCFullYear();

    const formattedDate = `${day}/${month}/${year}`;
    return {
        id, customerName, type, workName, paperId, formattedDate
    };
  } 

const getAllWork = async () => {
  try {
    const response = await axios.get(process.env.REACT_APP_API_URL + "/work");
    const data = response.data.list;
    const rows = data.map((dataRow) => createRow(dataRow['_id'], dataRow['customerName'],dataRow['type'], dataRow['name'], dataRow['paperId'], dataRow['paperSubmitDate']));
    return rows

  } catch (error) {
    console.error('Error fetching customers:', error);
    return []; 
  }
}

export default getAllWork;
