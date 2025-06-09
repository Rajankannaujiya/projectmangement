import { Task } from '@/state/type';
import Image from 'next/image';
import React from 'react';
import { format } from 'date-fns';

type Props = {
  task: Task;
};

const badgeColor = {
  URGENT: 'bg-red-100 text-red-700',
  HIGH: 'bg-yellow-100 text-yellow-800',
  MEDIUM: 'bg-green-100 text-green-800',
  LOW: 'bg-blue-100 text-blue-800',
  BACKLOG: 'bg-orange-100 text-orange-700',
  DEFAULT: 'bg-gray-100 text-gray-700',

};

const statusColor: Record<string, string> = {
  PENDING: 'bg-blue-100 text-blue-700',
  PROGRESS: 'bg-yellow-100 text-yellow-800',
  COMPLETED: 'bg-green-100 text-green-700',
  UNDER_REVIEW: 'bg-red-100 text-red-700',
  DEFAULT: 'bg-gray-100 text-gray-700',
};


const descriptionColor = (desc?: string) => {
  if (!desc) return 'text-gray-400';
  if (desc.length < 20) return 'text-yellow-600';
  if (desc.length < 50) return 'text-blue-600'; 
  return 'text-green-700'; 
};
const TaskCard = ({ task }: Props) => {
  const priorityClass = badgeColor[task.priority as keyof typeof badgeColor] || badgeColor?.DEFAULT;
  const statusClass = statusColor[task.status as keyof typeof statusColor] || statusColor?.DEFAULT;

  console.log(task.description, descriptionColor(task.description))

  return (
    <div className="mb-4 rounded-lg bg-white p-6 shadow-md dark:bg-dark-secondary dark:text-white transition-colors duration-300">
      {task && task.attachments &&  task?.attachments?.length > 0 && (
        <div className="mb-4">
          <p className="font-semibold text-sm mb-2">Attachment:</p>
          <div className="overflow-hidden rounded-md">
            <Image
              src={`/${task.attachments[0].fileURL}`}
              alt="Attachment"
              width={700}
              height={400}
              className="rounded-md w-full h-auto object-cover"
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Info label="ID" value={task.id.toString()} />
        <Info label="Title" value={task.title} />
        <Info label="Description" value={task.description || 'No description provided'} textClass={descriptionColor(task.description)} badge={false} />
        <Info label="Status" value={task.status || "Status" }  badgeClass={statusClass}/>
        <Info label="Priority" value={task.priority || "Priority"} badgeClass={priorityClass} />
        <Info label="Tags" value={task.tags || 'None'} />
        <Info
          label="Start Date"
          value={task.startDate ? format(new Date(task.startDate), 'PPpp') : 'Not set'}
        />
        <Info
          label="Due Date"
          value={task.dueDate ? format(new Date(task.dueDate), 'PPpp') : 'Not set'}
        />
        <Info label="Author" value={task.author?.username || 'Unknown'} />
        <Info label="Assignee" value={task.assignee?.username || 'Unknown'} />
      </div>
    </div>
  );
};

const Info = ({
  label,
  value,
  badge= true,
  badgeClass = 'bg-gray-100 text-gray-700',
  textClass = 'text-sm text-neutral-800 dark:text-neutral-200',
}: {
  label: string;
  value: string;
  badge?: boolean;
  badgeClass?: string;
  textClass?:string;
}) => {
    console.log(badge)
  return (
    <div>
      <p className="text-sm font-semibold text-neutral-600 dark:text-neutral-300 mb-1">{label}:</p>
      {badge ? (
        <span
          className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${badgeClass}`}
        >
          {value}
        </span>
      ) : (
        <p className={`${textClass}`}>{value}</p>
      )}
    </div>
  );
};

export default TaskCard;
