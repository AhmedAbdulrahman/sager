import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const postData: Prisma.PostCreateInput[] = [
  {
    title: 'How I put the scroll percentage in the title bar',
    content:
      'I mean it! Just scroll! And then look up. A bit further. Yes, to the area of your tab bar where the <title> content ends up. And then scroll again.',
    published: true,
  },
  {
    title: 'Clone any Private or Public repo from Organization',
    content:
      'Have you ever wanted to clone all repos under your account or specific organization or even from the company where you work?',
    published: true,
  },
  {
    title: 'How to Start Vim temporarily without settings or plugins',
    content:
      'Sometime you want temporarily to disable your vimrc without loading any of my plugins or settings',
    published: false,
  },
]

async function main() {
  console.log(`Start seeding ...`)
  for (const p of postData) {
    const post = await prisma.post.create({
      data: p,
    })
    console.log(`Created post with id: ${post.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
