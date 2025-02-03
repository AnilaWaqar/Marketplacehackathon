import React from 'react'

const ExplorePage = () => {
  return (
    <div className='lg:mx-20 sm:mx-10 mx-3 mb-10 lg:mb-28'>
       <div className='flex items-center lg:gap-4'>
       <p className='uppercase text-black lg:text-2xl sm:text-xl text-base vertical-text'>Explore New and Popular Styles</p>
    <div className='flex sm:flex-row lg:items-start items-center flex-col gap-4'>
        <div className='lg:w-1/2 lg:h-[510px]'>
        <img src="/item-category 1.png" alt="sofa" />
        </div>
        <div className='flex gap-4'>
            <div className='flex flex-col gap-4'>
                <img src="/card.png" alt="sofa" className='w-[275px]'/>
                <img src="/card3.png" alt="sofa" className='w-[275px]' />
            </div>
            <div className='flex flex-col gap-4'>
                <img src="/card2.png" alt="sofa" className='w-[275px]' />
                <img src="/card3.png" alt="sofa" className='w-[275px]'/>
            </div>
        </div>
    </div>
       </div>
    </div>
  )
}

export default ExplorePage