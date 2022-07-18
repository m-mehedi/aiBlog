import React, { useState } from 'react'
import { InputChange } from '../../utils/TypeScript'

const LoginPass = () => {
    const initialState = {account: '', password: ''}
    const [userLogin, setUserLogin] = useState(initialState)
    const {account, password } = userLogin
    
    const handleChangeInput = (e: any) => {
        // const target = e.target as HTMLTextAreaElement;
        const { name, value} = e.target
        setUserLogin({...userLogin, [name]:value})
    }

  return (
    <form>
      <div className='form-group'>
          <label htmlFor="account">Email / Phone No</label>
          <input type="text" className='form-control' id='account' 
          name='account' value={account} onChange={handleChangeInput}/>
      </div>
    </form>
  )
}

export default LoginPass