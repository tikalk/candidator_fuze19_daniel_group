/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { CandidatorContainer } from '../containers';
import Callback from '../auth/Callback';
import Auth from '../auth/Auth';
import HomeContainer from '../containers/HomeContainer';
import FinishContainer from '../containers/FinishContainer';
import history from '../auth/history';
import Header from '../components/Header';
import Card from '../components/Card';

const auth = new Auth();

const Container = styled(Card)`
  text-align: center;
  width: 80%;
  background-color: #f0f0f0;
`;

function Routes() {
  const handleAuthentication = nextState => {
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
      auth.handleAuthentication();
    }
  };

  return (
    <Router history={history}>
      <Container>
        <Header auth={auth} history={history} />
        <Switch>
          <Route path="/" exact render={props => <HomeContainer {...props} auth={auth} />} />
          <Route path="/questions/:questionId?" render={props => <CandidatorContainer {...props} auth={auth} />} />
          <Route path="/finished" exact render={props => <FinishContainer {...props} auth={auth} />} />
          <Route
            path="/callback"
            render={props => {
              handleAuthentication(props);
              return <Callback {...props} />;
            }}
          />
        </Switch>
      </Container>
    </Router>
  );
}

export default Routes;
