import './index.scss'
import ButtonCreate from '../../components/ButtonCreate'
import Title from '../../components/Title'
import { useState, useEffect, useRef } from 'react'
import CustomerDialog from '../../components/CustomerDialog'
import { ToastContainer } from "react-toastify";
import Table from '../../components/Table'
import getAllCustomers from '../../apis/customer/getAllCustomers'
import ConfirmDialog from '../../components/ConfirmDialog'
import getCustomer from '../../apis/customer/getCustomer'
import deleteCustomer from '../../apis/customer/deleteCustomer'
import { CircularProgress } from '@mui/material'
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';

const CustomerScreen= (props) =>{
  const [dialogStatus, setDialogStatus] = useState("")

  const [customerList,setCustomerList] = useState([])

  const fetchData = async () => {
    const customers = await getAllCustomers();
    setCustomerList(customers);
    setIsLoading(false)
  };
  useEffect(() => {
    fetchData(); 
  }, []); 

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

    return(
        <div id='customer-screen'>{
          isLoading ?   (<Box sx={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
                          <CircularProgress />
                        </Box>) : (
          <Fade in={!isLoading} timeout={100}>
          <div>
              <Title id='customer-title' title='Quản lý khách hàng'/>

              <div className='button-add-new'>
                  <ButtonCreate onClick={() => {setDialogStatus("create");initial.current={};toggleCustomerDialog()}} text='Thêm khách hàng'/>
              </div>

              <CustomerDialog 
                id='customer-dialog-create'
                status={dialogStatus}
                initial={initial.current}
                afterSave={(res) => {
                  if (res) {
                    toggleCustomerDialog()
                    fetchData()
                  }
                }}
                isShowing={isShowingCustomerDialog} 
                hide={toggleCustomerDialog}/>

              <ConfirmDialog
                isShowing={isShowingConfirm}
                hide={toggleConfirm}
                handleConfirm={async () => {
                  const res = await deleteCustomer(customerId.current);
                  if (res){
                    toggleConfirm();
                    fetchData()
                  }
                }}
                height={'140px'}
                type={'khách hàng'}
                name={customerName.current}
                />

              <div id='customer-table-wrapper'>
                <Table 
                  columnName={['Họ và tên', 'Địa chỉ', 'Email', 'Số điện thoại']}
                  rows = {customerList}
                  handleEditButton={ async (id) => {setDialogStatus("edit");await viewCustomerInfo(id);toggleCustomerDialog(id)}}
                  handleDeleteButton={(id, name) => {toggleConfirm();setCustomerInfo(id, name)}}
                  />
                </div>
              <ToastContainer></ToastContainer>
              </div>
            </Fade>
          )}
          </div>
    )
}

export default CustomerScreen;