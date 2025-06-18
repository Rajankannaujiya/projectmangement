import { Project } from '@/state/type'
import React from 'react';
import {format} from "date-fns"

type Props = {
    project: Project
}

const ProjectCard = ({project}: Props) => {
  const formattedStartDate = project?.startDate ? format(new Date(project?.startDate), "PPpp") : "";

  const formattedEndDate = project?.endDate ? format(new Date(project?.endDate), "PPpp"): "";

  return (
   <div className="flex flex-col just gap-2 rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
    {project.name}
  </h3>

  <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
    {project.description}
  </p>

  <div className="mt-2 text-sm text-gray-700 dark:text-gray-200 space-y-1">
    <p>
      <span className="font-medium">Start:</span> {formattedStartDate}
    </p>
    <p>
      <span className="font-medium">End:</span> {formattedEndDate}
    </p>
  </div>
</div>
  )
}

export default ProjectCard