import jwt from "jsonwebtoken";

function getGoogleAuth() {

    const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';

    const options = {
        redirect_uri: process.env.GOOGLE_CALLBACK_URL,
        client_id: process.env.GOOGLE_CLIENT_ID,
        access_type: 'offline',
        response_type: 'code',
        prompt: 'consent',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email',
        ].join(' '),
    }

    const qs = new URLSearchParams(options)
    // console.log(qs.toString());

    return `${rootUrl}?${qs.toString()}`
}

async function getGoogleData(code) {
    const url = `https://oauth2.googleapis.com/token`;

    const options = {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_CALLBACK_URL,
        grant_type: 'authorization_code',
    }

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(options)
    })

    // we collect access token from the Code
    const { access_token } = await response.json();

    // we use the access token to get the user data
    const getUserDataUrl = `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`;
    const userData = await fetch(getUserDataUrl);
    return await userData.json();
}

function createTokenForGoogle(user) {
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
    const options = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: false,
    };

    return { token, options };
}

export { getGoogleAuth, getGoogleData, createTokenForGoogle }
