import styled from 'styled-components';

export const Button = styled.button`
  border-width: 0;
  outline: none;
  border-radius: 2px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.6);

  background-color: ${props => (props.primary ? '#43A047' : '#0288D1')};
  color: ${props => (props.primary ? '#FFF' : '#FFF')};

  transition: background-color 0.3s;
  font-size: 1.2rem;
  padding: 0.2rem 0.8rem;

  margin: 0 1rem;

  &:hover {
    background-color: ${props => (props.primary ? '#1B5E20' : '#01579B')};
  }
`;

export default Button;
