import styled from "styled-components";

export const Overlay = styled.div`
  background: rgba(0, 0, 0, 0.25);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Container = styled.div`
  max-width: 620px;
  width: 100%;
  margin: 0 auto;
  padding: 32px;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 12px;

  > h2 {
    font-weight: 500;
    color: ${({ theme }) => theme.colors.gray};
  }

  .passwordInput {
    margin-top: 24px;
  }
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 24px;
  
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