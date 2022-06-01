export type PreviewImage = {
  url: string;
};

export default function generatePreviewImage(file: File): PreviewImage {
  return {
    url: URL.createObjectURL(file),
  };
}