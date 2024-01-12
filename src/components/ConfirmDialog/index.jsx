import './index.scss'
import DialogBox from '../DialogBox'
import ButtonSubmit from '../ButtonSubmit';
import ButtonCancel from '../ButtonCancel'
import { Grid } from '@mui/material';

const ConfirmDialog = (props) => {
  return (
      <DialogBox id='dialog-confirmation' 
      isShowing={props.isShowing} 
      hide={() => {props.hide()}} 
      overFlowY={'hidden'}
      height={props.height}
      >
        <p style={{lineHeight: '2.5'}}> Xác nhận xoá {props.type} <b> {props.name}. </b></p>
        <Grid container md={12} spacing={2}>
          <Grid item md ={8}></Grid>
          <Grid item md={2}>
            <div id='confirmation-button-cancel'>
              <ButtonCancel text='Huỷ' onClick={() => {props.hide()}}/>
            </div>
            </Grid>
            <Grid item md={2}>
            <div id='confirmation-button-confirm'>
              <ButtonSubmit text='Xác nhận' onClick={props.handleConfirm}/>
            </div>
          </Grid>
        </Grid>
      </DialogBox>
  );
};

export default ConfirmDialog;

