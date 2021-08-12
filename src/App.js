import './App.css';
import Cookies from 'js-cookie';
import Header from './header/header.js';
import Login from './login/login.js';
import Main from './overview/Main.js';

function App() {
  /* Uncomment this code to see graph dashboard
   return (
     <Main />
   )
  */
  var id = Cookies.get('accountId')
  console.log(id);
  if(id){
    return (
      <Main />
    );
  }else{
    return (
      <div>
        <Header/>
        <Login />
      </div>);
  }
  
}

export default App;
