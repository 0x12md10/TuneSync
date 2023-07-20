import axios from "axios";
const CLIENT_ID = "366826251818-brmjuhbqp4arls50m7rf6p4dph2fpo3r.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URL = "http://localhost:5173/migrate/yt-auth-callback";

// const oauth2Client = new google.auth.OAuth2(
//     CLIENT_ID,
//     CLIENT_SECRET,
//     REDIRECT_URL
//   );
  

  const scopes = [
    'https://www.googleapis.com/auth/youtube',
    'https://www.googleapis.com/auth/youtube.readonly'
  ];

//   const auth_url = oauth2Client.generateAuthUrl({

//     access_type: 'offline',
//     scope: scopes
//   });

//   console.log(auth_url)

// const auth_url = `https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube.readonly&response_type=code&client_id=${CLIENT_ID}&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fyt-auth-callback`

// const ytAuth = () => {
//     window.location.href = auth_url;
// }



// export default ytAuth;


export const getGoogleUrl =  async() => {

    
    const rootUrl = `https://accounts.google.com/o/oauth2/v2/auth`;
  
    const options = {
      redirect_uri:REDIRECT_URL ,
      client_id: CLIENT_ID ,
      access_type: "offline",
      response_type: "code",
      prompt: "consent",
      scope: scopes.join(" ")
    };
  
    const qs = new URLSearchParams(options);

  
    window.location.href = `${rootUrl}?${qs.toString()}`;
  };

  export const getAccessToken = async (code) => {
    try {
      const response = await axios.post('https://oauth2.googleapis.com/token', {
        code,
        client_id: CLIENT_ID,
        redirect_uri: REDIRECT_URL,
        client_secret : CLIENT_SECRET,
        grant_type: 'authorization_code',
      });
      console.log(response.data);
      const data = JSON.stringify(response.data);
      localStorage.setItem('yt_tokens', data);

    }
    catch (error) {
        console.error('Error fetching access token:', error);
      }
}