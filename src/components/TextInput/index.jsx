import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './index.scss';

function TextInput(props) {

  return (
    <div className='text-input'>
        {props.label && <label className='label'> <b>{props.label}</b> </label>}
        <div className='input-wrapper'>
            <input 
                className={props.errorMessage === '' ? '':"error"}
                value={props.value}
                onChange={(e) => {
                  props.onChange(e);
                }}
                placeholder={props.placeholder}
                type={props.type}
                disabled={props.disabled}
                style = {{padding: props.padding}}
            />
            {
                props.frontIcon && (
                    <FontAwesomeIcon className="front-icon" icon={props.frontIcon} /> 
                )
            }
            {
                props.backIcon && (
                  <button className="back-icon" onClick={props.handleBackIconOnClick}> 
                  <FontAwesomeIcon className="back-icon" icon={props.backIcon} />
                </button>
                )
            }
        </div>
        {props.errorMessage && <p className='error-message'>{props.errorMessage}</p>}
    </div>

  );
};

export default TextInput;
