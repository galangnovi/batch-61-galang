-- CreateTable
CREATE TABLE "Buku" (
    "id" SERIAL NOT NULL,
    "judulBuku" TEXT NOT NULL,
    "desc" TEXT NOT NULL,

    CONSTRAINT "Buku_pkey" PRIMARY KEY ("id")
);
