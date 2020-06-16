import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import ReactToExcel from "react-html-table-to-excel";

const Contact = props => (
    <tr>
        <td>{props.contact.name}</td>
        <td>{props.contact.email}</td>
        <td>{props.contact.phone}</td>
        <td>
            <Link to={"/edit/"+props.id+'/'+props.contact._id}>Edit</Link> | <a href='#' onClick={() => {props.deleteContact(props.contact._id)}}>Delete</a>
        </td>
    </tr>
)

export default class Contacts extends React.Component{
    constructor(props) {
        super(props);

        this.deleteContact = this.deleteContact.bind(this);
        this.onLogout = this.onLogout.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.onChangeFilter = this.onChangeFilter.bind(this);

        this.state = {filter: "", contacts: []};
    }

    componentDidMount() {
        axios.get('http://localhost:5000/'+this.props.match.params.id)
            .then(res => {
                this.setState({contacts: res.data})
            })
            .catch((err)=> console.log(err));
    }


    deleteContact(id){
        axios.delete('http://localhost:5000/'+this.props.match.params.id+'/'+id)
            .then(res => console.log(res.data));

        this.setState({
            contacts: this.state.contacts.filter(c => c._id !== id)
        })
    }

    contactsList() {
        let filteredContacts = this.state.contacts.filter(contact => {
            return contact.name.toLowerCase().indexOf(this.state.filter.toLowerCase()) !== -1;
        })
        return filteredContacts.map(currentcontact => {
            return <Contact contact={currentcontact} deleteContact={this.deleteContact} id={this.props.match.params.id} key={currentcontact._id}/>
        })
    }

    onLogout() {
        axios.delete('http://localhost:5000/logout/'+this.props.match.params.id)
            .then(res => console.log(res));

        window.location='/login';
    }

    onAdd() {
        window.location='/add/'+this.props.match.params.id;
    }


    onChangeFilter(e) {
        this.setState({
            filter: e.target.value
        })
    }

    render() {
        return(
            <div>
                {/*
                <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                    <Link to={'/add/'+this.props.match.params.id} className="navbar-brand">Add contact</Link>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                                <Link to="/register" classname="nav-link">Register</Link>
                            </li>
                        </ul>
                    </div>
                </nav>*/}
                <p>You're token is {this.props.match.params.id}</p>  
                <input type="button" className="btn btn-primary" value="Add Contact" onClick={this.onAdd} />    &nbsp;
                <ReactToExcel table="contacts" className="btn btn-primary" filename="Contacts" sheet={this.props.match.params.id} buttonText="Export" />    &nbsp;&nbsp;&nbsp;&nbsp;
                <input type="button" className="btn btn-primary" value="Logout" onClick={this.onLogout} />
                <p><br></br></p>
                <div>
                    <label>Name filter &nbsp;</label>
                    <input type="text" value={this.state.filter} onChange={this.onChangeFilter} />
                </div>
                <table className='table' id="contacts">
                    <thead className="thead-light">
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.contactsList() }
                    </tbody>
                </table>

                
            </div>
        )
    }
}