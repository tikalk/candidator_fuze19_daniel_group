import { createGlobalStyle } from 'styled-components';

/* eslint no-unused-expressions: 0 */
export const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: Monaco, Menlo, 'Ubuntu Mono', Consolas, source-code-pro, monospace;
  }   
`;
