import './index.scss'
import DialogBox from '../DialogBox'
import {Grid} from '@mui/material';
import ButtonSubmit from '../ButtonSubmit';
import ButtonCancel from '../ButtonCancel'
import CustomerAccordion from '../CustomerAccordion'
import createWork from '../../apis/work/createWork'
import updateWork from '../../apis/work/updateWork';
import SauCapVBAccordion from '../SauCapVBAccordion'
import GCNAccordion from '../GCNAccordion';
import ServiceInfoAccordion from '../ServiceInfoAccordion';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import ReplayIcon from '@mui/icons-material/Replay';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import React from 'react';
import {Chip} from '@mui/material';
import getWorkForDashboard from '../../apis/work/getWorkForDashboard';

const ServiceDialog = (props) => {
  const handleSave = async () => {

    const serviceName = (document.getElementById('dialog-service-name').querySelector('input').value)
    const paperId = (document.getElementById("dialog-form-number-group").querySelector('input').value)
    + '-' + (document.getElementById('dialog-form-number-year').querySelector('input').value)
    + '-' + (document.getElementById("dialog-form-number-id").querySelector('input').value)
    var paperSubmitDate = (document.getElementById('dialog-form-number-date').querySelector('input').value)
    var parts = paperSubmitDate.split('/');
    paperSubmitDate = parts[1] + '/' + parts[0] + '/' + parts[2];
  
    const gcnId = (document.getElementById('gcn-accordion-sogcn').querySelector('input').value)
    var gcnDate = (document.getElementById('gcn-accordion-gcndate').querySelector('input').value)
    parts = gcnDate.split('/');
    gcnDate = parts[1] + '/' + parts[0] + '/' + parts[2];
  
    const formHistory = getHistory('form-accordion')

    var res = {}
    if (props.edit){
      res = await updateWork(props.workId, props.customerId, props.type, serviceName, null, paperId, paperSubmitDate, formHistory, gcnId, gcnDate, null, null)
      await getWorkForDashboard()
    }
    else{
      res = await createWork(props.customerId, props.type, serviceName, null, paperId, paperSubmitDate, formHistory, gcnId, gcnDate, null, null)
      await getWorkForDashboard()
    }
      props.afterSave(res)
  }

  let titleIcon;
  if (props.type === 'Sửa đổi') {
    titleIcon = <ChangeCircleIcon className='dialog-info-icon' />;
  } else if (props.type === 'Gia hạn') {
    titleIcon = <MoreTimeIcon className='dialog-info-icon' />;
  } else if (props.type === 'Cấp lại') {
    titleIcon = <ReplayIcon className='dialog-info-icon' />;
  } else if (props.type === 'Li xăng - Chuyển nhượng'){
    titleIcon = <ManageAccountsIcon className='dialog-info-icon'/>
  }

  return (
      <DialogBox className='dialog-box'
      title={
        <>
        {props.edit && <Chip sx={(props.workValues.status.includes("Chưa")) ? {backgroundColor: "#ffb8b8"} : {backgroundColor: "#d2fdbb"}} 
          style={{marginBottom: '15px'}} label={props.workValues.status}/>}
        <p>{props.type}</p>
        </>} 
      isShowing={props.isShowing} 
      hide={() => {props.hide()}} 
      height='80%'
      overflowY={'auto'}
      >
        <div id='customer-accordion'>
          <CustomerAccordion customer={props.customer}/>
        </div>

        <div>
          <ServiceInfoAccordion initial={props.workValues} type={props.type}></ServiceInfoAccordion>
        </div>

        <div id='form-accordion'>
          <SauCapVBAccordion initial={props.workValues} type={props.type}/>
        </div>

        <div id='gcn-accordion' >
          <GCNAccordion flexible type={props.type} initial={props.workValues} section={3}/>
        </div>

        <Grid container md={12} spacing={3}>
          <Grid item md={6}>
          <div className='dialog-button-cancel-wrapper' style={{display: 'flex', justifyContent: 'right'}}>
            <div className='dialog-button-cancel'>
                <ButtonCancel text='Huỷ' onClick={() => {props.hide()}}/>
              </div>
          </div>
        </Grid>
        <Grid item md={6}>
          <div className='dialog-button-save-wrapper'  style={{display: 'flex', justifyContent: 'left'}}>
            <div className='dialog-button-save'>
              <ButtonSubmit text='Lưu' onClick={handleSave}
                />
            </div>
          </div>
        </Grid>
        </Grid>
      </DialogBox>
  );
};

export default ServiceDialog;

const getHistory = (type) => {
  const historyList = []

  const historyActions = Array.from(document.getElementById(type).getElementsByClassName('form-history-action'))
  .map((element) => {
    return element.querySelectorAll('input')[0].value;
  })

  const historyDates = Array.from(document.getElementById(type).getElementsByClassName('form-history-date'))
  .map((element) => {
    const dparts = element.querySelectorAll('input')[0].value.split("/")
    return dparts[1] + '/' + dparts[0] + '/' + dparts[2]
  })

  for (let i=0; i<historyActions.length; i++){
  historyList[i] = {
    "action" : historyActions[i],
    "date" : historyDates[i]
  }
  }

  return historyList
}