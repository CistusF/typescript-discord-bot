import express from 'express';
import fetch from 'node-fetch';
import config from './config';

class App {
    public application: express.Application;
    constructor() {
        this.application = express();
    };
};

const app = new App().application;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const oauth = async (code: any, type: 'authorization_code' | 'refresh_token') => {
    const oauthResult = await fetch('https://discord.com/api/oauth2/token', {
        method: 'POST',
        body: "client_id=" + config.id + "&client_secret=" + config.secret + "&refresh_token=" + code + "&code=" + code + "&grant_type=" + type + "&redirect_uri=" + encodeURIComponent(config.proxy) + "&scope=identify",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
    return await oauthResult.json();
};

const getUser = async (oauth: oauthResultJson) => {
    let userData = await fetch('https://discord.com/api/users/@me', {
        headers: {
            authorization: `${oauth.token_type} ${oauth.access_token}`,
        },
    });
    const userJson: userInfo = await userData.json();
    userJson.avatar = 'https://cdn.discordapp.com/avatars/' + userJson.id + '/' + userJson.avatar;
    userJson.tag = userJson.username + "#" + userJson.discriminator;
    return userJson;
};

app.get("/callback", async (req: express.Request, res: express.Response) => {
    let { code } = req.query;
    if (!code) return res.status(404).end("Page is not found");
    try {
        let oauthResult: oauthResultJson = await oauth(code, "authorization_code");
        const user: userInfo | error = await getUser(oauthResult);
        console.log(user);
        res.cookie("token", JSON.stringify(oauthResult));
        res.cookie("userData", JSON.stringify(user));
        res.status(200).redirect(config.redirect);
    } catch (error) {
        console.error(error);
    };
});

app.listen(3001, () => {
    console.log("api server is on");
});


interface oauthResultJson {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
    token_type: string;
}

interface userInfo {
    id: string;
    username: string;
    avatar: string;
    discriminator: string;
    public_flags: number;
    flags: number;
    banner: null | string;
    banner_color: string;
    accent_color: number;
    locale: string;
    mfa_enabled: boolean;
    email: string;
    verified: boolean;
    tag?: string;
};

interface error {
    message: string;
    code: 0;
}