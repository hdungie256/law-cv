import './index.scss'
import ButtonCreate from '../../components/ButtonCreate'
import ConfirmDialog from '../../components/ConfirmDialog';
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
import getCustomer from '../../apis/customer/getCustomer'
import getWork from '../../apis/work/getWork'
import deleteWork from '../../apis/work/deleteWork'
import updateWork from '../../apis/work/updateWork'

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

  const customerId = useRef("")

  const [isShowingCreate, setIsShowingCreate] = useState(false);
  const toggleCreate = () => {
    setIsShowingCreate(!isShowingCreate);
  };

  const [isShowingCreateNH, setIsCreateShowingNH] = useState(false) 
  const toggleCreateNH = () => {
      setIsCreateShowingNH(!isShowingCreateNH)
  }

  const [isShowingEditNH, setIsEditShowingNH] = useState(false) 
  const toggleEditNH = () => {
      setIsEditShowingNH(!isShowingEditNH)
  }

  const [isShowingEditKDCN, setIsEditShowingKDCN] = useState(false) 
  const toggleEditKDCN = () => {
      setIsEditShowingKDCN(!isShowingEditKDCN)
  }

  const [isShowingEditSC, setIsEditShowingSC] = useState(false) 
  const toggleEditSC = () => {
      setIsEditShowingSC(!isShowingEditSC)
  }

  const [isShowingEditGPHI, setIsEditShowingGPHI] = useState(false) 
  const toggleEditGPHI = () => {
      setIsEditShowingGPHI(!isShowingEditGPHI)
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

  const [isShowingConfirm, setIsShowingConfirm] = useState(false)
  const toggleConfirm = () => {
    setIsShowingConfirm(!isShowingConfirm)
  }

  const [nameErrorMessage, setNameErrorMessage] = useState("")
  const [typeErrorMessage, setTypeErrorMessage] = useState("")
  const thisCustomer = useRef({name:"", address:"", email:"", phoneNumber:""})

  const handleNext = async (ntype, customer) => {
    if (customer===""){
      setNameErrorMessage("Chọn chủ đơn")
      return false
    }
    else {
      setNameErrorMessage("")
    }

    if (ntype===""){
      setTypeErrorMessage("Chọn loại")
      return false
    }
    else{
      setTypeErrorMessage("")
    }
    
    if (customer !== "" && ntype !== ""){
      toggleCreate();
      setType(ntype)

      const cus = await getCustomer(customer.key)
      thisCustomer.current = cus
      customerId.current = customer.key

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

  const thisWork = useRef({
    _id: "",
    customerId: "",
    customerName: "",
    customerAddress: "",
    customerPhoneNumber: "",
    customerEmail: "",
    type: "",
    name: "",
    group: "",
    paperId: "4--",
    paperSubmitDate: "",
    history: [],
    gcnDate: null,
  })

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
                handleEditButton={ async (id) => {
                  const w = await getWork(id);
                  thisCustomer.current = {
                    name: w.customerName,
                    address: w.customerAddress,
                    email: w.customerEmail,
                    phoneNumber: w.customerPhoneNumber
                  }
                  thisWork.current = w
                  if (w.type === "Nhãn hiệu"){
                    toggleEditNH()
                  }
                  else if (w.type === "KDCN"){
                    toggleEditKDCN()
                  }
                  else if (w.type === "Sáng chế"){
                    toggleEditSC()
                  }
                  else{
                    toggleEditGPHI()
                  }
                }}
                handleDeleteButton={async (wid,wname) => {
                  const w = await getWork(wid)
                  thisWork.current = w
                  toggleConfirm();
                }}
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
            id='dialog-nhanhieu-create'
            title='Tạo đơn nhãn hiệu'
            isShowing={isShowingCreateNH}
            hide={toggleCreateNH}
            customer={thisCustomer.current}
            customerId={customerId.current}
            workId={null}
            handleSave={async (id,type, cusId, NHname, group, paperId, paperSubmitDate, history, gcnID, gcnDate) => 
              {const res = await createWork(id,type="Nhãn hiệu", cusId, NHname, group, paperId, paperSubmitDate, history, gcnID, gcnDate);
              if (res) {
                toggleCreateNH();
                fetchData();
              }
              }}
            />

            <NhanHieuDialog
            id='dialog-nhanhieu-edit'
            title='Chỉnh sửa đơn nhãn hiệu'
            isShowing={isShowingEditNH}
            hide={toggleEditNH}
            customer={thisCustomer.current}
            customerId={thisWork.current.customerId}
            workValues={thisWork.current}
            workId={thisWork.current._id}
            handleSave={async (id,type, cusId, NHname, group, paperId, paperSubmitDate, history, gcnID, gcnDate) => 
              {const res = await updateWork(id, type="Nhãn hiệu", cusId, NHname, group, paperId, paperSubmitDate, history, gcnID, gcnDate);
              if (res) {
                toggleEditNH();
                fetchData();
              }
              }}
            />

            <KDCNDialog
            id='dialog-kdcn-create'
            title='Tạo đơn KDCN'
            isShowing={isShowingCreateKDCN}
            hide={toggleCreateKDCN}
            customer={thisCustomer.current}
            customerId={customerId.current}
            workId={thisWork.current._id}
            handleSave={async (id, type, customerId, KDCNname, group, paperId, paperSubmitDate, history, gcnID, gcnDate) => 
              {const res = await createWork(id, type="KDCN", customerId, KDCNname, group, paperId, paperSubmitDate, history, gcnID, gcnDate);
              if (res){
                toggleCreateKDCN(); 
                fetchData()}}
              }
            />

            <KDCNDialog
            id='dialog-kdcn-edit'
            title='Chỉnh sửa đơn KDCN'
            isShowing={isShowingEditKDCN}
            hide={toggleEditKDCN}
            customer={thisCustomer.current}
            customerId={thisWork.current.customerId}
            workValues={thisWork.current}
            workId={thisWork.current._id}
            handleSave={async (id,type, cusId, NHname, group, paperId, paperSubmitDate, history, gcnID, gcnDate) => 
              {const res = await updateWork(id, type="KDCN", cusId, NHname, group, paperId, paperSubmitDate, history, gcnID, gcnDate);
              if (res) {
                toggleEditKDCN();
                fetchData();
              }
              }}
            />

            <SangCheDialog
            id='dialog-sc-create'
            title='Tạo đơn sáng chế'
            isShowing={isShowingCreateSangChe}
            hide={toggleCreateSangChe}
            customer={thisCustomer.current}
            customerId={customerId.current}
            workId={thisWork.current._id}
            handleSave={async (id, type, customerId, SCname, group, paperId, paperSubmitDate, history, gcnID, gcnDate) => 
              {const res = await createWork(id, type="Sáng chế", customerId, SCname, group="", paperId, paperSubmitDate, history, gcnID, gcnDate);
              if (res){
                toggleCreateSangChe();
                fetchData()}}
              }
            />

          <SangCheDialog
            id='dialog-sc-edit'
            title='Chỉnh sửa đơn sáng chế'
            isShowing={isShowingEditSC}
            hide={toggleEditSC}
            customer={thisCustomer.current}
            customerId={thisWork.current.customerId}
            workValues={thisWork.current}
            workId={thisWork.current._id}
            handleSave={async (id,type, cusId, NHname, group, paperId, paperSubmitDate, history, gcnID, gcnDate) => 
              {const res = await updateWork(id, type="Sáng chế", cusId, NHname, group, paperId, paperSubmitDate, history, gcnID, gcnDate);
              if (res) {
                toggleEditSC();
                fetchData();
              }
              }}
            />

            <GPHIDialog
            id='dialog-gphi-create'
            title='Tạo đơn GPHI'
            isShowing={isShowingCreateGPHI}
            hide={toggleCreateGPHI}
            customer={thisCustomer.current}
            customerId={customerId.current}
            handleSave={async (type, customerId, SCname, group, paperId, paperSubmitDate, history, gcnID, gcnDate) => 
              {const res = await createWork(type="GPHI", customerId, SCname, group="", paperId, paperSubmitDate, history, gcnID, gcnDate);
              if (res){
                toggleCreateGPHI(); 
                fetchData()}}
              }
            />

            <GPHIDialog
              id='dialog-gphi-edit'
              title='Chỉnh sửa đơn GPHI'
              isShowing={isShowingEditGPHI}
              hide={toggleEditGPHI}
              customer={thisCustomer.current}
              customerId={thisWork.current.customerId}
              workValues={thisWork.current}
              workId={thisWork.current._id}
              handleSave={async (id,type, cusId, NHname, group, paperId, paperSubmitDate, history, gcnID, gcnDate) => 
                {const res = await updateWork(id, type="gphi", cusId, NHname, group, paperId, paperSubmitDate, history, gcnID, gcnDate);
                if (res) {
                  toggleEditGPHI();
                  fetchData();
                }
                }}
            />

            <ConfirmDialog
              isShowing={isShowingConfirm}
              hide={toggleConfirm}
              handleConfirm={async () => {
                const res = await deleteWork(thisWork.current._id);
                if (res){
                  toggleConfirm();
                  fetchData()
                }
              }}
              height={'60px'}
              type={'đơn hàng'}
              name={`${thisWork.current.name} (${thisWork.current.customerName})`}
              />

            <ToastContainer></ToastContainer>
        </div>
    )
}

export default ServiceScreen;