import styled, { css } from "styled-components";

interface ContainerProps {
  isModalOpen: boolean;
}

export const Container = styled.div<ContainerProps>`
  max-width: 1242px;
  width: 100%;
  margin: 0 auto;
  margin-top: 32px;
  padding-bottom: 32px;
  position: relative;

  ${({ isModalOpen }) => {
    return isModalOpen && css`
    overflow: hidden;
  `
  }}
`;

export const PostsContainer = styled.div`
  width: 100%;
  margin-top: 72px;
  position: relative;

  column-count: 4;
  column-gap: 10px;

  .loading {
    position: absolute;
    left: 50%;
    top: 10rem;
    transform: translateX(-50%);
  }
`;