"use client"

import { useAppSelector } from '@/app/redux';
import { useGetProjectsQuery, useGetTasksQuery } from '@/state/api';
import React, { useMemo, useState } from 'react';
import { DisplayOption, Gantt, ViewMode } from 'gantt-task-react'
import "gantt-task-react/dist/index.css"
import Loading from '@/components/Loading';
import {Error} from '@/components/alert';
import Header from '@/components/Header';

type TaskTypeItems = "task" | "milestone" | "project";


const TimelineView = () => {

  const isDarkMode = useAppSelector(state=>state.global.isDarkMode);

  const {
    data: projects,
    isError,
    isLoading
  } = useGetProjectsQuery();

  const [displayOptions, setDisplayOptions] = useState<DisplayOption>({
    viewMode: ViewMode.Month,
    locale:"en-IN"
  })

  const ganttTasks = useMemo(()=>{
    return(
      projects?.map((project)=>({
        start: new Date(project?.startDate as unknown as string),
        end: new Date(project?.endDate as unknown as string),
        name: project.name,
        id:  `project-${project.id}`,
        type: "project" as TaskTypeItems,
        progress: 50,
        isDisable: false

      })) || []
    )
  }, [projects]);


  const handleViewModeChange = (event: React.ChangeEvent<HTMLSelectElement>)=>{
    setDisplayOptions((prev)=>({
      ...prev,
      viewMode: event.target.value as ViewMode

    }))
  }


  if(isLoading){
    return <Loading />
  }
      
  if(isError || !projects){
    return <Error errorMessage='An error occured while fetching projects' />
  }

  return (
    <div className='px-4 xl:px-6'>
      <header className='mb-4 flex items-center justify-between'>
    <Header name="Projects TimeLine"/>

        <div className='relative inline-block w-64'>
          <select className='focus:shadow-outline block w-full appearance-none rounded border border-gray-400 bg-white px-4 py-2 pr-8 leading-tight shadow hover:border-gray-500 focus:outline-none dark:border-dark-secondary dark:bg-dark-secondary dark:text-white'
          value={displayOptions.viewMode}
          onChange={handleViewModeChange}
          >
            <option value={ViewMode.Day}>Day</option>
            <option value={ViewMode.Week}>Week</option>
            <option value={ViewMode.Month}>Month</option>
          </select>
        </div>

      </header>

      <div className='overflow-hidden rounded-md bg-white shadow dark:bg-dark-secondary dark:text-white'>
        <div className='timeline'>
          <Gantt 
          tasks={ganttTasks}
          {...displayOptions}
          columnWidth={displayOptions.viewMode === ViewMode.Month ? 150 : 100}
          listCellWidth='100px'
          projectBackgroundColor={isDarkMode ? "#101214" : "#1f2937"}
          projectProgressColor={isDarkMode ?"#1f2937": "#aeb8c2"}
          />

        </div>
      </div>
    </div>
  )
}

export default TimelineView