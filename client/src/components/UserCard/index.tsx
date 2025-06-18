import { User } from '@/state/type'
import Image from 'next/image'
import React from 'react'

type Props = {
    user:User
}

const UserCard = ({user}: Props) => {
  return (
    <div className="flex items-center gap-4 rounded-md border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
        {
            user.profilePictureUrl && (
                <Image src={`/p1.jpeg`} alt='profile picture'
                width={32} height={32} className='rounded-full object-cover' />
            )
        }

        <div className='flex flex-col'>
            <h3 className='text-base font-semibold dark:text-white text-gray-800'>{user.username}</h3>
            <p className='text-sm text-gray-600 dark:text-gray-100'>{user.email}</p>
        </div>
    </div>
  )
}

export default UserCard