import { InputHTMLAttributes, ReactNode } from 'react';
import * as S from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  borderColor?: string;
  leftIcon?: ReactNode;
  id: string;
  label?: string;
  error?: string;
}

export function Input({ borderColor, leftIcon, id, label, error, ...rest }: InputProps) {
  return (
    <S.Container>

      <S.LabelWrapper>
        <label htmlFor={id}>{label}</label>
      </S.LabelWrapper>

      <S.Wrapper borderColor={borderColor} error={error}>
        {leftIcon && (
          <label htmlFor={id}>
            {leftIcon}
          </label>
        )}

        <input type="text" id={id} {...rest} autoComplete="off" />
      </S.Wrapper>

      {error && (
        <S.Error>
          <p>{error}</p>
        </S.Error>
      )}
    </S.Container>
  )
}