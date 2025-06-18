import React from 'react'
import ResusablePriorityPage from '../resusablePriorityPage'
import { Priority } from '@/state/type'


const Low = () => {
  return (
<ResusablePriorityPage priority={Priority.Low} />
  )
}

export default Low