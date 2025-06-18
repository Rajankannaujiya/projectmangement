"use client"

import { useSearchQuery } from '@/state/api';
import React, { useEffect, useState } from 'react'
import { debounce } from "lodash"
import { Error } from '@/components/alert';
import Loading from '@/components/Loading';
import Header from '@/components/Header';
import TaskCard from '@/components/TaskCard';
import ProjectCard from '@/components/ProjectCard';
import UserCard from '@/components/UserCard';


const Search = () => {

  const [searchTerm, setSearchTerm] = useState("");
  console.log("this is the search query", searchTerm)

  const { data: searchResult, isError, isLoading } = useSearchQuery(searchTerm, {
    skip: searchTerm.length < 3
  });

  console.log(searchResult)

  const handleSearch = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }, 500);

  useEffect(() => {
    return handleSearch.cancel();
  }, [handleSearch.cancel])


  return (
    <div className='p-8'>
      <Header name='Search' />
      <div>
        <input
          type="text"
          placeholder="🔍 Search..."
          className="w-full max-w-md rounded-2xl border border-gray-300 bg-white p-3 shadow-sm placeholder-gray-500 transition-all focus:border-blue-500 focus:outline-none dark:border-white dark:bg-gray-900 dark:text-white dark:placeholder-white"
          onChange={handleSearch}
        />

      </div>

      <div className='p-5'>
        {isLoading && <Loading />}
        {isError && <Error errorMessage='An error occured while searching' />}

        {!isLoading && !isError && searchResult && (
          <div>
            {searchResult.tasks && searchResult.tasks?.length > 0 && (
              <h2>Tasks</h2>
            )}
            {
              searchResult.tasks?.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))
            }

            { searchResult.projects && searchResult.projects?.length > 0 && <div className="space-y-4">

                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Projects</h2>
      

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {searchResult.projects?.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </div>}

           { searchResult.users && searchResult.users?.length > 0 && <div className="space-y-4">

                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Users</h2>
      

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {searchResult.users?.map((user) => (
                  <UserCard key={user.userId} user={user} />
                ))}
              </div>
            </div>}
          </div>
        )}
      </div>
    </div>
  )
}

export default Search