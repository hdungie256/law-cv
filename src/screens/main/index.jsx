import LeftNavBar from '../../components/LeftNavBar';
import CustomerScreen from '../customer';
import DashBoardScreen from '../dashboard';
import ServiceScreen from '../service';
import { useState } from 'react';
// import getWorkForReplyTab from '../../apis/work/getWorkForReplyTab';
// import getAllCustomers from '../../apis/customer/getAllCustomers';
// import getAllWork from '../../apis/work/getAllWork';

function MainScreen() {

  const [subScreen, setSubScreen] = useState("dashboard");

  const handleSubScreenChange = (newSubScreen) => {
    setSubScreen(newSubScreen);
  };

  // useEffect(async (subScreen)=>{
  //   await fetchData(subScreen)
  // },[subScreen])

  
  return (
    <div>
        <LeftNavBar onSubScreenChange={handleSubScreenChange}/>
        {
          subScreen==="dashboard" && <DashBoardScreen/>
        }
        {
          subScreen==="customer" && <CustomerScreen/>
        }
        {
          subScreen==="service" && <ServiceScreen/>
        }
    </div>
  );
}

export default MainScreen;

// const fetchData = async (subScreen) =>{
//   if (subScreen === 'dashboard'){
//     return await getWorkForReplyTab()
//   }
//   else if (subScreen === 'customer'){
//     return await getAllCustomers()
//   }
//   else if (subScreen === 'service'){
//     return await getAllWork()
//   }
// }
