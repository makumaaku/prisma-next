import React from 'react'
import Image from 'next/image'

export type BannerProps = {
  imageUrl: string;
  link: string;
  order: number;
}


const BannerImage: React.FC<{ banner: BannerProps }> = ({ banner }) => {
  return (
    <div onClick={() => { }}>
      <Image
        src={banner.imageUrl}
        alt="test"
        width={300}
        height={180}
      />
      <small>{banner.order}</small>
      <style jsx>{`
          div {
            color: inherit;
            padding: 2rem;
          }
        `}</style>
    </div>
  )
}

export default BannerImage