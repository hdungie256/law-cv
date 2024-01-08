import './index.scss'
import DialogBox from '../DialogBox'
import TextInput from '../TextInput'
import ButtonSubmit from '../ButtonSubmit';
import ButtonCancel from '../ButtonCancel'
import {useState, useEffect} from 'react';

const CustomerDialog = (props) => {

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

  const resetFields = () => {
    setFullName("");
    setFullNameError("");
    setAddress("");
    setAddressError("");
    setEmail("");
    setEmailError("");
    setPhoneNumber("");
    setPhoneNumberError("");
    setShortName("")
  };
  
  const setInitial = (values) => {
    setFullName(values.name);
    setShortName(values.shortName)
    setAddress(values.address);
    setEmail(values.email);
    setPhoneNumber(values.phoneNumber);
  };
  
  useEffect(() => {
    if (!props.isShowing) {
      resetFields();
    }
  }, [props.isShowing]);

  useEffect(() => {
    if (props.values) {
      setInitial(props.values);
    }
  }, [props.values]);
  

  return (
      <DialogBox className='dialog-box' 
      title={props.title} 
      isShowing={props.isShowing} 
      hide={() => {props.hide()}} 
      height='400px'
      hr
      overflowY='auto'
      >
        <div className='customer-fullname'>
          <TextInput type='text'onChange = {(e) => {handleFullNameChange(e); handleFullNameError(e.target.value)}} value={fullName} errorMessage={fullNameError} padding='0px 10px' label='Tên khách hàng' placeholder={('Tên khách hàng')} />
        </div>
        <div className='customer-shortname'>
          <TextInput type='text' errorMessage="" onChange = {(e) => {setShortName(e.target.value)}} value={shortName} padding='0px 10px' label='Tên rút gọn/Tên gợi nhớ' placeholder={('Tên rút gọn/Tên gợi nhớ')} />
        </div>
        <div className='customer-address'>
          <TextInput type='text'onChange = {(e) => {handleAddressChange(e); handleAddressError(e.target.value)}} value={address} errorMessage={addressError} padding='0px 10px' label='Địa chỉ' placeholder={('Địa chỉ')} />
        </div>
        <div className='customer-email'>
          <TextInput type='email'onChange = {(e) => {handleEmailChange(e); handleEmailError(e.target.value)}} value={email} errorMessage={emailError} padding='0px 10px' label='Email' placeholder={('Email')} />
        </div>
        <div className='customer-phonenumber'>
          <TextInput type='text'onChange = {(e) => {handlePhoneNumber(e); handlePhoneNumberError(e.target.value)}} value={phoneNumber} errorMessage={phoneNumberError} padding='0px 10px' label='Số điện thoại' placeholder={('Số điện thoại')} />
        </div>
        <div className='customer-button-save'>
          <ButtonSubmit text='Lưu' onClick=
          {() => {props.handleSave(props.values ? props.values.id : null, fullName,shortName,address,email,phoneNumber,fullNameError,addressError,emailError,phoneNumberError);}}/>
        </div>
        <div className='customer-button-cancel'>
          <ButtonCancel className='customer-button' text='Huỷ' onClick={() => {props.hide()}}/>
        </div>
      </DialogBox>
  );
};

export default CustomerDialog;