import './index.scss'
import getCustomer from '../../apis/customer/getCustomer'
import ButtonCreate from '../../components/ButtonCreate'
import ConfirmDialog from '../../components/ConfirmDialog';
import Title from '../../components/Title'
import Table from '../../components/Table'
import { useState, useRef, useEffect } from 'react'
import { ToastContainer} from "react-toastify";
import WorkDialog from '../../components/WorkDialog'
import ThamDinhDialog from '../../components/ThamDinhDialog';
import getAllWork from '../../apis/work/getAllWork'
import getWork from '../../apis/work/getWork'
import deleteWork from '../../apis/work/deleteWork'
import { CircularProgress } from '@mui/material'
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box'

const ServiceScreen= () =>{
  const [isEditting, setIsEditting] = useState(false)

  const [workList, setWorkList] = useState([])
  const fetchData = async () => {
    const works = await getAllWork();
    setWorkList(works);
    console.log(workList)
    setIsLoading(false)
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

  const [isShowingThamDinhDialog, setIsShowingThamDinhDialog] = useState(false) 
  const toggleThamDinhDialog = () => {
    setIsShowingThamDinhDialog(!isShowingThamDinhDialog)
  }

  const [isShowingConfirm, setIsShowingConfirm] = useState(false)
  const toggleConfirm = () => {
    setIsShowingConfirm(!isShowingConfirm)
  }

  const [nameErrorMessage, setNameErrorMessage] = useState("")
  const [typeErrorMessage, setTypeErrorMessage] = useState("")
  const thisCustomer = useRef({})

  const [isLoading,setIsLoading] = useState(true)

  const handleNext = async (ntype, customer) => {
    setIsEditting(false)
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

      thisCustomer.current = await getCustomer(customer.key)
      customerId.current = customer.key

      if (ntype.includes('Thẩm định')){
        thisWork.current = {}
        toggleThamDinhDialog()
        if (ntype.includes('nhãn hiệu')){
          setThamDinhType('nhãn hiệu')
        }
        else if (ntype.includes('KDCN')){
          setThamDinhType('KDCN')
        }
        else if (ntype.includes('sáng chế')){
          setThamDinhType('sáng chế')
        }
        else if (ntype.includes('GPHI')){
          setThamDinhType('GPHI')
        }
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

  const [thamDinhType, setThamDinhType] = useState("")

    return(
        <div id='service-screen'>
          {isLoading ?   (<Box sx={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
                          <CircularProgress />
                        </Box>) : (
          <Fade in={!isLoading} timeout={100}>
            <div>
            <div id='title-wrapper'>
                <Title className='title' title='Quản lý công việc'/>
            </div>
            <div id='button-add-service'>
                <ButtonCreate onClick={toggleCreate} text='Thêm công việc'/>
            </div>
            <div id='work-table-wrapper'>
              <Table 
                columnName={['Chủ đơn', 'Loại', 'Tên', 'Số đơn','Ngày nộp đơn', 'Số VBBH', 'Ngày cấp VBBH']}
                rows = {workList}
                handleEditButton={ async (id) => {

                  const w = await getWork(id)
                  thisCustomer.current = await getCustomer(w.customerId)
                  thisWork.current = w
                  setIsEditting(true)
                  if (w.type.includes('Thẩm định')){
                    toggleThamDinhDialog()
                    if (w.type.includes('nhãn hiệu')){
                      setThamDinhType('nhãn hiệu')
                    }
                    else if (w.type.includes('KDCN')){
                      setThamDinhType('KDCN')
                    }
                    else if (w.type.includes('sáng chế')){
                      setThamDinhType('sáng chế')
                    }
                    else if (w.type.includes('GPHI')){
                      setThamDinhType('GPHI')
                    }
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

            <ThamDinhDialog
            edit={isEditting}
            type={thamDinhType}
            id='dialog-nhanhieu-edit'
            title='Chỉnh sửa đơn nhãn hiệu'
            isShowing={isShowingThamDinhDialog}
            hide={toggleThamDinhDialog}
            customer={thisCustomer.current}
            customerId={thisCustomer.current._id}
            workValues={thisWork.current}
            workId={thisWork.current._id}
            afterSave={(res) => {
                if (res) {
                  toggleThamDinhDialog();
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
              height={'130px'}
              type={'đơn hàng'}
              name={`${thisWork.current.name} (${thisWork.current.customerName})`}
              />

            <ToastContainer></ToastContainer>
            </div>
            </Fade>
                        )}
        </div>
    )
}

export default ServiceScreen;