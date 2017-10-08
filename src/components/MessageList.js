import React from 'react';

export default class MessageList extends React.Component {
    constructor(props) {
        super();
        this.state = {
            events: [],
        };

        this._onSync = this._onSync.bind(this);

        const cli = props.app.matrixClient;
        cli.on('sync', this._onSync);
    }

    componentWillUnmount() {
        const cli = this.props.app.matrixClient;
        cli.removeListener('sync', this._onSync);
    }

    _onSync(state, prevState) {
        if (state !== 'SYNCING') return;
        this._getEvents();
    }

    _getEvents() {
        const cli = this.props.app.matrixClient;
        const room = cli.getRoom(this.props.app.roomId);
        this.setState({
            events: room.getLiveTimeline().getEvents(),
        });
    }

    render() {
        const messages = this.state.events.map((e) => {
            return <li key={e.getId()}>
                {e.getContent().body}
            </li>;
        });
        return <div>
            <h4>Current announcements</h4>
            <ol style={{'list-style-type': 'none', 'padding-left': '0px'}}>
                {messages.reverse()}
            </ol>
        </div>;
    }
}
