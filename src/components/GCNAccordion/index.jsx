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

export default function GCNAccordion(props) {
    const [soGCN, setSoGCN] = useState("")
    const handleChangeSoGCN = (e) => {
        setSoGCN(e.target.value);
    };
    const [gcnDate, setGcnDate] = useState(null)

    const setInitial = (values) => {
      setSoGCN(values.gcnId)
      setGcnDate((values.gcnDate))
    }

    useEffect(() => {
      console.log(props.flexible)
      if (props.initial){
      setInitial(props.initial)
      }
    }, [])

  return (
    <div className='accordion'>
      <Accordion defaultExpanded  style={{width: '104%', marginTop: '10px'}}>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography style={{ color: '#black' }}><b>{props.section}. Thông tin {props.flexible ? `đối tượng cần ${props.type}` : 'VBBH'} </b></Typography>
        </AccordionSummary>
        <AccordionDetails>
                    <div id='gcn-accordion-sogcn'>
                        <div style={{'margin-bottom': '7px'}}> 
                            <label> <b> Số {props.flexible ? 'đơn/ Số VBBH' : 'VBBH'}</b></label> 
                        </div>
                        <TextField style={{width: '100%', marginBottom: '20px'}} type='text' onChange={(e) => {handleChangeSoGCN(e)}} value={soGCN} placeholder={('Số VBBH')} />
                    </div>

                    <div id='gcn-accordion-gcndate'>
                        <DatePick initial={gcnDate} label={props.flexible ? 'Ngày nộp đơn/ Ngày cấp VBBH' : 'Ngày cấp VBBH'} onChange={(value) => setGcnDate(value)} value={gcnDate}/>
                    </div>
        </AccordionDetails>
      </Accordion>
      </div>
  );
}