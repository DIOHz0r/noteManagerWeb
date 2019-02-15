import React, {Component} from 'react'
import {Helmet} from 'react-helmet'
import axios from "axios";

class Register extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        formError: '',
        success: '',
        errors: {},
    };

    postDataHandler = () => {
        const data = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation,
        };
        axios.post('/api/register', data)
            .then(response => {
                this.setState({
                    formError: '',
                    errors: '',
                    success: <div className="alert alert-success">User registered, please go back to login</div>
                });
            })
            .catch(error => {
                let errorData = error.response.data;
                this.setState({
                    formError: errorData.message,
                    errors: errorData.errors,
                })
            });
    };

    captureValue = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    renderError() {
        const {formError, errors} = this.state;
        let errorMsg = [];

        for (const key in errors) {
            if (errors.hasOwnProperty(key)) {
                errorMsg.push(<li key={key}> {errors[key]} </li>)
            }
        }
        if (formError) {
            return <div className="alert alert-danger">
                {formError}<br/>
                <ul>{errorMsg}</ul>
            </div>;
        }

        return null;
    }

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
                            {this.state.success}
                            {this.renderError()}
                            <div className="form-group">
                                <label>Name:</label>
                                <input className="form-control" type="text" name="name" value={this.state.name}
                                       onChange={this.captureValue} required/>
                            </div>
                            <div className="form-group">
                                <label>Email:</label>
                                <input className="form-control" type="text" name="email" value={this.state.email}
                                       onChange={this.captureValue} required/>
                            </div>
                            <div className="form-group">
                                <label>Password:</label>
                                <input className="form-control" type="password" name="password"
                                       value={this.state.password} onChange={this.captureValue} required/>
                            </div>
                            <div className="form-group">
                                <label>Password:</label>
                                <input className="form-control" type="password" name="password_confirmation"
                                       value={this.state.password_confirmation} onChange={this.captureValue} required/>
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