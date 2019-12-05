import reduxApi from 'redux-api';
import Auth from '../auth/Auth';

const URL = process.env.REACT_APP_MAZE_SERVER_URL;

export default reduxApi({
  candidateQuestions: {
    url: `${URL}/questions/:tikalId`,
    cache: { expire: 5000 },
    options: () => ({
      headers: {
        Authorization: `Bearer ${Auth.getAccessToken()}`,
      },
    }),
  },
  user: {
    url: `${URL}/create-user`,
    options: (url, params, getState) => ({
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: localStorage.getItem('email'),
        id: localStorage.getItem('sub'),
        name: localStorage.getItem('name'),
        pic: localStorage.getItem('picture'),
        language: getState().candidator.language,
      }),
    }),
  },
});
