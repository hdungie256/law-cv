import './index.scss'
import ButtonCreate from '../../components/ButtonCreate'
import Title from '../../components/Title'
import Table from '../../components/Table'
import { useState, useRef, useEffect } from 'react'
import { ToastContainer} from "react-toastify";
import WorkDialog from '../../components/WorkDialog'
import NhanHieuDialog from '../../components/NhanHieuDialog';
import KDCNDialog from '../../components/KDCNDialog';
import SangCheDialog from '../../components/SangCheDialog';
import createWork from '../../apis/work/createWork';
import GPHIDialog from '../../components/GPHIDialog';
import getAllWork from '../../apis/work/getAllWork'

const ServiceScreen= () =>{

  const [workList, setWorkList] = useState([])
  const fetchData = async () => {
    const works = await getAllWork();
    setWorkList(works);
  };

  useEffect(() => {fetchData()}, [])

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

  const [isShowingCreateKDCN, setIsCreateShowingKDCN] = useState(false) 
  const toggleCreateKDCN = () => {
    setIsCreateShowingKDCN(!isShowingCreateKDCN)
  }

  const [isShowingCreateSangChe, setIsCreateShowingSangChe] = useState(false) 
  const toggleCreateSangChe = () => {
    setIsCreateShowingSangChe(!isShowingCreateSangChe)
  }

  const [isShowingCreateGPHI, setIsCreateShowingGPHI] = useState(false) 
  const toggleCreateGPHI = () => {
    setIsCreateShowingGPHI(!isShowingCreateGPHI)
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
      else if (type.current === "KDCN"){
        toggleCreateKDCN()
        setType("")
      }
      else if (type.current === "Sáng chế"){
        toggleCreateSangChe()
        setType("")
      }
      else if (type.current === "GPHI"){
        toggleCreateGPHI()
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
            <div id='work-table-wrapper'>
              <Table 
                columnName={['Chủ đơn', 'Loại', 'Tên', 'Số đơn']}
                rows = {workList}
                // handleEditButton={ (id) => {getCustomer(id);toggleEdit(id)}}
                // handleDeleteButton={(id) => {toggleConfirm();setCustomerId(id)}}
                />
            </div>
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
            handleSave={async (type, customerId, NHname, group, paperId, paperSubmitDate, history, gcnID, gcnDate) => 
              {const res = await createWork(type="Nhãn hiệu", customerId, NHname, group, paperId, paperSubmitDate, history, gcnID, gcnDate);
              if (res) {
                toggleCreateNH();
                fetchData();
              }
              }}
            />

            <KDCNDialog
            isShowing={isShowingCreateKDCN}
            hide={toggleCreateKDCN}
            customerName={customerName.current}
            customerId={customerId.current}
            handleSave={async (type, customerId, KDCNname, group, paperId, paperSubmitDate, history, gcnID, gcnDate) => 
              {createWork(type="KDCN", customerId, KDCNname, group, paperId, paperSubmitDate, history, gcnID, gcnDate);
              toggleCreateKDCN(); 
              fetchData()}}
            />

            <SangCheDialog
            isShowing={isShowingCreateSangChe}
            hide={toggleCreateSangChe}
            customerName={customerName.current}
            customerId={customerId.current}
            handleSave={async (type, customerId, SCname, group, paperId, paperSubmitDate, history, gcnID, gcnDate) => 
              {await createWork(type="Sáng chế", customerId, SCname, group="", paperId, paperSubmitDate, history, gcnID, gcnDate);
              toggleCreateSangChe();
              fetchData()}}
            />

            <GPHIDialog
            isShowing={isShowingCreateGPHI}
            hide={toggleCreateGPHI}
            customerName={customerName.current}
            customerId={customerId.current}
            handleSave={async (type, customerId, SCname, group, paperId, paperSubmitDate, history, gcnID, gcnDate) => 
              {await createWork(type="GPHI", customerId, SCname, group="", paperId, paperSubmitDate, history, gcnID, gcnDate);
              toggleCreateGPHI(); 
              fetchData()}}
            />

            <ToastContainer></ToastContainer>
        </div>
    )
}

export default ServiceScreen;