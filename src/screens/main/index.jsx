import LeftNavBar from '../../components/LeftNavBar';
import CustomerScreen from '../customer';
import DashBoardScreen from '../dashboard';
import ServiceScreen from '../service';
import { useState } from 'react';

function MainScreen() {
  const [subScreen, setSubScreen] = useState("dashboard");

  const handleSubScreenChange = (newSubScreen) => {
    setSubScreen(newSubScreen);
  }
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
