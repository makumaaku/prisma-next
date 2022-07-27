import React from 'react'
import ReactModal from 'react-modal';
import Image from 'next/image'
import { BannerModalState } from '../../../pages/banners';
import { BannerProps } from './banner_image';

export type BannerModalProps = {
  isOpen: boolean;
  banner: BannerProps,
  setBannerState: (state: BannerModalState) => void
}

ReactModal.setAppElement('body');

const BannerEditModal: React.FC<{ props: BannerModalProps }> = ({ props }) => {
  return (
    <ReactModal
      isOpen={props.isOpen}
      onRequestClose={() => handleClose()}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className='modalContent'>
        <Image
          src={props.banner.imageUrl}
          alt="test"
          width={600}
          height={360}
        />
        <form>
          <input type="text" name="text" placeholder="https://tier-family.co.jp/" />
          <button>確定</button>
        </form>
        <button onClick={() => props.setBannerState({ isOpen: false, banner: null })}>close</button>
      </div>
      <style jsx>{`
        .modalContent{
          display: flex;
          flex-direction: column;
        }
        
        form {
          display: flex;
          flex-direction: column;
        }

        input {
          border: 1px solid #ddd;
          border-radius: 6px;
          padding-left: 1em;
          padding-right: 1em;
          height: 48px;
          flex: 1;
          width: 100%;
          max-width: 410px;
          background: #eaedf2;
          font-size: 18px;
        }
      `}</style>
    </ReactModal>
  )
}

function handleClose() { }

const customStyles: ReactModal.Styles = {
  // ダイアログ内のスタイル（中央に表示）
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-5%',
    transform: 'translate(-50%, -50%)'
  },
  // 親ウィンドウのスタイル（ちょっと暗くする）
  overlay: {
    background: 'rgba(0, 0, 0, 0.5)'
  }
}

export default BannerEditModal