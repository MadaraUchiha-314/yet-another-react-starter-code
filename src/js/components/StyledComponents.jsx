import styled, { createGlobalStyle } from 'styled-components';

export const SpinnerContainer = styled.div`
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const GlobalCSS = createGlobalStyle`
  body {
    background: #ffffff;
  }
`;
