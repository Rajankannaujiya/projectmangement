import React from 'react'
import ResusablePriorityPage from '../resusablePriorityPage'
import { Priority } from '@/state/type'


const Urgent = () => {
  return (
<ResusablePriorityPage priority={Priority.Urgent} />
  )
}

export default Urgent