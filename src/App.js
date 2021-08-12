import "./App.css";
import Cookies from "js-cookie";
import Login from "./login/login.js";
import Main from "./overview/Main.js";
function App() {
  // Uncomment this code to see graph dashboard 
  //   return (
  //     <Main />
  //   )
  var id = Cookies.get('accountId')
  if (id) {
      return <Main id={id}/>;
  } else {
    return <Login />;
  }

}

export default App;
