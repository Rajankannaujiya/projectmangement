import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Project, Task } from "./type";


export const api = createApi({
    baseQuery: fetchBaseQuery({baseUrl:process.env.NEXT_PUBLIC_API_BASE_URL}),
    reducerPath: 'api',
    tagTypes: ["Projects", "Tasks"],
    endpoints: (build)=>({

        // <Project[], void>: response type or return type , argument type or query doesnot take any argument
        getProjects: build.query<Project[], void>({
            query: ()=> 'projects',
            providesTags: ["Projects"],
        }),
        

        createProject: build.mutation<Project, Partial<Project>>({
            query: (project)=>({
             url:   'project',
             method: 'POST',
             body:project,
            }),
            invalidatesTags: ["Projects"]
        }),

        getTasks: build.query<Task[], {projectId: number}>({
            query: ({projectId})=> `tasks?projectId=${projectId}`,
            providesTags: (result)=> result ? result.map(({id})=>(
                {type: "Tasks" as const, id}
            )): [{ type: "Tasks" as const}],
        }),

        createTasks: build.mutation<Task, Partial<Task>>({
            query: (task)=>({
                url: "task",
                method: "POST",
                body: task
            }),
            invalidatesTags: ["Tasks"]
        }),

         updateTaskStatus: build.mutation<Task, {taskId:number, status: string}>({
            query: ({taskId, status})=>({
                url: `/tasks/${taskId}/status`,
                method: "PATCH",
                body: {status}
            }),
            invalidatesTags: (result, error, {taskId}) => [{ type: "Tasks", id:taskId}]
        })
    }),


})

export const { useGetProjectsQuery, useCreateProjectMutation, useGetTasksQuery, useCreateTasksMutation, useUpdateTaskStatusMutation } = api;