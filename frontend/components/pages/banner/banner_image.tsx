import React from 'react'
import Image from 'next/image'
import BannerEditModal from './banner_edit_modal';
import { BannerModalState } from '../../../pages/banners';

export type BannerProps = {
  imageUrl: string;
  link: string;
  order: number;
}


const BannerImage: React.FC<{ banner: BannerProps, modalState: BannerModalState, setBannerState: (state: BannerModalState) => void }> = ({ banner, modalState, setBannerState }) => {
  const isOpen = modalState.isOpen && modalState.banner.imageUrl == banner.imageUrl;
  console.log(isOpen);

  return (
    // モーダルの表示
    <div onClick={() => isOpen ? () => { } : setBannerState({ isOpen: true, banner: banner })}>
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
      <div>
        <BannerEditModal props={{
          isOpen: isOpen,
          setBannerState: setBannerState
        }} />
      </div>

    </div>
  )
}

export default BannerImage