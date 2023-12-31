import './index.scss'
import ButtonCreate from '../../components/ButtonCreate'
import Title from '../../components/Title'
// import Table from '../../components/Table'
import { useState, useRef, useEffect } from 'react'
import { ToastContainer,toast} from "react-toastify";
import WorkDialog from '../../components/WorkDialog'
import NhanHieuDialog from '../../components/NhanHieuDialog';
import axios from 'axios';

const ServiceScreen= () =>{

  const type = useRef("")
  const setType = (newType) =>{
      type.current = newType
  }

  const customerName = useRef("")
  const customerId = useRef("")
  const setCustomerName = (newName) =>{
    customerName.current = newName
  }
  const setCustomerId = (newId) => {
    customerId.current=newId
  }

  const [isShowingCreate, setIsShowingCreate] = useState(false);
  const toggleCreate = () => {
    setIsShowingCreate(!isShowingCreate);
  };

  const [isShowingCreateNH, setIsCreateShowingNH] = useState(false) 
  const toggleCreateNH = () => {
      setIsCreateShowingNH(!isShowingCreateNH)
  }

  const [nameErrorMessage, setNameErrorMessage] = useState("")
  const [typeErrorMessage, setTypeErrorMessage] = useState("")

  const handleNext = (ntype, customer) => {
    if (customer===""){
      setNameErrorMessage("Chọn chủ đơn")
    }
    else {
      setNameErrorMessage("")
    }

    if (ntype===""){
      setTypeErrorMessage("Chọn loại")
    }
    else{
      setTypeErrorMessage("")
    }
    
    if (customer !== "" && ntype !== ""){
      toggleCreate();
      setType(ntype)
      setCustomerName(customer.label)
      setCustomerId(customer.key)
      if (type.current === 'Nhãn hiệu'){
        toggleCreateNH()
        setType("")
      }
    }
  }

  useEffect( () => {
    setNameErrorMessage("")
    setTypeErrorMessage("")
  }, [isShowingCreate])

    return(
        <div id='service-screen'>
            <div id='title-wrapper'>
                <Title className='title' title='Quản lý công việc'/>
            </div>
            <div id='button-add-service'>
                <ButtonCreate onClick={toggleCreate} text='Thêm công việc'/>
            </div>
            {/* <div id='work-table-wrapper'>
              <Table 
                columnName={['Chủ đơn', 'Loại', 'Tên đơn', 'Số đơn', 'Ngày nộp đơn', 'Ngày tiếp theo']}
                rows = {customerList}
                handleEditButton={ (id) => {getCustomer(id);toggleEdit(id)}}
                handleDeleteButton={(id) => {toggleConfirm();setCustomerId(id)}}
                />
            </div> */}
            <WorkDialog
            title='Tạo công việc mới'
            id='work-dialog-create'
            isShowing={isShowingCreate}
            hide={toggleCreate}
            handleNext={handleNext}
            nameErrorMessage={nameErrorMessage}
            typeErrorMessage={typeErrorMessage}
            />

            <NhanHieuDialog
            isShowing={isShowingCreateNH}
            hide={toggleCreateNH}
            customerName={customerName.current}
            customerId={customerId.current}
            handleSave={(customerId, NHname, group, paperId, paperSubmitDate, history, gcnID, gcnDate) => 
              {toggleCreateNH(); createNH(customerId, NHname, group, paperId, paperSubmitDate, history, gcnID, gcnDate)}}
            />

            <ToastContainer></ToastContainer>
        </div>
    )
}

export default ServiceScreen;

const createNH = (customerId, NHname, group, paperId, paperSubmitDate, history, gcnID, gcnDate) => {
  
  const paperSubmitDateF = paperSubmitDate.toLocaleString('vi-VN', { year: 'numeric', month: '2-digit', day: '2-digit' });
  const gcnDateF = gcnDate.toLocaleString('vi-VN', { year: 'numeric', month: '2-digit', day: '2-digit' });

  console.log(customerId, NHname, group, paperId, paperSubmitDateF, history, gcnID, gcnDateF)

  axios.post(process.env.REACT_APP_API_URL + 'create-work', {
    customerId: customerId,
    name: NHname,
    type: 'NH',
    group: group,
    paperId: paperId,
    paperSubmitDate: paperSubmitDate,
    history: history,
    gcnID: gcnID,
    gcnDate: gcnDate
  })
  .then(async response => {
    const message = (response.data.message);
    const statusText = (response.data.statusText)

    if (statusText === "OK"){
    await toast.success(message, {
      position: toast.POSITION.TOP_RIGHT,
    })
    }

    else{
      toast.error(message, {
      position: toast.POSITION.TOP_RIGHT,
    })}
  })
}