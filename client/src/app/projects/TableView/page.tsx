import { useAppSelector } from '@/app/redux';
import Loading from '@/components/Loading/page';
import Error from '@/components/Error/page';
import { useGetTasksQuery } from '@/state/api';
import React from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import Header from '@/components/Header/page';
import { dataFridClassNames, dataGridSxStyles } from '@/lib/utils';

type Props = {
    id: string;
    setIsModalNewTaskOpen: (isOpen: boolean) =>void 
}


const page = ({id, setIsModalNewTaskOpen}: Props) => {

    const columns: GridColDef[] = [
        {
            field: "title",
            headerName: "Title",
            width: 100
        },
        {
            field: "description",
            headerName: "Description",
            width: 200
        },
        {
            field: "status",
            headerName: "Status",
            width: 130,
            renderCell: (params) =>(
                <span className='inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800'>
                    {params.value}
                </span>
            )
        },
        {
            field: "priority",
            headerName: "Priority",
            width: 75,
            renderCell: (params) =>(
                <span className='inline-flex rounded-full bg-orange-100 px-2 text-xs font-semibold leading-5 text-orange-800'>
                    {params.value}
                </span>
            )
        },
         {
            field: "tags",
            headerName: "Tags",
            width: 130
        },
         {
            field: "startDate",
            headerName: "Start Date",
            width: 130
        },
         {
            field: "dueDate",
            headerName: "Due Date",
            width: 130
        },
         {
            field: "author",
            headerName: "Author",
            width: 150,
            renderCell: (params)=> params.value.username || "Unknown"
        },
        {
            field: "assignee",
            headerName: "Assignee",
            width: 150,
            renderCell: (params)=> params.value.username || "unAssigned"
        },
    ]

    const isDarkMode = useAppSelector((state)=>state.global.isDarkMode);

    const {data:tasks, error, isLoading} = useGetTasksQuery({projectId:Number(id)});

     if(isLoading){
        return <Loading />
      }
          
      if(error){
        return <Error errorMessage='An error occured while fetching tasks' />
      }
    

  return (
    <div className='h-[540px] w-full px-4 pb-8 xl:px-6'>
        <div className='pt-5'>
            <Header name='Table' isSmallText/>
        </div>
        <DataGrid 
        rows={tasks || []}
        columns={columns}
        className={dataFridClassNames}
        sx={dataGridSxStyles(isDarkMode)}
        />
    </div>
  )
}

export default page