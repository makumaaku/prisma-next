import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const bannerData: Prisma.BannerCreateInput[] = [
  {
    imageUrl:
      "https://tier-family.co.jp/wp-content/themes/tier/assets/img/zoo.png",
    link: "https://tier-family.co.jp/",
    order: 0,
  },
  {
    imageUrl:
      "https://tier-family.co.jp/wp-content/themes/tier/assets/img/t-s1.jpg",
    order: 1,
  },
  {
    imageUrl:
      "https://tier-family.co.jp/wp-content/themes/tier/assets/img/t-s2.jpg",
    order: 2,
  },
];

// const userData: Prisma.UserCreateInput[] = [
//   {
//     name: 'Alice',
//     email: 'alice@prisma.io',
//     posts: {
//       create: [
//         {
//           title: 'Join the Prisma Slack',
//           content: 'https://slack.prisma.io',
//           published: true,
//         },
//       ],
//     },
//   },
//   {
//     name: 'Nilu',
//     email: 'nilu@prisma.io',
//     posts: {
//       create: [
//         {
//           title: 'Follow Prisma on Twitter',
//           content: 'https://www.twitter.com/prisma',
//           published: true,
//         },;
//       ],
//     },
//   },
//   {
//     name: 'Mahmoud',
//     email: 'mahmoud@prisma.io',
//     posts: {
//       create: [
//         {
//           title: 'Ask a question about Prisma on GitHub',
//           content: 'https://www.github.com/prisma/prisma/discussions',
//           published: true,
//         },
//         {
//           title: 'Prisma on YouTube',
//           content: 'https://pris.ly/youtube',
//         },
//       ],
//     },
//   },
// ]

async function main() {
  // console.log(`Start seeding ...`);
  // for (const b of bannerData) {
  //   const banner = await prisma.banner.create({
  //     data: b,
  //   });
  //   console.log(`Created banner with url: ${banner.imageUrl}`);
  // }
  // console.log(`Seeding finished.`);
  const banners = await prisma.banner.findMany();
  console.log(banners);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
