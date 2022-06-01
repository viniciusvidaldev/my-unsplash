import { ChangeEvent, useState } from 'react';
import ReactDOM from 'react-dom';
import toast from 'react-hot-toast';
import { useErrors } from '../../hooks/useErrors';
import { postsService } from '../../services/PostsService';
import { Button } from '../Button';
import { Input } from '../Input';
import * as S from './styles';

interface ModalProps {
  onRequestClose: () => void;
  isOpen: boolean;
  id: string;
  openModal: (name: string) => void;
}

export function ConfirmationModal({ onRequestClose, isOpen, id, openModal }: ModalProps) {
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { setError, getErrorMessageByFieldname, removeError } = useErrors();

  function handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;

    setPassword(value);

    if (value) {
      removeError('password');
    }
  }

  async function handleSubmit() {
    if (!password) {
      setError({
        field: 'password',
        message: 'Enter your password'
      });

      return;
    }

    if (!getErrorMessageByFieldname('password')) {
      try {
        setIsSubmitting(true);
        await postsService.deletePost(id, password);
        setIsSubmitting(false);
        toast.success('Post deleted', {
          duration: 2000
        });
        onRequestClose();
      } catch (err: any) {
        toast.error(err.message);
        setIsSubmitting(false);
      }
    }
  }

  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <S.Overlay onMouseDown={onRequestClose}>
      <S.Container onMouseDown={event => event.stopPropagation()}>
        <h2>Are you sure?</h2>

        <div className="passwordInput">
          <Input
            id="confirm-input"
            label="Password"
            borderColor="#4f4f4f"
            type="password"
            placeholder="Enter your password..."
            onChange={handlePasswordChange}
            value={password}
            error={getErrorMessageByFieldname('password')}
          />
        </div>

        <S.Actions>
          <div className="cancel">
            <Button
              noBackground
              customStyles={{
                color: '#BDBDBD',
                fontWeight: 500,
                fontSize: '0.875rem'
              }}
              onClick={onRequestClose}
            >
              Cancel
            </Button>
          </div>

          <div className="confirm">
            <Button
              customStyles={{
                fontSize: '0.875rem',
                background: '#EB5757',
              }}
              onClick={handleSubmit}
              isLoading={isSubmitting}
            >
              Delete
            </Button>
          </div>
        </S.Actions>
      </S.Container>
    </S.Overlay>,
    document.getElementById('delete-modal') as HTMLElement
  )
}