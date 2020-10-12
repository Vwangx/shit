import React, { useContext, useState } from "react"
import {NavLink} from  "react-router-dom"
import axios from "axios"
import { AuthContext } from "../context/authContext"

export const AuthPage = () => {
    const auth = useContext(AuthContext)

    const [error, setError] = useState('')

    const [form, setForm] = useState({
        email: '',
        password: '' 
     })
 
     const changeHandler = (e) => {
         setForm({ ...form, [e.target.name]: e.target.value })
     }

    const loginHandler = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:4000/api/auth/login', {...form})
            const { data } = response
            // await localStorage.setItem('auth-token', data.token)
            console.log(response)
            auth.login(data.token, data.userId)
        } catch (e) {
            console.log(e)
            setError("Something went wrong...")
        }
    }


     
    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="card mt-2">
                        <div className="card-header">
                            <h1>Auth page</h1>
                        </div>

                        <div className="card-body">
                        <form onSubmit={loginHandler}>
                            <div className="form-group">
                                <input
                                 onChange={changeHandler}
                                 placeholder="Email..."
                                 type="email" 
                                 className="form-control" 
                                 id="email" 
                                 name="email"
                                 aria-describedby="emailHelp" />
                                <small id="emailHelp" className="form-text text-muted">{error}</small>
                            </div>
                            <div className="form-group">
                                <input
                                 onChange={changeHandler}
                                 placeholder="Password" 
                                 type="password" 
                                 className="form-control" 
                                 id="password"
                                 name="password" />
                            </div>
                            <button type="submit" className="btn btn-success">Login</button>
                            <NavLink className="btn btn-danger ml-2" to="/registration">Registration</NavLink>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}