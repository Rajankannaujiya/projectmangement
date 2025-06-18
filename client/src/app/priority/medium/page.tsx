import React from 'react'
import ResusablePriorityPage from '../resusablePriorityPage'
import { Priority } from '@/state/type'


const Medium = () => {
  return (
<ResusablePriorityPage priority={Priority.Medium} />
  )
}

export default Medium