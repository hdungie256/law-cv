import LeftNavBar from '../../components/LeftNavBar';
import CustomerScreen from '../customer';
import DashBoardScreen from '../dashboard';
import ServiceScreen from '../service';
import { useState,useEffect, useRef } from 'react';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from "react-toastify";

function MainScreen() {
  const navigate = useNavigate();

  const [subScreen, setSubScreen] = useState("dashboard");

  const handleSubScreenChange = (newSubScreen) => {
    setSubScreen(newSubScreen);
  };

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = sessionStorage.getItem('accessToken');
      if (!accessToken) {
        navigate('../login');
      }
    };

    fetchData();
  }, []);

  // const dashboardData = useRef([])

  // useEffect(() => {
  //   async function fetchData (subScreen) {
  //     if (subScreen === 'dashboard'){
  //       const data = await getWorkForDashboard()
  //       dashboardData.current = data
  //       console.log(dashboardData.current)
  //     }
  //   }
  //   fetchData(subScreen)
  // }, [subScreen])

  
  return (
    <div id='screen-main' style={{width: '100vw', height: '100vh'}}>
      <Grid container>
        <Grid item md={0.6}>
        <LeftNavBar onSubScreenChange={handleSubScreenChange}/>
        </Grid>

        <Grid item md={11.4}>
          {
            subScreen==="dashboard" && <DashBoardScreen/>
          }
          {
            subScreen==="customer" && <CustomerScreen/>
          }
          {
            subScreen==="service" && <ServiceScreen/>
          }
        </Grid>
      </Grid>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default MainScreen;
