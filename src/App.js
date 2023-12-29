import './App.css';
import MainScreen from './screens/main';
import LogInScreen from './screens/login'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <>
    <BrowserRouter>
        <Routes>
            <Route
                exact
                path="/"
                element={<LogInScreen />}
            />
            <Route
                exact
                path="/main"
                element={<MainScreen />}
            />
        </Routes>
    </BrowserRouter>
</>
  );
}

export default App;
