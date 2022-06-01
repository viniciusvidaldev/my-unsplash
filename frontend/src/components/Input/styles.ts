import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  width: 100%;

  
`;

export const LabelWrapper = styled.div`
  margin-bottom: 9px;
  
  label {
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.lightGray};
  } 
`;

interface WrapperProps {
  borderColor?: string;
  error?: string;
}

export const Wrapper = styled.div<WrapperProps>`
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  border-radius: 12px;
  display: flex;
  align-items: center;
  filter: drop-shadow(0px 1px 6px rgba(0, 0, 0, 0.1));

  border-color: ${({ borderColor }) => borderColor && borderColor};
  border-color: ${({ error, theme }) => error && theme.colors.red};


  width: 100%;
  height: 100%;
  /* gap: 16px; */

  label {
    /* width: 100%; */
    height: 100%;
    display: flex;
    align-items: center;
    padding-left: 18px;

    svg {
      width: 24px;
      height: 24px;

      /* margin-left: 18px; */
      /* margin-left: 18px; */
      flex-shrink: 0;
    }
  }

  input {
    width: 100%;
    height: 100%;
    padding: 18px;

    font-size: 0.875rem;
    font-family: 'Noto Sans', sans-serif;
    background: none;
    border: 0;
    outline: none;
    color: ${({ theme }) => theme.colors.lightGray};

    ::placeholder {
      color: ${({ theme }) => theme.colors.lighterGray};
    }
  }
`;

export const Error = styled.div`
  margin-top: 0.5rem;

  p {
    font-size: 0.875rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.red};
  }
`;