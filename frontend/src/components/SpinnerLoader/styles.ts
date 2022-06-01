import styled, { css } from "styled-components";

export const Loader = styled.div<{ size?: number }>`
  ${({size}) => css`
    width: ${size}px;
    height: ${size}px;
  `}
  color: ${({ theme }) => theme.colors.lightGray};
  position: relative;
  display: inline-block;
  border: 1px solid;
  border-radius: 50%;
  border-top-color: transparent;
  animation: rotate 1s linear infinite;

  @keyframes rotate {
    0% {
      transform: rotate(0); 
    }

    100% {
      transform: rotate(360deg); 
    }
  }
`;