import React from 'react';

import AnnouncePoster from './AnnouncePoster';

export default class AdminConsole extends React.Component {
    render() {
        return <div>
            <AnnouncePoster app={this.props.app} />
        </div>;
    }
}
