
import axios from "axios";

const getWork = async (id) => {
    const response = await axios.get(process.env.REACT_APP_API_URL + 'work/' + id,
    { headers: { "Authorization": "Bearer " + sessionStorage.getItem("accessToken")} })
      const data = (response.data.data);
      return data
  }

export default getWork;