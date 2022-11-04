import React from 'react'
import Image from 'next/image'
import loading from '../../public/images/loading.gif'

const Loading = () => {
  return (
    <div className='text-center flex justify-center items-center'>
        <Image src={loading} width={50} height={50} alt="loading"/>
        <span>Loading more...</span>
    </div>
  )
}

export default Loading