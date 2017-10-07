import Matrix from 'matrix-js-sdk';

const HS_URL = 'http://localhost:8008';

export default class AdminApp {
    constructor() {
        this.roomId = '!ZXWnBDycJoVXJHZDmf:localhost';

        this.creds = this.getSavedCreds();
        this.makeClient();
    }

    makeClient() {
        const opts = {
            baseUrl: HS_URL,
            timelineSupport: true,
        };

        if (this.creds) {
            opts.accessToken = this.creds.accessToken;
            opts.userId = this.creds.userId;
        }

        this.matrixClient = Matrix.createClient(opts);

        if (this.creds) this.matrixClient.startClient();
    }

    login(user, pass) {
        return this.matrixClient.login('m.login.password', {
            password: pass,
            identifier: {
                type: 'm.id.user',
                user: user,
            },
        }).then((data) => {
            this.creds = {
                userId: data.user_id,
                accessToken: data.access_token,
            };
            global.localStorage.setItem('accessToken', this.creds.accessToken);
            global.localStorage.setItem('userId', this.creds.userId);
            this.makeClient();
            if (this.onLoginStateChanged) this.onLoginStateChanged();
        });
    }

    getSavedCreds() {
        const accessToken = global.localStorage.getItem('accessToken');
        const userId = global.localStorage.getItem('userId');
        if (accessToken && userId) {
            return { accessToken, userId };
        }
        return null;
    }
}
