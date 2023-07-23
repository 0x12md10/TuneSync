import {setCookie,getCookie} from "./cookieSetup";

// Generate code verifier
const  generateRandomString = (length) => {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

// generate code challenge
async function generateCodeChallenge(codeVerifier) {
    function base64encode(string) {
        return btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);

    return base64encode(digest);
  }
  
//   auth 


export const getToken = async()=> {
    const clientId = 'a41ccb31150241f7b6c45e55e38d5beb';
    const redirectUri = 'http://localhost:5173/migrate/spotify-auth-callback';
    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get('code');
    const codeVerifier = getCookie("sp_code_verifier")
    
    console.log("in the auth flow")
    
    let body = new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectUri,
        client_id: clientId,
        code_verifier: codeVerifier
        });

       const response =  await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: body
        }) 
        if (!response.ok) {
            throw new Error('HTTP status ' + response.status);
            }
        const data = await response.json();
        const {access_token ,expires_in ,refresh_token} =  data;
        setCookie("sp_access_token",access_token , expires_in);
        setCookie("sp_refresh_token" ,refresh_token,expires_in);
        return data;
    }

export const authFlow = async() => {


    const clientId = 'a41ccb31150241f7b6c45e55e38d5beb';
    const redirectUri = 'http://localhost:5173/migrate/spotify-auth-callback';

    let codeVerifier = generateRandomString(128);

    const codeChallenge = await generateCodeChallenge(codeVerifier);
    let state = generateRandomString(16);
    let scope = 'user-read-private user-read-email playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public';

    setCookie("sp_code_verifier" , codeVerifier,3600);


    let args = new URLSearchParams({
        response_type: 'code',
        client_id: clientId,
        scope: scope,
        redirect_uri: redirectUri,
        state: state,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge
      });

      window.location = 'https://accounts.spotify.com/authorize?' + args;
}



