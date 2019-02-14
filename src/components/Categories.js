import React, {Component} from 'react';
import {Link} from "react-router-dom";
import NewCategory from './NewCategory';
import {Helmet} from "react-helmet";
import axios from 'axios';

class Categories extends Component {
    state = {
        data: []
    };

    async componentDidMount() {
        axios.get('/api/categories')
            .then(response => {
                this.setState({data: response.data})
            })
            .catch(error => {
                // console.log(error);
                this.setState({error: true});
            });
    }

    render() {
        return (
            <div className="container">
                <Helmet>
                    <title>Note Manager - Categories</title>
                </Helmet>
                <section>
                    <NewCategory/>
                </section>
                <table className="table">
                    <thead>
                        <th>Name</th>
                    </thead>
                    {this.state.data.map((category, key) => {
                        return (
                            <tr key={key}><td>
                                <Link to={`/category/${category.id}`}>{category.name}</Link>
                            </td></tr>
                        )
                    })}
                </table>
            </div>
        )
    }
}

export default Categories;