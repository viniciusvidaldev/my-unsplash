import styled, { css, CSSProp } from "styled-components";

interface ButtonProps {
  customStyles?: CSSProp;
  noBackground?: boolean;
}

export const Button = styled.button<ButtonProps>`
  width: 100%;
  height: 100%;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.1);
  border: 0;
  color: ${({ theme }) => theme.colors.white};
  font-family: 'Noto Sans', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;

  ${({ theme, customStyles, noBackground }) => css`
    ${customStyles && customStyles}
    
    ${noBackground && css`
      background: none;
      box-shadow: none;
    `}
  `};
`;