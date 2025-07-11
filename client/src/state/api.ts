import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Project, searchResult, Task, Team, User } from "./type";
import { Search } from "lucide-react";


export const api = createApi({
    baseQuery: fetchBaseQuery({baseUrl:process.env.NEXT_PUBLIC_API_BASE_URL}),
    reducerPath: 'api',
    tagTypes: ["Projects", "Tasks", "Users", "Teams"],
    endpoints: (build)=>({

        // <Project[], void>: response type or return type , argument type or query doesnot take any argument
        getProjects: build.query<Project[], void>({
            query: ()=> 'projects',
            providesTags: ["Projects"],
        }),
        

        createProject: build.mutation<Project, Partial<Project>>({
            query: (project)=>({
             url:   'projects',
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
                url: "tasks",
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
        }),

        getUsers: build.query<User[], void>({
            query:()=>"users",
            providesTags: ["Users"]
        }),

        getTeams: build.query<Team[], void>({
            query: ()=>"teams",
            providesTags: ["Teams"]
        }),

        getTasksByUser: build.query<Task[], number>({
            query: (userId)=>`tasks/user/${userId}`,
            providesTags: (result, error, userid)=>result ? result.map(({id})=>({type: "Tasks", id})) : [{type: "Tasks", id:userid}]
        }),

        search: build.query<searchResult, string>({
            query: (query) => {
                return `search?query=${encodeURIComponent(query)}`
            },
    }),
    }),


})

export const { useGetProjectsQuery, useCreateProjectMutation, useGetTasksQuery, useCreateTasksMutation, useUpdateTaskStatusMutation, useSearchQuery, useGetUsersQuery, useGetTeamsQuery, useGetTasksByUserQuery } = api;