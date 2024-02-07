import './index.scss'
import ButtonCreate from '../../components/ButtonCreate'
import SearchBar from '../../components/SearchBar'
import { useState, useEffect, useRef } from 'react'
import CustomerDialog from '../../components/CustomerDialog'
import { ToastContainer } from "react-toastify";
import Table from '../../components/Table'
import getAllCustomers from '../../apis/customer/getAllCustomers'
import ConfirmDialog from '../../components/ConfirmDialog'
import getCustomer from '../../apis/customer/getCustomer'
import changeCustomerStatus from '../../apis/customer/changeCustomerStatus'
import { CircularProgress, Grid } from '@mui/material'
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';
import LoadingDialog from '../../components/LoadingDialog'

const CustomerScreen= (props) =>{
  const [isLoadingDialog, setIsLoadingDialog] = useState(false)

  const [dialogStatus, setDialogStatus] = useState("")

  const [customerList, setCustomerList] = useState([])

  const fetchData = async (reload) => {
    if (!sessionStorage.getItem("customerData")){
      setIsLoading(true)
    }

    if (reload || !sessionStorage.getItem("customerData")) {
        const data = await getAllCustomers();
        sessionStorage.setItem('customerData', JSON.stringify(data));
        setCustomerList(JSON.parse(sessionStorage.getItem("customerData")));
    } else {
      const storedData = sessionStorage.getItem("customerData");
      setCustomerList(JSON.parse(storedData));
    }
    setIsLoading(false);
  };  
  
  useEffect(() => {fetchData(false)}, [])

  const handleSearch = async (inputValue) => {
    setIsLoading(true);
    const searchResult = await getAllCustomers(inputValue);
    setCustomerList(searchResult);
    setIsLoading(false);
  };

  const [isShowingCustomerDialog, setIsShowingCustomerDialog] = useState(false);

  const toggleCustomerDialog= () => {
    setIsShowingCustomerDialog(!isShowingCustomerDialog);
    };

  const initial = useRef({})
  const viewCustomerInfo = async (id) => {
    const response = await getCustomer(id)
      if (response){
        initial.current = ({
          id: response['_id'],
          customerName: response['customerName'],
          customerShortName: response['customerShortName'],
          customerAddress: response['customerAddress'],
          customerEmail: response['customerEmail'],
          customerPhoneNumber: response['customerPhoneNumber'],
          curatorName: response['curatorName'],
          curatorTitle: response['curatorTitle'],
          curatorPhoneNumber: response['curatorPhoneNumber'],
          curatorEmail: response['curatorEmail'],
      })
    }
  }

  const [isShowingConfirm, setIsShowingConfirm] = useState(false)
  const toggleConfirm = () => {
    setIsShowingConfirm(!isShowingConfirm)
  }

  const customerId = useRef(null)
  const customerName = useRef(null)
  const setCustomerInfo = (id, name) => {
    customerId.current = id
    customerName.current = name
  }

  const [isLoading, setIsLoading] = useState(true)
  const [newStatus, setNewStatus] = useState(null)

    return(
        <div id='customer-screen'>

          <LoadingDialog isShowing={isLoadingDialog}/>

          <div style={{height: '95px', display: 'flex', alignItems:'center'}}>
              <Grid container>
                <Grid item md={0.3}/>
                <Grid item md={9.9}>
                  <div style={{display: 'flex', justifyContent: 'left', width: '95%', backgroundColor: 'inherit'}}>
                  <SearchBar 
                  placeholder='Tìm kiếm theo tên khách hàng, địa chỉ, email, SĐT khách hàng, tên người phụ trách, email người phụ trách, SĐT người phụ trách.'
                  handleSearch={handleSearch}/>
                  </div>
                </Grid>
                <Grid item md={1.5}>
                    <div className='button-add-new' style={{display: 'flex', justifyContent: 'right', width: '100%'}}>
                      <ButtonCreate onClick={() => {setDialogStatus("create");initial.current={};toggleCustomerDialog()}} text='Thêm khách hàng'/>
                    </div>
                </Grid>
                <Grid item md={0.3}/>

              </Grid>
          </div>

          {
          isLoading ?   (<Box sx={{ display: 'flex', height: '80%', alignItems: 'center', justifyContent: 'center'}}>
                          <CircularProgress />
                        </Box>) : (
          <Fade in={!isLoading} timeout={100}>
          <div>

              <CustomerDialog 
                id='customer-dialog-create'
                status={dialogStatus}
                initial={initial.current}
                afterSave={async (res) => {
                  if (res) {
                    toggleCustomerDialog()
                    fetchData(true)
                  }
                }}
                isShowing={isShowingCustomerDialog} 
                hide={toggleCustomerDialog}/>

              <ConfirmDialog
                isShowing={isShowingConfirm}
                hide={toggleConfirm}
                handleConfirm={async () => {
                  toggleConfirm();
                  setIsLoadingDialog(true)
                  const res = await changeCustomerStatus(customerId.current, newStatus);
                  if (res){
                    setIsLoadingDialog(false)
                    fetchData(true)
                  }
                }}
                height={'28%'}
                type={'khách hàng'}
                name={customerName.current}
                newStatus={newStatus}
                />

              <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                <div id='customer-table-wrapper'>
                  <Table 
                    columnName={['Họ và tên', 'Địa chỉ', 'Email', 'Số điện thoại', 'Trạng thái']}
                    rows = {customerList}
                    handleEditButton={ async (id) => {
                      setIsLoadingDialog(true);
                      setDialogStatus("edit");
                      await viewCustomerInfo(id);
                      setIsLoadingDialog(false);
                      toggleCustomerDialog(id)
                    }}
                    handleDeleteButton={(id, name) => {toggleConfirm();setCustomerInfo(id, name)}}
                    getNewStatus={(oldStatus)=>{
                      if (oldStatus === "Đã kích hoạt"){
                        setNewStatus("Chưa kích hoạt")
                      }
                      else{
                        setNewStatus("Đã kích hoạt")
                      }
                    }}
                    />
                  </div>
                </div>
              </div>
            </Fade>
          )}
          <ToastContainer></ToastContainer>
          </div>
    )
}

export default CustomerScreen;