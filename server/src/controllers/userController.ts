
import { Request, Response } from "express";
import { prisma } from "../db.server.ts";



export const getUsers = async(req:Request, res:Response):Promise<void> =>{
      try {
        const projects = await prisma.user.findMany();
        res.json(projects);
    } catch (error: any) {
        res.status(500).json({message: `Error retrieving Users ${error.message}`});
    }
}