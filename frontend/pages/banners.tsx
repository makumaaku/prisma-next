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


const Banners: React.FC<Props> = (props) => {
  const [modalState, setIsOpen] = React.useState<BannerModalState>({ isOpen: false, banner: null });

  function setModalState(state: BannerModalState) {
    console.log(state);
    setIsOpen(state);
  }

  return (
    <Layout>
      <div className="page">
        <h1>バナー画像の設定</h1>
        <main className="bannerMain">
          {props.banners.map((banner) => (
            <div key={banner.imageUrl} className="bannerItem">
              <BannerImage banner={banner} modalState={modalState} setBannerState={setModalState} />
            </div>
          ))}
          <button className="btn-submit" onClick={submitBanners}>反映</button>
        </main>
      </div>
      <style jsx>{`

         .bannerMain{
          display: flex;
          flex-direction: column;
          align-items: center;
         }

        .bannerItem {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .bannerItem:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .bannerItem + .bannerItem {
          margin-top: 2rem;
        }

        .btn-submit{
          width:30%;
          color: #fff;
          background-color: #eb6100;
        }

        btn-submit:hover {
          color: #fff;
          background: #f56500;
        }

      `}</style>
    </Layout>
  )
}

async function submitBanners(): Promise<void> {
  const res = await fetch('http://localhost:3001/banners', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify([
      {
        imageUrl: 'https://tier-family.co.jp/wp-content/themes/tier/assets/img/zoo.png',
        link: 'https://tier-family.co.jp/',
        order: 0
      },
      {
        imageUrl: 'https://tier-family.co.jp/wp-content/themes/tier/assets/img/t-s1.jpg',
        link: null,
        order: 1
      },
      {
        imageUrl: 'https://tier-family.co.jp/wp-content/themes/tier/assets/img/t-s2.jpg',
        link: null,
        order: 2
      }
    ])
  })

  console.log('Updated!')
  console.log(res)

}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch("http://localhost:3001/banners")
  const banners = await res.json()
  console.log(banners)
  return {
    props: { banners },
  }
}

export default Banners
