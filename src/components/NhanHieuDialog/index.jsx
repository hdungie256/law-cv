import './index.scss'
import DialogBox from '../DialogBox'
import TextInput from '../TextInput'
import ButtonSubmit from '../ButtonSubmit';
import ButtonCancel from '../ButtonCancel'
import { useState} from 'react';
import DatePick from '../DatePicker'
import { TextField } from '@mui/material';

const NhanHieuDialog = (props) => {

  // const resetFields = () => {
  //   setFullName("");
  //   setFullNameError("");
  //   setAddress("");
  //   setAddressError("");
  //   setEmail("");
  //   setEmailError("");
  //   setPhoneNumber("");
  //   setPhoneNumberError("");
  // };
  
  // const setInitial = (values) => {
  //   setFullName(values.name);
  //   setAddress(values.address);
  //   setEmail(values.email);
  //   setPhoneNumber(values.phoneNumber);
  // };
  
  // useEffect(() => {
  //   if (!props.isShowing) {
  //     resetFields();
  //   }
  // }, [props.isShowing]);

  // useEffect(() => {
  //   if (props.values) {
  //     setInitial(props.values);
  //   }
  // }, [props.values]);

  const [nhanhieu, setNhanHieu] = useState("")
  const [nhanhieuEror, setNhanHieuError] = useState("")

  const handleChangeNhanHieu = (e) => {
    setNhanHieu(e.target.value);
  };

  const handleChangeNhanHieuError = (currentNhanHieu) => {
    if (currentNhanHieu.length < 1){
      setNhanHieuError('Nhập tên nhãn hiệu.');}
    else{
      setNhanHieuError("")
    }
  };

  const [group, setGroup] = useState("")
  const handleChangeGroup = (e) => {
    if (e.target.value.toString() <= 45){
      setGroup(e.target.value);
    }
  };
  

  const [serviceId, setServiceId] = useState("")
  const handleChangeServiceId = (e) => {
    if (e.target.value.toString().length <= 5) {
      setServiceId(e.target.value);
    }
  };

  const [year, setYear] = useState("")
  const handleChangeYear = (e) => {
    if (e.target.value.toString().length <= 4) {
      setYear(e.target.value);
    }
  };

  const [soGCN, setSoGCN] = useState("")
  const handleChangeSoGCN = (e) => {
    setSoGCN(e.target.value);
  };
  

  return (
      <DialogBox className='dialog-box' 
      title={'Tạo đơn nhãn hiệu'} 
      isShowing={props.isShowing} 
      hide={() => {props.hide()}} 
      height='75%'
      hr
      >
        <div id='nhanhieu-fullname'>
          <TextInput disabled value={props.customer} errorMessage="" type='text' padding='0px 10px' label='Chủ đơn' placeholder={('Chủ đơn')} />
        </div>
        <div id='nhanhieu-nhanhieu'>
          <TextInput type='text' padding='0px 10px' errorMessage = {nhanhieuEror} onChange={(e) => {handleChangeNhanHieu(e);handleChangeNhanHieuError(e.target.value)}} value={nhanhieu} label='Nhãn hiệu' placeholder={('Nhãn hiệu')} />
        </div>
        <div id='nhanhieu-group'>
            <div id='nhanhieu-group-label-wrapper1' style={{'margin-bottom': '7px'}}> <label id='nhanhieu-group-label1'> <b> Nhóm sản phẩm</b></label> </div>
            <TextField type="number" onChange={(e) => handleChangeGroup(e)} value={group}/>
        </div>
        <div id='nhanhieu-date'>
          <DatePick label='Ngày nộp đơn'/>
        </div>

        <div id='nhanhieu-number'>
          <label id='nhanhieu-number-label'> <b> Số đơn</b></label>
          <div id='nhanhieu-number-group'>
            {/* <div id='nhanhieu-group-label-wrapper'> <label id='nhanhieu-group-label'> <b> Nhóm sản phẩm</b></label> </div> */}
            <TextField placeholder='Nhóm sản phẩm' type="number" disabled value={4}/>
          </div>
          <p id='slash-1'> - </p>
          <div id='nhanhieu-number-year'>
            {/* <div id='nhanhieu-year-label-wrapper'> <label id='nhanhieu-year-label'> <b> Năm</b></label> </div> */}
            <TextField placeholder='Năm' type="number" onChange={(e) => handleChangeYear(e)} value={year}/>
          </div>
          <p id='slash-2'> - </p>
          <div id='nhanhieu-number-id'>
            {/* <div id='nhanhieu-id-label-wrapper'> <label id='nhanhieu-id-label'> <b> Số đơn</b></label> </div> */}
            <TextField placeholder='Số đơn' type="number" onChange={(e) => handleChangeServiceId(e)} value={serviceId}/>
          </div>
        </div>

        <div id='nhanhieu-so-gcn'>
            <div style={{'margin-bottom': '7px'}}> 
              <label style={{color: '#6c7a99'}}> <b> Số Giấy chứng nhận</b></label> 
            </div>
            <TextField style={{width: '48%'}}type='text' onChange={(e) => {handleChangeSoGCN(e)}} value={soGCN} placeholder={('Số GCN')} />
        </div>

        <div id='nhanhieu-gcn-date'>
          <DatePick label='Ngày cấp GCN'/>
        </div>

        <div id='nhanhieu-button-save'>
          <ButtonSubmit text='Lưu' />
        </div>
        <div id='nhanhieu-button-cancel'>
          <ButtonCancel text='Huỷ' onClick={() => {props.hide()}}/>
        </div>
      </DialogBox>
  );
};

export default NhanHieuDialog;