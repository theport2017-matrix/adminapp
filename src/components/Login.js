import React from 'react';

export default class Login extends React.Component {
    constructor() {
        super();

        this.onSubmit = this.onSubmit.bind(this);
        this.onUsernameChange = this.onFormValChange.bind(this, 'username');
        this.onPasswordChange = this.onFormValChange.bind(this, 'password');

        this.state = {
            form: {
                username: '',
                password: '',
            },
            errorText: null,
        };
    }

    onSubmit(ev) {
        ev.preventDefault();

        this.props.app.login(this.state.form.username, this.state.form.password).catch(() => {
            this.setState({
                errorText: "Login Failed",
            });
        });
    }

    onFormValChange(key, e) {
        const newVal = e.target.value;
        this.setState((s) => {
            s.form[key] = newVal;
            return s;
        });
    }


    render() {
        return <div>
            <h2>Log In</h2>
            <form onSubmit={this.onSubmit}>
                <input type="text"
                    className="Login.username"
                    value={this.state.form.username}
                    onChange={this.onUsernameChange}
                />
                <br />
                <input type="password"
                    className="Login.password"
                    value={this.state.form.password}
                    onChange={this.onPasswordChange}
                />
                <br />
                <input type="submit" />
                <div className="error">{this.state.errorText}</div>
            </form>
        </div>;
    }
}
