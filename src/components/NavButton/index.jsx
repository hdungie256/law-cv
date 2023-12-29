import './index.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NavButton = (props) => {

  return (
    <div className='btn-nav-wrapper'>     
      <button className= {`button-nav ${props.clicked ? 'clicked' : ""}`} onClick={props.onClick}><b>{props.text}</b></button>
      <FontAwesomeIcon className={`nav-icon`} icon={props.icon} />
    </div>
  );
};

export default NavButton;