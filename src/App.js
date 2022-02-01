import React from "react"

import { Home } from "./myComponents/Home"
import { Contact } from "./myComponents/Contact"
import { About } from "./myComponents/About"
import { Login} from "./myComponents/Login"
import { Logout} from "./myComponents/Logout"
import {SignUp } from "./myComponents/SignUp"
import {Link,Switch,Route} from "react-router-dom"
import { Notes } from "./myComponents/Notes"
const App=()=>{
 
  return(
  
    <>
    <Switch>
      <Route exact path="/" component={Home}></Route>
    </Switch>
    <Switch>
      <Route  exact path="/about" component={About}></Route>
    </Switch>
    <Switch>
      <Route  exact path="/contact" component={Contact}></Route>
    </Switch>
    <Switch>
      <Route  exact path="/allnotes" component={Notes}></Route>
    </Switch>
    <Switch>
      <Route  exact path="/signup" component={SignUp}></Route>
    </Switch>
   
    <Switch>
      <Route  exact path="/login" component={Login}></Route>
    </Switch>
    <Switch>
      <Route  exact path="/logout" component={Logout}></Route>
    </Switch>
  

    </>
  )
}
export default App