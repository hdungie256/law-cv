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
import createCustomer from '../../apis/customer/createCustomer'
import updateCustomer from '../../apis/customer/updateCustomer'

const CustomerScreen= () =>{
  const [customerList,setCustomerList] = useState([])
  const [resetFields,setResetFields] = useState(false)

  const fetchData = async () => {
    const customers = await getAllCustomers();
    setCustomerList(customers);
  };
  useEffect(() => {
    fetchData(); 
  }, []); 

  const [isShowingCreate, setIsShowingCreate] = useState(false);
  const [isShowingEdit, setIsShowingEdit] = useState(false);

  const toggleCreate= () => {
      setIsShowingCreate(!isShowingCreate);
      setResetFields(!resetFields);
    };

  const toggleEdit= () => {
      setIsShowingEdit(!isShowingEdit);
    };

  const [values, setValues] = useState({})
  const viewCustomerInfo = async (id) => {
    const response = await getCustomer(id)
      if (response){
        setValues({
          id: response['_id'],
          name: response['name'],
          shortName: response['shortName'],
          address: response['address'],
          email: response['email'],
          phoneNumber: response['phoneNumber']
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

    return(
        <div id='customer-screen'>

            <Title id='customer-title' title='Quản lý khách hàng'/>

            <div className='button-add-new'>
                <ButtonCreate onClick={toggleCreate} text='Thêm khách hàng'/>
            </div>

            <CustomerDialog 
              id='customer-dialog-create'
              title='Tạo khách hàng mới'
              handleSave={
              async (id, fullName,shortName,address,email,phoneNumber,fullNameError,addressError,emailError,phoneNumberError) => {
              const res = await createCustomer(null,fullName,shortName,address,email,phoneNumber,fullNameError,addressError,emailError,phoneNumberError)
              if (res) {
                toggleCreate()
                fetchData()
              }  
            }} 
              isShowing={isShowingCreate} 
              hide={toggleCreate}/>

            <CustomerDialog 
              id='customer-dialog-edit'
              title='Chỉnh sửa thông tin khách hàng'
              handleSave={
              async (id, fullName, shortName, address,email,phoneNumber,fullNameError,addressError,emailError,phoneNumberError) => 
              {
                const res = await updateCustomer(id, fullName, shortName, address,email,phoneNumber,fullNameError,addressError,emailError,phoneNumberError)
                if (res){
                  toggleEdit();
                  fetchData();
                }
              }} 
              isShowing={isShowingEdit} 
              values={values}
              hide={toggleEdit}/>

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
              height={'60px'}
              type={'khách hàng'}
              name={customerName.current}
               />

            <div id='customer-table-wrapper'>
              <Table 
                columnName={['Họ và tên', 'Địa chỉ', 'Email', 'Số điện thoại']}
                rows = {customerList}
                handleEditButton={ (id) => {viewCustomerInfo(id);toggleEdit(id)}}
                handleDeleteButton={(id, name) => {toggleConfirm();setCustomerInfo(id, name)}}
                />
              </div>
            <ToastContainer></ToastContainer>
        </div>
    )
}

export default CustomerScreen;