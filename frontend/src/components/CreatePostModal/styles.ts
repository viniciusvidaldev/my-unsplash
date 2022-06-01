import styled, { css } from "styled-components";

export const Overlay = styled.div`
  background: rgba(0, 0, 0, 0.25);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  padding: 2rem;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;

    
`;

export const Container = styled.div`
  max-width: 620px;
  width: 100%;
  margin: 0 auto;
  max-height: 100%;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.white};
  padding: 32px;
  overflow: auto;
  /* margin: 2rem 0; */

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const Form = styled.form`
  display: flex;
  gap: 20px;
  flex-direction: column;
  margin-top: 20px;

  .or {
    align-self: center;

    p {
      font-size: 0.8rem;
      font-weight: 500; 
      color: ${({ theme }) => theme.colors.lightGray};
    }
  }
`;

export const DropzoneWrapper = styled.div`
  width: 100%;

  .error {
    margin-top: 0.5rem;

    p {
      font-size: 0.875rem;
      font-weight: 400;
      color: ${({ theme }) => theme.colors.red};
    }
  }
`;

interface DropzoneContainerProps {
  error?: {
    field: string;
    message: string;
  };
}

export const DropzoneContainer = styled.div<DropzoneContainerProps>`
  height: 150px;
  width: 100%;
  border: ${({ theme }) => `1px dashed ${theme.colors.lightGray}`};
  border-radius: 12px;
  /* background: ${({ theme }) => theme.colors.lightGray}; */
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  ${({ error, theme }) => error && css`
    border-color: ${theme.colors.red};
  `}

  p {
    margin-top: 16px;
    font-weight: 500;
    font-size: 0.75rem;
    color: ${({ theme }) => theme.colors.lightGray};
  }
`;

export const ImagePreview = styled.div`
  position: relative;
  max-height: 250px;
  
  img {
    width: 100%;
    max-height: 250px;
    border-radius: 12px; 
    object-fit: cover;
  }

  .removePreview {
    position: absolute;
    top: 16px;
    right: 16px;

    display: flex;
    align-items: center;
    justify-content: center;

    background: ${({ theme }) => theme.colors.lighterGray};
    /* filter: brightness(0.5); */

    width: 24px;
    height: 24px;
    border-radius: 50%;
    cursor: pointer;
  }

  .spinnerLoaderContainer {
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-16px);
    margin-top: 16px;
  }
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 4px;
  
  .cancel {
    width: 52px;
    height: 22px;
  }

  .confirm {
    width: 105px;
    height: 55px;
    margin-left: 24px;
  }
`;
