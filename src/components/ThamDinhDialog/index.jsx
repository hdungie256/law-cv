import './index.scss'
import DialogBox from '../DialogBox'
import {Grid} from '@mui/material';
import ButtonSubmit from '../ButtonSubmit';
import ButtonCancel from '../ButtonCancel'
import FormAccordion from '../FormAccordion';
import CustomerAccordion from '../CustomerAccordion'
import ServiceInfoAccordion from '../ServiceInfoAccordion';
import GCNAccordion from '../GCNAccordion';
import createWork from '../../apis/work/createWork'

const ServiceDialog = (props) => {
  const handleSave = async () => {
    const serviceName = (document.getElementById('dialog-service-name').querySelector('input').value)
    const serviceGroup = (document.getElementById('dialog-service-group')) ? 
    (document.getElementById('dialog-service-group').querySelector('input').value) : null
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
  
    const res = await createWork(props.customerId, 'Thẩm định ' + props.type, serviceName, serviceGroup, paperId, paperSubmitDate, formHistory, gcnId, gcnDate, null, null)
    props.afterSave(res)
  }

  return (
      <DialogBox className='dialog-box' 
      title={'Thẩm định đơn ' + props.type} 
      isShowing={props.isShowing} 
      hide={() => {props.hide()}} 
      height='500px'
      overflowY={'auto'}
      handleSave={props.handleSave}
      >
        <div id='customer-accordion'>
          <CustomerAccordion customer={props.customer}/>
        </div>

        <div id='service-accordion'>
          <ServiceInfoAccordion type={props.type} initial={props.workValues}/>
        </div>

        <div id='form-accordion'>
          <FormAccordion initial={props.workValues} type='formHistory'/>
        </div>
        <div id='gcn-accordion'>
          <GCNAccordion initial={props.workValues}/>
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