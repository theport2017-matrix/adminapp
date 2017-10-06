import React from 'react';

export default class AnnouncePoster extends React.Component {
    constructor() {
        super();

        this.onSubmit = this.onSubmit.bind(this);
        this.onAnnounceTextChange = this.onAnnounceTextChange.bind(this);

        this.state = {
            form: {
                announceText: '',
            },
        };
    }

    onSubmit(ev) {
        ev.preventDefault();

        return this.props.app.matrixClient.sendEvent(
            this.props.app.roomId,
            'm.room.message',//"x.announcement",
            {msgtype: 'm.text', body: this.state.form.announceText},
        ).then(() => {
            console.log("done");
        });
    }

    onAnnounceTextChange(e) {
        const newVal = e.target.value;
        this.setState((s) => {
            s.form.announceText = newVal;
        });
    }

    render() {
        return <div>
            <h2>Post an announcement</h2>
            <form onSubmit={this.onSubmit}>
                <input type="text"
                    className="AnnouncePoster.announceText"
                    value={this.state.form.announceText}
                    onChange={this.onAnnounceTextChange}
                />
                <br />
                <input type="submit" />
            </form>
        </div>;
    }
}
