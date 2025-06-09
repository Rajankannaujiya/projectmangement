import { EllipsisVertical, Plus } from "lucide-react";
import React from "react";
import { useDrop } from "react-dnd";
import { Task as TaskType } from '@/state/type';
import Task from "@/app/projects/BoardView/(components)/Task/page"

type TaskColumnProps = {
  status: string;
  tasks: TaskType[];
  moveTask: (taskId:number, toStatus: string)=>void;
  setIsModalNewTaskOpen: (isOpen:boolean)=>void;
}

const TaskColumn = ({
  status,
  tasks,
  moveTask,
  setIsModalNewTaskOpen

}:TaskColumnProps)=>{

    const [{ isOver }, drop] = useDrop(() => ({
    accept:'task',
    drop: (item:{id:number}) => moveTask(item.id, status.toUpperCase()),
    collect: (monitor:any) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const tasksCount = tasks.filter((task)=>task.status === status.toUpperCase()).length;

  const statusColor:any = {
    "Pending": "#2563EB",
    "Progress": "#D97706",
    "UnderReview": "#000000",
    "Completed": "#059669",
  }

  return (
    <div ref={(instance)=>{drop(instance)}}
    className={`sl:py-4 rounded-lg py-2 xl:px-2 ${isOver ? "bg-blue-100 dar:bg-neutral-950" : ""} `}
    >
      <div className='mb-3 flex w-full'>
      <div
          className={`w-2 !bg-[${statusColor[status]}] rounded-s-lg`}
          style={{ backgroundColor: statusColor[status] }}
        />


          <div className='flex w-full items-center justify-between rounded-e-lg bg-white px-5 py-4 dark:bg-dark-secondary'>
            <h3 className='flex items-center text-lg font-semibold dark:text-white'>
              {status}{" "}
          
            <span className="ml-2 inline-block rounded-full bg-gray-200 p-1 pt-1.5 text-center text-sm leading-none dark:bg-dark-tertiary"
            style={{width:'1.5rem', height:"1.5rem"}}
            >
              {tasksCount}
            </span>
            </h3>
            <div className='flex items-center gap-1'>
              <button className='flex h-6 w-5 items-center justify-center dark:text-neutral-500'>
                <EllipsisVertical size={26}/>
              </button>
              <button className='flex h-6 w-6 items-center justify-center rounded bg-gray-200 dark:bg-dark-tertiary dark:text-white'
              onClick={()=> setIsModalNewTaskOpen(true)}
              >
                <Plus size={16}/>
              </button>
            </div>

          </div>
      </div>

      {
        tasks.filter((task)=>task.status === status.toUpperCase()).map((task)=>(
          <Task key = {task.id} task={task} />
        ))
      }
    </div>
  )

}

export default TaskColumn;