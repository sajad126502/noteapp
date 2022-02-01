import axios from 'axios';
import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert } from './Alert';
import { Navbar } from './Navbar';
import { useHistory } from 'react-router';
export function SignUp() {
    const [state, setState] = useState({ name: "", email: "", password: "", cpassword: "" });
    const [error, setError] = useState({ error: false, errMes: "" });
    const history = useHistory();
    const changeData = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })

    }
    const sendData = async () => {

        try {
            if (state.password == state.cpassword) {

                const user = await axios.post("http://127.0.0.1:4000/api/auth/register", { name: state.name, email: state.email, password: state.password })

                if (user.data.error) {
                    setError({ error: true, errMes: user.data.error })
                    setTimeout(() => {
                        setError({ error: false, errMes: "" });
                    }, 2000)
                }
                else{
                    
                    history.push("/login")
                }
            }
            else {
                setError({ error: true, errMes: "Password mismatch" })
            }

        } catch (e) {
            console.log(e)
            console.log("something wrong")
        }

    }
    return (
        <div>
            <Navbar />





            <form className="container" onSubmit={(e) => { e.preventDefault() }}>
                {error.error ? <Alert message={error.errMes} col="danger"></Alert> : ""}
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" onChange={changeData} value={state.name} name="name" id="name" aria-describedby="emailHelp" />

                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" onChange={changeData} value={state.email} name="email" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={changeData} value={state.password} name="password" id="exampleInputPassword1" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPasswordc" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" onChange={changeData} value={state.cpassword} name="cpassword" id="exampleInputPasswordc" />
                </div>

                <button onClick={sendData} className="btn btn-primary">SignUp</button>
                <Link to="/login">
                    <button className="btn btn-primary">Login</button>
                </Link>
            </form>
        </div>
    );
};