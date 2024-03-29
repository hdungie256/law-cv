import './index.scss'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { Logout, SpaceDashboard, SupervisorAccount, Work } from '@mui/icons-material';

const LeftNavBar = (props) => {
  let navigate = useNavigate();

  const [navButton, setNavButton] = useState("dashboard")
  const handleClickDashboard  = () =>{
    setNavButton("dashboard");
    navigate("../dashboard");
  }

  const handleClickCustomer  = () =>{
    setNavButton("customer");
    navigate("../customers");
  }

  const handleClickService  = () =>{
    setNavButton("service")
    navigate("../service");
  }

  const handleClickLogout  = () =>{
    setNavButton("logout")
    sessionStorage.clear()
    props.logOut();
    navigate('/login')
  }

  return (
    <div id='nav-wrapper'>
      <div id='nav-bar' style={{display: 'flex', alignItems: 'center'}}>
        <div id='profile-block' style={{width: '80%'}}></div>

        <hr></hr>
        <div className='nav-button-wrapper'>
          <IconButton sx={navButton === 'dashboard' ? {background: '#caebff', color: 'black'} : {background: 'none', color: 'white'}} className='nav-button' onClick={handleClickDashboard}>
            <SpaceDashboard></SpaceDashboard>
          </IconButton>
        </div>

        <div className='nav-button-wrapper'>
            <IconButton sx={navButton === 'customer' ? {background: '#caebff', backgroundColor: '#caebff', color: 'black'} : 
            {backgroundColor: 'none', color: 'white'}}
            className='nav-button' onClick={handleClickCustomer}>
              <SupervisorAccount></SupervisorAccount>
            </IconButton>
        </div>

        <div className='nav-button-wrapper'>
            <IconButton  sx={navButton === 'service' ? {background: '#caebff', color: 'black'} : {background: 'none', color: 'white'}} className='nav-button' onClick={handleClickService}>
              <Work ></Work>
            </IconButton>
        </div>

        <div className='nav-button-wrapper' style={{position: 'absolute', bottom: '5px'}}>
          <IconButton  sx={navButton === 'logout' ? {background: '#caebff', color: 'black'} : {background: 'none', color: 'white'}} color='#FFFFFFF' className='nav-button' onClick={handleClickLogout}>
            <Logout/>
          </IconButton>
        </div>
      
      </div>
    </div>
  );
};

export default LeftNavBar