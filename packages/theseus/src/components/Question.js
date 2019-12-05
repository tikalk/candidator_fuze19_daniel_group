import React from 'react';
import PropTypes from 'prop-types';
import { markdown } from 'markdown';
import styled from 'styled-components';
import Timer from './Timer';
import Colors from '../styles/Colors';

const QuestionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;
`;

const HeroImage = styled.img`
  max-width: 20%;
  max-height: 200px;
`;

const QuestionText = styled.div`
  width: 100%;
  text-align: left;
  overflow-y: auto;
  padding-right: 2rem;
`;

const Attempts = styled.div`
  color: ${props => (props.attempts === props.maxAttempts ? Colors.warnRed : 'inherit')};
`;

function Question({ question, onTimeUpdate, attempts, onTimeUp }) {
  return (
    <div>
      <QuestionContainer>
        <QuestionText
          dangerouslySetInnerHTML={{
            __html: markdown.toHTML(question.description),
          }}
        />
        <HeroImage src={question.heroImage} />
      </QuestionContainer>
      <Attempts attempts={attempts} maxAttempts={question.attempts}>
        Attempts: {attempts}/{question.attempts}
      </Attempts>
      <Timer
        key={question._id}
        onTimeUpdate={onTimeUpdate}
        onTimeUp={onTimeUp}
        label="Time Left"
        minutes={question.time.minutes}
        seconds={question.time.seconds}
      />
    </div>
  );
}

Question.propTypes = {
  onTimeUpdate: PropTypes.func,
  onTimeUp: PropTypes.func,
  question: PropTypes.shape({
    description: PropTypes.string.isRequired,
    heroImage: PropTypes.string.isRequired,
  }).isRequired,
};

export default Question;
