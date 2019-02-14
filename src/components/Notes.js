import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {Helmet} from "react-helmet";

class Notes extends Component {
    state = {
        data: []
    };

    async componentDidMount() {
        axios.get('/api/notes')
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
                    <title>Note Manager - Notes</title>
                </Helmet>
                <div><h2>My notes</h2></div>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Note</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.data.map((note, key) => {
                        const status = (note.done )? 'Done' : 'Pending';
                        return (
                            <tr key={key}>
                                <td>
                                    <Link to={`/notes/details/${note.id}`}>{note.title}</Link>
                                </td>
                                <td>{status}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Notes;
