import axios from 'axios';

function createRow(id, name, address, email, phoneNumber) {
  const truncateString = (str, maxLength) => {
    if (str.length > maxLength) {
      return str.substring(0, maxLength) + "...";
    }
    return str;
  };

  name = truncateString(name, 50);
  address = truncateString(address, 20);
  email = truncateString(email, 20);
  phoneNumber = truncateString(phoneNumber, 20);
  return {
    id, name, address, email, phoneNumber
  };
} 

const getAllCustomers = async () => {
  try {
    const response = await axios.get(process.env.REACT_APP_API_URL + "/customers");
    const data = response.data.list;
    const rows = data.map((dataRow) => createRow(dataRow['_id'],
     dataRow.customerShortName ? dataRow['customerShortName'] : dataRow.customerName,
     dataRow['customerAddress'], 
     dataRow.customerEmail ? dataRow['customerEmail'] : dataRow.email, 
     dataRow.customerPhoneNumber ? dataRow['customerPhoneNumber'] : dataRow.phoneNumber));
    return rows;
  } catch (error) {
    console.error('Error fetching customers:', error);
    return []; 
  }
}

export default getAllCustomers;
