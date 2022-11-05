import React from 'react'
import styles from '../styles/Layout.module.css'
import loginImage from '../public/images/loginImg.gif'
import Image from 'next/image'

const Layout = ({ children }) => {
    return (
        <div className='flex bg-slate-200'>
            <div className="bg-slate-50 my-10 mx-auto  w-4/5 shadow-sm rounded-md grid lg:grid-cols-2 animate__animated animate__backInDown">
                <div className='right flex flex-col justify-evenly'>
                    <div className='text-center py-10'>
                        {children}
                    </div>
                </div>
                <div className=' bg-white flex items-center justify-center h-full max-[667px]:hidden'>
                    <Image src={loginImage}/>
                </div>
            </div>
        </div>
    )
}

export default Layout