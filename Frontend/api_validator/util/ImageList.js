import React from 'react';

export function ImageList({ json }) {
  const imageUrls = findImageUrls(json);
  return (
    <div>
      {imageUrls.map((url, index) => (
        <><img key={url} src={url} alt="" /><p>이미지{index+1} : {url}</p></>
      ))}
    </div>
  );
}

function findImageUrls(obj) {
  let urls = [];
  for (const key in obj) {
    if (typeof obj[key] === 'string' && isImageUrl(obj[key])) {
      urls.push(obj[key]);
    } else if (typeof obj[key] === 'object') {
      urls = urls.concat(findImageUrls(obj[key]));
    }
  }
  return urls;
}

function isImageUrl(str) {
  return /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(str);
}