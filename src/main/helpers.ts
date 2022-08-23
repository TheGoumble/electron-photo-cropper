import fs from 'fs';

export function readFile(file: any) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });
}

const createImage = (url: any) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (err) => reject(err));
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url

  });
};

export async function saveCroppedImage(fileName : any, imageSrc: any, croppedAreaPixels : any) => {
  const image: any = await createImage(imageSrc)
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext('2d')
  const maxSize = Math.max(image.width, image.height)
  canvas.width = maxSize
  canvas.height = maxSize
  ctx?.drawImage(
    image,
    maxSize / 2 - image.width / 2,
    maxSize / 2 - image.height / 2
  )
    const data = ctx?.getImageData(0, 0, maxSize, maxSize)
    // now we can set the canvas to our desired size
    canvas.width = croppedAreaPixels.width
    canvas.height - croppedAreaPixels.height
    //
    ctx?.putImageData(
      data,
      Math.round(0 - maxSize / 2 + image.width / 2 - croppedAreaPixels.x),
      Math.round(0 - maxSize / 2 + image.width / 2 - croppedAreaPixels.y)
    )
    const url = canvas.toDataURL('image/jpg', 0.8)
    cosnt base64data = url.replace(/^data:image\/png;base64data,/,'')
    const newFileName = `${filename}-cropped.png`
    fs.writeFile(newFileName, base64data, "base64", (err) => {
      err ? console.error(err)
    })
}
