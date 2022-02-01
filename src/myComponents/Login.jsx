// @flow
import axios from 'axios';
import { React, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Alert } from './Alert';
import { Navbar } from './Navbar';
import { useHistory } from 'react-router';
import noteContext from '../context/noteContext';
export function Login() {
  const history = useHistory();
  const [state, setState] = useState({ email: "", password: "" });
  const [error, setError] = useState({ error: false, errMes: "" });
  const noteData = useContext(noteContext)


  const changeData = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })

  }
  const sendData = async () => {
    let user;
    try {

      user = await axios.post("http://127.0.0.1:4000/api/auth/login", state)

      if (user.data.error) {
        setError({ error: true, errMes: user.data.error })
        setTimeout(() => {
          setError({ error: false, errMes: "" });
        }, 2000)
      }
      else {

        localStorage.setItem("myjwt", user.data.token)

        history.push("/")

      }

    } catch (e) {
      console.log("something wrong")
    }

  }
  return (
    <div>
      <Navbar />





      <form className="container" onSubmit={(e) => { e.preventDefault() }}>
        {error.error ? <Alert message={error.errMes} col="danger"></Alert> : ""}
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" onChange={changeData} value={state.email} name="email" id="exampleInputEmail1" aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" onChange={changeData} value={state.password} name="password" id="exampleInputPassword1" />
        </div>

        <button onClick={sendData} className="btn btn-primary">Login</button>
        <Link to="/signup">
          <button className="btn btn-primary">SignUp</button>
        </Link>
      </form>
    </div>
  );
};