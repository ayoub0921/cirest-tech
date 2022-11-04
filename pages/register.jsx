import Head from 'next/head'
import Link from 'next/link'
import React, { useState } from 'react'
import Layout from '../layout/Layout'
import styles from '../styles/Form.module.css'
import { FcGoogle } from 'react-icons/fc'
import { HiAtSymbol, HiFingerPrint,HiOutlineUser } from "react-icons/hi";
import { useFormik } from 'formik'
import {validate_registre} from '../lib/validate';
import { useRouter } from 'next/router'
import { BASE_URL } from './config/apiConfigue'

export default function Register() {

  const router = useRouter();

  const formik = useFormik({
    initialValues:{
      username:'',
      email:'',
      password:'',
      cpassword:''
    },
    validate:validate_registre,
    onSubmit
  })


  console.log(formik.errors)

  async function onSubmit(values){
    const options = {
      method:"POST",
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(values)
    }

    await fetch(`${BASE_URL}/api/auth/signup`,options)
    .then(res=>res.json())
    .then(data=>{
      router.push(`${BASE_URL}`)
    })

  }

  const [show,setShow] = useState({
    password:false,
    cpassword:false
  })

  return (
    <Layout>
      <Head>
        <title>register</title>
      </Head>
      <section className='w-3/4 mx-auto flex flex-col gap-2'>
        <div className="title mb-6">
          <h1 className='text-4xl text-left font-bold py-2'>Create Account</h1>
          <p className='text-gray-400 text-left w-3/4'>pleas enter your informations</p>
        </div>
        <form action="" className='flex flex-col gap-5' onSubmit={formik.handleSubmit}>
          <div className={`${styles.input_group} ${formik.errors.username && formik.touched.username ? 'border-red-500' : ''}`}>
            <input {...formik.getFieldProps('username')}  className={styles.input_text} type="text" name="username" id="username" placeholder='username' />
            <span className='icon flex items-center px-4'>
              <HiOutlineUser size={25} />
            </span>
          </div>
          {formik.errors.username && formik.touched.username ? <div className='text-rose-500 text-left'>{formik.errors.username}</div> : null}
          <div className={`${styles.input_group} ${formik.errors.email && formik.touched.email ? 'border-red-500' : ''}`}>
            <input {...formik.getFieldProps('email')}  className={styles.input_text} type="email" name="email" id="email" placeholder='email' />
            <span className='icon flex items-center px-4'>
              <HiAtSymbol size={25} />
            </span>
          </div>
          {formik.errors.email && formik.touched.email ? <div className='text-rose-500 text-left'>{formik.errors.email}</div> : null}
          <div className={`${styles.input_group} ${formik.errors.password && formik.touched.password ? 'border-red-500' : ''}`}>
            <input {...formik.getFieldProps('password')}  className={styles.input_text} type={`${show.password ? 'text' : 'password'}`} name="password" id="password" placeholder='password' />
            <span className='icon flex items-center px-4 cursor-pointer' onClick={() => setShow({...show,password: !show.password})}>
              <HiFingerPrint size={25} />
            </span>
          </div>
          {formik.errors.password && formik.touched.password ? <div className='text-rose-500 text-left'>{formik.errors.password}</div> : null}
          <div className={`${styles.input_group} ${formik.errors.cpassword && formik.touched.cpassword ? 'border-red-500' : ''}`}>
            <input {...formik.getFieldProps('cpassword')} className={styles.input_text} type={`${show.cpassword ? 'text' : 'password'}`} name="cpassword" id="cpassword" placeholder='confirm password' />
            <span className='icon flex items-center px-4 cursor-pointer' onClick={() => setShow({...show,cpassword: !show.cpassword})}>
              <HiFingerPrint size={25} />
            </span>
          </div>
          {formik.errors.cpassword && formik.touched.cpassword ? <div className='text-rose-500 text-left'>{formik.errors.cpassword}</div> : null}
          <div className="input-button">
            <button type='submit' className={styles.button}>Sign up</button>

          </div>
          <p className='text-center text-gray-400'>
            Have an account <Link href={'/login'}><a className='text-blue-700'>Sign in</a></Link>
          </p>
        </form>
      </section>
    </Layout>
  )
}
