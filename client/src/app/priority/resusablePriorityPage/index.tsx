"use client"

import { useAppSelector } from '@/app/redux';
import Header from '@/components/Header';
import Loading from '@/components/Loading';
import ModalNewTask from '@/components/ModalNewTask';
import TaskCard from '@/components/TaskCard';
import { dataGridClassNames, dataGridSxStyles } from '@/lib/utils';
import { useGetTasksByUserQuery } from '@/state/api';
import { Priority, Task } from '@/state/type';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React, { useState } from 'react'

type Props = {
    priority: Priority;
}


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
            renderCell: (params)=> params.value?.username || "Unknown"
        },
        {
            field: "assignee",
            headerName: "Assignee",
            width: 150,
            renderCell: (params)=> params.value?.username || "unAssigned"
        },
    ]
const ResusablePriorityPage = ({priority}: Props) => {
    const [view, setView] = useState("list");
    const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);

    const userId =2;
    const {data: tasks, isLoading, isError: isTasksError} = useGetTasksByUserQuery(userId,{skip: userId===null});

    const isDarkMode = useAppSelector((state)=>state.global.isDarkMode);

    const filteredTasks = tasks?.filter((task:Task)=>task.priority === priority)

  return (
    <div className='m-5 p-4'>
      <ModalNewTask 
      isOpen = {isModalNewTaskOpen}
      onClose={()=>setIsModalNewTaskOpen(false  )}
      />

      <Header name='Priority Page' buttonComponent={
        <button className='mr-3 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700'
        onClick={()=>setIsModalNewTaskOpen(true)}>
          Add Task
        </button>
      }/> 
      <div className='mb-4 flex justify-start'>
        <button className={`px-4 py-2 ${view === "list" ? "bg-gray-300" : "bg-white"} rounded-l`}
        onClick={()=>setView("list")}>
          List
        </button>
        <button className={`px-4 py-2 ${view === "table" ? "bg-gray-300" : "bg-white"} rounded-l`}
        onClick={()=>setView("table")}>
          Table
        </button>
      </div>

      {
        isLoading ? <Loading /> : view === "list" ? (<div className='grid, grid-cols-1 gap-4'>
          {
            filteredTasks?.map((task:Task)=>(
              <TaskCard key={task.id} task={task}/>
            ))
          }
        </div>) : (
          view === "table" && filteredTasks && (
            <div className='w-full'>
              <DataGrid rows={filteredTasks} columns={columns} checkboxSelection
              getRowId={(row)=>row.id}
              className={dataGridClassNames}
              sx={dataGridSxStyles(isDarkMode)}/>
            </div>
          )
        )
      }
      </div>
  )
}

export default ResusablePriorityPage