/*
 * @Author: Liusong He
 * @Date: 2022-04-25 17:52:35
 * @LastEditTime: 2022-04-25 22:28:32
 * @FilePath: \coursework\coursework\src\App.js
 * @Email: lh2u21@soton.ac.uk
 * @Description: 
 */
import Register from './register_m'
import Login from './login'
import Home from '../src/pages/Home'
import ForgotPassword from './pages/ForgotPassword'
import{BrowserRouter,Routes,Route} from 'react-router-dom'

function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path='home' element={<Home/>}></Route>
        <Route path='' element={<Home/>}></Route>
        <Route path='register_m' element={<Register/>}></Route>
        <Route path='login' element={<Login/>}></Route>
        <Route path='forgot-password' element={<ForgotPassword/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App;