import React,{useState} from 'react'
import { useStateContext } from '../../contexts/ContextProvider'
import ThemeButton from '../../components/Common/ThemeSettings'
import { Footer, ThemeSettings } from '../../components/Tailwind/components'
import InfoForm from './Assets/InfoForm/InfoForm'

const ClientInformation = () => {
  const { currentMode, themeSettings, currentColor } = useStateContext();
  return (
    <div>
      <div className={currentMode === 'Dark' ? 'dark' : ''}>
        <div className='flex relative dark:bg-main-dark-bg'>
          <div>
            <ThemeButton />
          </div>
          <div className='bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2'>
            <div>
              {themeSettings && <ThemeSettings />}
              <div>
                <div className='mt-5'>
                  <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl dark:bg-secondary-dark-bg dark:text-white shadow-lg '>
                    <div className='flex flex-wrap lg:flex-nowrap justify-center ml-5 mt-5'>
                      {/* PUT WHATEVER HERE */}
                      <div className='md:flex w-4/5 pr-5 '>
                        <div 
                          style={{ backgroundColor: currentColor }}
                          className='md:flex md:w-1/2 bg-gray-100 rounded-l-3xl dark:bg-main-dark-bg py-10 px-10 items-center justify-left flex flex-col shadow-lg '
                        >
                          <span className='text-7xl text-center font-bold py-5'>
                            TELL
                          </span>
                          <span className='text-7xl text-center font-bold  py-5'>
                            US
                          </span>
                          <span className='text-7xl text-center font-bold py-5'>
                            ABOUT
                          </span>
                          <span className='text-7xl text-center font-bold py-5'>
                            YOURSELF
                          </span>
                          <span className='text-2xl text-center bold py-5'>
                            #RUNWAYX
                          </span>
                        </div>
                        <div className='hidden md:block w-1/2 bg-gray-100 rounded-r-3xl dark:bg-main-dark-bg py-10 px-10 shadow-lg'>
                            <InfoForm/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClientInformation
