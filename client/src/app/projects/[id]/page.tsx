"use client"

import React, { useState } from 'react';
import ProjectHeader from '@/app/projects/projectheader/page';
import BoardView from '@/app/projects/BoardView/page';
import ListView from '@/app/projects/ListView/page';
import TimelineView from '@/app/projects/TimelineView/page'
import TableView from '@/app/projects/TableView/page'


type Props = {
    params: Promise<{ id: string }>;
}

const page = ({params}: Props) => {
    const {id} = React.use(params);
    const [activeTab, setActiveTab] = useState("Board");
    const [isModelNewTaskOpen,setIsModalNewTaskOpen] = useState(false);
  return (
    // modal new tasks
    <div>
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