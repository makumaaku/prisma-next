import React from 'react'
import ReactModal from 'react-modal';
import { BannerModalState } from '../../../pages/banners';

export type BannerModalProps = {
  isOpen: boolean;
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
      <button onClick={() => props.setBannerState({ isOpen: false, banner: null })}>close</button>
      <div>I am a modal</div>
      <form>
        <input />
        <button>tab navigation</button>
        <button>stays</button>
        <button>inside</button>
        <button>the modal</button>
      </form>
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
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  },
  // 親ウィンドウのスタイル（ちょっと暗くする）
  overlay: {
    background: 'rgba(0, 0, 0, 0.5)'
  }
}

export default BannerEditModal