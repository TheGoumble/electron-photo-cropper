import { useState } from 'react';
import { readFile } from '../../helpers/images';

export default function Photo() {
  const [imageSrc, setImageSrc] = useState(null); // file data
  const [fileName, setFileName] = useState(null); // file address
  const handleFileChange = async (e: any) => {
    if (e.target.files && e.target.files.length) {
      //if we got a file...
      const file = e.target.files[0];
      console.log(file.path);
      // get the image data from the file
      const imageDate: any = await readFile(file)
      // setImagesrc to that image data
      setImageSrc(imageDate)
    }
  };
  if (!imageSrc) {
    return (
      <>
        <h1>Please choose photo to crop</h1>
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </>
    );
  }
  return (
    <>
      <img src={imageSrc} />
    </>
  );
}
