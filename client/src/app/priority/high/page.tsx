import React from 'react'
import ResusablePriorityPage from '../resusablePriorityPage'
import { Priority } from '@/state/type'


const High = () => {
  return (
<ResusablePriorityPage priority={Priority.High} />
  )
}

export default High