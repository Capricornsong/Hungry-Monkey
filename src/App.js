/*
 * @Author: Liusong He
 * @Date: 2022-04-25 17:52:35
 * @LastEditTime: 2022-04-27 16:31:07
 * @FilePath: \coursework\coursework\src\App.js
 * @Email: lh2u21@soton.ac.uk
 * @Description: 
 */
import Register from './pages/register_m'
import Login from './pages/login'
import{BrowserRouter,Link,Routes,Route} from 'react-router-dom'
import User_page from './account/user_page'
function App(){
  return(
    <BrowserRouter>
      <ul>
        <li><Link to='/register_m'>register</Link></li>
        <li><Link to='/login'>login</Link></li>
        <li><Link to='/user_page'>User_page</Link></li>
      </ul>
      <Routes>
          <Route path='register_m' element={<Register/>}></Route>
          <Route path='login' element={<Login/>}></Route>
          <Route path='user_page' element={<User_page/>}></Route>
        
      </Routes>
    </BrowserRouter>
  )
}
export default App;




