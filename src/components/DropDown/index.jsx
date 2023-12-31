import './index.scss';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

function DropDown(props) {

  // const useStyles = makeStyles({
  //   class: props.className
  //   ,
  // });

  // const classes = useStyles();

  const [value, setValue] = useState("");
  const [inputValue, setInputValue] = useState('');
  return (
    <div className='drop-down'>
        {props.label && <label className='label'> <b>{props.label}</b> </label>}
        <div id='drop-down-wrapper'>
            <Autocomplete
            disablePortal
            options={props.options}
            onChange={(e, newValue) => {setValue(newValue);props.onChange(newValue)}}
            sx={{ className: props.className, width: props.width }}
            renderInput={(params) => <TextField {...params} 
            onInputhange={(e, newInputValue) => {setInputValue(newInputValue);props.onChange(newInputValue)}}
            className={props.className}
            />}
            />
        </div>
        {props.errorMessage && <p className='error-message'>{props.errorMessage}</p>}
    </div>

  );
};

export default DropDown;
