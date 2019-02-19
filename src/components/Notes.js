import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {Helmet} from "react-helmet";
import Navbar from "./Navbar";

class Notes extends Component {
    state = {
        data: []
    };

    async componentDidMount() {
        this.listNotes();
    }

    listNotes() {
        axios.get('/api/notes')
            .then(response => {
                this.setState({data: response.data})
            })
            .catch(error => {
                // console.log(error);
                this.setState({error: true});
            });
    }

    deleteHandler = (id) => {
        if (!window.confirm('Are you sure that you want to delete this information?')) {
            return;
        }
        axios.delete('/api/notes/' + id)
            .then(response => {
                this.listNotes();
            })
            .catch(error => {
                let errorData = error.response.data;
                alert(errorData.message);
            });
    };

    render() {

        return (
            <div className="container">
                <Helmet>
                    <title>Note Manager - Notes</title>
                </Helmet>
                <Navbar/>
                <div><h1>My notes</h1></div>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Notes</th>
                        <th>Created at</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.data.map((note, key) => {
                        const status = (note.done) ? 'Done' : 'Pending';
                        return (
                            <tr key={key}>
                                <td>
                                    <Link to={`/notes/details/${note.id}`}>{note.title}</Link>
                                </td>
                                <td>{note.created_at}</td>
                                <td>{status}</td>
                                <td>
                                    <a className="btn btn-danger" onClick={() => this.deleteHandler(note.id)}>Delete</a>
                                </td>
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
