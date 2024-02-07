import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DatePick from '../DatePicker';
import { useState, useEffect } from 'react';
import { TextField } from '@mui/material';
import './index.scss'
import {Grid} from '@mui/material';
import HistoryBlock from '../HistoryBlock';
import DropDown from '../DropDown';

export default function FormAccordion(props) {  
    const options = React.useRef([])
    const codeOptions = React.useRef([])
    const codeDefault = React.useRef(null)
    const setOptions = () => {
        if (props.type === 'Gia hạn'){
            options.current = getOptions('được ghi nhận gia hạn')
            codeOptions.current = codeOptionsGH
        }
        else if (props.type === 'Sửa đổi'){
            options.current = getOptions('được ghi nhận sửa đổi')
            codeOptions.current = codeOptionsSD
        }
        else if (props.type === 'Cấp lại'){
            options.current = getOptions('cấp lại')
            codeOptions.current = codeOptionsCL
        }
        else if (props.type === 'Li xăng - Chuyển nhượng'){
            options.current = getOptions('ghi nhận hợp đồng li xăng/chuyển nhượng')
            codeOptions.current = codeOptionsLX
        }
    }

    const [paperSubmitDate, setPaperSubmitDate] = useState(null)
    const [year, setYear] = useState("")
    const handleChangeYear = (e) => {
      if (e.target.value.toString().length <= 4) {
        setYear(e.target.value);
      }
    };

    const [serviceId, setServiceId] = useState("")
    const handleChangeServiceId = (e) => {
        if ((e.target.value.toString().length <= 5) && (/^\d*$/.test(e.target.value) || e.target.value === '')) {
          setServiceId(e.target.value);
        }
      };

    const setInitial = (values) => {
      setPaperSubmitDate(values.paperSubmitDate)
      setOptions()
      if (values.paperId && values.paperId.length > 4){
        codeDefault.current = (values.paperId.split("-")[0])
        setYear(values.paperId.split("-")[1])
        setServiceId(values.paperId.split("-")[2])
      }
    }

    useEffect(() => {
      if (props.initial){
      setInitial(props.initial)
      }
    }, [])

  return (
      <Accordion defaultExpanded  className='accordion' style={{width: '104%', marginTop: '20px'}}>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography style={{ color: 'black'}}><b>2. Thông tin đơn</b></Typography>
        </AccordionSummary>
        <AccordionDetails>
        <div id='dialog-form-number'>
          <label id='dialog-form-number-label'> <b> Số đơn</b></label>
          <Grid container>
            <Grid item md={2.5}>
          <div id='dialog-form-number-group'>
          <DropDown onChange={getOptions} options={codeOptions.current} initial={codeDefault.current}></DropDown>
          </div>
          </Grid>
          <Grid item md={1}>
          <p id='slash-1'> - </p>
          </Grid>
          <Grid item md={3.5}>
          <div id='dialog-form-number-year'>
            <TextField placeholder='Năm (Điền tự động)' disabled={true} type="number" onChange={(e) => handleChangeYear(e)} value={year}/>
          </div>
          </Grid>
          <Grid item md={1}>
          <p id='slash-2'> - </p>
          </Grid>
          <Grid item md={4}>
          <div id='dialog-form-number-id'>
            <TextField placeholder='Số đơn' onChange={(e) => handleChangeServiceId(e)} value={serviceId}/>
          </div>
          </Grid>
        </Grid>
        </div>
        <div id='dialog-form-number-date'>
          <DatePick initial={paperSubmitDate} onChange={(value) => {setPaperSubmitDate(value);setYear(value.year());}} value={paperSubmitDate} label='Ngày nộp đơn'/>
        </div>
        <HistoryBlock initial={props.initial}
        options = {options.current}/>
        </AccordionDetails>
      </Accordion>
  );
}

const getOptions = (text) => {
    return (
        [
            'Thông báo thiếu sót',
            'Công văn trả lời',
            'Ngày ' + text,
            'Ngày gửi trả kết quả cho khách hàng'
        ]
    )
}

const codeOptionsCL =['RB1','RB2','RB3','RB4']
const codeOptionsGH = ['DT1','DT2','GH3','GH4']
const codeOptionsSD = ['SĐ1', 'SĐ2', 'SĐ3', 'SĐ4', 'SB1', 'SB2', 'SB3', 'SB4']
const codeOptionsLX = ['CĐ1', 'CĐ2', 'CĐ3', 'CĐ4','CB1','CB2','CB3','CB4','LX1','LX2','LX3','LX4']