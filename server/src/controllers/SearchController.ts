import { Response, Request } from "express";
import { prisma } from "../db.server.ts";

export const search = async(req:Request, res:Response):Promise<void> => {
    const { query } = req.query;
    console.log("this is the query",query)
    try {
        const tasks = await prisma.task.findMany({
            where:{
                OR: [
                    {title: {
                        contains: query as string,
                        mode: 'insensitive'
                    }},
                    {description: {
                        contains: query as string,
                        mode: 'insensitive'
                    }}
                ]
            }
        })

        const projects = await prisma.project.findMany({
            where:{
                OR: [
                    {name: {
                        contains: query as string,
                        mode: 'insensitive'
                    }},
                    {description: {
                        contains: query as string,
                        mode: 'insensitive'
                    }}
                ]
            }
        })

        const users = await prisma.user.findMany({
            where:{
                OR: [
                    {username: {
                        contains: query as string,
                        mode: 'insensitive'
                    }}
                ]
            }
        })

        res.json({tasks, projects, users})
    } catch (error:any) {
        console.log(error?.message)
        res.status(500).json({ message: `Error performing serarch ${error.message}` });
    }
}