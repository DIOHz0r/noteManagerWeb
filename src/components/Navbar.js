import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';

class Navbar extends Component {
    constructor(props) {
        super(props);
        if (!localStorage.getItem('userToken')) {
            this.props.history.push("/");
        }
    }

    logout = (e) => {
        localStorage.clear();
        this.props.history.push("/");
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="#">NoteManager</a>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/notes">Notes</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/categories">Categories</Link>
                            </li>
                            <li className="nav-item">
                                <a className="btn nav-link text-danger" onClick={e => this.logout(e)}>Logout</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}

export default withRouter(Navbar);