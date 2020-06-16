import React from "react";
import axios from "axios";

export default class Login extends React.Component {
    constructor(props){
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            token: '',
            email: "",
            password: ""
        };
    }

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

        async onSubmit(e) {
            e.preventDefault();
            const self = this;
            const user = {
                email: this.state.email,
                password: this.state.password
            };

            await axios.post("http://localhost:5000/login",user)
                    .then(res => {
                        console.log(res.data.token);
                        const data = res.data.token;
                        self.setState({ token: data });
                    });
            
            console.log(this.state.token);

            this.setState({
                email: "",
                password: ""
            });

            window.location = '/home/'+this.state.token;

        }


    render(){
        return (
            <div>
                <h3> Login form </h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Email: &nbsp;</label>
                        <input type="text" className="form-control" required value={this.state.email} onChange={this.onChangeEmail} />
                    </div>
                    <div className="form-group">
                        <label>Password: &nbsp;</label>
                        <input type="password" className="form-control" required value={this.state.password} onChange={this.onChangePassword} />
                    </div>
                    <div className="form-group">
                        <input type="submit" className="btn btn-primary" value="Login" onChange={this.onSubmit} />
                    </div>
                </form>
            </div>
        )
    }
}