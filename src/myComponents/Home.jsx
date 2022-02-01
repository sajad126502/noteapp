// @flow
import { React} from 'react';
import { Navbar } from './Navbar';
import { Notes } from './Notes';
import { Addnote } from './Addnote';
import { Login } from './Login';


export function Home() {


  if (localStorage.getItem("myjwt")) {

    return (

      <div id="home"  >
        <Navbar />
        <div className="container">
          <Addnote></Addnote>
        </div>


      </div>

    );
  } else {
    return (
      <Login></Login>


    )
  }
};