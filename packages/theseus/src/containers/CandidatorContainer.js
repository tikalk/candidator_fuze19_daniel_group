import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import Question from '../components/Question';
import Editor from '../components/Editor';
import rest from '../api/rest';
import { submitCode, getAttempts, timeUp } from '../api/api';
import { setToast, setTimeSpent, setAttempts } from '../actions/CandidatorActions';
import Button from '../components/Button';
import Card from '../components/Card';

const Container = styled.div`
  padding: 20px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 1rem;
  align-items: center;
  background-color: #e3e3e3;
`;

function CandidatorContainer({ auth }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState();

  const candidateQuestions = useSelector(state =>
    state.candidateQuestions.data ? state.candidateQuestions.data.questions : null
  );
  const isCandidateQuestionsPending = useSelector(state => state.candidateQuestions.request);
  const user = useSelector(state => (state.user.data ? state.user.data.data : null));
  const toastMessage = useSelector(state => state.toastMessage);
  const timeSpent = useSelector(state => state.timeSpent);
  const attempts = useSelector(state => state.attempts);

  const dispatch = useDispatch();

  const history = useHistory();

  const showToast = useCallback(() => {
    if (toastMessage) {
      toast[toastMessage.type](toastMessage.message, {
        position: toast.POSITION.TOP_CENTER,
      });
      dispatch(setToast(null));
    }
  }, [toastMessage, dispatch]);

  const onTimeUpdate = time => {
    dispatch(setTimeSpent(time));
  };

  const nextQuestion = () => {
    const isNextDisabled = candidateQuestions ? currentQuestionIndex === candidateQuestions.length - 1 : false;

    if (!isNextDisabled) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      history.push('/finished');
    }
  };

  const onTimeUp = () => {
    timeUp(user, currentQuestion._id, currentQuestion.codeTemplate).then(() => {
      dispatch(
        setToast({
          type: 'warn',
          message: "Time's up... Moving on",
        })
      );
      nextQuestion();
    });
  };

  useEffect(() => {
    if (!auth.isAuthenticated()) {
      history.replace('/');
    }
  }, [auth, history]);

  useEffect(() => {
    if (isEmpty(user)) {
      dispatch(rest.actions.user());
    }

    showToast();
    if (!isEmpty(user) && !isCandidateQuestionsPending) {
      dispatch(rest.actions.candidateQuestions({ tikalId: user }));
    }
  }, [user, isCandidateQuestionsPending, dispatch, showToast]);

  useEffect(() => {
    if (candidateQuestions && candidateQuestions.length > 0) {
      setCurrentQuestionIndex(currentQuestionIndex);
      setCurrentQuestion(candidateQuestions[currentQuestionIndex]);

      getAttempts(user, candidateQuestions[currentQuestionIndex]._id).then(response => {
        dispatch(setAttempts(response.data));
      });
    }
  }, [user, candidateQuestions, dispatch, currentQuestionIndex]);

  const submitQuestion = () => {
    submitCode(user, currentQuestion._id, currentQuestion.codeTemplate, timeSpent)
      .then(response => response.data)
      .then(response => {
        dispatch(setAttempts(response.attempts));
        if (response.pass) {
          dispatch(
            setToast({
              type: 'success',
              message: 'Good Job! You can advance to the next question',
            })
          );
        } else {
          dispatch(
            setToast({
              type: 'warn',
              message: 'Tests Failed... Try again',
            })
          );
        }
        if (response.pass || response.attempts >= currentQuestion.attempts) {
          nextQuestion();
        }
      })
      .catch(() =>
        dispatch(
          setToast({
            type: 'error',
            message: "Something's wrong... Please try again later",
          })
        )
      );
  };

  const updateEditorCode = useCallback(
    code => {
      const updated = { ...currentQuestion, codeTemplate: code };

      setCurrentQuestion(updated);
    },
    [currentQuestion]
  );

  return (
    <Container>
      {auth.isAuthenticated() && (
        <div>
          <ToastContainer autoClose={3000} />
          {currentQuestion && (
            <div>
              <Question
                attempts={attempts}
                onTimeUpdate={time => onTimeUpdate(time)}
                question={currentQuestion}
                onTimeUp={() => onTimeUp()}
              />
              <Card>
                <Editor codeTemplate={currentQuestion.codeTemplate} onChange={updateEditorCode} />
                <Footer>
                  <Button primary onClick={submitQuestion}>
                    Submit
                  </Button>
                  {/* <Button disabled={isNextDisabled} onClick={this.nextQuestion}> */}
                  {/* Next */}
                  {/* </Button> */}
                </Footer>
              </Card>
            </div>
          )}
        </div>
      )}
    </Container>
  );
}

export default CandidatorContainer;
