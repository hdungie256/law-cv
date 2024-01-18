import './index.scss';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect } from 'react';
import getAllCustomers from '../../apis/customer/getAllCustomers'
import { useRef } from 'react';
import debounce from "lodash/debounce";
import { useCallback } from 'react';

function SearchBar(props) {
  const [value,setValue] = useState('')
  
  const debouncedHandleSearch = useCallback(debounce(async (inputValue) => {props.handleSearch(inputValue)}, 500), []);

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);
    debouncedHandleSearch(inputValue);
  };

  const list = useRef([])
    return(
        <Paper
        style={{width: '100%'}}
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, backgroundColor: '#ebecf0', boxShadow: 'none', border: '20px' }}
      >
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <InputBase
            style={{width: '100%'}}
          sx={{ ml: 1, flex: 1, backgroundColor: '#ebecf0', boxShadow: 'none'  }}
          placeholder="Tìm kiếm theo tên khách hàng/người phụ trách, SĐT khách hàng/ người phụ trách, email khách hàng/người phụ trách, địa chỉ"
          inputProps={{ 'aria-label': 'search customers' }}
          // value={value}
          onChange={(e) => {handleChange(e)}}
        />
      </Paper>
    )
}

export default SearchBar;