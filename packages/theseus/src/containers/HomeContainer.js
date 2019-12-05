import React from 'react';
import { connect } from 'react-redux';
import { markdown } from 'markdown';
import Button from '../components/Button';
import Styled from './styled-components';
import text from './homepage-intro';

// const Options = ['Javascript', 'Java', 'Python'];

export function HomeContainer({ auth, language }) {
  const login = () => {
    auth.login(language);
  };
  return (
    <Styled.Content>
      <div dangerouslySetInnerHTML={{ __html: markdown.toHTML(text) }} />
      {!auth.isAuthenticated() && (
        <Styled.ButtonWrapper>
          {/* <Styled.Select onChange={v => setLanguage(v.target.value)}>
            {Options.map((option, i) => (
              <option key={`option-${i}`}>{option}</option>
            ))}
          </Styled.Select> */}
          <Button primary onClick={login}>
            Start
          </Button>
        </Styled.ButtonWrapper>
      )}
    </Styled.Content>
  );
}

function mapStateToProps(state) {
  return {
    language: state.candidator.language,
  };
}

// function mapDispatchToProps(dispatch) {
//   return {
//     setLanguage: bindActionCreators(CandidatorActions.setLanguage, dispatch),
//   };
// }

export default connect(mapStateToProps)(HomeContainer);
