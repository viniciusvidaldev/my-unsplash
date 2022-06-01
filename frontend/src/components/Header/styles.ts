import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const LeftSide = styled.div`
  display: flex;
  align-items: center;

  svg {
    color: ${({ theme }) => theme.colors.gray};
  }
`;

export const InputContainer = styled.div`
  width: 300px;
  height: 55px;
  margin-left: 32px;
`;

export const ButtonWrapper = styled.div`
  width: 137px;
  height: 55px;
`;