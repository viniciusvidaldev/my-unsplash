import * as S from './styles';
import { ReactComponent as MyUnsplashLogo } from '../../assets/my_unsplash_logo.svg';
import { Input } from '../Input';
import { BsSearch } from 'react-icons/bs';
import { Button } from '../Button';
import { ChangeEvent } from 'react';

interface HeaderProps {
  handleAddPhoto: () => void;
  inputValue: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function Header({ handleAddPhoto, inputValue, handleChange }: HeaderProps) {
  return (
    <S.Container>
      <S.LeftSide>
        <MyUnsplashLogo />

        <S.InputContainer>
          <Input
            id="search-name"
            borderColor="#BDBDBD"
            leftIcon={<BsSearch />}
            color="#BDBDBD"
            placeholder="Search by name"
            value={inputValue}
            onChange={(event) => handleChange(event)}
          />
        </S.InputContainer>
      </S.LeftSide>

      <S.ButtonWrapper>
        <Button customStyles={{ fontSize: '0.875rem', background: '#3DB46D' }} onClick={handleAddPhoto}>
          Add a photo
        </Button>
      </S.ButtonWrapper>
    </S.Container>
  )
}