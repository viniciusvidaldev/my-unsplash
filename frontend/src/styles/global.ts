import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    width: 100%;
    background: ${({ theme }) => theme.colors.white};
    font-family: 'Noto Sans', sans-serif;
  }
`;
