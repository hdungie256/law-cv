import './index.scss'

const ButtonCancel = (props) => {
  return (
      <button className='button-cancel' onClick={props.onClick}><b>{props.text}</b></button>
  );
};

export default ButtonCancel;