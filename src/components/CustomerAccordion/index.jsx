import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function CustomerAccordion(props) {

  return (
      <Accordion sx={{backgroundColor:'#FEFEFE', boxShadow: 'none', border: '0.25px solid #c4c4c4', borderRadius: '5px' }} style={{width: '100%', marginTop: '20px'}}>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography style={{ color: '#555555'}}><b>1. Thông tin khách hàng</b></Typography>
        </AccordionSummary>
        <AccordionDetails>
            <div style={{padding: '5px',paddingLeft: '20px' , display: 'flex', alignItems:'center', justifyContent:'left', backgroundColor: '#dfe8f5',width:'96%', height:'400px', borderRadius: '5px'}}>
            <div id="nhanhieu-customer-info">
                <p> <b> Tên khách hàng: </b> {props.customer.customerName}</p>
                <p> <b> Địa chỉ: </b> {props.customer.customerAddress}</p>
                <p> <b> Số điện thoại: </b> {props.customer.customerPhoneNumber}</p>
                <p> <b> Email: </b> {props.customer.customerEmail}</p>
                <br></br>
                <p> <b> Tên người phụ trách: </b> {props.customer.curatorEmail}</p>
                <p> <b> Chức danh của người phụ trách: </b> {props.customer.curatorTitle}</p>
                <p> <b> Số điện thoại người phụ trách: </b> {props.customer.curatorPhoneNumber}</p>
                <p> <b> Email người phụ trách: </b> {props.customer.curatorEmail}</p>
            </div>
            </div>
        </AccordionDetails>
      </Accordion>
  );
}