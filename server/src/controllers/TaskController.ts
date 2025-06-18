import { Request, Response } from "express";
import { prisma } from "../db.server.ts";




export const getTasks = async (req: Request, res: Response): Promise<void> => {

    const { projectId } = req.query;

    try {
        const tasks = await prisma.task.findMany({
            where: {
                projectId: Number(projectId),
            },
            include: {
                author: true,
                assignee: true,
                comments: true,
                attachments: true
            }
        });
        res.json(tasks);
    } catch (error: any) {
        res.status(500).json({ message: `Error retrieving tasks ${error.message}` });
    }

}


export const createTask = async (req: Request, res: Response): Promise<void> => {
    console.log("hi in the task")

    const {
        title,
        description,
        status,
        priority,
        tags,
        startDate,
        dueDate,
        points,
        projectId,
        authorUserId,
        assignedUserId
    } = req.body;

    console.log(req.body)

    try {
        const newTask = await prisma.task.create({
            
        data: {
        title,
        description,
        status,
        priority,
        tags,
        startDate,
        dueDate,
        points,
        projectId: Number(projectId),
        authorUserId,
        assignedUserId
        },
});

    res.status(201).json(newTask)
} catch (error: any) {
    console.log(error?.message)
    res.status(500).json({ message: `Error creating task ${error.message}` });
}
}


export const updateTaskStatus = async (req: Request, res: Response): Promise<void> => {

    const { taskId } = req.params;
    const { status } = req.body;

    console.log(status)
    try {
        const updatedTask = await prisma.task.update({
            where: {
                id: Number(taskId)
            },
            data: {
                status: status
            }
        });
        res.json(updatedTask);
    } catch (error: any) {
        res.status(500).json({ message: `Error updating tasks ${error.message}` });
    }

}


export const getUserTasks = async (req: Request, res: Response): Promise<void> => {

    const { userId } = req.params;

    console.log("userId is",userId)

    try {
        const tasks = await prisma.task.findMany({
            where: {
                OR: [
                    {authorUserId: Number(userId)},
                    {assignedUserId: Number(userId)}
                ]
            },
            include: {
                author: true,
                assignee: true
            }
        });
        res.json(tasks);
    } catch (error: any) {
        console.log(error.message)
        res.status(500).json({ message: `Error retrieving users tasks ${error.message}` });
    }

}