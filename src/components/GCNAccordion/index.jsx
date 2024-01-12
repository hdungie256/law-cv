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
import HistoryBlock from '../HistoryBlock';

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
      if (props.initial){
      setInitial(props.initial)
      }
    }, [])

  return (
      <Accordion sx={{backgroundColor:'#FEFEFE', boxShadow: 'none', border: '0.25px solid #c4c4c4' }} style={{width: '104%', marginTop: '10px'}}>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography style={{ color: '#1095e6' }}><b>4. Sau khi cấp văn bằng</b></Typography>
        </AccordionSummary>
        <AccordionDetails>
                    <div id='gcn-accordion-sogcn'>
                        <div style={{'margin-bottom': '7px'}}> 
                            <label style={{color: '#6c7a99'}}> <b> Số VBBH</b></label> 
                        </div>
                        <TextField style={{width: '100%', marginBottom: '20px'}} type='text' onChange={(e) => {handleChangeSoGCN(e)}} value={soGCN} placeholder={('Số VBBH')} />
                    </div>

                    <div id='gcn-accordion-gcndate'>
                        <DatePick initial={gcnDate} label='Ngày cấp VBBH' onChange={(value) => setGcnDate(value)} value={gcnDate}/>
                    </div>
        <HistoryBlock initial={props.initial} type='gcnHistory'
        options = {[
        "Gia hạn",
        "Sửa đổi",
        "Cấp lại",
        "Chuyển nhượng/ Li xăng",
        "Huỷ bỏ"]}
        />
        </AccordionDetails>
      </Accordion>
  );
}