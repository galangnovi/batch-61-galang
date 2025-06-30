import { prisma } from "../src/connections/buku";

async function main() {
    await prisma.buku.deleteMany()


const buku = await prisma.buku.createMany({
    data:[
    {id:1, judulBuku:"jelajah",desc:"apa aja boleh"},
    {id:2, judulBuku:"jurit",desc:"apa"},
    {id:3, judulBuku:"jalan",desc:"aja"},
    {id:4, judulBuku:"kaki",desc:"boleh"}
    ],
})
}

main()