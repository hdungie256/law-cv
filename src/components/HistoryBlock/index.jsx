import ButtonSubmit from '../ButtonSubmit';
import DropDown from '../DropDown';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import './index.scss'
import { useState, useRef, useEffect } from 'react';
import {Grid} from '@mui/material';
import DatePick from '../DatePicker';

const HistoryBlock =(props) => {
    const [historyField, setHistoryField] = useState([]);
    const [action, setAction] = useState(null)
    const [historyCount, setHistoryCount] = useState(0);
    const historyKey = useRef(0)

    const addHistory = () => {
        setHistoryCount(historyCount + 1);
        historyKey.current = historyKey.current + 1
    
        setHistoryField((prevHistory) => [
          ...prevHistory,
          {
            key: 'history' + historyKey.current,
          },
        ]);
      };

    const renderHistory = () => {
    return historyField.map((item) => (
        <div className='form-history-fields' id={item.key} key={item.key}>
            <Grid container md={12}>
                <Grid item md={6.5}>
                <div className='form-history-action'> 
                <DropDown label='Hành động' 
                initial={item.action}
                onChange={setAction}
                options={props.options}

                className='form-hisotry-action-dropdown'/> 
                </div>
                </Grid>
                <Grid item md={4.5}>
                <div className='form-history-date'> 
                <DatePick
                initial={item.date}
                label='Ngày'/> 
                </div>
                </Grid>
                <Grid item md={1}>
                    <div style={{display: 'flex', alignItems: 'flex-end', height: '100%'}}>
                    <div className='form-history-delete'> 
                        <IconButton aria-label="delete"  onClick={() => handleDeleteHistory(item.key)}><DeleteIcon /></IconButton>
                    </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    ));
    };

    const handleDeleteHistory = (historyKey) => {
        const updatedHistory = historyField.filter((item) => item.key !== historyKey);
        setHistoryCount(historyCount - 1);
        setHistoryField(updatedHistory)
    }

    const setInitial = (values, type) => {
        if (values[type]){
            const c = []
            for (let i = 0; i < values[type].length; i++) {
                const mergedObject = { key: 'history' + i, ...values[type][i] };
                c.push(mergedObject);
            }
            setHistoryField(c);
            historyKey.current = values[type].length
            renderHistory()
        }
    }

    useEffect(()=>{
        if (props.initial){
            setInitial(props.initial, props.type)
        }
    }, [])

    return (
        <>
            <div id ='btn-add-history-wrapper'>
            <div id='nhanhieu-btn-add-history'> 
            <ButtonSubmit onClick={addHistory} text='Thêm lịch sử'/> 
            </div>
            </div>
            {renderHistory()}
        </>
    )
}

export default HistoryBlock