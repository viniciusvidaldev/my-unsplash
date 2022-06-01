import { ButtonHTMLAttributes, ReactNode } from 'react';
import { CSSProp } from 'styled-components';
import { SpinnerLoader } from '../SpinnerLoader';
import * as S from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  noBackground?: boolean;
  customStyles?: CSSProp;
  isLoading?: boolean;
}

export function Button({ children, noBackground, customStyles, isLoading, ...rest }: ButtonProps) {
  if (isLoading) {
    return (
      <S.Button
        noBackground={noBackground}
        customStyles={customStyles}
        {...rest}
      >
        <SpinnerLoader isLoading={isLoading} size={20} />
      </S.Button>
    )
  }

  return (
    <S.Button
      noBackground={noBackground}
      customStyles={customStyles}
      {...rest}
    >
      {children}
    </S.Button>
  )
}