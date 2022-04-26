/*
 * @Author: Liusong He
 * @Date: 2022-04-25 17:52:35
 * @LastEditTime: 2022-04-26 17:57:13
 * @FilePath: \coursework\coursework\src\App.js
 * @Email: lh2u21@soton.ac.uk
 * @Description: 
 */
import Register from './register_m'
import Login from './login'
import{BrowserRouter,Link,Routes,Route} from 'react-router-dom'

function App(){
  return(
    <BrowserRouter>
      <Link to='/register_m'>register</Link>
      <Link to='/login'>login</Link>
      <Link to='./user_page'>User_page</Link>
      <Routes>
        <Route path='register_m' element={<Register/>}></Route>
        <Route path='login' element={<Login/>}></Route>
        <Route path='user_page' element={<user_page/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App;




