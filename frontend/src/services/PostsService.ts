import HttpClient from "../utils/httpClient";

interface IUploadPostByUrl {
  label: string;
  url: string;
}

class PostsService {
  private httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient('http://localhost:3333');
  }

  async listPosts<DataType>(): Promise<DataType> {
    return this.httpClient.get('/posts');
  }

  async deletePost(id: string, password: string) {
    return this.httpClient.delete(`/posts/${id}`, {
      body: { password }
    })
  }

  async uploadPostByUrl({ label, url }: IUploadPostByUrl) {
    return this.httpClient.post(`/posts/url`, {
      body: {
        label,
        url
      }
    })
  }

  async uploadPostByFile(formData: FormData) {
    return this.httpClient.post(`/posts/file`, {
      body: formData
    }, {
      noBodyJson: true,
      noJsonHeader: true,
    })
  }
}

export const postsService = new PostsService();