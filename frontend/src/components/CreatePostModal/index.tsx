import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useDropzone } from 'react-dropzone';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { MdOutlineClose } from 'react-icons/md';

import * as S from './styles';
import { Input } from '../Input';
import { Button } from '../Button';
import generatePreviewImage from '../../utils/generatePreviewImage';
import { checkIfImageExists } from '../../utils/checkIfImageExists';
import { SpinnerLoader } from '../SpinnerLoader';
import { useErrors } from '../../hooks/useErrors';
import { postsService } from '../../services/PostsService';
import toast from 'react-hot-toast';
import axios from 'axios';

interface CreatePostModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function CreatePostModal({ isOpen, onRequestClose }: CreatePostModalProps) {
  const [label, setLabel] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageFile, setImageFile] = useState<File>();
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState({
    url: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { setError, getErrorMessageByFieldname, removeError, errors } = useErrors();

  const { getRootProps, getInputProps, acceptedFiles, fileRejections } = useDropzone({
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png']
    },
    maxFiles: 1,
  });

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      setImageFile(acceptedFiles[0]);
      setImagePreview(generatePreviewImage(acceptedFiles[0]));
      setImageUrl('');

      removeError('url');
      removeError('dropzone');
    }
  }, [acceptedFiles]);

  useEffect(() => {
    if (fileRejections.length > 0) {
      setError({ field: 'dropzone', message: 'Invalid file type' })
    }
  }, [fileRejections])

  function handleLabelChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;

    setLabel(value);

    if (value) {
      removeError('label');
    }
  }

  async function handleImageUrlInputChange(event: ChangeEvent<HTMLInputElement>) {
    setImageFile(undefined);
    setImageUrl(event.target.value)

    if (event.target.value) {
      removeError('url');
      removeError('dropzone');
    }

    setIsPreviewLoading(true);
    const imageExists = await checkIfImageExists(event.target.value);

    if (imageExists) {
      setImagePreview({
        url: event.target.value
      })
    } else {
      setImagePreview({
        url: ''
      })
    }

    setIsPreviewLoading(false);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!label || (!imageUrl && !imageFile)) {
      if (!label) {
        setError({ field: 'label', message: 'Label is required' });
      }

      if (!imageUrl && !imageFile) {
        setError({ field: 'url', message: 'Upload an image' });
        setError({ field: 'dropzone', message: 'Upload an image' });
      }

      if (imageUrl) {
        const imageExists = await checkIfImageExists(imageUrl);

        if (!imageExists) {
          setError({ field: 'url', message: 'Invalid image URL' })
          return;
        }
      }

      return;
    }

    if (imageUrl) {
      const imageExists = await checkIfImageExists(imageUrl);

      if (!imageExists) {
        setError({ field: 'url', message: 'Invalid image URL' })
        return;
      }
    }

    if (imageUrl) {
      try {
        setIsSubmitting(true);
        await postsService.uploadPostByUrl({
          label,
          url: imageUrl
        })

        toast.success('Post uploaded', {
          duration: 2000
        });
        onRequestClose();
      } catch (err: any) {
        toast.error(err.message, {
          duration: 2000
        });
      } finally {
        setIsSubmitting(false);
      }
    }

    if (imageFile) {
      const formData = new FormData();
      formData.append('image', imageFile);
      formData.append('label', label)
      console.log(formData)

      console.log(imageFile)

      try {
        setIsSubmitting(true);
        await postsService.uploadPostByFile(formData)
        // await axios.post(`http://localhost:3333/posts/file`, formData, {
        //   headers: {
        //     'Content-Type': 'multipart/form-data'
        //   }
        // })

        toast.success('Post uploaded', {
          duration: 2000
        });
        onRequestClose();

      } catch (err: any) {
        toast.error(err.message, {
          duration: 2000
        });
      } finally {
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
        <h2>Add new photo</h2>

        <S.Form onSubmit={(event) => handleSubmit(event)}>
          <Input
            id="label-id"
            label="Label"
            borderColor="#4f4f4f"
            placeholder="Suspendisse elit massa"
            onChange={(event) => handleLabelChange(event)}
            value={label}
            error={getErrorMessageByFieldname('label')}
          />

          <Input
            id="label-id"
            label="Photo URL"
            borderColor="#4f4f4f"
            placeholder="https://images.unsplash.com/photo-1584395630827-860eee694d7b?ixlib=r..."
            // disabled={!!imageFile}
            onChange={(event) => handleImageUrlInputChange(event)}
            value={imageUrl}
            error={getErrorMessageByFieldname('url')}
          />

          <div className="or">
            <p>or</p>
          </div>

          <S.DropzoneWrapper>
            <S.DropzoneContainer {...getRootProps()} error={getErrorMessageByFieldname('dropzone')}>
              <input {...getInputProps()} />
              <AiOutlineCloudUpload size={32} color="4f4f4f" />
              <p>Drag & Drop your image or Click here</p>
            </S.DropzoneContainer>

            <div className="error">
              <p>{getErrorMessageByFieldname('dropzone')}</p>
            </div>
          </S.DropzoneWrapper>

          {(imagePreview.url) && (
            <S.ImagePreview>
              <div className="removePreview" onClick={() => {
                setImagePreview({
                  url: ''
                })
                setImageFile(undefined);
                setImageUrl('');
              }}>
                <MdOutlineClose size={16} color="4f4f4f" />
              </div>

              <img src={imagePreview.url} alt={label} />

              <div className="spinnerLoaderContainer">
                <SpinnerLoader isLoading={isPreviewLoading} />
              </div>
            </S.ImagePreview>
          )}

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
                type="button"
              >
                Cancel
              </Button>
            </div>

            <div className="confirm">
              <Button
                customStyles={{
                  fontSize: '0.875rem',
                  background: '#3DB46D',
                }}
                type="submit"
                isLoading={isSubmitting}
              >
                Submit
              </Button>
            </div>
          </S.Actions>
        </S.Form>
      </S.Container>
    </S.Overlay>,
    document.getElementById('create-post-modal') as HTMLElement
  )
}