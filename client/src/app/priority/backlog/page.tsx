import React from 'react'
import ResusablePriorityPage from '../resusablePriorityPage'
import { Priority } from '@/state/type'


const Backlog = () => {
  return (
<ResusablePriorityPage priority={Priority.Backlog} />
  )
}

export default Backlog