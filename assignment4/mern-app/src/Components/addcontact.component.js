import React from 'react';
import axios from 'axios';

export default class EditContact extends React.Component{
    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name:"",
            phone:"",
            email:""
        }
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        })
    }

    onChangePhone(e) {
        this.setState({
            phone: e.target.value
        })
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }    

    onSubmit(e) {
        e.preventDefault();

        const contact = {
            name: this.state.name,
            email: this.state.email,
            phone: this.state.phone
            
        }

        console.log(contact);

        axios.post("http://localhost:5000/"+this.props.match.params.id, contact)
            .then(res => console.log(res))
            .catch(err => console.log(err));
        window.location = '/home/'+this.props.match.params.id;
    }

    render() {
        return (
            <div>
                <h3>New contact</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name: &nbsp;</label>
                        <input type="text" className="form-control" required value={this.state.name} onChange={this.onChangeName} />
                    </div>
                    <div className="form-group">
                        <label>Phone: &nbsp;</label>
                        <input type="text" className="form-control" required value={this.state.phone} onChange={this.onChangePhone} />
                    </div>
                    <div className="form-group">
                        <label>Email: &nbsp;</label>
                        <input type="text" className="form-control" value={this.state.email} onChange={this.onChangeEmail} />
                    </div>
                    <div className="form-group">
                        <input type="submit" className="btn btn-primary" value="Add contact" onChange={this.onSubmit} />
                    </div>
                </form>
            </div>
        )
    }
}