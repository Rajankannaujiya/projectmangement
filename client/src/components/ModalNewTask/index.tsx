import { useCreateTasksMutation } from '@/state/api';
import React, { useEffect, useState } from 'react'
import Modal from '@/components/Modal';
import { formatISO } from 'date-fns';
import { Status } from '@/state/type';
import { Priority } from '@/state/type';
import { Success, Error } from "../alert"

type Props = {
    id?: number | null;
    isOpen: boolean;
    onClose: () => void;
}

const ModalNewTask = ({ id=null, isOpen, onClose }: Props) => {

    const [createTask, { isLoading, error, isSuccess }] = useCreateTasksMutation();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState<Status>(Status.Pending);
    const [priority, setPriority] = useState<Priority>(Priority.Urgent);
    const [tags, setTags] = useState("");
    const [startDate, setStartDate] = useState("");
    const [dueDate, setDueDate] = useState("")
    const [authorUserId, setAuthorUserId] = useState("")
    const [statusMessage, setStatusMessage] = useState<null | { type: 'success' | 'error'; text: string }>(null);

    const [assigneeUserId, setAssigneeUserId] = useState("");
    const [projectId, setProjectId] = useState("");




    useEffect(() => {
        if (isSuccess) {
            setStatusMessage({ type: 'success', text: 'Task created successfully!' });
        } else if (error) {
            setStatusMessage({ type: 'error', text: 'Failed to create task!' });
        }
    }, [isSuccess, error]);

    useEffect(() => {
        if (statusMessage) {
            const timer = setTimeout(() => setStatusMessage(null), 3000); // 1 second display
            return () => clearTimeout(timer); // cleanup
        }
    }, [statusMessage]);

    const handleSubmit = async () => {
        if (!title || !(id !==null || projectId ) || !authorUserId) return;

        const formattedStartDate = formatISO(new Date(startDate), { representation: 'complete' });

        const formattedEndDate = formatISO(new Date(dueDate), { representation: 'complete' });
        await createTask({
            title,
            description,
            status,
            priority,
            tags,
            startDate: formattedStartDate,
            dueDate: formattedEndDate,
            authorUserId: parseInt(authorUserId),
            assignedUserId: parseInt(assigneeUserId),
            projectId: id!== null ? Number(id) : Number(id)
        })

        onClose();
    }

    const isFormValid = () => {
        return title && !(id !==null || projectId ) && authorUserId;
    }

    const selectStyles = "mb-4 block w-full rounded border border-gray-300 px-3 py-2"

    const inputStyles = "w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";

    return (<div>
        {statusMessage?.type === "success" && (
            <Success successMessage={statusMessage.text} />
        )}

        {statusMessage?.type === "error" && (
            <Error errorMessage={statusMessage.text} />
        )}

        <Modal isOpen={isOpen} onClose={onClose} name='Create new Task'>
            <form className='mt-4 space-y-6' onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }}>
                <input type='text' className={inputStyles} placeholder='Project Name' value={title} onChange={(event) => setTitle(event.target.value)} />

                <textarea className={inputStyles} placeholder='Description' value={description} onChange={(event) => setDescription(event.target.value)} />

                <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2'>
                    <select className={selectStyles}
                        value={status}
                        onChange={(event) => setStatus(Status[event.target.value as keyof typeof Status])}
                    >
                        <option value="">
                            Select Options
                        </option>
                        <option value={Status.Pending}>
                            PENDING
                        </option>
                        <option value={Status.Progress}>
                            PROGRESS
                        </option>
                        <option value={Status.UnderReview}>
                            UNDER_REVIEW
                        </option>
                        <option value={Status.Completed}>
                            COMPLETED
                        </option>
                    </select>

                    <select className={selectStyles}
                        value={priority}
                        onChange={(event) => setPriority(Priority[event.target.value as keyof typeof Priority])}
                    >
                        <option value="">
                            Select Options
                        </option>
                        <option value={Priority.Urgent}>
                            URGENT
                        </option>
                        <option value={Priority.High}>
                            HIGH
                        </option>
                        <option value={Priority.Medium}>
                            MEDIUM
                        </option>
                        <option value={Priority.Low}>
                            LOW
                        </option>

                        <option value={Priority.Backlog}>
                            BACKLOG
                        </option>
                    </select>
                </div>

                <input type='text' className={inputStyles} placeholder='Tags (comma sepated)' value={tags} onChange={(event) => setTags(event.target.value)} />


                <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2'>


                    <input type='date' className={inputStyles} value={startDate} onChange={(event) => setStartDate(event.target.value)} />

                    <input type='date' className={inputStyles} value={dueDate} onChange={(event) => setDueDate(event.target.value)} />
                </div>

                <input type='text' className={inputStyles} placeholder='AuthorUserId' value={authorUserId} onChange={(event) => setAuthorUserId(event.target.value)} />

                <input type='text' className={inputStyles} placeholder='AssinedUserId' value={assigneeUserId} onChange={(event) => setAssigneeUserId(event.target.value)} />

                {
                id === null 
                 && <input type='text' className={inputStyles} placeholder='ProjectId' value={projectId} onChange={(event) => setProjectId(event.target.value)} />
                 }
                <button type='submit' className={`mt-4 flex w-full justify-center rounded-md border border-transparent bg-blue-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 ${!isFormValid() || isLoading ? "cursor-not-allowed opacity-50" : ""}`} disabled={!isFormValid() || isLoading}>

                    {isLoading ? "Creating..." : "Create Task"}

                </button>
            </form>

        </Modal>
    </div>
    )
}

export default ModalNewTask