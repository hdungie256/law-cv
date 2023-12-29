import './index.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';

const ButtonCreate = (props) => {
  return (
    <div id='button-create-wrapper'>
        <button className='button-create' onClick={props.onClick}><b>{props.text}</b></button>
        <FontAwesomeIcon className={'button-create-icon'} icon={faPlus} />
    </div>
  );
};

export default ButtonCreate;