import { createActions, handleActions, combineActions } from 'redux-actions';

export const { setLanguage } = createActions({
  SET_LANGUAGE: language => ({ language }),
});

export const reducer = handleActions(
  {
    [combineActions(setLanguage)](state, { payload: { language } }) {
      return { ...state, language };
    },
  },
  { language: 'Javascript' }
);

export const setToast = toast => ({
  type: 'SET_TOAST',
  payload: toast,
});

export const toastMessage = (state = null, action) => {
  if (action.type === 'SET_TOAST') {
    return action.payload;
  }
  return state;
};

export const setTimeSpent = timeLeft => ({
  type: 'SET_TIME_SPENT',
  payload: timeLeft,
});

export const timeSpent = (state = 0, action) => {
  if (action.type === 'SET_TIME_SPENT') {
    return action.payload;
  }
  return state;
};

export const setAttempts = attempts => {
  return {
    type: 'SET_ATTEMPTS',
    payload: attempts,
  };
};

export const attempts = (state = 1, action) => {
  if (action.type === 'SET_ATTEMPTS') {
    return action.payload + 1;
  }
  return state;
};
