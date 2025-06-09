import { useGetTasksQuery } from '@/state/api';
import React from 'react';
import Error from "@/components/Error/page"
import Loading from "@/components/Loading/page"
import Header from '@/components/Header/page';
import { Task } from '@/state/type';
import TaskCard from '@/components/TaskCard/page';

type Props = {
    id: string;
    setIsModalNewTaskOpen: (isOpen: boolean) => void
}

function ListView({id, setIsModalNewTaskOpen}: Props) {

    const { data: tasks, error, isLoading  } = useGetTasksQuery({projectId:Number(id)});


    if(isLoading){
      return <Loading />
    }
    
    if(error){
      return <Error errorMessage='An error occured while fetching tasks' />
    }

  return (
    <div className='px-4 pb-8 xl:px-6'>
        <div className='pt-5'>
            <Header name='List'/>
        </div>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6'>
            {
                tasks?.map((task:Task)=><TaskCard  key={task.id} task= {task}/>)
            }
        </div>

    </div>
  )
}

export default ListView