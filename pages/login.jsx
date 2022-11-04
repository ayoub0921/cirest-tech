import Head from 'next/head'
import Link from 'next/link'
import React, { useState } from 'react'
import Layout from '../layout/Layout'
import styles from '../styles/Form.module.css'
import { FcGoogle } from 'react-icons/fc'
import { HiAtSymbol, HiFingerPrint } from "react-icons/hi";
import { useSession, signIn, signOut } from "next-auth/react"
import { useFormik } from 'formik';
import login_validate from '../lib/validate'
import { useRouter } from 'next/router'
import { BASE_URL } from './config/apiConfigue'

export default function Login() {
  const [show, setShow] = useState(false)
  const router = useRouter()

  

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',

    },
    validate:login_validate,
    onSubmit
  })

  async function onSubmit(values) {
    const status = await signIn('credentials', { redirect: false, password: values.password,email:values.email,callbackUrl:'/' })

    if(status.ok) router.push(status.url)
  }

  console.log(formik.errors)

  async function handleGoogleLogin() {
    signIn('google', { callbackUrl: `${BASE_URL}` })
  }
  return (
    <Layout>
      <Head>
        <title>login</title>
      </Head>
      <section className='w-3/4 mx-auto flex flex-col gap-10'>
        <div className="title">
          <h1 className='text-4xl text-left font-bold py-2'>Welcome back</h1>
          <p className='text-gray-400 text-left'>welcome back pleas enter your details</p>
        </div>
        <form action="" className='flex flex-col gap-5' onSubmit={formik.handleSubmit}>
          <div className={`${styles.input_group} ${formik.errors.email && formik.touched.email ? 'border-red-500' : ''}`}>
            <input
              {...formik.getFieldProps('email')}
              className={styles.input_text}
              type="email"
              name="email"
              id="email"
              placeholder='email'
            />
            <span className='icon flex items-center px-4'>
              <HiAtSymbol size={25} />
            </span>
          </div>
          {formik.errors.email && formik.touched.email ? <div className='text-rose-500 text-left'>{formik.errors.email}</div> : null}
          <div  className={`${styles.input_group} ${formik.errors.password && formik.touched.password ? 'border-red-500' : ''}`}>
            <input
              {...formik.getFieldProps('password')}
              className={styles.input_text}
              type={`${show ? 'text' : 'password'}`}
              name="password"
              id="password"
              placeholder='password'
            />
            <span className='icon flex items-center px-4 cursor-pointer' onClick={() => setShow(!show)}>
              <HiFingerPrint size={25} />
            </span>
          </div>
          {formik.errors.password && formik.touched.password ? <div className='text-rose-500 text-left'>{formik.errors.password}</div> : null}
          <div className="input-button">
            <button type='submit' className={styles.button}>Sign in</button>

          </div>
          <div className="input-button">
            <button onClick={handleGoogleLogin} type='button' className={styles.button_google}><FcGoogle /> Sign in with google</button>
          </div>
          <p className='text-center text-gray-400'>
            Don't have an account yet? <Link href={'/register'}><a className='text-blue-700'>Sign up</a></Link>
          </p>
        </form>
      </section>
    </Layout>
  )
}
