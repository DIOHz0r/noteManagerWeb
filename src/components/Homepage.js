import React, {Component} from 'react'
import {Helmet} from 'react-helmet'
import axios from "axios";

export default class extends Component {
    state = {
        email: '',
        password: '',
        formError: '',
        errors: {},
    };

    postDataHandler = () => {
        const data = {
            email: this.state.email,
            password: this.state.password,
        };
        axios.post('/api/login', data)
            .then(response => {
                console.log(response.data);
                localStorage.setItem('userToken', response.data.data.api_token);
                this.props.history.push("/notes");
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
                    <title>Note Manager - Login</title>
                </Helmet>
                <div className="container">
                    <div>
                        <h1 className='text-center'>Welcome to Note Manager</h1>
                    </div>
                    <div className="card">
                        <div className='card-body'>
                            <h3>Login</h3>
                            {this.renderError()}
                            <div className="form-group">
                                <label>Email:</label>
                                <input className="form-control" type="text" name="email" value={this.state.email} onChange={this.captureValue} required/>
                            </div>
                            <div className="form-group">
                                <label>Password:</label>
                                <input className="form-control" type="password" name="password" value={this.state.password} onChange={this.captureValue} required/>
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-primary" onClick={this.postDataHandler}>
                                    Login
                                </button>
                            </div>

                            <a href="registration">Click here to register</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
