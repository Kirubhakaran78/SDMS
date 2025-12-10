import React, { Suspense } from 'react'
import Loginlayout from '../../Components/Layout/Login/Loginlayout'

function Login() {
  return (
    <>
   <Suspense fallback={<div>Loading...</div>}>
    <Loginlayout />
   </Suspense>
    </>
  )
}

export default Login