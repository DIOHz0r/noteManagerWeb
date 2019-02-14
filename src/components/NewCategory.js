import React, {Component} from 'react';
import axios from 'axios';

class NewCategory extends Component {
    state = {
        name: '',
    };

    postDataHandler = () => {
        const data = {
            name: this.state.name,
        };
        axios.post('/categories', data)
            .then(response => {
                console.log(response);
            });
    };

    render() {
        return (
            <div className="card-body">
                <h3>Add a Category</h3>
                <div className="form-inline">
                    <div className="form-group">
                        <label>Name: </label>
                        <input className="form-control" type="text" value={this.state.name}
                               onChange={(event) => this.setState({title: event.target.value})}/>
                    </div>
                    <button className="btn btn-primary" onClick={this.postDataHandler}>Add Category</button>
                </div>
            </div>
        );
    }
}

export default NewCategory;