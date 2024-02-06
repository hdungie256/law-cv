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
import { CardMedia, Divider, Grid, Stack, Typography } from '@mui/material';
import logoImage from '../../../src/logo.png';
import getWorkForDashboard from '../../apis/work/getWorkForDashboard';

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

      if (usernameError || passwordError) {
        setIsButtonDisabled(false)
        setButtonText('Đăng nhập')
        return;
      }

      const res = await logIn(username, password)
      if (res){
        navigate("../main")
      }
    }

    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [buttonText, setButtonText] = useState('Đăng nhập');

    return (
      <div id='log-in-screen'>
            <div id='log-in-card-wrapper'>
              <Card>

                <Grid container sx={{padding: '10px', height: '100%'}}>
                  <Grid item md={6} style={{padding: '0px'}} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent:'center', gap:'15px', padding: '0px'}}>
                    <Stack direction="row" sx={{margin: '10px'}}>
                      <CardMedia
                        component="img"
                        height="40"
                        image={logoImage}
                        alt="logo"
                      />
                      <Divider sx={{width: '10px'}} orientation="vertical" variant="middle" flexItem />
                      <Typography style={{ marginLeft: '10px' }} variant='h4'>BACIP</Typography>
                    </Stack>
                    
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
                </Grid>

                <Grid item md={6} style={{padding: '10px'}}>
                    <div class='login-left-panel'></div>
                </Grid>
              </Grid>

            </Card>
        </div>
      </div>
    );
  }
  
  export default LogInScreen;