import React from 'react';

const NEWS_INITIAL_FORM_VALS = {
    newsText: '',
    newsTitle: 'NEWS',
    newsImage: 'http://example.com/example.png',
};

const MAX_TITLE_LENGTH = 30;

export default class NewsPoster extends React.Component {
    constructor() {
        super();

        this.onSubmit = this.onSubmit.bind(this);
        this.onNewsTextChange = this.onNewsTextChange.bind(this);
        this.onNewsTitleChange = this.onNewsTitleChange.bind(this);
        this.onNewsImageChange = this.onNewsImageChange.bind(this);

        this.state = {
            form: {},
        };
        Object.assign(this.state.form, NEWS_INITIAL_FORM_VALS);
    }

    onSubmit(ev) {
        ev.preventDefault();

        return this.props.app.matrixClient.sendEvent(
            this.props.app.roomId,
            'c.news',
            {
                title: this.state.form.newsTitle,
                body: this.state.form.newsText,
                image: this.state.form.newsImage,
                local:true

            },
        ).then(() => {
            console.log("done");
            const formVals = {};
            Object.assign(formVals, NEWS_INITIAL_FORM_VALS);
            this.setState({
                form: formVals,
            });
        });
    }

    onNewsTextChange(e) {
        const newVal = e.target.value;
        this.setState((s) => {
            s.form.newsText = newVal;
            return s;
        });
    }

    onNewsTitleChange(e) {
        const newVal = e.target.value;
        this.setState((s) => {
            s.form.newsTitle = newVal.substring(0,MAX_TITLE_LENGTH);
            return s;
        });
    }

    onNewsImageChange(e) {
        const newVal = e.target.value;
        this.setState((s) => {
            s.form.newsImage = newVal;
            return s;
        });
    }

    render() {
        return <div>
            <h2>Post News</h2>
            <form onSubmit={this.onSubmit}>
                <input type="text" id="news_title"
                    className="NewsPoster_newsTitle"
                    value={this.state.form.newsTitle}
                    onChange={this.onNewsTitleChange}
                />
                <br />
                <input type="text" id="news_text"
                    className="NewsPoster_newsText"
                    value={this.state.form.newsText}
                    onChange={this.onNewsTextChange}
                />
                <br />
                <input type="text" id="news_image"
                    className="NewsPoster_newsImage"
                    value={this.state.form.newsImage}
                    onChange={this.onNewsImageChange}
                />
                <br />
                <input type="submit" value="Post" />
            </form>
        </div>;
    }
}
