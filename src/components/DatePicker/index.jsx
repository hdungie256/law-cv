import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

const DatePick = (props) => {
    return(
        <div className='date-picker'>
            {props.label && <label id='label' style={{color: '#6c7a99', margin:'0px'}}> <b>{props.label}</b> </label>}
            <div id='input-wrapper'>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['div']}>
                        <DatePicker value={props.value} 
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