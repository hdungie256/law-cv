import './index.scss'
import getCustomer from '../../apis/customer/getCustomer'
import ButtonCreate from '../../components/ButtonCreate'
import ConfirmDialog from '../../components/ConfirmDialog';
import Table from '../../components/Table'
import { useState, useRef, useEffect } from 'react'
import { ToastContainer} from "react-toastify";
import WorkDialog from '../../components/WorkDialog'
import ThamDinhDialog from '../../components/ThamDinhDialog';
import SauCapVBDialog from '../../components/SauCapVBDialog';
import getAllWork from '../../apis/work/getAllWork'
import getWork from '../../apis/work/getWork'
import changeWorkStatus from '../../apis/work/changeWorkStatus'
import { CircularProgress } from '@mui/material'
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box'
import MadridDialog from '../../components/MadridDialog'
import {Grid} from '@mui/material';
import SearchBar from '../../components/SearchBar';
import InfoDialog from '../../components/InfoDialog';
import LoadingDialog from '../../components/LoadingDialog';

const ServiceScreen= () =>{
  const [isEditting, setIsEditting] = useState(false)

  const [workList, setWorkList] = useState([])
  const fetchData = async () => {
    const works = await getAllWork();
    setWorkList(works);
    setIsLoading(false)
  };

  useEffect(() => {fetchData()}, [])

  const type = useRef("")
  const setType = (newType) =>{
      type.current = newType
  }

  const customerId = useRef("")

  const [isShowingInfo, setIsShowingInfo] = useState(false);
  const toggleInformation = () => {
    setIsShowingInfo(!isShowingInfo);
  };

  const [isShowingCreate, setIsShowingCreate] = useState(false);
  const toggleCreate = () => {
    setIsShowingCreate(!isShowingCreate);
  };

  const [isShowingThamDinhDialog, setIsShowingThamDinhDialog] = useState(false) 
  const toggleThamDinhDialog = () => {
    setIsShowingThamDinhDialog(!isShowingThamDinhDialog)
  }

  const [isShowingSauCapVB, setIsShowingSauCapVB] = useState(false) 
  const toggleSauCapVBDialog = () => {
    setIsShowingSauCapVB(!isShowingSauCapVB)
  }

  const [isShowingMadrid, setIsShowingMadrid] = useState(false) 
  const toggleMadridDialog = () => {
    setIsShowingMadrid(!isShowingMadrid)
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
    setIsLoadingDialog(true)
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
      thisWork.current = {}

      setIsLoadingDialog(false)

      if (ntype.includes('Thẩm định')){
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
      else if (ntype === 'Gia hạn'){
        toggleSauCapVBDialog()
        setSauCapVBType('Gia hạn')
      }
      else if (ntype === 'Sửa đổi'){
        toggleSauCapVBDialog()
        setSauCapVBType('Sửa đổi')
      }
      else if (ntype === 'Cấp lại'){
        toggleSauCapVBDialog()
        setSauCapVBType('Cấp lại')
      }
      else if (ntype === 'Li xăng - Chuyển nhượng'){
        toggleSauCapVBDialog()
        setSauCapVBType('Li xăng - Chuyển nhượng')
      }
      else{
        toggleMadridDialog()
      }
    }
  }

  useEffect( () => {
    setNameErrorMessage("")
    setTypeErrorMessage("")
  }, [isShowingCreate])

  const gcnIdForDialog = useRef('')

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
  const [sauCapVBType, setSauCapVBType] = useState("")

  const handleSearch = async (inputValue) => {
    setIsLoading(true);
    const searchResult = await getAllWork(inputValue);
    setWorkList(searchResult);
    setIsLoading(false);
  };

  const sameVBBH = useRef([{gcnId: null}])

  const [isLoadingDialog, setIsLoadingDialog] = useState(false)
  const [newStatus, setNewStatus] = useState(null)

    return(
        <div id='service-screen'>
            <div style={{height: '95px', display: 'flex', alignItems:'center'}}>
              <Grid container>
                <Grid item md={0.3}/>
                <Grid item md={9.9}>
                  <div style={{display: 'flex', alignItems: 'left', width: '95%'}}>
                  <SearchBar 
                  placeholder='Tìm kiếm theo tên chủ đơn, tên đơn, số đơn, số VBBH'
                  handleSearch={handleSearch}
                  />
                  </div>
                </Grid>
                <Grid item md={1.5}>
                  <div style={{display: 'flex', justifyContent: 'right', alignItems: 'center'}}>
                    <div id='button-add-service'>
                      <ButtonCreate onClick={toggleCreate} text='Thêm công việc'/>
                    </div>
                  </div>
                </Grid>
                <Grid item md={0.3}/>

              </Grid>
          </div>
          {isLoading ?   (<Box sx={{ display: 'flex', height: '80%', alignItems: 'center', justifyContent: 'center'}}>
                          <CircularProgress />
                        </Box>) : (
          <Fade in={!isLoading} timeout={100}>
            <div>
              <LoadingDialog
              isShowing={isLoadingDialog}/>


          <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
            <div id='work-table-wrapper'>
              <Table 
                onClick={async (id) => {
                  setIsLoadingDialog(true)
                  const w = await getWork(id)
                  thisCustomer.current = await getCustomer(w.customerId)
                  thisWork.current = w; 
                  if (w.gcnId){
                  const workWithSameVBBH = await getAllWork(w.gcnId)
                  sameVBBH.current = workWithSameVBBH;
                  console.log(workWithSameVBBH[0])
                  gcnIdForDialog.current = w.gcnId
                  }
                  else{
                    sameVBBH.current = [w]
                    gcnIdForDialog.current = ''
                  }
                  setIsLoadingDialog(false)
                  toggleInformation();}
                }
                columnName={['Chủ đơn', 'Loại', 'Tên', 'Số đơn','Ngày nộp đơn', 'Số VBBH', 'Ngày cấp VBBH','Trạng thái']}
                rows = {workList}
                handleEditButton={ async (id) => {
                  setIsLoadingDialog(true)
                  const w = await getWork(id)
                  thisCustomer.current = await getCustomer(w.customerId)
                  thisWork.current = w
                  setIsEditting(true)
                  setIsLoadingDialog(false)
                  if (w.type.includes('Thẩm định') || w.type.includes('ĐK')){
                    if (w.type.includes('nhãn hiệu')){
                      toggleThamDinhDialog()
                      setThamDinhType('nhãn hiệu')
                    }
                    else if (w.type.includes('KDCN')){
                      toggleThamDinhDialog()
                      setThamDinhType('KDCN')
                    }
                    else if (w.type.includes('sáng chế')){
                      toggleThamDinhDialog()
                      setThamDinhType('sáng chế')
                    }
                    else if (w.type.includes('GPHI')){
                      toggleThamDinhDialog()
                      setThamDinhType('GPHI')
                    }
                    else if (w.type.includes('ĐK Nhãn hiệu Quốc tế')){
                      toggleMadridDialog(true)
                    }
                  }
                  else if (w.type === 'Gia hạn'){
                    toggleSauCapVBDialog()
                    setSauCapVBType('Gia hạn')
                  }
                  else if (w.type === 'Sửa đổi'){
                    toggleSauCapVBDialog()
                    setSauCapVBType('Sửa đổi')
                  }
                  else if (w.type === 'Cấp lại'){
                    toggleSauCapVBDialog()
                    setSauCapVBType('Cấp lại')
                  }
                  else if (w.type === 'Li xăng - Chuyển nhượng'){
                    toggleSauCapVBDialog()
                    setSauCapVBType('Li xăng - Chuyển nhượng')
                  }
                }}
                handleDeleteButton={async (wid,wname) => {
                  const w = await getWork(wid)
                  thisWork.current = w
                  toggleConfirm();
                }}
                getNewStatus={(oldStatus)=>{
                  if (oldStatus === "Hoàn thành"){
                    setNewStatus("Chưa hoàn thành")
                  }
                  else{
                    setNewStatus("Hoàn thành")
                  }
                }}
                />
            </div>
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

          <SauCapVBDialog
            edit={isEditting}
            type={sauCapVBType}
            id='dialog-saucapvb'
            isShowing={isShowingSauCapVB}
            hide={toggleSauCapVBDialog}
            customer={thisCustomer.current}
            customerId={thisCustomer.current._id}
            workValues={thisWork.current}
            workId={thisWork.current._id}
            afterSave={(res) => {
                if (res) {
                  toggleSauCapVBDialog();
                  fetchData();
                }
              }}
            />

            { isShowingInfo && <InfoDialog
            isShowing={isShowingInfo}
            hide={toggleInformation}
            customer={thisCustomer.current}
            customerId={thisCustomer.current._id}
            workValues={sameVBBH.current}
            workId={thisWork.current._id}
            gncId={gcnIdForDialog.current}
            />}

            <MadridDialog
              edit={isEditting}
              type={'Đăng ký nhãn hiệu quốc tế'}
              id='dialog-madrid'
              isShowing={isShowingMadrid}
              hide={toggleMadridDialog}
              customer={thisCustomer.current}
              customerId={thisCustomer.current._id}
              workValues={thisWork.current}
              workId={thisWork.current._id}
              afterSave={(res) => {
                  if (res) {
                    toggleMadridDialog();
                    fetchData();
                  }
                }}
            />

            <ConfirmDialog
              isShowing={isShowingConfirm}
              hide={toggleConfirm}
              handleConfirm={async () => {
                toggleConfirm();
                setIsLoadingDialog(true)
                const res = await changeWorkStatus(thisWork.current._id, newStatus);
                if (res){
                  setIsLoadingDialog(false)
                  fetchData()
                }
              }}
              height={'28%'}
              type={'đơn hàng'}
              name={`${thisWork.current.name} (${thisWork.current.customerName})`}
              newStatus={newStatus}
              />

            <ToastContainer></ToastContainer>
            </div>
            </Fade>
                        )}
        </div>
    )
}

export default ServiceScreen;