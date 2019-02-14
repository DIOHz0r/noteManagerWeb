import React, {Component} from 'react'
import {Helmet} from 'react-helmet'
import axios from "axios";

class Register extends Component {
    state={};

    postDataHandler = () => {
        const data = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation,
        };
        axios.post('/api/register', data)
            .then(response => {
                console.log(response);
            });
    };

    render() {
        return (
            <div>
                <Helmet>
                    <title>Note Manager - Create account</title>
                </Helmet>
                <div className="container">
                    <div>
                        <h1 className='text-center'>Register into Note Manager</h1>
                    </div>
                    <div className="card">
                        <div className='card-body'>
                            <h3>Registration</h3>
                            <div className="form-group">
                                <label>Name:</label>
                                <input className="form-control" type="text" name="name" required/>
                            </div>
                            <div className="form-group">
                                <label>Email:</label>
                                <input className="form-control" type="text" name="email" required/>
                            </div>
                            <div className="form-group">
                                <label>Password:</label>
                                <input className="form-control" type="password" name="password" required/>
                            </div>
                            <div className="form-group">
                                <label>Password:</label>
                                <input className="form-control" type="password" name="password2" required/>
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-primary" onClick={this.postDataHandler}>
                                    Create account
                                </button>
                            </div>

                            <a href="/">Go back</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register;