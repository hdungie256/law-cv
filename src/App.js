import './App.css';
import LogInScreen from './screens/login'
import {
  HashRouter,
  Routes,
  Route,
} from "react-router-dom";
import LeftNavBar from './components/LeftNavBar';
import { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import DashBoardScreen from './screens/dashboard';
import CustomerScreen from './screens/customer';
import ServiceScreen from './screens/service';
import DeadlineScreen from './screens/deadlines';

function App() {
  const [logIn, setLogIn] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = sessionStorage.getItem('accessToken');
      if (accessToken) {
        setLogIn(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {logIn ?  
        <HashRouter>
          <Routes>               
            <Route
                exact
                path="/"
                element={<LogInScreen setLogIn={() => setLogIn(false)}/>}
            />
            <Route
                exact
                path="/login"
                element={<LogInScreen setLogIn={() => setLogIn(false)}/>}
            />
          </Routes>
        </HashRouter>
          : 
        <HashRouter> 
          <Grid container sx={{width: '100vw', maxHeight: '100vh'}}>
            <Grid item md={0.6}>
              <LeftNavBar  logOut={() => setLogIn(true)}/>
            </Grid>

            <Grid item md={11.4}>
              <Routes> 
                <Route
                    exact
                    path="/dashboard"
                    element={<DashBoardScreen />}
                />
                <Route
                    exact
                    path="/customers"
                    element={<CustomerScreen />}
                />
                <Route
                    exact
                    path="/service"
                    element={<ServiceScreen />}
                />
                <Route
                    exact
                    path="/deadlines"
                    element={<DeadlineScreen />}
                />
              </Routes>
            </Grid>
          </Grid>
    </HashRouter>
    }
</>
  );
}

export default App;


