import './index.scss'

const ButtonSubmit = (props) => {
  return (
    <button type='submit' className='button-submit' disabled={props.disabled} onClick={props.onClick}>{props.text}</button>
  );
};

export default ButtonSubmit;