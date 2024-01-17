import TextInput from '../../components/TextInput';
import {useState} from 'react';
import './index.scss';
import Card from '../../components/Card';
import Title from '../../components/Title';
import ButtonSubmit from '../../components/ButtonSubmit';
import { faUser,faKey, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import logIn from '../../apis/account/logIn';

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

    const handleLogin = async () => {
      handleUsernameError(username)
      handlePasswordError(password)

      setIsButtonDisabled(true)
      setButtonText('Đang đăng nhập...')
      console.log('true', true)

      if (usernameError || passwordError) {
        setIsButtonDisabled(false)
        setButtonText('Đăng nhập')
        console.log('false', false)
        return;
      }

      const res = await logIn(username, password)
      if (res){
        navigate('../main')
      }
    }

    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [buttonText, setButtonText] = useState('Đăng nhập');

    return (
      <div id='log-in-screen'>
        <div id='log-in-card-wrapper'>
        <Card>
            <Title className='title' title='Đăng nhập'/>
            <div id='username-field' className={`${usernameError} field`}>
              <TextInput padding='0px 40px' type='text'onChange = {(e) => {handleUsernameChange(e); handleUsernameError(e.target.value)}} errorMessage={usernameError} frontIcon={faUser} placeholder={('Tên đăng nhập')} />
            </div>
            <div id='password-field' className='field'>
              <TextInput padding='0px 40px' handleBackIconOnClick={handleShowPassword} type={showPassword ? 'text' : 'password'} onChange = {(e) => {handlePasswordChange(e); handlePasswordError(e.target.value)}} errorMessage={passwordError} frontIcon={faKey} backIcon={showPassword ? faEye : faEyeSlash} placeholder={('Mật khẩu')} />
            </div>
            <div id='button-wrapper'>
              <ButtonSubmit text={buttonText} onClick={handleLogin} disabled={isButtonDisabled}/>
            </div>
            <ToastContainer></ToastContainer>
        </Card>
        </div>
      </div>
    );
  }
  
  export default LogInScreen;