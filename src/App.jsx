import {Routes, Route} from 'react-router-dom'
import Login from './routes/Login';
import Home from './routes/Home';
import NotFound from './routes/NotFound';
import Navbar from './components/Navbar';
import RequiereAuth from './components/layout/RequiereAuth';
import Register from './routes/Register';
import { useContext } from 'react';
import { UserContext } from './context/UserProvider';
import Layout from './components/layout/Layout';
import Perfil from './routes/Perfil';
import LayoutRedic from './components/layout/LayoutRedic';

const App = () => {

  const {user}= useContext(UserContext);

  if(user === false){
    return <p>Loading...</p>
  }


  return(
    <div>
      <Navbar/>
      <Routes>

          <Route path='/' element={<RequiereAuth/>}>
              <Route index element={<Home/>}></Route>
              <Route path='/perfil' element={<Perfil/>}></Route>
          </Route>


            <Route path='/' element={<Layout/>}> 
                <Route path='/login' element={<Login/>}></Route>
                <Route path='/register' element={<Register/>}></Route>
            </Route>

            <Route path='/:nanoid' element={<LayoutRedic/>} >
                <Route index element={<NotFound/>} />
            </Route>
      </Routes>
    </div>
  )
}

export default App;