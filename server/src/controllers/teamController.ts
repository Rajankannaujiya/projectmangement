
import { Request, Response } from "express";
import { prisma } from "../db.server.ts";



export const getTeams = async(req:Request, res:Response):Promise<void> =>{
      try {
        const teams = await prisma.team.findMany();

        const teamsWithUsername = await Promise.all(
  teams.map(async (team: any) => {
    const [productOwner, projectManager] = await Promise.all([
      team.productOwnerUserId
        ? prisma.user.findUnique({
            where: { userId: team.productOwnerUserId },
            select: {
              username:true
            },
          })
        : null,
      team.projectManagerUserId
        ? prisma.user.findUnique({
            where: { userId: team.projectManagerUserId },
            select: { username: true },
          })
        : null,
  
    ]);

    return {
      ...team,
      productOwnerUsername: productOwner?.username || null,
      projectManagerUsername: projectManager?.username || null,
    };
  })
);

        res.json(teamsWithUsername);
    } catch (error: any) {
        console.log(error.message)
        res.status(500).json({message: `Error retrieving teams ${error.message}`});
    }
}