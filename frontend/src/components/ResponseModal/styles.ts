import styled from "styled-components";

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

export const Wrapper = styled.div`
  max-width: 250px;
  width: 100%;
  margin: 0 auto;
  background: ${({ theme }) => theme.colors.white};
`;