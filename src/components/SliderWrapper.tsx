import React from 'react'

const SliderWrapper = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='bg-secondaryBg rounded-lg p-4 w-full overflow-hidden'>
        {children}
    </div>
  )
}

export default SliderWrapper