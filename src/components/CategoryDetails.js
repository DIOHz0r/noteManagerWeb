import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import axios from 'axios';
import Navbar from "./Navbar";

class CategoryDetails extends Component {
    state = {
        data: {},
        formError: '',
        errors: {},
    };

    async componentDidMount() {
        const {match} = this.props;
        axios.get('/api/categories/' + match.params.id)
            .then(response => {
                this.setState({data: response.data})
            })
            .catch(error => {
                // console.log(error);
                this.setState({formError: 'Error loading category data'});
            });
    }

    postDataHandler = () => {
        const {match} = this.props;
        const data = {
            name: this.state.data.name,
        };
        axios.patch('/api/categories/' + match.params.id, data)
            .then(response => {
                alert('Information updated');
                this.props.history.push("/categories");
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
        this.setState({data:{name: e.target.value}});
    };

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
    };

    render() {
        const category = this.state.data;
        return (
            <div className="container">
                <Helmet>
                    <title>{category.name}</title>
                </Helmet>
                <Navbar/>
                <div className="card">
                    <div className='card-body'>
                        {this.renderError()}
                        <div className="form-group">
                            <label>Name:</label>
                            <input name="name" className="form-control" type="text" value={category.name || ''}
                                   onChange={this.captureValue} required/>
                        </div>
                    </div>

                    <div className="text-center">
                        <button type="submit" className="btn btn-primary" onClick={this.postDataHandler}>
                            Edit category
                        </button>
                    </div>
                </div>
                <Link to={'/categories'}>Return to list</Link>
            </div>
        )
    }
}

export default CategoryDetails;