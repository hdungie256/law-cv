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

export default function FormAccordion(props) {
  const [madridGroup, setMadridGroup] = useState("")

  const getGroup = () => {
    if (props.type === 'sáng chế'){
      return 1
    }
    else if (props.type === 'GPHI'){
      return 2
    }
    else if (props.type === 'KDCN'){
      return 3
    }
    else if (props.type === 'nhãn hiệu'){
      return 4
    }
  }

    const [serviceId, setServiceId] = useState("")
    const handleChangeServiceId = (e) => {
      if ((e.target.value.toString().length <= 5) && (/^\d*$/.test(e.target.value) || e.target.value === '')) {
        setServiceId(e.target.value);
      }
    };
    const [paperSubmitDate, setPaperSubmitDate] = useState(null)
    const [year, setYear] = useState("")
    const handleChangeYear = (e) => {
      if (e.target.value.toString().length <= 4) {
        setYear(e.target.value);
      }
    };

    const setInitial = (values) => {
      setPaperSubmitDate(values.paperSubmitDate)
      if (values.paperId && values.paperId.length > 4){
        setYear(values.paperId.split("-")[1])
        setServiceId(values.paperId.split("-")[2])
      }
      if (values.type === 'ĐK Nhãn hiệu Quốc tế'){
        setMadridGroup(values.paperId.split("-")[0])
      }
    }

    useEffect(() => {
      if (props.initial){
      setInitial(props.initial)
      }
    }, [])

  return (
      <Accordion defaultExpanded sx={{backgroundColor:'#FEFEFE', boxShadow: 'none', border: '0.25px solid #c4c4c4' }} style={{width: '104%', marginTop: '20px'}}>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography style={{ color: '#555555'}}><b>3. Thẩm định đơn</b></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <label id='dialog-form-number-label'> <b> Số đơn</b></label>
          <Grid container>
            <Grid item md={2}>
              { (props.type==="sáng chế" || props.type==="nhãn hiệu" || props.type==="KDCN" || props.type==="GPHI") ? 
              (<div id='dialog-form-number-group'>
                <TextField placeholder='Nhóm sản phẩm' type="number" disabled value={getGroup()}/>
              </div>) :
              (<div id='dialog-form-number-group'>
              <TextField onChange={(e) => setMadridGroup(e.target.value)} value={madridGroup}/>
            </div>)
              }
          </Grid>
          <Grid item md={1}>
          <p id='slash-1'> - </p>
          </Grid>
          <Grid item md={4}>
          <div id='dialog-form-number-year'>
            <TextField placeholder='Năm (Điền tự động)' disabled={true} type="number" onChange={(e) => handleChangeYear(e)} value={year}/>
          </div>
          </Grid>
          <Grid item md={1}>
          <p id='slash-2'> - </p>
          </Grid>
          <Grid item md={4}>
          <div id='dialog-form-number-id'>
            <TextField placeholder='Số đơn' type="text" onChange={(e) => handleChangeServiceId(e)} value={serviceId}/>
          </div>
          </Grid>
        </Grid>
        <div id='dialog-form-number-date'>
          <DatePick initial={paperSubmitDate} onChange={(value) => {setPaperSubmitDate(value); setYear(value.year());}} value={paperSubmitDate} label='Ngày nộp đơn'/>
        </div>
        <HistoryBlock initial={props.initial}
        options = {["Thông báo thiếu sót", 
        "Công văn trả lời thông báo thiếu sót",
        "Quyết định chấp nhận hợp lệ",
        "Thông báo từ chối",
        "Công văn trả lời thông báo từ chối",
        "Thông báo cấp GCN",
        "Quyết định từ chối",
        "Sửa đổi đơn",
        "Phản đối đơn",
        "Công văn hối thúc thẩm định",
        "Nộp phí cấp VBBH"]}/>
        </AccordionDetails>
      </Accordion>
  );
}