import React from 'react'

const SliderWrapper = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='bg-[#181818] rounded-lg px-0 py-4 w-[95%] overflow-hidden'>
        {children}
    </div>
  )
}

export default SliderWrapper