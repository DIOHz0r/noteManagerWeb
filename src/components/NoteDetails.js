import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import axios from 'axios';
import Navbar from "./Navbar";

export default class NoteDetails extends Component {
    state = {
        data: {}
    };

    async componentDidMount() {
        const {match} = this.props;
        axios.get('/api/notes/' + match.params.id)
            .then(response => {
                this.setState({data: response.data.data})
            })
            .catch(error => {
                // console.log(error);
                this.setState({error: true});
            });
    }

    render() {
        const note = this.state.data;
        const status = (note.done) ? 'Done' : 'Pending';
        return (
            <div className="container">
                <Helmet>
                    <title>{note.title}</title>
                </Helmet>
                <Navbar/>
                <h1>{note.title} <small className="badge badge-secondary">{status}</small></h1>
                <div dangerouslySetInnerHTML={{__html: note.description}}/>
                <Link to={`/notes`}>Return to list</Link>
            </div>
        )
    }
}
