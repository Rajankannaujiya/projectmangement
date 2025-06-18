"use client"

import React, { useState } from 'react';
import ProjectHeader from '@/app/projects/projectheader';
import BoardView from '@/app/projects/BoardView';
import ListView from '@/app/projects/ListView';
import TimelineView from '@/app/projects/TimelineView'
import TableView from '@/app/projects/TableView'
import ModalNewTask from '@/components/ModalNewTask';


type Props = {
    params: Promise<{ id: string }>;
}

const page = ({params}: Props) => {
    const {id} = React.use(params);
    const [activeTab, setActiveTab] = useState("Board");
    const [isModelNewTaskOpen,setIsModalNewTaskOpen] = useState(false);
  return (
    <div>
       <ModalNewTask isOpen={isModelNewTaskOpen} onClose={()=>setIsModalNewTaskOpen(false)} id={Number(id)}/>

         <ProjectHeader activeTab = {activeTab} setActiveTab = {setActiveTab} />

         {
            activeTab === "Board" && <BoardView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen}/>
         }
         {
          activeTab === "List" && <ListView id = {id} setIsModalNewTaskOpen = {setIsModalNewTaskOpen} />
         }
         {
          activeTab === "Timeline" && <TimelineView id = {id} setIsModalNewTaskOpen = {setIsModalNewTaskOpen} />
         }

         {
          activeTab === "Table" && <TableView id = {id} setIsModalNewTaskOpen = {setIsModalNewTaskOpen} />
         }
    </div>
  )
}


export default page