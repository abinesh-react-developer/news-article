import React from 'react'
import Image from 'next/image'

function ImageComponent({ src, width, height, alt, className }) {
  const hadleLoad = ({ src }) => {
    return src
  }
  return (
    <>
      <Image
        loader={hadleLoad}
        src={src}
        alt={alt}
        width={width}
        height={height}
        unoptimized
        className={className}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src = "/img/no-image.png";
        }}
      />
    </>
  )
}

export default ImageComponent

