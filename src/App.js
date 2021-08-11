import './App.css';
import Cookies from 'js-cookie';
import Login from './login/login.js';

function App() {
  var id = Cookies.get('accountId')
  console.log(id);
  if(id){
    return (
      <p>You're logged in!</p>
    );
  }else{
    return (
      <Login />
    );
  }
}

export default App;
