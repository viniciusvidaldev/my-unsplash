declare namespace Express {
  export interface Request {
    file: Express.Multer.File & Express.MulterS3.File;
  }
}