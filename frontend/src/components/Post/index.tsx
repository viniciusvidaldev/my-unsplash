import { useState } from 'react';
import { IPost } from '../../pages/Home';
import * as S from './styles';

interface PostProps {
  post: IPost;
  handleDelete: () => void;
}

export function Post({ post, handleDelete }: PostProps) {
  return (
    <S.Container>
      <img
        src={post.url}
        alt={post.label}
      />

      <S.PostContent>
        <button type="button" onClick={handleDelete}>
          delete
        </button>

        <h3>{post.label}</h3>
      </S.PostContent>
    </S.Container>
  )
}