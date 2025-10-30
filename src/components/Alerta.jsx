import React from 'react'

export default function Alerta({children}) {
  return (
    <div className='text-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative' role='alert'>
      {children}
    </div>
    
  )
}
