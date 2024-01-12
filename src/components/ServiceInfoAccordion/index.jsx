import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useState, useEffect } from 'react';
import { TextField } from '@mui/material';
import './index.scss'

export default function ServiceInfoAccordion(props) {
  const [info, setInfo] = useState({})

  const setInitial = (values) => {

    if (props.type === 'Nhãn hiệu'){
      setInfo({dtype: 'nhãn hiệu'})
      setNHGroup(values.group)
    }
    else if (props.type === 'KDCN'){
      setInfo({dtype: 'KDCN'})
      setGroup(values.group)
    }
    else if (props.type === 'Sáng chế'){
      setInfo({dtype: 'sáng chế'})
    }
    else {
      setInfo({dtype: 'GPHI'})
    }
      setNhanHieu(values.name)
  }

  useEffect(() => {
      if (props.initial){
          setInitial(props.initial)
      }
  }, [])

    const [nhanhieu, setNhanHieu] = useState("")

    const handleChangeNhanHieu = (e) => {
      setNhanHieu(e.target.value);
    };
  
    const [NHgroup, setNHGroup] = useState("")
    const [group, setGroup] = useState("")

  return (
      <Accordion defaultExpanded sx={{backgroundColor:'#FEFEFE', boxShadow: 'none', border: '0.25px solid #c4c4c4', borderRadius: '5px' }} style={{width: '100%', marginTop: '20px'}}>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography style={{ color: '#1095e6'}}><b>2. Thông tin {info.dtype}</b></Typography>
        </AccordionSummary>
        <AccordionDetails>
            <div id='dialog-service-name'>
            <div id='dialog-service-name-label-wrapper1' style={{'margin-bottom': '7px'}}> <label id='dialog-service-name-label1'> <b> Tên {info.dtype} *</b></label> </div>
            <TextField InputProps={{ inputProps: { min: 0, max: 10 } }} style={{width: '100%'}} type='text' padding='0px 10px' onChange={(e) => {handleChangeNhanHieu(e)}} value={nhanhieu} placeholder={('Tên nhãn hiệu')} />
            </div>
            {props.type === 'Nhãn hiệu' &&
            <div id='dialog-service-group'>
                <div id='dialog-serivce-group-label-wrapper1' style={{'margin-bottom': '7px'}}> <label style={{color: '#6c7a99'}} id='dialog-service-group-label1'> <b> Nhóm sản phẩm</b></label> </div>
                <TextField placeholder={'Nhóm sản phẩm (1-45)'} style={{width: '100%'}} onChange={(e) => setNHGroup(e.target.value)} value={NHgroup}/>
            </div>
            }
            {props.type === 'KDCN' &&
              <div id='dialog-service-group'>
                <div id='dialog-service-group-label-wrapper1' style={{'margin-bottom': '7px'}}> <label style={{color: '#6c7a99'}}id='dialog-service-group-label1'> <b> Phân loại</b></label> </div>
                <TextField style={{width: '100%'}} placeholder='Phân loại' type="text" onChange={(e) => setGroup(e.target.value)} value={group}/>
              </div>
            }
        </AccordionDetails>
      </Accordion>
  );
}