// import auth0 from 'auth0-js'; // no-unused-vars
import autoBind from 'react-autobind';
import history from './history';

export default class Auth {
  // auth0 = new auth0.WebAuth({
  //   domain: process.env.REACT_APP_AUTH0_DOMAIN,
  //   clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
  //   redirectUri: process.env.REACT_APP_AUTH0_REDIRECT_URI,
  //   audience: process.env.REACT_APP_AUTH0_AUDIENCE,
  //   scope: 'openid email profile read:questions',
  //   responseType: 'token id_token',
  // });

  static getAccessToken() {
    return localStorage.getItem('access_token');
  }

  constructor() {
    autoBind(this);
  }

  login() {
    // this.auth0.authorize();
    setTimeout(() => {
      this.setSession({});
      history.replace('/questions/');
    }, 0);
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        history.replace('/questions/');
      } else if (err) {
        history.replace('/');
        console.log(err); // eslint-disable-line
      }
    });
  }

  setSession(authResult) {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify(100000 * 1000 + new Date().getTime());
    localStorage.setItem('access_token', '123');
    localStorage.setItem('id_token', '456');
    localStorage.setItem('expires_at', expiresAt);
    localStorage.setItem('email', 'aa@a.com');
    localStorage.setItem('sub', 'aa');
    localStorage.setItem('name', 'jon dir');
    localStorage.setItem('picture', '');
    localStorage.setItem('hkjsfhlav', authResult);

    // localStorage.setItem('access_token', authResult.accessToken);
    // localStorage.setItem('id_token', authResult.idToken);
    // localStorage.setItem('expires_at', expiresAt);
    // localStorage.setItem('email', authResult.idTokenPayload.email);
    // localStorage.setItem('sub', authResult.idTokenPayload.sub);
    // localStorage.setItem('name', authResult.idTokenPayload.nickname);
    // localStorage.setItem('picture', authResult.idTokenPayload.picture);

    // navigate to the home route
    history.replace('/questions/');
  }

  logout(redirect) {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('email');
    localStorage.removeItem('sub');

    // navigate to the home route
    if (redirect) {
      history.replace('/');
    }
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}
