import React, { useState } from "react"
import axios from "axios"
import { NavLink, useHistory } from "react-router-dom"

export const RegPage = () => {
    const [error, setError] = useState('')

    const history = useHistory()

    const [form, setForm] = useState({
        email: '',
        password: '' 
     })
 
     const changeHandler = (e) => {
         setForm({ ...form, [e.target.name]: e.target.value })
     }

    const registerHandler = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:4000/api/auth/registration', {...form})
            history.push('/')
            console.log(response)
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
                            <h1>Registration page</h1>
                        </div>

                        <div className="card-body">
                        <form onSubmit={registerHandler}>
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
                            <button type="submit" className="btn btn-success">Registration</button>
                            <NavLink className="btn btn-danger ml-2" to="/">Login</NavLink>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}