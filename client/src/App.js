import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Header from './components/Headers/Header';
import Home from './components/Home/Home'
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import VarifyEmail from './components/VarifyEmail/VarifyEmail';

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={
            <>
            <Header />
            <Home />
            </>
          }/>
          <Route exact path="/login" element={
              <>
                <Header/>
                <Login/>
               
              </>
          }/>

          <Route exact path="/signup" element={
              <>
                <Header/>
                <SignUp/>
              </>
          }/>

          <Route exact path="/varify-email/:userid/:token" element={
              <>
                <Header/>
                <VarifyEmail/>
              </>
          }/>


        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
