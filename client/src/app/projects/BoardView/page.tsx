import { useGetTasksQuery, useUpdateTaskStatusMutation } from '@/state/api';
import React from 'react';
import Loading from '@/components/Loading/page'
import Error from '@/components/Error/page'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TaskColumn from '@/app/projects/BoardView/(components)/TaskColum/page';

type Props = {
    id: string;
    setIsModalNewTaskOpen: (isOpen:boolean)=>void;
}

  const taskStatus = ['Pending', 'Completed', 'Progress','Under_Review'];

const BoardView = ({id, setIsModalNewTaskOpen}: Props) => {
const {
    data: tasks,
    isLoading,
    error,
    
} = useGetTasksQuery({projectId:Number(id)});

console.log("these are the tasks data", tasks)

const [UpdateTaskStatus] = useUpdateTaskStatusMutation();

const moveTask = (taskId:number, toStatus:string)=>{
  console.log("this is the data",toStatus.toUpperCase())
  UpdateTaskStatus({taskId,status:toStatus.toUpperCase()})
}

if(isLoading){
  return <Loading />
}

if(error){
  return <Error errorMessage='An error occured while fetching tasks' />
}

  return (
    <DndProvider backend={HTML5Backend}>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4 '>
        {
          taskStatus.map((status)=>(
            <TaskColumn
            key = {status} 
            status={status}
            tasks = {tasks || []}
            moveTask={moveTask}
            setIsModalNewTaskOpen = {setIsModalNewTaskOpen}
            />
          ))
        }
      </div>
    </DndProvider>
  )
}


export default BoardView