import React from 'react';

const INITIAL_FORM_VALS = {
    announceText: '',
    level: 'info',
};

export default class AnnouncePoster extends React.Component {
    constructor() {
        super();

        this.onSubmit = this.onSubmit.bind(this);
        this.onAnnounceTextChange = this.onAnnounceTextChange.bind(this);
        this.onLevelChange = this.onLevelChange.bind(this);

        this.state = {
            form: {},
        };
        Object.assign(this.state.form, INITIAL_FORM_VALS);
    }

    onSubmit(ev) {
        ev.preventDefault();

        return this.props.app.matrixClient.sendEvent(
            this.props.app.roomId,
            'm.room.message',//"x.announcement",
            {
                msgtype: 'm.text',
                body: this.state.form.announceText,
                level: this.state.form.level,
            },
        ).then(() => {
            console.log("done");
            const formVals = {};
            Object.assign(formVals, INITIAL_FORM_VALS);
            this.setState({
                form: formVals,
            });
        });
    }

    onAnnounceTextChange(e) {
        const newVal = e.target.value;
        this.setState((s) => {
            s.form.announceText = newVal;
            return s;
        });
    }

    onLevelChange(e) {
        const newVal = e.target.value;
        this.setState((s) => {
            s.form.level = newVal;
            return s;
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
                <select value={this.state.form.level} onChange={this.onLevelChange}>
                    <option value="info">Info</option>
                    <option value="warning">Warning</option>
                    <option value="emergency">Emergency</option>
                </select>
                <input type="submit" />
            </form>
        </div>;
    }
}
