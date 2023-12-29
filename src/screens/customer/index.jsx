import './index.scss'
import ButtonCreate from '../../components/ButtonCreate'
import Title from '../../components/Title'
import { useState, useEffect, useRef } from 'react'
import CustomerDialog from '../../components/CustomerDialog'
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify";
import Table from '../../components/Table'
import getAllCustomers from '../../apis/customer/getAllCustomers'
import ConfirmDialog from '../../components/ConfirmDialog'

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

  const handleCreateCustomer = (id, fullName,address,email,phoneNumber,fullNameError,addressError,emailError,phoneNumberError) => {
  
        if (fullNameError === ""  && addressError === "" && emailError === ""  && phoneNumberError === ""){
           axios.post('http://process.env.REACT_APP_API_URL/api/v1/create-customer', {
            name: fullName,
            address: address,
            email: email,
            phoneNumber: phoneNumber
          })
          .then(async response => {
            const message = (response.data.message);
            const statusText = (response.data.statusText)
  
            if (statusText === "OK"){
            await toast.success(message, {
              position: toast.POSITION.TOP_RIGHT,
            })
            setResetFields(true)
            setIsShowingCreate(!isShowingCreate)
            fetchData()
          }
            else{
              toast.error(message, {
              position: toast.POSITION.TOP_RIGHT,
            })}
          setResetFields(false)
          })
    }} 

  const [values, setValues] = useState({})
  const getCustomer = async (id) => {
    const response = await axios.get('http://process.env.REACT_APP_API_URL/api/v1/customers/' + id)
      const data = (response.data.data);
      setValues({
        id: data['_id'],
        name: data['name'],
        address: data['address'],
        email: data['email'],
        phoneNumber: data['phoneNumber']
    })
  }

  const handleUpdateCustomer = async (id, name, email, address, phoneNumber) => {
    const response = await axios.put('http://process.env.REACT_APP_API_URL/api/v1/customers/' + id,{
      name: name,
      email: email,
      address: address,
      phoneNumber: phoneNumber
    })
      const message = (response.data.message);
      const statusText = (response.data.statusText)

      if (statusText === "OK"){
        await toast.success(message, {
            position: toast.POSITION.TOP_RIGHT,
          })
        toggleEdit()
        fetchData()
        }
      else{
        toast.error(message, {
        position: toast.POSITION.TOP_RIGHT,
      })}
  }

  const [isShowingConfirm, setIsShowingConfirm] = useState(false)
  const toggleConfirm = () => {
    setIsShowingConfirm(!isShowingConfirm)
  }

  const handleDeleteCustomer = async (id) => {
    const response = await axios.delete('http://process.env.REACT_APP_API_URL/api/v1/customers/' + id)
      const message = (response.data.message);
      const statusText = (response.data.statusText)

      if (statusText === "OK"){
        toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
        })
      toggleConfirm()
      fetchData()
      }
      else{
        toast.error(message, {
        position: toast.POSITION.TOP_RIGHT,
      })}
  }

  const customerId = useRef(null)
  const setCustomerId = (id) => {
    customerId.current = id
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
              (id, fullName,address,email,phoneNumber,fullNameError,addressError,emailError,phoneNumberError) => 
              handleCreateCustomer(null,fullName,address,email,phoneNumber,fullNameError,addressError,emailError,phoneNumberError)} 
              isShowing={isShowingCreate} 
              hide={toggleCreate}/>

            <CustomerDialog 
              id='customer-dialog-edit'
              title='Chỉnh sửa thông tin khách hàng'
              handleSave={
              (id, fullName,address,email,phoneNumber,fullNameError,addressError,emailError,phoneNumberError) => 
              handleUpdateCustomer(id, fullName,address,email,phoneNumber,fullNameError,addressError,emailError,phoneNumberError)} 
              isShowing={isShowingEdit} 
              values={values}
              hide={toggleEdit}/>

            <ConfirmDialog
              isShowing={isShowingConfirm}
              hide={toggleConfirm}
              handleConfirm={() => handleDeleteCustomer(customerId.current)}
               />

            <div id='customer-table-wrapper'>
              <Table 
                columnName={['Họ và tên', 'Địa chỉ', 'Email', 'Số điện thoại']}
                rows = {customerList}
                handleEditButton={ (id) => {getCustomer(id);toggleEdit(id)}}
                handleDeleteButton={(id) => {toggleConfirm();setCustomerId(id)}}
                />
              </div>
            <ToastContainer></ToastContainer>
        </div>
    )
}

export default CustomerScreen;