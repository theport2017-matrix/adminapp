import Matrix from 'matrix-js-sdk';

export default class AdminApp {
    constructor() {
        this.roomId = '!ZXWnBDycJoVXJHZDmf:localhost';

        const opts = {
            baseUrl: 'http://localhost:8008',
            accessToken: '',
            userId: '',
            timelineSupport: true,
        };
        this.matrixClient = Matrix.createClient(opts);

        this.matrixClient.startClient();
    }
}
