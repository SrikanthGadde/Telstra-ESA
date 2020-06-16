import React from 'react';
import axios from 'axios';

export default class Register extends React.Component{
    constructor(props){
        super(props);

        this.onChangeFirstname = this.onChangeFirstname.bind(this);
        this.onChangeLastname = this.onChangeLastname.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            password: ""
        };
    }
        onChangeFirstname(e) {
            this.setState({
                firstname: e.target.value
            });
        };

        onChangeLastname(e) {
            this.setState({
                lastname: e.target.value
            });
        };

        onChangeEmail(e) {
            this.setState({
                email: e.target.value
            });
        };

        onChangePassword(e) {
            this.setState({
                password: e.target.value
            });
        };

        onSubmit(e) {
            e.preventDefault();

            const user = {
                firstName: this.state.firstname,
                lastName: this.state.lastname,
                email: this.state.email,
                password: this.state.password
            };

            console.log(user);
            
            axios.post('http://localhost:5000/register', user)
                .then(res => console.log(res.data));

            window.location = '/login';
        }
    

    render() {
        return(
            <div>
                <h3> Registration form </h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Firstname: &nbsp;</label>
                        <input type="text" required className="form-control" value={this.state.firstname} onChange={this.onChangeFirstname} />
                    </div>
                    <div className="form-group">
                        <label>Lastname: &nbsp;</label>
                        <input type="text" required className="form-control" value={this.state.lastname} onChange={this.onChangeLastname} />
                    </div>
                    <div className="form-group">
                        <label>Email:&nbsp; </label>
                        <input type="text" required className="form-control" value={this.state.email} onChange={this.onChangeEmail} />
                    </div>
                    <div className="form-group">
                        <label>Password: &nbsp;</label>
                        <input type="password" required className="form-control" value={this.state.password} onChange={this.onChangePassword} />
                    </div>
                    <div className="form-group">
                        <input type="submit" className="btn btn-primary" value="Register" onChange={this.onSubmit} />
                    </div>
                </form>
            </div>
        )
    }
}