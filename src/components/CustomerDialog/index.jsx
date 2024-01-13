import './index.scss'
import DialogBox from '../DialogBox'
import ButtonSubmit from '../ButtonSubmit';
import ButtonCancel from '../ButtonCancel'
import CompanyAccordion from '../CompanyAccordion';
import CuratorAccordion from '../CuratorAccordion';
import { Grid } from '@mui/material';
import createCustomer from '../../apis/customer/createCustomer'
import updateCustomer from '../../apis/customer/updateCustomer'

const CustomerDialog = (props) => {
  const handleSave = async () => {
    const customerName = document.getElementsByClassName('dialog-customer-customer-field-fullName')[0].querySelector('input').value
    const customerShortName = document.getElementsByClassName('dialog-customer-customer-field-shortName')[0].querySelector('input').value
    const customerAddress = document.getElementsByClassName('dialog-customer-customer-field-address')[0].querySelector('input').value
    const customerPhoneNumber = document.getElementsByClassName('dialog-customer-customer-field-phoneNumber')[0].querySelector('input').value
    const customerEmail = document.getElementsByClassName('dialog-customer-customer-field-email')[0].querySelector('input').value
    const curatorName = document.getElementsByClassName('dialog-customer-curator-field-fullName')[0].querySelector('input').value
    const curatorTitle = document.getElementsByClassName('dialog-customer-curator-field-title')[0].querySelector('input').value
    const curatorPhoneNumber = document.getElementsByClassName('dialog-customer-curator-field-phoneNumber')[0].querySelector('input').value
    const curatorEmail = document.getElementsByClassName('dialog-customer-curator-field-email')[0].querySelector('input').value

    var res = null
    if (props.status === "create"){
        console.log('create')
        res = await createCustomer(customerName, customerShortName, customerAddress, customerPhoneNumber, customerEmail,
        curatorName, curatorTitle, curatorPhoneNumber, curatorEmail)
    }
    else if (props.status === "edit"){
      console.log('edit')
        res = await updateCustomer(props.initial.id, customerName, customerShortName, customerAddress, customerPhoneNumber, 
        customerEmail,curatorName, curatorTitle, curatorPhoneNumber, curatorEmail)
    }

    props.afterSave(res)
  }
  
  return (
      <DialogBox className='dialog-box' 
      title={props.status === "create" ? "Tạo khách hàng mới" : "Chỉnh sửa thông tin khách hàng"} 
      isShowing={props.isShowing} 
      hide={() => {props.hide()}} 
      height='500px'
      overflowY='auto'
      >
        <div className='dialog-customer-accordion'>
          <CompanyAccordion status={props.status} initial={props.initial}/>
        </div>
        <div className='dialog-customer-accordion'>
          <CuratorAccordion status={props.status} initial={props.initial}/>
        </div>
        <Grid container md={12} spacing={2}>
          <Grid item md={6}>
            <div style={{width: '100%', display: 'flex', justifyContent: 'right'}}>
              <div className='customer-button-cancel'>
                <ButtonCancel className='customer-button' text='Huỷ' onClick={() => {props.hide()}}/>
              </div>
            </div>
          </Grid>
          <Grid item md={6}>
            <div style={{width: '100%', display: 'flex', justifyContent: 'left'}}>
              <div className='customer-button-save'>
                <ButtonSubmit text='Lưu' onClick={handleSave}
                />
              </div>
            </div>
          </Grid>
        </Grid>
      </DialogBox>
  );
};

export default CustomerDialog;