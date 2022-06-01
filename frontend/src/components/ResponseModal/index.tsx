import ReactDOM from 'react-dom';
import { BsCheckCircleFill } from 'react-icons/bs';

import * as S from './styles';

interface ResponseModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  message?: string;
}

export function ResponseModal({ isOpen, onRequestClose, message }: ResponseModalProps) {
  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <S.Overlay onMouseDown={onRequestClose}>
      <S.Wrapper onMouseDown={e => e.stopPropagation()}>
        <BsCheckCircleFill />

        <p>{message || ''}</p>
      </S.Wrapper>
    </S.Overlay>,
    document.getElementById('response-modal') as HTMLElement
  )
}