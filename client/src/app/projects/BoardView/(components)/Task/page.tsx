import React from 'react'
import { useDrag } from 'react-dnd';
import { Task as TaskType } from '@/state/type';
import { format } from 'date-fns'
import Image from 'next/image';
import { EllipsisVertical, MessageSquareMore } from 'lucide-react';

type Props = {
    task: TaskType
}

const page = ({ task }: Props) => {


    const [{ isDragging }, drag, preview] = useDrag(() => ({
        type: "task",
        item: { id: task.id },
        collect: (monitor: any) => ({
            isDragging: !!monitor.isDragging()
        })
    }))

    const taskTagSplit = task.tags ? task.tags.split(','): [];

    const formatedStartDate = task.startDate ? format(new Date(task.startDate), "PPpp") : "";

     const formatedDueDate = task.dueDate ? format(new Date(task.dueDate), "PPpp") : "";

    const numberOfComments = (task.comments && task.comments.length) || 0;


const PriorityTag = ({ priority }: { priority: TaskType["priority"] }) => (
    <div
      className={`rounded-full px-2 py-1 text-xs font-semibold ${
        priority === "URGENT"
          ? "bg-red-200 text-red-700"
          : priority === "HIGH"
            ? "bg-yellow-200 text-yellow-700"
            : priority === "MEDIUM"
              ? "bg-green-200 text-green-700"
              : priority === "LOW"
                ? "bg-blue-200 text-blue-700"
                : "bg-gray-200 text-gray-700"
      }`}
    >
      {priority}
    </div>
  );

    return (
        <div
        ref = {(instance)=>{drag(instance)}}
        className={`mb-4 rounded-md bg-white shadow dark:bg-dark-secondary ${isDragging ? "opacity-50" : "opacity-100"}`}
        >
            {
                task.attachments && task.attachments.length > 0 && (
                    <Image src={`/${task.attachments[0].fileURL}`}
                    alt={task.attachments[0].fileURL}
                    width={400}
                    height={200}
                    className='h-auto w-full rounded-t-md' />
                )
            }

            <div className='p-4 md:p-6'>
                <div className='flex items-start justify-between'>
                    <div className='flex flex-1 flex-wrap items-center gap-2'>
                    {task.priority && <PriorityTag priority={task.priority} />}
                    <div className='flex gap-2'>
                        {taskTagSplit.map((tag)=>(
                            <div key={tag} className='rounded-full bg-blue-100 px-2 text-xs'> {tag}

                            </div>
                        ))}

                    </div>
                    </div>

                    <button className='flex h-6 w-4 flex-shrink-0 items-center justifyy-center dark:text-neutral-500'>
                        <EllipsisVertical size={26}/>
                    </button>

                </div>
                <div className='my-3 flex justify-between'>
                    <h4 className='text-md font-bold dark:text-white'>{task.title}</h4>
                    {typeof task.points === "number" && (
                        <div className='text-xs font-semibold dark:text-white'>
                            {task.points} pts
                        </div>
                    )}
                </div>

                <div className='text-sm text-gray-500 dark:text-neutral-500'>
                    {formatedStartDate && <span>{formatedStartDate} -- </span>}
                    {formatedDueDate && <span>{formatedDueDate}</span>}
                </div>
                <p className='text-sm text-gray-600 dark:text-neutral-500'>
                    {task.description}
                </p>
                <div className='mt-4 border-t border-gray-200 dark:border-stroke-dark'/>

                {/* users */}

                <div className='mt-3 flex items-center justify-between'>
                    <div className='flex -space-x-[6px] overflow-hidden'>
                        {task.assignee && (<Image key={task.assignee.userId} src={`/${task.assignee.profilePictureUrl}`} alt={task.assignee.username} width={30} height={30} className='h-8 w-8 rounded-full border-2 border-white object-cover dark:border-dark-secondary' />)}

                        {task.author && (<Image key={task.author.userId} src={`/${task.author.profilePictureUrl}`} alt={task.author.username} width={30} height={30} className='h-8 w-8 rounded-full border-2 border-white object-cover dark:border-dark-secondary' />)}
                    </div>

                    <div className='flex items-center text-gray-500 dark:text-neutral-500'>
                        <MessageSquareMore size={20}/>

                        <span className='ml-1 text-sm dark:text-neutral-400'>
                            {numberOfComments}
                        </span>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default page