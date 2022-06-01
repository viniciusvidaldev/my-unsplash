import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { ConfirmationModal } from '../../components/ConfirmationModal';
import { CreatePostModal } from '../../components/CreatePostModal';
import { Header } from '../../components/Header';
import { Post } from '../../components/Post';
import { ResponseModal } from '../../components/ResponseModal';
import { SpinnerLoader } from '../../components/SpinnerLoader';
import { postsService } from '../../services/PostsService';
import * as S from './styles';

export interface IPost {
  _id: string;
  name: string;
  size: number;
  key: string;
  url: string;
  label: string;
  created_at: Date;
}

export function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [posts, setPosts] = useState<IPost[]>();
  const [isModal, setIsModal] = useState({
    name: '',
    isOpen: false,
  });
  const [deleteId, setDeleteId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const filteredPosts = useMemo(() => posts?.filter(post => (
    post.label.toLowerCase().includes(searchTerm.toLowerCase())
  )), [posts, searchTerm])

  useEffect(() => {
    (async () => {
      if (!isModal.isOpen) {
        try {
          setIsLoading(true);
          const response = await postsService.listPosts<IPost[]>();
          setPosts(response);
        } catch {

        } finally {
          setIsLoading(false);
        }
      }
    })();
  }, [isModal.isOpen])

  function closeModal() {
    setIsModal({
      isOpen: false,
      name: ''
    })
  }

  function openModal(name: string) {
    setIsModal({
      name,
      isOpen: true,
    })
  }

  function handleChangeSearchTerm(event: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
  }

  return (
    <>
      <S.Container isModalOpen={isModal.isOpen}>
        <Header
          handleAddPhoto={() => openModal('create-post')}
          handleChange={handleChangeSearchTerm}
          inputValue={searchTerm}
        />


        <S.PostsContainer>
          {isLoading ? (
            <div className="loading">
              <SpinnerLoader isLoading={isLoading} size={50} />
            </div>
          ) : (
            <>
              {filteredPosts?.map((post) => (
                <Post
                  key={post._id}
                  post={post}
                  handleDelete={() => {
                    setDeleteId(post._id);
                    openModal('confirmation-delete');
                  }}
                />
              ))}
            </>
          )}
        </S.PostsContainer>

      </S.Container>

      {isModal.name === 'confirmation-delete' && (
        <ConfirmationModal
          isOpen={isModal.isOpen}
          onRequestClose={closeModal}
          openModal={openModal}
          id={deleteId}
        />
      )}

      {isModal.name === 'create-post' && (
        <CreatePostModal
          isOpen={isModal.isOpen}
          onRequestClose={closeModal}
        />
      )}

      {isModal.name === 'response-modal' && (
        <ResponseModal
          isOpen={isModal.isOpen}
          onRequestClose={closeModal}
        />
      )}
    </>
  )
}