import React from 'react'

const SplitDiv = () => {
  return (
    <div className='flex flex-wrap lg:flex-nowrap justify-center ml-5 mt-5'>
      {/* PUT WHATEVER HERE */}
      <div className='md:flex w-full pr-5'>
        <div className='hidden md:block w-1/2 bg-white dark:bg-secondary-dark-bg py-10 px-10'>

        </div>
        <div className='hidden md:block w-1/2 bg-white dark:bg-secondary-dark-bg py-10 px-10'>
            
        </div>
      </div>
    </div>
  )
}

export default SplitDiv
