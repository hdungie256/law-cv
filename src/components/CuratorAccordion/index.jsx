import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import TextInput from '../TextInput'
import { useState } from 'react';
import './index.scss'

export default function CuratorAccordion(props) {
    const [fullName, setFullName] = useState("");
    const handleFullNameChange = (e) => {
      setFullName(e.target.value);
    };
  
    const [fullNameError, setFullNameError] = useState("");
    const handleFullNameError = (currentFullName) =>{
          if (currentFullName.length<1){
            setFullNameError("Nhập họ và tên.")
          }
          else{
            setFullNameError("")
          }
    }
  
    const [email, setEmail] = useState("");
    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };
  
    const [emailError, setEmailError] = useState("");
  
    const handleEmailError = (currentEmail) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
      if (currentEmail.length < 1) {
        setEmailError("Nhập email.");
      } else if (!emailRegex.test(currentEmail)) {
        setEmailError("Email không hợp lệ.");
      } else {
        setEmailError("");
      }
    };
    
  
    const [phoneNumber, setPhoneNumber] = useState("");
    const handlePhoneNumber = (e) => {
      setPhoneNumber(e.target.value);
    };
  
    const [phoneNumberError, setPhoneNumberError] = useState("");
    const [shortName, setShortName] = useState("")
    const handlePhoneNumberError = (currentPhoneNumber) =>{
      const phoneNumberRegex = /^\d{10,11}$/
      if (currentPhoneNumber.length<1){
        setPhoneNumberError("Nhập số điện thoại.")
      }
      else if (!phoneNumberRegex.test(currentPhoneNumber)){
        setPhoneNumberError('Số điện thoại không hợp lệ.')
      }
      else{
        setPhoneNumberError("")
      }
    }

    React.useEffect(() => {
      if (props.status === "edit"){
        setFullName(props.initial.curatorName)
        setShortName(props.initial.curatorTitle)
        setEmail(props.initial.curatorEmail)
        setPhoneNumber(props.initial.curatorPhoneNumber)
      }
    }, [props.status, props.initial])
  return (
      <Accordion sx={{backgroundColor:'#FEFEFE', boxShadow: 'none', border: '0.25px solid #c4c4c4', borderRadius: '5px' }} style={{width: '100%', marginTop: '20px'}}>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography style={{ color: '#1095e6'}}><b>2. Thông tin người phụ trách (nếu có)</b></Typography>
        </AccordionSummary>
        <AccordionDetails>
            <div className='curator-field dialog-customer-curator-field-fullName'>
                <TextInput type='text'onChange = {(e) => {handleFullNameChange(e); handleFullNameError(e.target.value)}} value={fullName} errorMessage={fullNameError} padding='0px 10px' label='Tên người phụ trách' placeholder={('Tên người phụ trách')} />
            </div>
            <div className='curator-field dialog-customer-curator-field-title'>
            <TextInput type='text' errorMessage="" onChange = {(e) => {setShortName(e.target.value)}} value={shortName} padding='0px 10px' label='Chức danh' placeholder={('Chức danh')} />
            </div>
            <div className='curator-field dialog-customer-curator-field-phoneNumber'>
            <TextInput type='text'onChange = {(e) => {handlePhoneNumber(e); handlePhoneNumberError(e.target.value)}} value={phoneNumber} errorMessage={phoneNumberError} padding='0px 10px' label='Số điện thoại' placeholder={('Số điện thoại')} />
            </div>
            <div className='curator-field dialog-customer-curator-field-email'>
            <TextInput type='email'onChange = {(e) => {handleEmailChange(e); handleEmailError(e.target.value)}} value={email} errorMessage={emailError} padding='0px 10px' label='Email' placeholder={('Email')} />
            </div>
        </AccordionDetails>
      </Accordion>
  );
}