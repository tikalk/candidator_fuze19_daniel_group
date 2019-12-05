import React, { Component } from 'react';
import styled from 'styled-components';
import Colors from '../styles/Colors';

const StyledDiv = styled.div`
  color: ${props => (props.timeLeft > 10000 ? Colors.goodGreen : Colors.warnRed)};
`;

const Label = styled.div`
  margin: 0 1rem;
`;

const Container = styled.div`
  display: flex;
  margin-left: auto;
  justify-content: center;
`;

export default class Timer extends Component {
  static initTime = props => {
    const { minutes = 0 } = props;
    const { seconds = 0 } = props;
    const timeLeft = minutes * 60 * 1000 + seconds * 1000;
    return {
      timeLeft,
      startTime: Date.now(),
      endTime: Date.now() + timeLeft,
    };
  };

  constructor(props) {
    super(props);
    this.state = Timer.initTime(props);
  }

  componentDidMount() {
    const { onTimeUpdate, onTimeUp } = this.props;
    this.timer = setInterval(() => {
      const { endTime, timeLeft, startTime } = this.state;
      if (timeLeft <= 0) {
        clearInterval(this.timer);
        onTimeUp();
      }
      this.setState({
        timeLeft: Math.max(endTime - Date.now(), 0),
      });
      onTimeUpdate(Date.now() - startTime);
    }, 200);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  getMinutesRemaining() {
    const { timeLeft } = this.state;
    return Math.floor(timeLeft / (60 * 1000));
  }

  getSecondsRemaining() {
    const { timeLeft } = this.state;
    return Math.floor(timeLeft / 1000 - this.getMinutesRemaining() * 60);
  }

  appendZero(num) {
    if (num < 10) {
      return `0${num}`;
    }
    return `${num}`;
  }

  render() {
    const { label } = this.props;
    const { timeLeft } = this.state;
    return (
      <Container>
        <Label>{label}: </Label>
        <StyledDiv timeLeft={timeLeft}>
          <span>{this.appendZero(this.getMinutesRemaining())}</span>:
          <span>{this.appendZero(this.getSecondsRemaining())}</span>
        </StyledDiv>
      </Container>
    );
  }
}
