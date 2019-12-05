import axios from 'axios';
import Auth from '../auth/Auth';

const URL = process.env.REACT_APP_MAZE_SERVER_URL;

export const submitCode = (tikalId, questionId, code, time) =>
  axios({
    method: 'post',
    headers: {
      Authorization: `Bearer ${Auth.getAccessToken()}`,
    },
    url: `${URL}/post-answer`,
    data: {
      code,
      questionId,
      tikalId,
      time,
    },
  });

export const getAttempts = (tikalId, questionId) =>
  axios({
    method: 'get',
    headers: {
      Authorization: `Bearer ${Auth.getAccessToken()}`,
    },
    url: `${URL}/attempts/${tikalId}/${questionId}`,
  });

export const timeUp = (tikalId, questionId, code) =>
  axios({
    method: 'post',
    headers: {
      Authorization: `Bearer ${Auth.getAccessToken()}`,
    },
    url: `${URL}/time-up`,
    data: {
      code,
      questionId,
      tikalId,
    },
  });
