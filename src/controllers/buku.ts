
import { Request, Response } from "express";
import { books, buku } from "../moduls/buku";
import {prisma} from "../connections/buku"

export const getBook =(req:Request, res:Response)=>{
    res.json(books)
}

export const allBook = async (req:Request, res:Response)=>{
    const book = await prisma.buku.findMany()
    res.json(book)
}