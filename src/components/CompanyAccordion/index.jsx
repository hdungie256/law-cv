import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import TextInput from '../TextInput'
import { useState,useEffect } from 'react';
import "./index.scss"
export default function CompanyAccordion(props) {

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
  
    const [address, setAddress] = useState("");
    const handleAddressChange = (e) => {
      setAddress(e.target.value);
    };
    
    const [addressError, setAddressError] = useState("");
    const handleAddressError = (currentAddress) =>{
            if (currentAddress.length<1){
              setAddressError("Nhập địa chỉ.")
            }
            else{
              setAddressError("")
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

    const setInitial = (values) => {
      setFullName(values.customerName);
      setShortName(values.customerShortName)
      setAddress(values.customerAddress);
      setEmail(values.customerEmail);
      setPhoneNumber(values.customerPhoneNumber);
    };
  
    useEffect(() => {
      if (props.status === "edit") {
        setInitial(props.initial);
      }
    }, [props.initial, props.status]);

    // const [isSavable, setIsSavable] = useState(false)
    // useEffect(() => {
    //   if (fullName === "" || address === "" || email === "" || phoneNumber === ""){
    //     setIsSavable(false)
    //   }
    //   else if (fullNameError !== "" || addressError !== "" || emailError !== "" || phoneNumberError !== ""  ){
    //     setIsSavable(false)
    //   }
    //   else{
    //     setIsSavable(true)
    //   }
    // }, [fullNameError, addressError, emailError, phoneNumberError, fullName, address, email, phoneNumber])

  return (
      <Accordion defaultExpanded sx={{backgroundColor:'#FEFEFE', boxShadow: 'none', border: '0.25px solid #c4c4c4', borderRadius: '5px' }} style={{width: '100%', marginTop: '20px'}}>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography style={{ color: '#1095e6'}}><b>1. Thông tin khách hàng</b></Typography>
        </AccordionSummary>
        <AccordionDetails>
            <div className='company-field dialog-customer-customer-field-fullName'>
                <TextInput type='text'onChange = {(e) => {handleFullNameChange(e); handleFullNameError(e.target.value)}} value={fullName} errorMessage={fullNameError} padding='0px 10px' label='Tên khách hàng' placeholder={('Tên khách hàng')} />
            </div>
            <div className='company-field dialog-customer-customer-field-shortName'>
            <TextInput type='text' errorMessage="" onChange = {(e) => {setShortName(e.target.value)}} value={shortName} padding='0px 10px' label='Tên rút gọn/Tên gợi nhớ' placeholder={('Tên rút gọn/Tên gợi nhớ')} />
            </div>
            <div className='company-field dialog-customer-customer-field-address'>
            <TextInput type='text'onChange = {(e) => {handleAddressChange(e); handleAddressError(e.target.value)}} value={address} errorMessage={addressError} padding='0px 10px' label='Địa chỉ' placeholder={('Địa chỉ')} />
            </div>
            <div className='company-field dialog-customer-customer-field-email'>
            <TextInput type='email'onChange = {(e) => {handleEmailChange(e); handleEmailError(e.target.value)}} value={email} errorMessage={emailError} padding='0px 10px' label='Email' placeholder={('Email')} />
            </div>
            <div className='company-field dialog-customer-customer-field-phoneNumber'>
            <TextInput type='text'onChange = {(e) => {handlePhoneNumber(e); handlePhoneNumberError(e.target.value)}} value={phoneNumber} errorMessage={phoneNumberError} padding='0px 10px' label='Số điện thoại' placeholder={('Số điện thoại')} />
            </div>
        </AccordionDetails>
      </Accordion>
  );
}