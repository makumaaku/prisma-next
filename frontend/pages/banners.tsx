import React from "react"
import { GetServerSideProps } from "next"
import Layout from "../components/global/Layout"
import BannerImage, { BannerProps } from "../components/pages/banner/banner_image"

type Props = {
  banners: BannerProps[]
}

export type BannerModalState = {
  isOpen: boolean;
  banner: BannerProps | null;
}


const Drafts: React.FC<Props> = (props) => {
  const [modalState, setIsOpen] = React.useState<BannerModalState>({ isOpen: false, banner: null });

  function setModalState(state: BannerModalState) {
    console.log(state);
    setIsOpen(state);
  }

  return (
    <Layout>
      <div className="page">
        <h1>バナー画像の設定</h1>
        <main>
          {props.banners.map((banner) => (
            <div key={banner.imageUrl} className="post">
              <BannerImage banner={banner} modalState={modalState} setBannerState={setModalState} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch("http://localhost:3001/banners")
  const banners = await res.json()
  return {
    props: { banners },
  }
}

export default Drafts
