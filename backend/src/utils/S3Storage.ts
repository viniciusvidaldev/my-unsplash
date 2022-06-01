import { S3 } from 'aws-sdk';

class S3Storage {
  private client: S3;

  constructor() {
    this.client = new S3();
  }

  async deleteFile(key: string) {
    await this.client.deleteObject({
      Bucket: 'my-unsplash-post-images',
      Key: key
    })
      .promise();
  }
}

export { S3Storage };