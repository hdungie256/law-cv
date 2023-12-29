import './index.scss'
import NavButton from'../NavButton';
import { faRightFromBracket, faBookOpen, faUserCheck, faChalkboard } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LeftNavBar = (props) => {
  let navigate = useNavigate();

  const [navButton, setNavButton] = useState("dashboard")
  const handleClickDashboard  = () =>{
    setNavButton("dashboard")
    props.onSubScreenChange("dashboard");
  }

  const handleClickCustomer  = () =>{
    setNavButton("customer")
    props.onSubScreenChange("customer");
  }

  const handleClickService  = () =>{
    setNavButton("service")
    props.onSubScreenChange("service");
  }

  const handleClickLogout  = () =>{
    setNavButton("logout")
    navigate('/login')
  }

  return (
    <div id='nav-wrapper'>
      <div id='nav-bar'>
        <div id='profile-block'></div>

        <hr></hr>

        <div className='button-wrapper' id='nav-dashboard'>
          <NavButton clicked={navButton==="dashboard" ? 'clicked' : ""} icon={faChalkboard} text="DASHBOARD" onClick={handleClickDashboard}></NavButton>
        </div>

        <div className='button-wrapper' id='nav-customer'>
          <NavButton clicked={navButton==="customer" ? 'clicked' : ""} icon={faUserCheck} text="KHÁCH HÀNG" onClick={() => {handleClickCustomer()}}></NavButton>
        </div>

        <div className='button-wrapper' id='nav-service'>
          <NavButton clicked={navButton==="service" ? 'clicked' : ""} icon={faBookOpen} text="CÔNG VIỆC" onClick={handleClickService}></NavButton>
        </div>

        <div className='button-wrapper' id='nav-logout'>
          <NavButton clicked={navButton==="logout" ? 'clicked' : ""} icon={faRightFromBracket} text="ĐĂNG XUẤT" onClick={handleClickLogout}></NavButton>
        </div>
      
      </div>
    </div>
  );
};

export default LeftNavBar