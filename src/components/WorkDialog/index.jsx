import './index.scss'
import DialogBox from '../DialogBox'
import DropDown from '../DropDown';
import ButtonSubmit from '../ButtonSubmit'
import { useRef,useEffect } from 'react';
import getAllCustomers from '../../apis/customer/getAllCustomers';
import { Grid } from '@mui/material';

const WorkDialog = (props) => {

    const type = useRef("")
    const setType = (newType) =>{
        type.current = newType
    }

    const customerId = useRef("")
    const customerName = useRef("")
    const setCustomer = (newName,newId) =>{
        customerName.current = newName
        customerId.current =newId
    }
  
    const customersL = useRef([])
    useEffect(() => {
        const fetchData = async () => {
            const customers = await getAllCustomers();
            customersL.current = customers.map((row) => ({
                key: row.id, 
                label: row.name,
              }));
        }

        if (!props.isShowing) {
            fetchData();
        };

        setType("")
        setCustomer("")

    }, [props.isShowing])

    return(
    <DialogBox
    id='work-dialog-box' 
      title={props.title} 
      isShowing={props.isShowing} 
      hide={() => {props.hide()}} 
      height='180px'
      overflowY='visible'
      >
        <Grid container md={12} spacing={3}>
            <Grid item md={7}>
                <div  id='create-dialog-owner'>
                    <DropDown
                    label='Chủ đơn'
                    options={customersL.current}
                    onChange={setCustomer}
                    errorMessage={props.nameErrorMessage}
                    >
                    </DropDown>
                </div>
            </Grid>
            <Grid item md={5}>
                <div id='create-dialog-type'>
                    <DropDown
                    label='Loại'
                    options={types}
                    onChange={setType}
                    errorMessage={props.typeErrorMessage}
                    >
                    </DropDown>
                </div>
            </Grid>
        </Grid>
        <div id='create-dialog-button-next-wrapper' style={{height: '40px', display: 'flex', justifyContent: 'right', paddingRight: '30px'}}>
            <div id='create-dialog-button-next'>
            <ButtonSubmit text='Tiếp' onClick={() => {props.handleNext(type.current, customerName.current, customerId.current)}}/>
            </div>
        </div>

    </DialogBox>
    )
}
const types = [
    'Nhãn hiệu',
    'KDCN',
    'Sáng chế',
    'GPHI'
]


export default WorkDialog;