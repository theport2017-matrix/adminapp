import React from 'react';

import AnnouncePoster from './AnnouncePoster';
import Login from './Login';

export default class AdminConsole extends React.Component {
    constructor(props) {
        super();

        this.onLoginStateChanged = this.onLoginStateChanged.bind(this);

        props.app.onLoginStateChanged = this.onLoginStateChanged;

        this.state = {
            loggedIn: Boolean(props.app.creds),
        };
    }

    onLoginStateChanged() {
        this.setState({
            loggedIn: Boolean(this.props.app.creds),
        });
    }

    render() {
        if (!this.state.loggedIn) {
            return <div>
                <Login app={this.props.app} />
            </div>;
        }

        return <div>
            <AnnouncePoster app={this.props.app} />
        </div>;
    }
}
