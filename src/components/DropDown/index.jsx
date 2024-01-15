import './index.scss';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';

function DropDown(props) {

  const [value, setValue] = useState("");
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (props.initial){
      setValue(props.initial)
    }}, [props.initial])
  
  return (
    <div className='drop-down'>
        {props.label && <div style={{marginBottom: '10px'}} ><label className='label'> <b>{props.label}</b> </label></div>}
        <div id='drop-down-wrapper'>
            <Autocomplete
            disablePortal
            options={props.options}
            value={value}
            onChange={(e, newValue) => {setValue(newValue);props.onChange(newValue)}}
            sx={{ className: props.className, width: props.width }}
            renderInput={(params) => <TextField {...params} 
            onInputhange={(e, newInputValue) => {setInputValue(newInputValue);props.onChange(newInputValue)}}
            className={props.className}
            inputValue={inputValue}
            defaultValue={props.options.find(option => option === props.defaultValue)}
            />}
            />
        </div>
        {props.errorMessage && <p className='error-message'>{props.errorMessage}</p>}
    </div>

  );
};

export default DropDown;
