import * as S from './styles';

interface SpinnerLoaderProps {
  isLoading: boolean;
  size?: number;
}

export function SpinnerLoader({ isLoading, size = 30 }: SpinnerLoaderProps) {
  if (!isLoading) {
    return null;
  }

  return (
    <S.Loader size={size} />
  )
}