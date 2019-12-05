import React from 'react';
import Styled from './styled-components';

export function FinishContainer({ auth }) {
  auth.logout();

  return <Styled.Content>Thank you for taking the test</Styled.Content>;
}

export default FinishContainer;
