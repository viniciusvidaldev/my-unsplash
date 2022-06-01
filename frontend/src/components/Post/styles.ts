import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  max-width: 393px;
  max-height: 582px;
  width: 100%;
  height: 100%;
  user-select: none;
  margin: 0;
  display: grid;
  grid-template-rows: 1fr auto;
  margin-bottom: 10px;
  break-inside: avoid;

  img {
    width: 100%;
    height: 100%;
    border-radius: 24px;
    display: block;
    grid-row: 1 / -1;
    grid-column: 1;
  }
`;

export const PostContent = styled.div`
  width: 100%;
  height: 100%;
  opacity: 0;
  position: absolute;
  top: 0;
  right: 0;
  border-radius: 24px;
  background: rgba(0, 0, 0, 0.38);

  &:hover {
    opacity: 1;
  }
  
  button {
    background: none;
    border: 1px solid ${({ theme }) => theme.colors.red};
    width: 63px;
    height: 23px;
    position: absolute;
    top: 18px;
    right: 18px;
    font-family: 'Montserrat', sans-serif;
    font-size: 0.625rem;
    font-weight: 500;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.red};
    border-radius: 38px;
    user-select: none;
    z-index: 10;
  }

  h3 {
    position: absolute;
    z-index: 10;
    left: 24px;
    bottom: 32px;
    font-family: 'Montserrat', sans-serif;
    font-size: 1.125rem;
    color: ${({ theme }) => theme.colors.white};
    font-weight: 700;
  }
`;