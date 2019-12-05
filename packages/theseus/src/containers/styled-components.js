import styled from 'styled-components';

const Content = styled.div`
  font-family: Monaco, Menlo, 'Ubuntu Mono', Consolas, source-code-pro, monospace;
  text-align: left;
  padding: 2rem 4rem;
`;

const ButtonWrapper = styled.div`
  text-align: center;
  padding: 2rem;
`;

const Select = styled.select`
  font-family: inherit;
  font-size: 1.2rem;
  background-color: transparent;
  width: 200px;
  margin: 0 2rem;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);

  &:focus {
    outline: none;
  }
`;

export default {
  Content,
  ButtonWrapper,
  Select,
};
