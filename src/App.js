import "./App.css";
import Cookies from "js-cookie";
import Login from "./login/login.js";
import Main from "./overview/Main.js";
import axios from "axios";

var apiKey = '1cb35cfe6eeba07ad5afa33e1e997d12'
var baseUrl = 'http://api.nessieisreal.com'

function App() {
  // Uncomment this code to see graph dashboard 
  //   return (
  //     <Main />
  //   )
  

  var id = Cookies.get('accountId')
  if (id) {
    axios.get(`${baseUrl}/customers/${id}?key=${apiKey}`).then((response) => {
      console.log(response.data);
      }).catch((err, response) => {
          Cookies.remove('accountId');
          window.location.reload();
      })
      return <Main />;
  } else {
    return <Login />;
  }

}

export default App;
