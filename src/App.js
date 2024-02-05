import './App.css';
import MainScreen from './screens/main';
import LogInScreen from './screens/login'
import {
  HashRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {

  return (
    <>
    <HashRouter>
        <Routes>
          <Route
                exact
                path="/"
                element={<LogInScreen />}
            />
            <Route
                exact
                path="/login"
                element={<LogInScreen />}
            />
            <Route
                exact
                path="/main"
                element={<MainScreen />}
            />
        </Routes>
    </HashRouter>
</>
  );
}

export default App;


