import React, {useState} from 'react'
import LoginPass from '../components/auth/LoginPass'
import LoginSMS from '../components/auth/LoginSMS'
import {Link} from 'react-router-dom'

const Login = () => {
  const [sms, setSms] = useState(false)
  return (
    <div className='auth_page'>
      <div className='auth_box'>
        <h3 className='text-uppercase text-center mb-4'>Login</h3>

        { sms ? <LoginSMS /> : <LoginPass />}
        <small className='row my-2' style={{cursor: 'pointer'}}>
          <span  className='col-6'>
              <Link to='/forgot_password' className='col-6 text-danger' style={{textDecoration:'none'}}>Forgot Password?</Link>
          </span>
          <span className='col-6 text-end'  onClick={()=> setSms(!sms)}>
            <p className='text-primary'>{sms ? 'Sign in with password':'Sign in with SMS'}</p>
          </span>
        </small>

        <p>
          Not registered yet?
          <Link to={`/register`} style={{color: 'green', textDecoration:'none', fontWeight:'bolder'}}> Register Now</Link>
        </p>
      </div>
    </div>
  )
}

export default Login