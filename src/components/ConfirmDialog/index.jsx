import './index.scss'
import DialogBox from '../DialogBox'
import ButtonSubmit from '../ButtonSubmit';
import ButtonCancel from '../ButtonCancel'

const ConfirmDialog = (props) => {
  return (
      <DialogBox id='dialog-confirmation' 
      isShowing={props.isShowing} 
      hide={() => {props.hide()}} 

      height='12%'
      >
        <p> Xác nhận xoá khách hàng <b> heh </b></p>
        <div id='confirmation-button-confirm'>
          <ButtonSubmit text='Xác nhận' onClick={props.handleConfirm}/>
        </div>
        <div id='confirmation-button-cancel'>
          <ButtonCancel text='Huỷ' onClick={() => {props.hide()}}/>
        </div>
      </DialogBox>
  );
};

export default ConfirmDialog;

