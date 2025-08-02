
import MyApp from "./Full-App-Structure/myApp";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LoginAuth } from "./Authentication/Usecontext-logic";

function App() {



  return (
    <LoginAuth>

<MyApp/>

    </LoginAuth>
  )
}

export default App
