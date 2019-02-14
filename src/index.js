import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';

import Homepage from './components/Homepage';
import Categories from './components/Categories';
import Note from './components/Notes';
import NoteDetails from './components/NoteDetails';
import Register from './components/Register';
// import Category from './Category';

const AppRouter = () => (
    <Router>
        <div>
            <Route path='/' exact component={Homepage}/>
            <Route path='/categories' exact component={Categories}/>
            <Route path='/notes' exact component={Note}/>
            <Route path='/notes/details/:id' exact component={NoteDetails}/>
            <Route path='/registration' exact component={Register}/>
        </div>
    </Router>
);

axios.defaults.baseURL = 'http://api.notemanager.local';

const userToken = localStorage.getItem('userToken');
if (userToken) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + userToken;
}
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.request.use(request => {
    console.log(request);
    // Edit request config
    return request;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

axios.interceptors.response.use(response => {
    console.log(response);
    // Edit request config
    return response;
}, error => {
    console.log(error);
    return Promise.reject(error);
});


ReactDOM.render(<AppRouter/>, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
