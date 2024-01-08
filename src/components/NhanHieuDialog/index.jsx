import './index.scss'
import DialogBox from '../DialogBox'
import DropDown from '../DropDown'
import TextInput from '../TextInput'
import ButtonSubmit from '../ButtonSubmit';
import ButtonCancel from '../ButtonCancel'
import { useState} from 'react';
import DatePick from '../DatePicker'
import { TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { useEffect,useRef } from 'react';
import dayjs from 'dayjs';

const NhanHieuDialog = (props) => {

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

  const [historyCount, setHistoryCount] = useState(0);
  const historyKey = useRef(0)

  const addHistory = () => {
    setHistoryCount(historyCount + 1);
    historyKey.current = historyKey.current + 1
    console.log('key', historyKey)

    setHistoryField((prevHistory) => [
      ...prevHistory,
      {
        key: 'history' + historyKey.current,
      },
    ]);
  };

  const [historyField, setHistoryField] = useState([]);

  const handleDeleteHistory = (historyKey) => {
    const updatedHistory = historyField.filter((item) => item.key !== historyKey);
    setHistoryCount(historyCount - 1);
    setHistoryField(updatedHistory)
  }

  const [action, setAction] = useState(null)
  const renderHistory = () => {
    return historyField.map((item) => (
      <div className='history-fields' id={item.key} key={item.key}>
          <div className='history-action'> 
            <DropDown label='Hành động' 
            initial={item.action}
            onChange={setAction}
            options={ ["Thông báo thiếu sót", "Công văn trả lời thông báo thiếu sót","Quyết định chấp nhận hợp lệ","Thông báo từ chối","Công văn trả lời thông báo từ chối","Thông báo cấp GCN","Quyết định từ chối"]}
            className='hisotry-action-dropdown'/> 
          </div>
          <div className='history-date'> 
            <DatePick
            initial={item.date}
            label='Ngày'/> 
          </div>
          <div className='history-delete'> 
            <IconButton aria-label="delete"  onClick={() => handleDeleteHistory(item.key)}><DeleteIcon /></IconButton>
          </div>
      </div>
    ));
  };
  

  const resetFields = () => {
    setNhanHieu("")
    setNhanHieuError("")
    setGroup("")
    setServiceId("")
    setYear("")
    setSoGCN("")
    setHistoryCount(0)
    setHistoryField([])
    historyKey.current = 0
    history.current = []
  }

  useEffect(resetFields, [props.isShowing])
  
  const [paperSubmitDate, setPaperSubmitDate] = useState(null)
  const [gcnDate, setGcnDate] = useState(null)

  const paperId = '4-'+ year + '-' + serviceId
  const history = useRef([])

  const getHistory = () => {

    const historyActions = Array.from(document.getElementsByClassName('history-action'))
    .map((element) => {
      return element.querySelectorAll('input')[0].value;
    })
  
    const historyDates = Array.from(document.getElementsByClassName('history-date'))
    .map((element) => {
      return element.querySelectorAll('input')[0].value
    })

    for (let i=0; i<historyActions.length; i++){
    history.current[i] = {
      "action" : historyActions[i],
      "date" : historyDates[i]
    }
    }
  }

  const setInitial = async (values) => {
    setNhanHieu(values.name)
    setGroup(values.group)
    setPaperSubmitDate(dayjs(values.paperSubmitDate))
    if (values.paperId.length > 4){
      setYear(values.paperId.split("-")[1])
      setServiceId(values.paperId.split("-")[2])
    }
    setSoGCN(values.gcnId)
    setGcnDate(dayjs(values.gcnDate))
    const c = []
    for (let i = 0; i < values.history.length; i++) {
      const mergedObject = { key: 'history' + i, ...values.history[i] };
      c.push(mergedObject);
    }
    setHistoryField(c);
    historyKey.current = values.history.length
    renderHistory();
  }

  useEffect(() => {
    if (props.workValues) {
      setInitial(props.workValues);
    }
  }, [props.workValues]);

  return (
      <DialogBox className='dialog-box' 
      title={props.title} 
      isShowing={props.isShowing} 
      hide={() => {props.hide()}} 
      height='500px'
      overflowY={'auto'}
      hr
      handleSave={props.handleSave}
      >
        <p id="nhanhieu-thong-tin-kh"><b style={{color:'#1095e6', fontSize: '17px'}}> Thông tin khách hàng </b></p>
        <div id="nhanhieu-customer-info" style={{ backgroundColor: '#dfe8f5',width:'100%', height:'150px', borderRadius: '5px',padding: '5px',paddingLeft: '20px' }}>
          <p> <b> Tên khách hàng: </b> {props.customer.name}</p>
          <p> <b> Địa chỉ: </b> {props.customer.address}</p>
          <p> <b> Số điện thoại: </b> {props.customer.phoneNumber}</p>
          <p> <b> Tên chủ đơn: </b> {props.customer.email}</p>
        </div>

        <p id="thong-tin-nh"><b style={{color:'#1095e6', fontSize: '17px'}}> Thông tin nhãn hiệu </b></p>
        <div id='nhanhieu-nhanhieu'>
          <TextInput type='text' padding='0px 10px' errorMessage = {nhanhieuEror} onChange={(e) => {handleChangeNhanHieu(e);handleChangeNhanHieuError(e.target.value)}} value={nhanhieu} label='Tên nhãn hiệu *' placeholder={('Tên nhãn hiệu')} />
        </div>
        <div id='nhanhieu-group'>
            <div id='nhanhieu-group-label-wrapper1' style={{'margin-bottom': '7px'}}> <label id='nhanhieu-group-label1'> <b> Nhóm sản phẩm</b></label> </div>
            <TextField type="number" onChange={(e) => handleChangeGroup(e)} value={group}/>
        </div>
        <div id='nhanhieu-date'>
          <DatePick onChange={(value) => {setPaperSubmitDate(value); setYear(value.year());}} value={paperSubmitDate} label='Ngày nộp đơn'/>
          {/* <p style={{color: 'red', position: 'absolute', bottom: '0px'}}> Ngày không hợp lệ</p> */}
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
            <TextField placeholder='Năm' disabled={true} type="number" onChange={(e) => handleChangeYear(e)} value={year}/>
          </div>
          <p id='slash-2'> - </p>
          <div id='nhanhieu-number-id'>
            {/* <div id='nhanhieu-id-label-wrapper'> <label id='nhanhieu-id-label'> <b> Số đơn</b></label> </div> */}
            <TextField placeholder='Số đơn' type="number" onChange={(e) => handleChangeServiceId(e)} value={serviceId}/>
          </div>
        </div>
        <div  id='nhanhieu-btn-add-history'> 
          <ButtonSubmit onClick={addHistory} text='Thêm lịch sử'/> 
        </div>
        {renderHistory()}

        <div id='gcn-block' style={{top: `${420}px`}}>
          <p id="thong-tin-gcn"><b style={{color:'#1095e6', fontSize : '17px'}}> Thông tin GCN (nếu có) </b></p>
          <div id='nhanhieu-so-gcn'>
              <div style={{'margin-bottom': '7px'}}> 
                <label style={{color: '#6c7a99'}}> <b> Số Giấy chứng nhận</b></label> 
              </div>
              <TextField style={{width: '48%'}}type='text' onChange={(e) => {handleChangeSoGCN(e)}} value={soGCN} placeholder={('Số GCN')} />
          </div>

          <div id='nhanhieu-gcn-date'>
            <DatePick label='Ngày cấp GCN' onChange={(value) => setGcnDate(value)} value={gcnDate}/>
            {/* <p style={{color: 'red', position: 'absolute', bottom: '0px'}}> Ngày không hợp lệ</p> */}
          </div>

          <div id='nhanhieu-button-save'>
            <ButtonSubmit text='Lưu' onClick={async () => { 
              getHistory(); 
              props.handleSave(props.workId, props.type, props.customerId, nhanhieu, group, paperId, paperSubmitDate, history.current, soGCN, gcnDate)}}/>
          </div>
          <div id='nhanhieu-button-cancel'>
            <ButtonCancel text='Huỷ' onClick={() => {props.hide()}}/>
          </div>
        </div>
      </DialogBox>
  );
};

export default NhanHieuDialog;