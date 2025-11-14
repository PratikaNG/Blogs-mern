import React from 'react'
import { Image, ImageKitProvider } from '@imagekit/react';

const IkImage = ({src,className,w,h,alt}) => {
  return (
    <div>
      <ImageKitProvider urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT}>
        <Image
            src={src}
            // width={8}
            // height={8}
            alt={alt}
            className={className}
            loading="lazy"
            width={w}
            height={h}
            transformation={[
              {width:w,height:h}
            ]}
        />
    </ImageKitProvider>
    </div>
  )
}

export default IkImage
