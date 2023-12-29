import TextInput from '../../components/TextInput';
import {useState} from 'react';
import './index.scss';
import Card from '../../components/Card';
import Title from '../../components/Title';
import ButtonSubmit from '../../components/ButtonSubmit';
import { faUser,faKey, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import React from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';

function LogInScreen() {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const [password, setPassword] = useState("");
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

    const [usernameError, setUsernameError] = useState("");
    const handleUsernameError = (currentUsername) =>{
        if (currentUsername.length<1){
            setUsernameError("Nhập tên đăng nhập.")
        }
        else{
            setUsernameError("")
        }
    }

    const [passwordError, setPasswordError] = useState("");
    const handlePasswordError = (currentPassword) =>{
        if (currentPassword.length<1){
            setPasswordError("Nhập mật khẩu.")
        }
        else{
            setPasswordError("")
        }
    }

    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = ()=>{
      setShowPassword(!showPassword);
    }

    const handleLogin = () => {
      handleUsernameError(username)
      handlePasswordError(password)

      if (username !== "" && password !== ""){
         axios.post('https://law-svc.onrender.com/api/v1/login', {
          username: username,
          password: password
        })
        .then(async response => {
          const message = (response.data.message);
          const statusText = (response.data.statusText)

          if (statusText === "OK"){
          await toast.success(message, {
            position: toast.POSITION.TOP_RIGHT,
          })
          navigate('../main');
        }
          else{
            toast.error(message, {
            position: toast.POSITION.TOP_RIGHT,
          })}
        })
    }}

    return (
      <div id='log-in-screen'>
        <Card>
            <Title className='title' title='Đăng nhập'/>
            <div id='username-field' className={`${usernameError} field`}>
              <TextInput padding='0px 40px' type='text'onChange = {(e) => {handleUsernameChange(e); handleUsernameError(e.target.value)}} errorMessage={usernameError} frontIcon={faUser} placeholder={('Tên đăng nhập')} />
            </div>
            <div id='password-field' className='field'>
              <TextInput padding='0px 40px' handleBackIconOnClick={handleShowPassword} type={showPassword ? 'text' : 'password'} onChange = {(e) => {handlePasswordChange(e); handlePasswordError(e.target.value)}} errorMessage={passwordError} frontIcon={faKey} backIcon={showPassword ? faEye : faEyeSlash} placeholder={('Mật khẩu')} />
            </div>
            <div id='button-wrapper'>
              <ButtonSubmit text='Đăng nhập' onClick={handleLogin}/>
            </div>
            <ToastContainer></ToastContainer>
        </Card>
      </div>
    );
  }
  
  export default LogInScreen;