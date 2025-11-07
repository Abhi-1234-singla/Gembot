import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home.jsx';
import Login from './pages/login.jsx';
import Verify from './pages/Verify.jsx';
import { UserData, UserProvider } from "./context/UserContext.jsx";
import ReactDOM from "react-dom/client";
import { LoadingBig } from './components/Loading.jsx';
const App = () => {
  const {user, isAuth, loading} = UserData()
  return (
    <>
   
    {  loading ? (
      <LoadingBig />
    ) :( <BrowserRouter>
    <Routes>
    <Route path='/' element={ isAuth ? <Home/> : <Login/>  } />
    <Route path='/login' element={ isAuth ? <Home/> :<Login />  } />
    <Route path='/verify' element={ isAuth ? <Home/> :<Verify />  } />
    </Routes>
    </BrowserRouter>)}
    </>
  );
}


// ReactDOM.createRoot(document.getElementById("root")).render(
//   <UserProvider>
//     <App />
//   </UserProvider>
// );


export default App;