import { Banner, PrismaClient } from "@prisma/client";
import cors from "cors";
import express from "express";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(cors());

app.get("/banners", async (req, res) => {
  const banners = await prisma.banner.findMany({});
  res.json(banners);
});

app.put("/banners", async (req, res) => {
  const banners = req.body as Banner[];
  const bannerIds = banners.map((b) => b.imageUrl);

  //リクエストに含まれていないバナー画像は削除する
  await prisma.banner.deleteMany({
    where: {
      NOT: {
        imageUrl: { in: bannerIds },
      },
    },
  });

  //リクエストで送られてきたバナー画像の新規作成 or 更新を行う
  const promises = banners.map((_, i) => {
    const banner = banners[i];
    const imageUrl = banners[i].imageUrl;
    return prisma.banner.upsert({
      where: { imageUrl: imageUrl },
      update: {
        link: banner.link,
        order: banner.order,
      },
      create: {
        imageUrl: imageUrl,
        link: banner.link,
        order: banner.order,
      },
    });
  });
  const updatedBanners = await Promise.all(promises);
  console.log(updatedBanners);
  res.json(updatedBanners);
});

// app.get("/feed", async (req, res) => {
//   const posts = await prisma.post.findMany({
//     where: { published: true },
//     include: { author: true },
//   });
//   res.json(posts);
// });

// app.get('/filterPosts', async (req, res) => {
//   const { searchString }: { searchString?: string } = req.query;
//   const filteredPosts = await prisma.post.findMany({
//     where: {
//       OR: [
//         {
//           title: {
//             contains: searchString,
//           },
//         },
//         {
//           content: {
//             contains: searchString,
//           },
//         },
//       ],
//     },
//   })
//   res.json(filteredPosts)
// })

// app.post(`/post`, async (req, res) => {
//   const { title, content, authorEmail } = req.body
//   const result = await prisma.post.create({
//     data: {
//       title,
//       content,
//       published: false,
//       author: { connect: { email: authorEmail } },
//     },
//   })
//   res.json(result)
// })

// app.delete(`/post/:id`, async (req, res) => {
//   const { id } = req.params
//   const post = await prisma.post.delete({
//     where: {
//       id: Number(id),
//     },
//   })
//   res.json(post)
// })

// app.get(`/post/:id`, async (req, res) => {
//   const { id } = req.params
//   const post = await prisma.post.findUnique({
//     where: {
//       id: Number(id),
//     },
//     include: { author: true }
//   })
//   res.json(post)
// })

// app.put('/publish/:id', async (req, res) => {
//   const { id } = req.params
//   const post = await prisma.post.update({
//     where: { id: Number(id) },
//     data: { published: true },
//   })
//   res.json(post)
// })

// app.post(`/user`, async (req, res) => {
//   const result = await prisma.user.create({
//     data: {
//       ...req.body,
//     },
//   })
//   res.json(result)
// })

const server = app.listen(3001, () =>
  console.log("🚀 Server ready at: http://localhost:3001")
);
