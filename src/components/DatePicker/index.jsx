import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';

const DatePick = (props) => {
    const [value, setValue] = useState(undefined)

    useEffect(() => {
        if (props.initial){
          setValue(dayjs(props.initial))
        }}, [props.initial])

    return(
        <div className='date-picker'>
            {props.label && <label id='label' style={{margin:'0px'}}> <b>{props.label}</b> </label>}
            <div id='input-wrapper'>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['div']}>
                        <DatePicker 
                        value={value} 
                        onChange={props.onChange} 
                        slotProps={{ textField: { fullWidth: true, margin: '0px'} }} 
                        format="DD/MM/YYYY"
                        />
                    </DemoContainer>
                </LocalizationProvider>
            </div>
        </div>
    )
}

export default DatePick