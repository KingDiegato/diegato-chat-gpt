import React from 'react'

export function Avatar({ children }) {
  return (
    <figure className='rounded-sm justify-center items-center'>
      {children}
    </figure>
  )
}
