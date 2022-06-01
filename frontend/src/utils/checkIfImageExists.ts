export function checkIfImageExists(url: string): Promise<boolean> {
  return new Promise(resolve => {
    const img = new Image();
    img.src = url;


    img.onload = () => {
      resolve(true);
    }

    img.onerror = () => {
      resolve(false);
    }
  })

}