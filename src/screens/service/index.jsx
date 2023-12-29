import './index.scss'
import ButtonCreate from '../../components/ButtonCreate'
import Title from '../../components/Title'
// import Table from '../../components/Table'
import { useState, useRef, useEffect } from 'react'
import { ToastContainer } from "react-toastify";
import WorkDialog from '../../components/WorkDialog'
import NhanHieuDialog from '../../components/NhanHieuDialog';

const CustomerScreen= () =>{

  const type = useRef("")
  const setType = (newType) =>{
      type.current = newType
  }

  const customerName = useRef("")
  const setCustomerName = (newName) =>{
    customerName.current = newName
  }

  const [isShowingCreate, setIsShowingCreate] = useState(false);
  const toggleCreate = () => {
    setIsShowingCreate(!isShowingCreate);
  };

  const [isShowingNH, setIsShowingNH] = useState(false) 
  const toggleNH = () => {
      setIsShowingNH(!isShowingNH)
  }

  const [nameErrorMessage, setNameErrorMessage] = useState("")
  const [typeErrorMessage, setTypeErrorMessage] = useState("")

  const handleNext = (ntype, name) => {
    if (name===""){
      setNameErrorMessage("Chọn chủ đơn")
    }
    if (ntype===""){
      setTypeErrorMessage("Chọn loại")
      console.log(type, 'type')
      console.log(typeErrorMessage, 'typeErrorMessage')
    }
    else{
      toggleCreate();
      setType(ntype)
      setCustomerName(name)
      if (type.current === 'Nhãn hiệu'){
        toggleNH()
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
            isShowing={isShowingNH}
            hide={toggleNH}
            customer={customerName.current}
            />

            <ToastContainer></ToastContainer>
        </div>
    )
}

export default CustomerScreen;