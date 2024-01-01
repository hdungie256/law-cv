
import axios from "axios";

const getCustomer = async (id) => {
    const response = await axios.get(process.env.REACT_APP_API_URL + 'customers/' + id)
      const data = (response.data.data);
      return data
  }

export default getCustomer;